/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // import { NextResponse } from "next/server";
// // // // import { auth } from "@/auth";
// // // // import db from "@/lib/prisma";

// // // // export async function POST(req: Request) {
// // // //   try {
// // // //     const session = await auth();
// // // //     const { productId, quantity = 1 } = await req.json();

// // // //     // Validate input
// // // //     if (!productId || typeof quantity !== "number" || quantity < 1) {
// // // //       return NextResponse.json(
// // // //         { error: "Invalid product ID or quantity" },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Get guest session ID
// // // //     const cookies = req.headers.get("cookie") || "";
// // // //     const guestSessionId = cookies
// // // //       .split("; ")
// // // //       .find(row => row.startsWith("guest_session_id="))
// // // //       ?.split("=")[1];

// // // //     // Validate authentication
// // // //     if (!session?.user?.id && !guestSessionId) {
// // // //       return NextResponse.json(
// // // //         { error: "Authentication required" },
// // // //         { status: 401 }
// // // //       );
// // // //     }

// // // //     // Handle guest session creation if needed
// // // //     if (guestSessionId && !session?.user?.id) {
// // // //       await db.guestSession.upsert({
// // // //         where: { id: guestSessionId },
// // // //         create: {
// // // //           id: guestSessionId,
// // // //           expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
// // // //         },
// // // //         update: {},
// // // //       });
// // // //     }

// // // //     // Find or create cart
// // // //     let cart = await db.cart.findFirst({
// // // //       where: {
// // // //         OR: [
// // // //           ...(session?.user?.id ? [{ userId: session.user.id }] : []),
// // // //           ...(guestSessionId ? [{ guestSessionId }] : [])
// // // //         ],
// // // //       },
// // // //     });

// // // //     if (!cart) {
// // // //       cart = await db.cart.create({
// // // //         data: {
// // // //           ...(session?.user?.id && { userId: session.user.id }),
// // // //           ...(guestSessionId && { guestSessionId }),
// // // //         },
// // // //       });
// // // //     }

// // // //     // Verify product exists
// // // //     const product = await db.product.findUnique({
// // // //       where: { id: productId },
// // // //     });

// // // //     if (!product) {
// // // //       return NextResponse.json(
// // // //         { error: "Product not found" },
// // // //         { status: 404 }
// // // //       );
// // // //     }

// // // //     // Update or create cart item
// // // //     const existingItem = await db.cartItem.findFirst({
// // // //       where: { cartId: cart.id, productId },
// // // //     });

// // // //     if (existingItem) {
// // // //       await db.cartItem.update({
// // // //         where: { id: existingItem.id },
// // // //         data: {
// // // //           quantity: existingItem.quantity + quantity,
// // // //           originalPrice: product.price,
// // // //           discountPrice: product.discountPrice,
// // // //         },
// // // //       });
// // // //     } else {
// // // //       await db.cartItem.create({
// // // //         data: {
// // // //           cartId: cart.id,
// // // //           productId,
// // // //           quantity,
// // // //           originalPrice: product.price,
// // // //           discountPrice: product.discountPrice,
// // // //         },
// // // //       });
// // // //     }

// // // //     // Return updated cart
// // // //     const updatedCart = await db.cart.findUnique({
// // // //       where: { id: cart.id },
// // // //       include: { items: { include: { product: true } } },
// // // //     });

// // // //     return NextResponse.json(updatedCart);

// // // //   } catch (error: any) {
// // // //     console.error("CART ERROR:", error);
// // // //     return NextResponse.json(
// // // //       { error: "Failed to update cart", details: error.message },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // import { NextResponse } from "next/server";
// // import { auth } from "@/auth";
// // import db from "@/lib/prisma";

// // // Helper function to parse cookies
// // function getCookie(cookies: string, name: string): string | null {
// //   const value = `; ${cookies}`;
// //   const parts = value.split(`; ${name}=`);
// //   if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
// //   return null;
// // }

// // export async function POST(req: Request) {
// //   const session = await auth();
// //   const { productId, quantity } = await req.json();

// //   // Get cookies from headers
// //   const cookieHeader = req.headers.get("cookie") || "";
// //   const guestSessionId = getCookie(cookieHeader, "guest_session_id");

// //   try {
// //     // Validate product exists and get current price
// //     const product = await db.product.findUnique({
// //       where: { id: productId },
// //       select: {
// //         price: true,
// //         discountPrice: true,
// //       },
// //     });

// //     if (!product) {
// //       return NextResponse.json({ error: "Product not found" }, { status: 404 });
// //     }

// //     // Find or create cart
// //     let cart = await db.cart.findFirst({
// //       where: {
// //         OR: [
// //           { userId: session?.user?.id },
// //           { guestSessionId: guestSessionId || undefined }, // Proper null handling
// //         ],
// //       },
// //     });

// //     if (!cart) {
// //       cart = await db.cart.create({
// //         data: {
// //           ...(session?.user?.id ? { userId: session.user.id } : {}),
// //           ...(guestSessionId ? { guestSessionId } : {}),
// //         },
// //       });
// //     }

// //     // Handle cart item creation/update
// //     const existingItem = await db.cartItem.findFirst({
// //       where: {
// //         cartId: cart.id,
// //         productId,
// //       },
// //     });

// //     if (existingItem) {
// //       await db.cartItem.update({
// //         where: { id: existingItem.id },
// //         data: {
// //           quantity: existingItem.quantity + quantity,
// //           // Update prices if they changed
// //           originalPrice: product.price,
// //           discountPrice: product.discountPrice,
// //         },
// //       });
// //     } else {
// //       await db.cartItem.create({
// //         data: {
// //           cartId: cart.id,
// //           productId,
// //           quantity,
// //           originalPrice: product.price,
// //           discountPrice: product.discountPrice,
// //         },
// //       });
// //     }

// //     return NextResponse.json({ success: true }, { status: 200 });
// //   } catch (error) {
// //     console.error("Cart error:", error);
// //     return NextResponse.json(
// //       { error: "Failed to add to cart" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // import { NextResponse } from "next/server";
// // // import { auth } from "@/auth";
// // // import db from "@/lib/prisma";

// // // export async function POST(req: Request) {
// // //   try {
// // //     const session = await auth();
// // //     const { productId, quantity = 1 } = await req.json();

// // //     // Validate input
// // //     if (!productId || typeof quantity !== "number" || quantity < 1) {
// // //       return NextResponse.json(
// // //         { error: "Invalid product ID or quantity" },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Get guest session ID
// // //     const cookies = req.headers.get("cookie") || "";
// // //     const guestSessionId = cookies
// // //       .split("; ")
// // //       .find((row) => row.startsWith("guest_session_id="))
// // //       ?.split("=")[1];

// // //     // Validate authentication
// // //     if (!session?.user?.id && !guestSessionId) {
// // //       return NextResponse.json(
// // //         { error: "Authentication required" },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Handle guest session creation if needed
// // //     if (guestSessionId && !session?.user?.id) {
// // //       await db.guestSession.upsert({
// // //         where: { id: guestSessionId },
// // //         create: {
// // //           id: guestSessionId,
// // //           expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
// // //         },
// // //         update: {},
// // //       });
// // //     }

// // //     // Find or create cart
// // //     let cart = await db.cart.findFirst({
// // //       where: {
// // //         OR: [
// // //           ...(session?.user?.id ? [{ userId: session.user.id }] : []),
// // //           ...(guestSessionId ? [{ guestSessionId }] : []),
// // //         ],
// // //       },
// // //     });

// // //     if (!cart) {
// // //       cart = await db.cart.create({
// // //         data: {
// // //           ...(session?.user?.id && { userId: session.user.id }),
// // //           ...(guestSessionId && { guestSessionId }),
// // //         },
// // //       });
// // //     }

// // //     // Verify product exists
// // //     const product = await db.product.findUnique({
// // //       where: { id: productId },
// // //     });

// // //     if (!product) {
// // //       return NextResponse.json({ error: "Product not found" }, { status: 404 });
// // //     }

// // //     // Update or create cart item
// // //     const existingItem = await db.cartItem.findFirst({
// // //       where: { cartId: cart.id, productId },
// // //     });

// // //     if (existingItem) {
// // //       await db.cartItem.update({
// // //         where: { id: existingItem.id },
// // //         data: {
// // //           quantity: existingItem.quantity + quantity,
// // //           originalPrice: product.price,
// // //           discountPrice: product.discountPrice,
// // //         },
// // //       });
// // //     } else {
// // //       await db.cartItem.create({
// // //         data: {
// // //           cartId: cart.id,
// // //           productId,
// // //           quantity,
// // //           originalPrice: product.price,
// // //           discountPrice: product.discountPrice,
// // //         },
// // //       });
// // //     }

// // //     // Return updated cart
// // //     const updatedCart = await db.cart.findUnique({
// // //       where: { id: cart.id },
// // //       include: { items: { include: { product: true } } },
// // //     });

// // //     return NextResponse.json(updatedCart);
// // //   } catch (error: any) {
// // //     console.error("CART ERROR:", error);
// // //     return NextResponse.json(
// // //       { error: "Failed to update cart", details: error.message },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import { db } from "../../../../lib/db";

// export async function POST(req: Request) {
//   try {
//     const session = await auth();
//     const { productId, quantity = 1 } = await req.json();

//     // Validate input
//     if (!productId || typeof quantity !== "number" || quantity < 1) {
//       return NextResponse.json(
//         { error: "Invalid product ID or quantity" },
//         { status: 400 }
//       );
//     }

//     // Get guest session ID
//     const cookies = req.headers.get("cookie") || "";
//     const guestSessionId = cookies
//       .split("; ")
//       .find(row => row.startsWith("guest_session_id="))
//       ?.split("=")[1];

//     // Validate authentication
//     if (!session?.user?.id && !guestSessionId) {
//       return NextResponse.json(
//         { error: "Authentication required" },
//         { status: 401 }
//       );
//     }

//     // Handle guest session creation if needed
//     if (guestSessionId && !session?.user?.id) {
//       await db.guestSession.upsert({
//         where: { id: guestSessionId },
//         create: {
//           id: guestSessionId,
//           expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
//         },
//         update: {},
//       });
//     }

//     // Find or create cart
//     let cart = await db.cart.findFirst({
//       where: {
//         OR: [
//           ...(session?.user?.id ? [{ userId: session.user.id }] : []),
//           ...(guestSessionId ? [{ guestSessionId }] : [])
//         ],
//       },
//     });

//     if (!cart) {
//       cart = await db.cart.create({
//         data: {
//           ...(session?.user?.id && { userId: session.user.id }),
//           ...(guestSessionId && { guestSessionId }),
//         },
//       });
//     }

//     // Verify product exists
//     const product = await db.product.findUnique({
//       where: { id: productId },
//     });

//     if (!product) {
//       return NextResponse.json(
//         { error: "Product not found" },
//         { status: 404 }
//       );
//     }

//     // Update or create cart item
//     const existingItem = await db.cartItem.findFirst({
//       where: { cartId: cart.id, productId },
//     });

//     if (existingItem) {
//       await db.cartItem.update({
//         where: { id: existingItem.id },
//         data: {
//           quantity: existingItem.quantity + quantity,
//           originalPrice: product.price,
//           discountPrice: product.discountPrice,
//         },
//       });
//     } else {
//       await db.cartItem.create({
//         data: {
//           cartId: cart.id,
//           productId,
//           quantity,
//           originalPrice: product.price,
//           discountPrice: product.discountPrice,
//         },
//       });
//     }

//     // Return updated cart
//     const updatedCart = await db.cart.findUnique({
//       where: { id: cart.id },
//       include: { items: { include: { product: true } } },
//     });

//     return NextResponse.json(updatedCart);

//   } catch (error: any) {
//     console.error("CART ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to update cart", details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { productId, quantity = 1 } = await req.json();

    // Validate input
    if (!productId || typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid product ID or quantity" },
        { status: 400 }
      );
    }

    // Get guest session ID
    const cookies = req.headers.get("cookie") || "";
    const guestSessionId = cookies
      .split("; ")
      .find((row) => row.startsWith("guest_session_id="))
      ?.split("=")[1];

    // Validate authentication
    if (!session?.user?.id && !guestSessionId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Handle guest session creation if needed (only for guests)
    if (guestSessionId && !session?.user?.id) {
      await db.guestSession.upsert({
        where: { id: guestSessionId },
        create: {
          id: guestSessionId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
        update: {},
      });
    }

    // Find existing cart - prioritize user cart over guest cart
    let cart = null;

    if (session?.user?.id) {
      // First try to find user cart
      cart = await db.cart.findFirst({
        where: { userId: session.user.id },
      });
    }

    // If no user cart found, try guest cart (but only if user is not authenticated)
    if (!cart && guestSessionId && !session?.user?.id) {
      cart = await db.cart.findFirst({
        where: { guestSessionId },
      });
    }

    // Create cart if it doesn't exist
    if (!cart) {
      const cartData: any = {};

      if (session?.user?.id) {
        cartData.userId = session.user.id;
      } else if (guestSessionId) {
        cartData.guestSessionId = guestSessionId;
      }

      cart = await db.cart.create({
        data: cartData,
      });
    }

    // Verify product exists
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update or create cart item
    const existingItem = await db.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          originalPrice: product.price,
          discountPrice: product.discountPrice,
        },
      });
    } else {
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          originalPrice: product.price,
          discountPrice: product.discountPrice,
        },
      });
    }

    // Return updated cart
    const updatedCart = await db.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(updatedCart);
  } catch (error: any) {
    console.error("CART ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update cart", details: error.message },
      { status: 500 }
    );
  }
}
