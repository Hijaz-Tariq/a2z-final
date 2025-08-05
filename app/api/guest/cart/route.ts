// import { NextResponse } from "next/server";
// import db from "@/lib/prisma";

// export async function POST(req: Request) {
//   const { productId, quantity, sessionId } = await req.json();

//   if (!sessionId) {
//     return NextResponse.json({ error: "Session ID required" }, { status: 400 });
//   }

//   try {
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
//     });

//     if (!cart) {
//       cart = await db.cart.create({
//         data: { guestSessionId: sessionId },
//       });
//     }

//     // Check if product exists
//     const product = await db.product.findUnique({
//       where: { id: productId },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Add or update cart item
//     const existingItem = await db.cartItem.findFirst({
//       where: {
//         cartId: cart.id,
//         productId,
//       },
//     });

//     if (existingItem) {
//       await db.cartItem.update({
//         where: { id: existingItem.id },
//         data: {
//           quantity: existingItem.quantity + quantity,
//         },
//       });
//     } else {
//       await db.cartItem.create({
//         data: {
//           cartId: cart.id,
//           productId,
//           quantity,
//         },
//       });
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       console.log(error, "Failed to add to guest cart"),
//       { status: 500 }
//     );
//     console.error("Detailed error:", {
//       error,
//       sessionId,
//       productId,
//       quantity,
//       timestamp: new Date().toISOString(),
//     });
//   }
// }


import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
import { db } from '../../../../lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    );
  }

  try {
    const cart = await db.cart.findUnique({
      where: { guestSessionId: sessionId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      // { error: 'Failed to fetch guest cart' },
      console.log ('Failed to fetch guest cart', error),
      { status: 500 }
    );
  }
}