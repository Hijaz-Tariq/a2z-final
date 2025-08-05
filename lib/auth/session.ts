import { db } from "../db";

export async function mergeCarts(userId: string, guestSessionId: string) {
  // 1. Find both carts
  const [userCart, guestCart] = await Promise.all([
    db.cart.findUnique({ where: { userId }, include: { items: true } }),
    db.cart.findUnique({ where: { guestSessionId }, include: { items: true } })
  ]);

  if (!guestCart) return;

  // 2. Move items to user's cart
  if (userCart) {
    await db.$transaction([
      ...guestCart.items.map(item =>
        db.cartItem.upsert({
          where: { id: item.id }, // Simple approach using item ID
          update: { cartId: userCart.id },
          create: {
            cartId: userCart.id,
            productId: item.productId,
            quantity: item.quantity,
            originalPrice: item.originalPrice,
            discountPrice: item.discountPrice
          }
        })
      ),
      db.cart.delete({ where: { id: guestCart.id } })
    ]);
  }
  // 3. Or transfer entire cart
  else {
    await db.cart.update({
      where: { id: guestCart.id },
      data: { userId, guestSessionId: null }
    });
  }
}

// // lib/auth/session.ts
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/auth";
// import { db } from "../db";

// // export async function getGuestSessionId(request: NextRequest): Promise<string | null> {
// //   return request.cookies.get("guest_session_id")?.value ?? null;
// // }

// export async function getGuestSessionId(request: NextRequest): Promise<string | null> {
//   return request.cookies.get("guest_session_id")?.value ?? null;
// }

// export async function clearGuestSession(response: NextResponse): Promise<void> {
//   response.cookies.set("guest_session_id", "", {
//     expires: new Date(0),
//     path: "/",
//   });
// }

// export async function getCartSession(request: NextRequest) {
//   const session = await auth();
//   const guestSessionId = await getGuestSessionId(request);
  
//   return {
//     userId: session?.user?.id,
//     guestSessionId,
//     isGuest: !session?.user && !!guestSessionId
//   };
// }

// export async function mergeCarts(userId: string, guestSessionId: string) {
//   const [userCart, guestCart] = await Promise.all([
//     db.cart.findUnique({ 
//       where: { userId },
//       include: { items: true }
//     }),
//     db.cart.findUnique({ 
//       where: { guestSessionId },
//       include: { items: true }
//     })
//   ]);

//   if (!guestCart) return;

//   if (userCart) {
//     await db.$transaction([
//       ...guestCart.items.map(item => 
//         db.cartItem.upsert({
//           where: {
//             cartId_productId: {
//               cartId: userCart.id,
//               productId: item.productId
//             }
//           },
//           update: {
//             quantity: {
//               increment: item.quantity
//             }
//           },
//           create: {
//             cartId: userCart.id,
//             productId: item.productId,
//             quantity: item.quantity,
//             originalPrice: item.originalPrice,
//             discountPrice: item.discountPrice
//           }
//         })
//       ),
//       db.cart.delete({ where: { id: guestCart.id } })
//     ]);
//   } else {
//     await db.cart.update({
//       where: { id: guestCart.id },
//       data: { 
//         userId,
//         guestSessionId: null 
//       }
//     });
//   }
// }