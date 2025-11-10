// app/api/admin/warehouses/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

// Optional: get single warehouse
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const warehouse = await db.warehouse.findUnique({
      where: { id },
      include: {
        address: true,
        agent: { include: { user: { select: { name: true, email: true } } } },
        outboundPickups: {
          select: {
            id: true,
            status: true,
            scheduledDate: true,
            deliveryContact: {
              select: {
                name: true,
                phone: true,
              },
            },
            pickupContact: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
        inboundPickups: {
          select: {
            id: true,
            status: true,
            scheduledDate: true,
            pickupContact: {
              select: {
                name: true,
                phone: true,
              },
            },
             deliveryContact: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!warehouse) {
      return NextResponse.json(
        { error: "Warehouse not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(warehouse);
  } catch (error) {
    console.error("[WAREHOUSE_GET_SINGLE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update warehouse
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, address, agentId, status } = body;

    const existingWarehouse = await db.warehouse.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!existingWarehouse) {
      return NextResponse.json(
        { error: "Warehouse not found" },
        { status: 404 }
      );
    }

    // Check name uniqueness if changing
    if (name && name.trim() !== existingWarehouse.name) {
      const nameExists = await db.warehouse.findFirst({
        where: { name: name.trim(), id: { not: id } },
      });
      if (nameExists) {
        return NextResponse.json(
          { error: "Warehouse name already exists" },
          { status: 409 }
        );
      }
    }

    const result = await db.$transaction(async (tx) => {
      // Update address if provided
      if (address) {
        await tx.address.update({
          where: { id: existingWarehouse.addressId },
          data: {
            line1: address.line1 || existingWarehouse.address.line1,
            line2:
              address.line2 !== undefined
                ? address.line2
                : existingWarehouse.address.line2,
            city: address.city || existingWarehouse.address.city,
            state: address.state || existingWarehouse.address.state,
            postalCode:
              address.postalCode || existingWarehouse.address.postalCode,
            country: address.country || existingWarehouse.address.country,
            coordinates:
              address.coordinates !== undefined
                ? address.coordinates
                : existingWarehouse.address.coordinates,
          },
        });
      }

      // Update warehouse
      return await tx.warehouse.update({
        where: { id },
        data: {
          ...(name && { name: name.trim() }),
          ...(agentId !== undefined && { agentId }),
          ...(status && { status }),
        },
        include: {
          address: true,
          agent: { include: { user: { select: { name: true } } } },
          outboundPickups: {
            select: { id: true, status: true, scheduledDate: true },
          },
          inboundPickups: {
            select: { id: true, status: true, scheduledDate: true },
          },
        },
      });
    });

    return NextResponse.json(result);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[WAREHOUSE_PUT]", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Warehouse not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
