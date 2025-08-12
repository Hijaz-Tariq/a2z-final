import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../lib/db";

// GET /api/admin/orders
export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const orders = await db.order.findMany({
      include: {
        items: true,
        user: { select: { name: true, email: true } }, // Adjust based on your relations
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/orders

export async function POST() {
  try {
    // First, get any product from the database
    const product = await db.product.findFirst();
    
    if (!product) {
      return NextResponse.json(
        { error: "No products found in database" },
        { status: 400 }
      );
    }

    // Create test order
    const testOrder = await db.order.create({
      data: {
        status: "PENDING",
        total: 99.99,
        shippingCost: 9.99,
        shippingAddress: {},
        items: {
          create: [{
            productId: product.id,
            quantity: 1,
            originalPrice: "99.99" // Decimal as string
          }]
        }
      },
      include: { items: true }
    });

    return NextResponse.json(testOrder);
    
  } catch (error) {
    console.error('[CREATE_TEST_ORDER]', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}