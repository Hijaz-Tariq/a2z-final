/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../lib/db";
import { ShippingStatus, PickupType } from "@prisma/client";
import { getCookie } from "../../../lib/cookies";
import { costCalculations } from "../../../data/calculations";

export async function POST(req: Request) {
  console.log("Pickup API endpoint hit");
  try {
    const session = await auth();
    const data = await req.json();
    console.log("Received data:", JSON.stringify(data, null, 2));

    const cookies = req.headers.get("cookie") || "";
    const guestSessionId = getCookie(cookies, "guest_session_id");

    // Validate authentication
    if (!session?.user?.id && !guestSessionId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Handle guest session
    if (guestSessionId && !session?.user?.id) {
      await db.guestSession.upsert({
        where: { id: guestSessionId },
        create: {
          id: guestSessionId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
        update: {
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Refresh expiration
        },
      });
    }

    // Validate required fields
    if (!data?.pickupDetails?.contact) {
      throw new Error("Pickup contact information is required");
    }

    // Create contacts (using original field names)
    const pickupContact = await db.contact.create({
      data: {
        name: data.pickupDetails.contact.name,
        phone: data.pickupDetails.contact.phone,
        email: data.pickupDetails.contact.email || null,
      },
    });

    let deliveryContact = null;
    if (data.deliveryDetails?.contact) {
      deliveryContact = await db.contact.create({
        data: {
          name: data.deliveryDetails.contact.name,
          phone: data.deliveryDetails.contact.phone,
          email: data.deliveryDetails.contact.email || null,
        },
      });
    }

    // Create addresses
    const [customPickupAddress, customDeliveryAddress] = await Promise.all([
      data.pickupDetails.locationType === "custom"
        ? db.address.create({
            data: {
              line1: data.pickupDetails.address.line1,
              line2: data.pickupDetails.address.line2 || "",
              city: data.pickupDetails.address.city,
              state: data.pickupDetails.address.state,
              postalCode: data.pickupDetails.address.postalCode,
              country: data.pickupDetails.address.country,
            },
          })
        : null,
      data.deliveryDetails?.locationType === "custom"
        ? db.address.create({
            data: {
              line1: data.deliveryDetails.address.line1,
              line2: data.deliveryDetails.address.line2 || "",
              city: data.deliveryDetails.address.city,
              state: data.deliveryDetails.address.state,
              postalCode: data.deliveryDetails.address.postalCode,
              country: data.deliveryDetails.address.country,
            },
          })
        : null,
    ]);

    // Calculate total weight
    const totalWeight = data.packages.reduce(
      (sum: number, pkg: any) => sum + (pkg.weight || 0),
      0
    );

    const totalCost = data.packages.reduce((sum: number, pkg: any) => {
      const calc = costCalculations({
        weight: pkg.weight.toString(),
        length: pkg.dimensions.length.toString(),
        width: pkg.dimensions.width.toString(),
        height: pkg.dimensions.height.toString(),
        units: "kg-cm",
        originCountryId: data.pickupDetails.address.countryId,
        destCountryId: data.deliveryDetails.address.countryId,
      });
      return sum + calc.cost;
    }, 0);

    if (Math.abs(totalCost - (data.calculatedCost || 0)) > 0.01) {
      console.warn("Client-server cost calculation mismatch");
    }

    const timeWindowString = data.timeWindow
      ? `${data.timeWindow.start}-${data.timeWindow.end}`
      : null;

    // Create pickup
    const pickup = await db.pickup.create({
      data: {
        type: data.pickupType || PickupType.OUTBOUND_SHIPMENT,
        scheduledDate: new Date(data.scheduledDate),
        timeWindow: timeWindowString,
        specialNotes: data.specialNotes,
        totalWeight,
        weightUnit: "kg",
        packageCount: data.packages.length,
        itemsDescription: data.items
          .map((item: any) => `${item.quantity} ${item.description}`)
          .join(", "),
        pickupWarehouseId:
          data.pickupDetails.locationType === "warehouse"
            ? data.pickupDetails.warehouseId
            : undefined,
        customPickupAddressId: customPickupAddress?.id,
        pickupContactId: pickupContact.id,
        deliveryWarehouseId:
          data.deliveryDetails?.locationType === "warehouse"
            ? data.deliveryDetails.warehouseId
            : undefined,
        customDeliveryAddressId: customDeliveryAddress?.id,
        deliveryContactId: deliveryContact?.id,
        storageFeeAcknowledged: data.storageFeeAcknowledged,
        status: ShippingStatus.PENDING,
        ...(session?.user?.id && {
          User: { connect: { id: session.user.id } },
        }),
        ...(guestSessionId && !session?.user?.id
          ? {
              GuestSession: {
                connect: {
                  id: guestSessionId,
                },
              },
            }
          : undefined),

        items: {
          create: data.items.map((item: any) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            value: item.value,
            currency: item.currency,
            hsCode: item.hsCode,
            weight: item.weight,
            dimensions: item.dimensions,
          })),
        },
        packages: {
          create: data.packages.map((pkg: any) => ({
            packageType: pkg.packageType,
            weight: pkg.weight,
            length: pkg.dimensions?.length,
            width: pkg.dimensions?.width,
            height: pkg.dimensions?.height,
            specialNotes: pkg.specialNotes,
            itemIds: pkg.itemIds,
          })),
        },
        commercialDocuments: data.commercialDocuments || null,
        calculatedCost: totalCost,
        costCurrency: data.costCurrency || "USD",
      },
      include: {
        items: true,
        packages: true,
        pickupWarehouse: true, 
        deliveryWarehouse: true,
      },
    });

    // Generate a tracking number
const trackingNumber = `A2Z${pickup.id.substring(0, 8).toUpperCase()}`;

// Create ShippingTracking
await db.shippingTracking.create({
   data: {
    trackingNumber,
    carrier: "A2Z Express",
    status: ShippingStatus.PENDING,
    pickup: { connect: { id: pickup.id } },
    events: {
      create: {
        eventType: "PENDING",
        details: "Pickup request received",
        location: customPickupAddress
          ? `${customPickupAddress.city}, ${customPickupAddress.country}`
          : pickup.pickupWarehouse?.name || "Unknown origin",
        occurredAt: new Date(),
      },
    },
  },
});

    return NextResponse.json(pickup, { status: 201 });
  } catch (error: any) {
    console.error("Pickup creation error:", error);
    return NextResponse.json(
      {
        error: "Failed to create pickup",
        details: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
      { status: 500 }
    );
  }
}
