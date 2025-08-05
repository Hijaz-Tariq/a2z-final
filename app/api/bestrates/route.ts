import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export const dynamic = 'force-dynamic'; // Ensure fresh data

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        ratings: true,
        orderItems: true,
        category: true
      },
      take: 100 // Limit for safety
    });

    const bestsellers = products
      .map(product => ({
        ...product,
        ratingsCount: product.ratings.length,
        averageRating: product.ratings.length 
          ? product.ratings.reduce((sum, r) => sum + r.value, 0) / product.ratings.length
          : 0,
        salesCount: product.orderItems.reduce((sum, item) => sum + item.quantity, 0)
      }))
      .sort((a, b) => b.salesCount - a.salesCount || b.averageRating - a.averageRating)
      .slice(0, 3);

    return NextResponse.json(bestsellers, { status: 200 });

  } catch (error) {
    console.error('[BESTSELLERS_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}