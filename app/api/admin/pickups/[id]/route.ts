// import { NextResponse } from "next/server";
// import { db } from "../../../../../lib/db";
// import { auth } from "@/auth";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth();
//     if (!session?.user || session.user.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const pickup = await db.pickup.findUnique({
//       where: { id: params.id },
//       include: {
//         User: true,
//         GuestCheckout: true,
//         GuestSession: true,
//         pickupContact: true,
//         deliveryContact: true,
//         items: true,
//         packages: true,
//         customPickupAddress: true,
//         customDeliveryAddress: true,
//         ShippingTracking: true,
//       },
//     });

//     if (!pickup) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     const packagesWithItems = pickup.packages.map((pkg) => {
//       const itemIds = Array.isArray(pkg.itemIds)
//         ? pkg.itemIds.map((id) => String(id))
//         : [];
//       const items = pickup.items.filter((item) =>
//         itemIds.includes(String(item.id))
//       );
//       return { ...pkg, items };
//     });

//     return NextResponse.json({ ...pickup, packages: packagesWithItems });
//   } catch (error) {
//     console.error("[PICKUP_GET_ONE]", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth();
//     if (!session?.user || session.user.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     const updatedPickup = await db.pickup.update({
//       where: { id: params.id },
//       data: {
//         scheduledDate: body.scheduledDate
//           ? new Date(body.scheduledDate)
//           : undefined,
//         timeWindow: body.timeWindow,
//         ShippingTracking: body.trackingNumber,
//         pickupContact: body.pickupDetails?.contact
//           ? {
//               update: {
//                 name: body.pickupDetails.contact.name,
//                 phone: body.pickupDetails.contact.phone,
//                 email: body.pickupDetails.contact.email,
//               },
//             }
//           : undefined,
//         deliveryContact: body.deliveryDetails?.contact
//           ? {
//               update: {
//                 name: body.deliveryDetails.contact.name,
//                 phone: body.deliveryDetails.contact.phone,
//                 email: body.deliveryDetails.contact.email,
//               },
//             }
//           : undefined,
//         // you can add more nested updates: items, packages, addresses
//       },
//       include: {
//         pickupContact: true,
//         deliveryContact: true,
//         items: true,
//         packages: true,
//       },
//     });

//     return NextResponse.json(updatedPickup);
//   } catch (error) {
//     console.error("[PICKUP_PATCH]", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { auth } from "@/auth";
import { ShippingStatus, PickupType } from "@prisma/client";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth();
//     if (!session?.user || session.user.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const pickup = await db.pickup.findUnique({
//       where: { id: params.id },
//       include: {
//         User: true,
//         GuestCheckout: true,
//         GuestSession: true,
//         pickupContact: true,
//         deliveryContact: true,
//         items: true,
//         packages: true,
//         customPickupAddress: true,
//         customDeliveryAddress: true,
//         ShippingTracking: true,
//       },
//     });

//     if (!pickup) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     const packagesWithItems = pickup.packages.map((pkg) => {
//       const itemIds = Array.isArray(pkg.itemIds)
//         ? pkg.itemIds.map((id) => String(id))
//         : [];
//       const items = pickup.items.filter((item) =>
//         itemIds.includes(String(item.id))
//       );
//       return { ...pkg, items };
//     });

//     return NextResponse.json({ ...pickup, packages: packagesWithItems });
//   } catch (error) {
//     console.error("[PICKUP_GET_ONE]", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params; // ✅ Await the params

    const pickup = await db.pickup.findUnique({
      where: { id },
      include: {
        User: true,
        GuestCheckout: true,
        GuestSession: true,
        pickupContact: true,
        deliveryContact: true,
        items: true,
        packages: true,
        customPickupAddress: true,
        customDeliveryAddress: true,
        ShippingTracking: true,
      },
    });

    if (!pickup) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const packagesWithItems = pickup.packages.map((pkg) => {
      const itemIds = Array.isArray(pkg.itemIds)
        ? pkg.itemIds.map((id) => String(id))
        : [];
      const items = pickup.items.filter((item) =>
        itemIds.includes(String(item.id))
      );
      return { ...pkg, items };
    });

    return NextResponse.json({ ...pickup, packages: packagesWithItems });
  } catch (error) {
    console.error("[PICKUP_GET_ONE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  // { params }: { params: { id: string } }
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
const { id } = await context.params;
    // First, get the current pickup to check its status
    const currentPickup = await db.pickup.findUnique({
      where: { id },
      include: {
        ShippingTracking: true,
      },
    });

    if (!currentPickup) {
      return NextResponse.json({ error: "Pickup not found" }, { status: 404 });
    }

    // Check if status is changing from PENDING to something else and no tracking exists
    const isStatusChangingFromPending =
      currentPickup.status === ShippingStatus.PENDING &&
      body.status !== ShippingStatus.PENDING &&
      (!currentPickup.ShippingTracking ||
        currentPickup.ShippingTracking.length === 0);

    // Start a transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
      let trackingNumber = null;

      // If we need to create a tracking number
      if (isStatusChangingFromPending && body.createTracking) {
        // Generate tracking number if not provided
        trackingNumber =
          body.createTracking.trackingNumber || generateTrackingNumber();
        const carrier = body.createTracking.carrier || "INTERNAL";

        // Determine appropriate tracking status based on pickup type
        let trackingStatus: ShippingStatus = ShippingStatus.PROCESSING;

        if (
          body.type === PickupType.OUTBOUND_SHIPMENT ||
          body.type === PickupType.WAREHOUSE_TRANSFER
        ) {
          trackingStatus = ShippingStatus.PROCESSING;
        } else if (
          body.type === PickupType.INBOUND_RETURN ||
          body.type === PickupType.BUSINESS_PICKUP ||
          body.type === PickupType.RESIDENTIAL_PICKUP
        ) {
          trackingStatus = ShippingStatus.IN_TRANSIT;
        }

        // Create the tracking record
        const newTracking = await tx.shippingTracking.create({
          data: {
            trackingNumber,
            carrier,
            status: trackingStatus,
            pickupId: id,
            events: {
              create: {
                eventType: "CREATED",
                details: "Tracking number generated for pickup",
                location: "System",
              },
            },
          },
        });

        trackingNumber = newTracking.trackingNumber;
      }

      // Update the pickup with new status and other fields
      const updatedPickup = await tx.pickup.update({
        where: { id },
        data: {
          status: body.status as ShippingStatus,
          type: body.type as PickupType,
          scheduledDate: body.scheduledDate
            ? new Date(body.scheduledDate)
            : undefined,
          timeWindow: body.timeWindow,
          pickupContact: body.pickupDetails?.contact
            ? {
                update: {
                  name: body.pickupDetails.contact.name,
                  phone: body.pickupDetails.contact.phone,
                  email: body.pickupDetails.contact.email,
                },
              }
            : undefined,
          deliveryContact: body.deliveryDetails?.contact
            ? {
                update: {
                  name: body.deliveryDetails.contact.name,
                  phone: body.deliveryDetails.contact.phone,
                  email: body.deliveryDetails.contact.email,
                },
              }
            : undefined,
        },
        include: {
          pickupContact: true,
          deliveryContact: true,
          items: true,
          packages: true,
          ShippingTracking: true,
        },
      });

      return {
        pickup: updatedPickup,
        trackingNumber,
      };
    });

    // Return the result
    if (result.trackingNumber) {
      return NextResponse.json({
        ...result.pickup,
        trackingNumber: result.trackingNumber,
      });
    } else {
      return NextResponse.json(result.pickup);
    }
  } catch (error) {
    console.error("[PICKUP_PATCH]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to generate tracking number
function generateTrackingNumber() {
  const prefix = "TRK";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `${prefix}-${timestamp}-${random}`;
}
