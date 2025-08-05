import { db } from '../db';
import type { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// Helper function to safely convert to Decimal
const toDecimal = (value: unknown): Decimal => {
  try {
    if (value instanceof Decimal) return value;
    if (typeof value === 'number') return new Decimal(value.toString());
    if (typeof value === 'string') return new Decimal(value);
    return new Decimal(0);
  } catch (error) {
    console.error('Decimal conversion error:', error);
    return new Decimal(0);
  }
};

interface CartItemWithProduct {
  id: string;
  productId: string;
  quantity: number;
  originalPrice: unknown;
  discountPrice: unknown;
  product: {
    price: unknown;
    discountPrice: unknown;
  };
}

// interface WishlistItemWithProduct {
//   id: string;
//   productId: string;
//   originalPrice: unknown;
//   discountPrice: unknown;
//   product: {
//     price: unknown;
//     discountPrice: unknown;
//   };
// }

export async function migrateGuestData(userId: string, guestSessionId: string): Promise<void> {
  try {
    await db.$transaction(async (prisma) => {
      // 1. Find guest session by sessionId
      const guestSession = await prisma.guestSession.findFirst({
        where: { sessionToken: guestSessionId },
        select: { id: true }
      });

      if (!guestSession) {
        console.warn(`No guest session found for: ${guestSessionId}`);
        return;
      }

      // 2. Migrate cart and wishlist
      await migrateCart(prisma, userId, guestSession.id);
      await migrateWishlist(prisma, userId, guestSession.id);

      // 3. Clean up guest session
      await prisma.guestSession.delete({
        where: { id: guestSession.id }
      });
    });
  } catch (error) {
    console.error('Migration failed:', error);
    throw new Error('Failed to migrate guest data');
  }
}

async function migrateCart(
  prisma: Prisma.TransactionClient,
  userId: string,
  guestSessionId: string
): Promise<void> {
  const [userCart, guestCart] = await Promise.all([
    prisma.cart.findUnique({ where: { userId } }),
    prisma.cart.findUnique({
      where: { guestSessionId },
      include: {
        items: {
          include: {
            product: {
              select: {
                price: true,
                discountPrice: true
              }
            }
          }
        }
      }
    })
  ]);

  if (!guestCart) {
    console.warn(`No cart found for guest session: ${guestSessionId}`);
    return;
  }

  // Process each cart item
  await Promise.all(guestCart.items.map(async (item: CartItemWithProduct) => {
    const originalPrice = toDecimal(item.originalPrice);
    const discountPrice = item.discountPrice ? toDecimal(item.discountPrice) : null;

    if (!userCart) return;

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: item.productId
      }
    });

    const itemData = {
      productId: item.productId,
      quantity: item.quantity,
      originalPrice,
      discountPrice
    };

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + item.quantity,
          originalPrice,
          discountPrice
        }
      });
    } else {
      return prisma.cartItem.create({
        data: {
          ...itemData,
          cartId: userCart.id
        }
      });
    }
  }));

  // Update or delete the guest cart
  if (userCart) {
    await prisma.cart.delete({ where: { id: guestCart.id } });
  } else {
    await prisma.cart.update({
      where: { id: guestCart.id },
      data: {
        userId,
        guestSessionId: null
      }
    });
  }
}

// async function migrateWishlist(
//   prisma: Prisma.TransactionClient,
//   userId: string,
//   guestSessionId: string
// ): Promise<void> {
//   const [userWishlist, guestWishlist] = await Promise.all([
//     prisma.wishlist.findUnique({
//       where: { userId },
//       include: { items: true }
//     }),
//     prisma.wishlist.findUnique({
//       where: { guestSessionId },
//       include: {
//         items: {
//           include: {
//             product: {
//               select: {
//                 price: true,
//                 discountPrice: true
//               }
//             }
//           }
//         }
//       }
//     })
//   ]);

//   if (!guestWishlist) {
//     console.warn(`No wishlist found for guest session: ${guestSessionId}`);
//     return;
//   }

//   // Prepare wishlist items with proper prices
//   const itemsToMigrate = guestWishlist.items.map((item: WishlistItemWithProduct) => ({
//     productId: item.productId,
//     originalPrice: toDecimal(item.originalPrice),
//     discountPrice: item.discountPrice ? toDecimal(item.discountPrice) : null
//   }));

//   if (userWishlist) {
//     // Filter out duplicates
//     const existingProductIds = new Set(
//       userWishlist.items.map(item => item.productId)
//     );
//     const newItems = itemsToMigrate.filter(
//       item => !existingProductIds.has(item.productId)
//     );

//     // Create new items
//     if (newItems.length > 0) {
//       await prisma.wishlistItem.createMany({
//         data: newItems.map(item => ({
//           ...item,
//           wishlistId: userWishlist.id
//         }))
//       });
//     }

//     // Delete guest wishlist
//     await prisma.wishlist.delete({
//       where: { id: guestWishlist.id }
//     });
//   } else {
//     // Transfer ownership
//     await prisma.wishlist.update({
//       where: { id: guestWishlist.id },
//       data: {
//         userId,
//         guestSessionId: null,
//         items: {
//           updateMany: {
//             where: {},
//             data: {
//               originalPrice: toDecimal(guestWishlist.items[0]?.originalPrice),
//               discountPrice: guestWishlist.items[0]?.discountPrice
//                 ? toDecimal(guestWishlist.items[0].discountPrice)
//                 : null
//             }
//           }
//         }
//       }
//     });
//   }
// }

async function migrateWishlist(
  prisma: Prisma.TransactionClient,
  userId: string,
  guestSessionId: string
): Promise<void> {
  // First get current product prices for all items
  const guestWishlist = await prisma.wishlist.findUnique({
    where: { guestSessionId },
    include: {
      items: {
        select: {
          id: true,
          productId: true,
          originalPrice: true,
          discountPrice: true
        }
      }
    }
  });

  const userWishlist = await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        select: {
          productId: true
        }
      }
    }
  });

  if (!guestWishlist) {
    console.warn(`No wishlist found for guest session: ${guestSessionId}`);
    return;
  }

  // Get current product prices for migration
  const productPrices = await prisma.product.findMany({
    where: {
      id: { in: guestWishlist.items.map(i => i.productId) }
    },
    select: {
      id: true,
      price: true,
      discountPrice: true
    }
  });

  const priceMap = new Map(
    productPrices.map(p => [p.id, {
      currentPrice: toDecimal(p.price),
      currentDiscount: p.discountPrice ? toDecimal(p.discountPrice) : null
    }])
  );

  // Prepare items for migration
  const itemsToMigrate = guestWishlist.items.map(item => ({
    productId: item.productId,
    // Use original price if it exists, otherwise current price
    originalPrice: item.originalPrice ? toDecimal(item.originalPrice) : priceMap.get(item.productId)?.currentPrice || new Decimal(0),
    // Use original discount if it exists, otherwise current discount
    discountPrice: item.discountPrice ? toDecimal(item.discountPrice) : priceMap.get(item.productId)?.currentDiscount || null
  }));

  // Filter out duplicates if user already has items
  const existingProductIds = new Set(
    userWishlist?.items.map(i => i.productId) || []
  );

  const newItems = itemsToMigrate.filter(
    item => !existingProductIds.has(item.productId)
  );

  // Perform migration
  if (userWishlist && newItems.length > 0) {
    await prisma.wishlistItem.createMany({
      data: newItems.map(item => ({
        wishlistId: userWishlist.id,
        productId: item.productId,
        originalPrice: item.originalPrice,
        discountPrice: item.discountPrice
      }))
    });
  }

  // Clean up guest wishlist
  if (userWishlist) {
    await prisma.wishlist.delete({
      where: { id: guestWishlist.id }
    });
  } else {
    await prisma.wishlist.update({
      where: { id: guestWishlist.id },
      data: {
        userId,
        guestSessionId: null,
        items: {
          updateMany: {
            where: {},
            data: {
              originalPrice: priceMap.get(guestWishlist.items[0]?.productId)?.currentPrice,
              discountPrice: priceMap.get(guestWishlist.items[0]?.productId)?.currentDiscount
            }
          }
        }
      }
    });
  }
}