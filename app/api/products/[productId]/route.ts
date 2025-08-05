// src/app/api/products/[productId]/route.ts
import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // Adjust to your DB client

interface Context {
  params: Promise<{ productId: string }>;
}
export async function GET(
  request: Request,
  // { params }: { params: { productId: string } }
  context: Context
) {
  try {
    const { productId } = await context.params;
    // Validate productId format if needed
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
