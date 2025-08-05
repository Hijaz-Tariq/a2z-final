import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

interface Context {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: Context) {
  try {
    const { slug } = await context.params;

    const category = await db.category.findUnique({
      where: { slug },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORY_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
