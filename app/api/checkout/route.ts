import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '../../../lib/db';
import type { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { 
      email,
      shippingAddress = {},
      shippingCost = 0,
      brokerId,
      guestId 
    } = await req.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' }, 
        { status: 400 }
      );
    }

    // Parse cookies manually for guest sessions
    const cookieHeader = req.headers.get('cookie') || '';
    const guestSessionId = cookieHeader
      .split(';')
      .find(c => c.trim().startsWith('guest_session_id='))
      ?.split('=')[1];

    // Get cart with proper typing
    const cart = await db.cart.findFirst({
      where: {
        OR: [
          { userId: session?.user?.id },
          { guestSessionId },
          { guestId }
        ].filter(Boolean) as Prisma.CartWhereInput[]
      },
      include: { 
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals with proper typing
    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.discountPrice ?? item.originalPrice;
      return sum + (Number(price) * item.quantity);
    }, 0);

    const total = subtotal + shippingCost;

    // Prepare order data with all required fields
    const orderData: Prisma.OrderCreateInput = {
      status: 'PENDING',
      total,
      shippingCost,
      shippingAddress,
      ...(session?.user?.id && {
        user: { connect: { id: session.user.id } }
      }),
      ...(guestId && {
        guest: { connect: { id: guestId } }
      }),
      ...(guestSessionId && {
        guestSession: { connect: { id: guestSessionId } }
      }),
      ...(brokerId && {
        broker: { connect: { id: brokerId } }
      }),
      items: {
        create: cart.items.map(item => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          originalPrice: item.originalPrice,
          discountPrice: item.discountPrice
        }))
      }
    };

    // Transaction with proper error handling
    const order = await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: orderData,
        include: { items: true }
      });

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return order;
    });

    return NextResponse.json({ 
      order,
      success: true 
    }, { status: 201 });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}