/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../lib/db";
import { ShippingStatus, PickupType, Role, PaymentStatus } from "@prisma/client";
import { getCookie } from "../../../../lib/cookies";

export async function POST(req: Request) {
  console.log("Economy Parcel API endpoint hit");
  try {
    const session = await auth();
    const data = await req.json();

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
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        update: {
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Fetch user role if authenticated
    let userRole: Role | null = null;
    if (session?.user?.id) {
      const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
      });
      userRole = user?.role || null;
    }

    console.log("Received economy parcel data:", JSON.stringify(data, null, 2));

    // Validate required pickup contact
    if (!data?.pickupDetails?.contact?.name || !data?.pickupDetails?.contact?.phone) {
      return NextResponse.json(
        { error: "Sender name and phone are required" },
        { status: 400 }
      );
    }

    // Create contacts
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
              postalCode: data.pickupDetails.address.postalCode || "",
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
              postalCode: data.deliveryDetails.address.postalCode || "",
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
    const totalCost = data.calculatedCost;
    const timeWindowString = data.timeWindow
      ? `${data.timeWindow.start}-${data.timeWindow.end}`
      : null;

    // === ✅ WAREHOUSE LOGIC — NO ASSUMPTIONS ===
    let deliveryWarehouseId: string;

    const isPrivileged = userRole === Role.ADMIN || userRole === Role.BROKER;

    if (isPrivileged) {
      // Admin/broker must provide warehouse
      if (!data.deliveryWarehouseId) {
        return NextResponse.json(
          { error: "Delivery warehouse is required" },
          { status: 400 }
        );
      }
      const warehouse = await db.warehouse.findUnique({
        where: { id: data.deliveryWarehouseId },
      });
      if (!warehouse) {
        return NextResponse.json(
          { error: "Selected warehouse not found" },
          { status: 400 }
        );
      }
      deliveryWarehouseId = warehouse.id;
    } else {
      // Normal user or guest → auto-assign
      const defaultWarehouse = await db.warehouse.findFirst({
        where: { isDefault: true, status: "ENABLED" },
      });

      if (defaultWarehouse) {
        deliveryWarehouseId = defaultWarehouse.id;
      } else {
        // Fallback: any enabled warehouse
        const fallback = await db.warehouse.findFirst({
          where: { status: "ENABLED" },
        });
        if (!fallback) {
          return NextResponse.json(
            { error: "No active warehouse available for delivery" },
            { status: 500 }
          );
        }
        deliveryWarehouseId = fallback.id;
      }
    }

    // Create pickup
    const pickup = await db.pickup.create({
      data: {
        type: PickupType.WAREHOUSE_TRANSFER,
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
        deliveryWarehouseId: deliveryWarehouseId, // ✅ Always set
        customDeliveryAddressId: customDeliveryAddress?.id,
        deliveryContactId: deliveryContact?.id,
        storageFeeAcknowledged: data.storageFeeAcknowledged,
        status: isPrivileged
          ? ShippingStatus.PROCESSING
          : ShippingStatus.PENDING,
        paymentStatus: data.isPaid
          ? PaymentStatus.COMPLETED
          : PaymentStatus.PENDING,
        ...(session?.user?.id && {
          userId: session.user.id, // 👈 assuming your Pickup model has `userId` (not `User` relation)
        }),
        ...(guestSessionId && !session?.user?.id && {
          guestSessionId: guestSessionId,
        }),
        items: {
          create: data.items.map((item: any) => ({
            description: item.description,
            quantity: item.quantity,
            value: item.value,
            currency: item.currency,
            hsCode: item.hsCode || "",
            weight: item.weight || 0,
            dimensions: item.dimensions || {},
          })),
        },
        packages: {
          create: data.packages.map((pkg: any) => ({
            packageType: pkg.packageType,
            weight: pkg.weight || 0,
            length: pkg.dimensions?.length || 0,
            width: pkg.dimensions?.width || 0,
            height: pkg.dimensions?.height || 0,
            specialNotes: pkg.specialNotes || "",
          })),
        },
        commercialDocuments: data.commercialDocuments || null,
        calculatedCost: totalCost,
        costCurrency: data.costCurrency || "USD",
        specialPricing: "ECONOMY_FIXED_RATE",
      },
      include: { items: true, packages: true },
    });

    return NextResponse.json(pickup, { status: 201 });
  } catch (error: any) {
    console.error("Economy parcel creation error:", error);
    return NextResponse.json(
      {
        error: "Failed to create economy parcel",
        details: error.message,
      },
      { status: 500 }
    );
  }
}