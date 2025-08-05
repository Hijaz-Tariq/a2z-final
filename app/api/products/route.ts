// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const sort = searchParams.get("sort") || "newest";

//   try {
//     const products = await db.product.findMany({
//       orderBy: {
//         [sort === "updated" ? "updatedAt" : "createdAt"]: "desc",
//       },
//       include: {
//         category: true,
//         comments: true,
//         ratings: true,
//       },
//     });

//     return NextResponse.json(products);
//   } catch (error) {
//     // return NextResponse.json(
//     //   { error: "Failed to fetch products" },
//     //   { status: 500 }
//     // );
//     console.log("[PRODUCTS]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }


// product/route.ts
import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort");
  const isForOffersPage = searchParams.get("forOffers") === "true";

  try {
    let products;
    
    if (isForOffersPage) {
      // Special query for offers page (more detailed)
      products = await db.product.findMany({
        where: {
          isOnSale: true,
          OR: [
            { saleEndsAt: null },
            { saleEndsAt: { gt: new Date() } }
          ]
        },
        orderBy: [
          { saleEndsAt: "asc" }, // Soon-to-end first
          { averageRating: "desc" } // Then by rating
        ],
        include: {
          category: true,
          comments: true,
          ratings: true,
        },
      });
    } else if (sort === "updated") {
      // Existing updated products query
      products = await db.product.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          category: true,
          comments: true,
          ratings: true,
        },
      });
    } else if (sort === "newest") {
      // Existing newest products query
      products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
          comments: true,
          ratings: true,
        },
      });
    } else {
      // Default query (no sorting specified)
      products = await db.product.findMany({
        include: {
          category: true,
          comments: true,
          ratings: true,
        },
      });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}