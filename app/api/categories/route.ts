// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export const dynamic = "force-dynamic"; // Ensure fresh data

// export async function GET() {
//   try {
//     const categories = await db.category.findMany({
//       orderBy: {
//         updatedAt: "desc",
//       },
//       take: 100, // Limit for safety
//     });

//     return NextResponse.json(categories, { status: 200 });
//   } catch (error) {
//     console.error("[CATEGORIES_ERROR]", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: 'desc', // Alphabetical descending (Z → A)
      },
      take: 100,
    });

    const specialCards = await db.specialCard.findMany({
      orderBy: {
        name: 'desc' // Optional: sort special cards Z→A if needed
      }
    });

    // Combine with special cards first
    return NextResponse.json({
      special: specialCards,
      categories: categories
    });

  } catch (error) {
    console.error("[CATEGORIES_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}