// /*
//  **An array of routes that are accessible to the public
//  **these routes dont require authentication
//  ** @type {string[]}
//  */

// export const publicRoutes = ["/", "/auth/new-verification"];

// /*
//  **An array of routes that are used for authentication
//  **these routes will redirect logged in users to /settings
//  ** @type {string[]}
//  */
// export const authRoutes = [
//   "/auth/login",
//   "/auth/register",
//   "/auth/error",
//   "/auth/reset",
//   "/auth/new-password",
// ];

// /*
//  **The prefix for API authentication routes
//  **Routes that start with these prefix are used for API authentication purposes
//  ** @type {string}
//  */

// export const apiAuthPrefix = "/api/auth";

// /**
//  * The default redirect path after logging in
//  * @type {string}
//  */
// export const DEFAULT_LOGIN_REDIRECT = "/settings";


export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/settings",
  "/store",
  "/newParcel",
  "/store/categories", // Add this
  "/store/categories/(.*)", // This covers all sub-routes like /store/categories/electronics
];

/*
 **An array of routes that are used for authentication
 **these routes will redirect logged in users to /settings
 ** @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/*
 **The prefix for API authentication routes
 **Routes that start with these prefix are used for API authentication purposes
 ** @type {string}
 */

export const apiAuthPrefix = "/api/auth";
export const apiStorePrefix = [
  // "/api/products",
  // "/api/categories",
  // "/api/bestrates",
  "/api/products",
  "/api/categories",
  "/api/bestrates",
  "/store",
  "/api/cart",
  "/api/cart/items",
  "/api/pickup",
];
/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

import { db } from "./lib/db";
export async function validateCartPrices(userId: string) {
  const cart = await db.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  for (const item of cart!.items) {
    const currentProduct = await db.product.findUnique({
      where: { id: item.productId },
      select: { price: true, discountPrice: true },
    });

    if (Number(currentProduct!.price) !== Number(item.originalPrice)) {
      await db.cartItem.update({
        where: { id: item.id },
        data: { originalPrice: currentProduct!.price },
      });
    }

    if (currentProduct!.discountPrice !== item.discountPrice) {
      await db.cartItem.update({
        where: { id: item.id },
        data: { discountPrice: currentProduct!.discountPrice },
      });
    }
  }
}