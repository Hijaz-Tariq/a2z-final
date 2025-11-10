// app/api/warehouses/route.ts
import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const warehouses = await db.warehouse.findMany({
      where: { status: "ENABLED" },
      include: {
        address: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(warehouses);
  } catch (error) {
    console.log("[WAREHOUSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}