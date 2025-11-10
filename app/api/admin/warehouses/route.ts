// app/api/admin/warehouses/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db"; // adjust path if needed
import { auth } from "@/auth";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const warehouses = await db.warehouse.findMany({
      include: {
        address: true,
        agent: {
          include: { user: { select: { name: true, email: true } } },
        },
        outboundPickups: {
          select: {
            id: true,
            status: true,
            scheduledDate: true,
            pickupContact: {
              // ✅ for inbound senders
              select: { name: true, phone: true },
            },
            deliveryContact: {
              // ✅ for inbound recipients (if any)
              select: { name: true, phone: true },
            },
          },
        },
        inboundPickups: {
          select: {
            id: true,
            status: true,
            scheduledDate: true,
            pickupContact: {
              // ✅ for inbound senders
              select: { name: true, phone: true },
            },
            deliveryContact: {
              // ✅ for inbound recipients (if any)
              select: { name: true, phone: true },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(warehouses);
  } catch (error) {
    console.error("[WAREHOUSES_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, address, agentId, status = "ENABLED" } = body;

    if (!name || !address) {
      return NextResponse.json(
        { error: "Name and address are required" },
        { status: 400 }
      );
    }
    if (!agentId) {
      return NextResponse.json(
        { error: "agentId is required" },
        { status: 400 }
      );
    }
    if (
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      return NextResponse.json(
        { error: "Address line1, city, state, and postalCode are required" },
        { status: 400 }
      );
    }

    const agentExists = await db.agentProfile.findUnique({
      where: { id: agentId },
    });
    if (!agentExists) {
      return NextResponse.json(
        { error: "Invalid agentId: Agent not found" },
        { status: 400 }
      );
    }

    const existingWarehouse = await db.warehouse.findFirst({
      where: { name: name.trim() },
    });
    if (existingWarehouse) {
      return NextResponse.json(
        { error: "Warehouse with this name already exists" },
        { status: 409 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      const createdAddress = await tx.address.create({
        data: {
          line1: address.line1,
          line2: address.line2 || "",
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country || "US",
          coordinates: address.coordinates || null,
        },
      });

      return await tx.warehouse.create({
        data: {
          name: name.trim(),
          addressId: createdAddress.id,
          agentId,
          status,
        },
        include: {
          address: true,
          agent: { include: { user: { select: { name: true } } } },
        },
      });
    });

    return NextResponse.json(result, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[WAREHOUSES_POST]", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Warehouse name already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
