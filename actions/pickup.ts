/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/pickupAction.ts
// import { z } from "zod";
import { pickupFormSchema } from "../types/PickupPage";

export async function pickupAction(
    prevState: { message: string; error?: string },
    formData: FormData
  ): Promise<{ message: string; error?: string; pickupId?: string }> {
    try {
      const jsonData = formData.get("jsonData") as string;
      const parsedData = JSON.parse(jsonData);
  
      // Convert scheduledDate string back to Date
      if (parsedData.scheduledDate) {
        parsedData.scheduledDate = new Date(parsedData.scheduledDate);
      }
  
      // Validate with Zod
      const validatedData = pickupFormSchema.parse(parsedData);
  
      // Send data to the API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create pickup");
      }
  
      const pickup = await response.json();
      
      return { 
        message: "Pickup scheduled successfully!",
        pickupId: pickup.id // Return the pickup ID for redirection
      };
    } catch (error: any) {
      console.error("🚨 Server Action Error:", error);
      return { 
        message: "Failed to schedule pickup", 
        error: error.message || "Invalid form data" 
      };
    }
  }
// in the previous code , i want to send the data to the next route 
// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import db from "@/lib/prisma";
// import { PickupStatus, PickupType } from "@prisma/client";
// import { getCookie } from "@/lib/cookies";

// export async function POST(req: Request) {
//   console.log("Pickup API endpoint hit");
//   try {
//     const session = await auth();
//     const data = await req.json();
//     console.log("Received data:", JSON.stringify(data, null, 2));

//     const cookies = req.headers.get("cookie") || "";
//     const guestSessionId = getCookie(cookies, "guest_session_id");

//     // Validate authentication
//     if (!session?.user?.id && !guestSessionId) {
//       return NextResponse.json(
//         { error: "Authentication required" },
//         { status: 401 }
//       );
//     }

//  if (guestSessionId && !session?.user?.id) {
//       await db.guestSession.upsert({
//         where: { id: guestSessionId },
//         create: {
//           id: guestSessionId,
//           expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
//         },
//         update: {
//           expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Refresh expiration
//         },
//       });
//     }

//     // Validate required fields
//     if (!data?.pickupDetails?.contact) {
//       throw new Error("Pickup contact information is required");
//     }

//     // Create contacts (using original field names)
//     const pickupContact = await db.contact.create({
//       data: {
//         name: data.pickupDetails.contact.name,
//         phone: data.pickupDetails.contact.phone,
//         email: data.pickupDetails.contact.email || null,
//       },
//     });

//     let deliveryContact = null;
//     if (data.deliveryDetails?.contact) {
//       deliveryContact = await db.contact.create({
//         data: {
//           name: data.deliveryDetails.contact.name,
//           phone: data.deliveryDetails.contact.phone,
//           email: data.deliveryDetails.contact.email || null,
//         },
//       });
//     }

//     // Create addresses
//     const [customPickupAddress, customDeliveryAddress] = await Promise.all([
//       data.pickupDetails.locationType === "custom"
//         ? db.address.create({
//             data: {
//               line1: data.pickupDetails.address.line1,
//               line2: data.pickupDetails.address.line2 || "",
//               city: data.pickupDetails.address.city,
//               state: data.pickupDetails.address.state,
//               postalCode: data.pickupDetails.address.postalCode,
//               country: data.pickupDetails.address.country,
//             },
//           })
//         : null,
//       data.deliveryDetails?.locationType === "custom"
//         ? db.address.create({
//             data: {
//               line1: data.deliveryDetails.address.line1,
//               line2: data.deliveryDetails.address.line2 || "",
//               city: data.deliveryDetails.address.city,
//               state: data.deliveryDetails.address.state,
//               postalCode: data.deliveryDetails.address.postalCode,
//               country: data.deliveryDetails.address.country,
//             },
//           })
//         : null,
//     ]);

//     // Calculate total weight
//     const totalWeight = data.packages.reduce(
//       (sum: number, pkg: any) => sum + (pkg.weight || 0),
//       0
//     );

//     // Create pickup
//     const pickup = await db.pickup.create({
//       data: {
//         type: data.pickupType || PickupType.OUTBOUND_SHIPMENT,
//         scheduledDate: new Date(data.scheduledDate),
//         timeWindow: data.timeWindow,
//         specialNotes: data.specialNotes,
//         totalWeight,
//         weightUnit: "kg",
//         packageCount: data.packages.length,
//         itemsDescription: data.items
//           .map((item: any) => `${item.quantity} ${item.description}`)
//           .join(", "),
//         pickupWarehouseId:
//           data.pickupDetails.locationType === "warehouse"
//             ? data.pickupDetails.warehouseId
//             : undefined,
//         customPickupAddressId: customPickupAddress?.id,
//         pickupContactId: pickupContact.id,
//         deliveryWarehouseId:
//           data.deliveryDetails?.locationType === "warehouse"
//             ? data.deliveryDetails.warehouseId
//             : undefined,
//         customDeliveryAddressId: customDeliveryAddress?.id,
//         deliveryContactId: deliveryContact?.id,
//         storageFeeAcknowledged: data.storageFeeAcknowledged,
//         status: PickupStatus.PENDING,
//         ...(session?.user?.id && {
//           User: { connect: { id: session.user.id } },
//         }),
//         ...(guestSessionId &&
//           !session?.user?.id && {
//             GuestSession: { connect: { id: guestSessionId } },
//           }),
//         items: {
//           create: data.items.map((item: any) => ({
//             description: item.description,
//             quantity: item.quantity,
//             value: item.value,
//             currency: item.currency,
//             hsCode: item.hsCode,
//             weight: item.weight,
//             dimensions: item.dimensions,
//           })),
//         },
//         packages: {
//           create: data.packages.map((pkg: any) => ({
//             packageType: pkg.packageType,
//             weight: pkg.weight,
//             length: pkg.dimensions?.length,
//             width: pkg.dimensions?.width,
//             height: pkg.dimensions?.height,
//             specialNotes: pkg.specialNotes,
//             itemIds: pkg.itemIds,
//           })),
//         },
//       },
//       include: { items: true, packages: true },
//     });

//     return NextResponse.json(pickup, { status: 201 });
//   } catch (error: any) {
//     console.error("Pickup creation error:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to create pickup",
//         details: error.message,
//         ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
//       },
//       { status: 500 }
//     );
//   }
// }