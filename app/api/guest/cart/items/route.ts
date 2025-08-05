/* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/guest/cart/items/route.ts
// import { NextResponse } from "next/server";
// import db from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { productId, quantity = 1, sessionId } = await req.json();

//     if (!sessionId) {
//       return NextResponse.json(
//         { error: "Session ID required" },
//         { status: 400 }
//       );
//     }

//     if (!productId) {
//       return NextResponse.json(
//         { error: "Product ID required" },
//         { status: 400 }
//       );
//     }

//     // Verify session exists
//     const session = await db.guestSession.findUnique({
//       where: { id: sessionId },
//     });

//     if (!session) {
//       return NextResponse.json({ error: "Invalid session" }, { status: 404 });
//     }

//     // Find or create cart
//     let cart = await db.cart.findUnique({
//       where: { guestSessionId: sessionId },
//       include: { items: true },
//     });

//     if (!cart) {
//       cart = await db.cart.create({
//         data: { guestSessionId: sessionId },
//         include: { items: true },
//       });
//     }

//     // Rest of your code remains the same...
//     const product = await db.product.findUnique({
//       where: { id: productId },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     const existingItem = cart.items.find(
//       (item) => item.productId === productId
//     );

//     const updatedCart = await db.cart.update({
//       where: { id: cart.id },
//       data: {
//         items: existingItem
//           ? {
//               update: {
//                 where: { id: existingItem.id },
//                 data: { quantity: existingItem.quantity + quantity },
//               },
//             }
//           : {
//               create: {
//                 productId,
//                 quantity,
//               },
//             },
//       },
//       include: {
//         items: {
//           include: {
//             product: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       cart: updatedCart,
//     });
//   } catch (error: any) {
//     console.error("Error in cart API:", error);

//     // Handle specific database errors
//     if (error.code === "P2002") {
//       return NextResponse.json(
//         { error: "This item already exists in your cart" },
//         { status: 409 }
//       );
//     } else if (error.code === "P2025") {
//       return NextResponse.json(
//         { error: "The requested resource was not found" },
//         { status: 404 }
//       );
//     }

//     // Generic error fallback
//     return NextResponse.json(
//       {
//         error: "Failed to process cart request",
//         details:
//           process.env.NODE_ENV === "development" ? error.message : undefined,
//       },
//       { status: 500 }
//     );
//   }
// }


//******************************27-7 21:00 */

import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { productId, quantity = 1, sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    // Verify session exists
    const session = await db.guestSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 404 });
    }

    // Find or create cart
    let cart = await db.cart.findUnique({
      where: { guestSessionId: sessionId },
      include: { items: true },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { guestSessionId: sessionId },
        include: { items: true },
      });
    }

    // Rest of your code remains the same...
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    const updatedCart = await db.cart.update({
  where: { id: cart.id },
  data: {
    items: existingItem
      ? {
          update: {
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
          },
        }
      : {
          create: {
            productId,
            quantity,
            originalPrice: product.price, // Required field
            product: { connect: { id: productId } }, // Required relation
          },
        },
  },
  include: {
    items: {
      include: {
        product: true,
      },
    },
  },
});

    return NextResponse.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error: any) {
    console.error("Error in cart API:", error);

    // Handle specific database errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This item already exists in your cart" },
        { status: 409 }
      );
    } else if (error.code === "P2025") {
      return NextResponse.json(
        { error: "The requested resource was not found" },
        { status: 404 }
      );
    }

    // Generic error fallback
    return NextResponse.json(
      {
        error: "Failed to process cart request",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}