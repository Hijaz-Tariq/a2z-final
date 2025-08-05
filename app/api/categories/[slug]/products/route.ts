// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// interface Context {
//   params: Promise<{ slug: string }>;
// }

// export const dynamic = "force-dynamic";

// export async function GET(request: Request, context: Context) {
//   try {
//     const { slug } = await context.params;

//     // Check for special categories dynamically
//     const isSpecialCategory =
//       slug === "discounts-offers" || slug === "new-arrivals";

//     if (isSpecialCategory) {
//       const products = await db.product.findMany({
//         where: {
//           isAvailable: true,
//           ...(slug === "discounts-offers" && { isOnSale: true }),
//           ...(slug === "new-arrivals" && {
//             createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
//           }),
//         },
//         select: {
//           id: true,
//           name: true,
//           price: true,
//           discountPrice: true,
//           images: true,
//           isOnSale: true,
//         },
//       });

//       return NextResponse.json({
//         products,
//         categoryName:
//           slug === "discounts-offers" ? "Discounts & Offers" : "New Arrivals",
//       });
//     }

//     // Regular category flow
//     const category = await db.category.findUnique({ where: { slug } });
//     if (!category) {
//       return NextResponse.json(
//         { error: "Category not found" },
//         { status: 404 }
//       );
//     }

//     const products = await db.product.findMany({
//       where: { categoryId: category.id, isAvailable: true },
//       select: {
//         id: true,
//         name: true,
//         price: true,
//         discountPrice: true,
//         images: true,
//         isOnSale: true,
//       },
//     });

//     return NextResponse.json({ products, categoryName: category.name });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

interface Context {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: Context) {
  try {
    const { slug } = await context.params;

    // Check for special categories dynamically
    const isSpecialCategory =
      slug === "discounts-offers" || slug === "new-arrivals";

    if (isSpecialCategory) {
      const products = await db.product.findMany({
        where: {
          isAvailable: true,
          ...(slug === "discounts-offers" && { isOnSale: true }),
          ...(slug === "new-arrivals" && {
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          }),
        },
        orderBy: { updatedAt: "desc" }, // ← Added sorting here
        select: {
          id: true,
          name: true,
          price: true,
          discountPrice: true,
          images: true,
          isOnSale: true,
          updatedAt: true, // ← Make sure to include updatedAt in the response if needed
        },
      });

      return NextResponse.json({
        products,
        categoryName:
          slug === "discounts-offers" ? "Discounts & Offers" : "New Arrivals",
      });
    }

    // Regular category flow
    const category = await db.category.findUnique({ where: { slug } });
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const products = await db.product.findMany({
      where: { categoryId: category.id, isAvailable: true },
      orderBy: { updatedAt: "desc" }, // ← Added sorting here
      select: {
        id: true,
        name: true,
        price: true,
        discountPrice: true,
        images: true,
        isOnSale: true,
        updatedAt: true, // ← Make sure to include updatedAt in the response if needed
      },
    });

    return NextResponse.json({ products, categoryName: category.name });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
