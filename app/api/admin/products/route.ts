import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../lib/db";
// import { Role } from "@prisma/client";

// GET /api/admin/users
export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      isOnSale: true,
      updatedAt: true,
      isAvailable: true,
      //   category: true,
      categoryId: true,
      category: {
        select: { id: true, name: true }, // Assuming you want category name and ID
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// PATCH /api/admin/users
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();

  if (Array.isArray(body)) {
    // Batch update
    const updates = body;

    try {
      await db.$transaction(
        updates.map(({ productId, categoryId }) =>
          db.product.update({
            where: { id: productId },
            data: { categoryId },
          })
        )
      );
      return NextResponse.json({ message: "Users updated successfully" });
    } catch (error) {
      console.error("Batch update error:", error);
      return NextResponse.json(
        { error: "Batch update failed" },
        { status: 500 }
      );
    }
  }

  // Single update (fallback)
  const { userId, role, productId, categoryId } = body;
  if (!userId || !role) {
    return NextResponse.json(
      { error: "Missing userId or role" },
      { status: 400 }
    );
  }

  if (role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const updatedProduct = await db.product.update({
    where: { id: productId },
    data: { categoryId },
  });

  return NextResponse.json(updatedProduct);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: "Missing required fields (name, price, categoryId)" },
        { status: 400 }
      );
    }

    // Create the product
    const newProduct = await db.product.create({
      data: {
        name: body.name,
        price: parseFloat(body.price),
        description: body.description || "",
        stock: parseInt(body.stock) || 0,
        isOnSale: body.isOnSale || false,
        discountPrice: body.discountPrice ? parseFloat(body.discountPrice) : null,
        isAvailable: body.isAvailable !== false, // default to true
        categoryId: body.categoryId,
        weight: body.weight ? parseFloat(body.weight) : null,
        dimensions: body.dimensions || null,
        sku: body.sku || null,
        saleEndsAt: body.saleEndsAt || null,
        images: body.images || [],
        features: body.features || null,
        mainImage: body.mainImage || null,
        serviceType: body.serviceType || null
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}