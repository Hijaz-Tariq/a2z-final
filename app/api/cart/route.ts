import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "../../../lib/prisma";

function getCookie(cookies: string, name: string): string | null {
  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const cookies = request.headers.get("cookie") || "";
    const guestSessionId = getCookie(cookies, "guest_session_id");

    if (!session?.user?.id && !guestSessionId) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const cart = await db.cart.findFirst({
      where: {
        OR: [
          { userId: session?.user?.id },
          { guestSessionId }
        ],
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            addedAt: 'desc'
          }
        },
      },
    });

    return NextResponse.json(cart || { items: [] }, { status: 200 });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}