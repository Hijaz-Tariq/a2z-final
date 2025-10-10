import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const pricing = await db.shippingPricing.findUnique({
      where: { id },
      include: {
        originCountry: true,
        destCountry: true,
        extraCharges: true,
      },
    });

    if (!pricing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(pricing);
  } catch (error) {
    console.error("[SHIPPING_PRICING_GET_ONE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = await context.params;

    await db.$transaction(async (tx) => {
      // Update main pricing
      const updatedPricing = await tx.shippingPricing.update({
        where: { id },
        data: {
          originCountryId: body.originCountryId,
          destCountryId: body.destCountryId,
          tier1Price: body.tier1Price,
          tier2Price: body.tier2Price,
          tier3Price: body.tier3Price,
          tier4Price: body.tier4Price,
          tier5Price: body.tier5Price,
          originDocsRequired: body.originDocsRequired,
          destDocsRequired: body.destDocsRequired,
          currency: body.currency,
          isActive: body.isActive,
        },
      });

      // Update extra charges - delete existing and create new
      if (body.extraCharges) {
        // Delete existing rules
        await tx.extraChargeRule.deleteMany({
          where: { pricingId: id },
        });

        const { extraCharges } = body;
        
        // Rule A: Total weight & value
        if (extraCharges.totalWeightThreshold && extraCharges.totalValueThreshold && extraCharges.weightValueCharge) {
          await tx.extraChargeRule.create({
            data: {
              pricingId: id,
              ruleType: "TOTAL_WEIGHT_VALUE",
              conditionValue: extraCharges.totalWeightThreshold,
              conditionValue2: extraCharges.totalValueThreshold,
              chargeAmount: extraCharges.weightValueCharge,
              currency: body.currency || "USD",
            },
          });
        }

        // Rule B: Dimension threshold
        if (extraCharges.dimensionThreshold && extraCharges.dimensionCharge) {
          await tx.extraChargeRule.create({
            data: {
              pricingId: id,
              ruleType: "DIMENSION_THRESHOLD",
              conditionValue: extraCharges.dimensionThreshold,
              chargeAmount: extraCharges.dimensionCharge,
              currency: body.currency || "USD",
            },
          });
        }

        // Rule C: Package weight threshold
        if (extraCharges.packageWeightThreshold && extraCharges.packageWeightCharge) {
          await tx.extraChargeRule.create({
            data: {
              pricingId: id,
              ruleType: "PACKAGE_WEIGHT",
              conditionValue: extraCharges.packageWeightThreshold,
              chargeAmount: extraCharges.packageWeightCharge,
              currency: body.currency || "USD",
            },
          });
        }
      }

      return updatedPricing;
    });

    // Return updated pricing with relations
    const finalPricing = await db.shippingPricing.findUnique({
      where: { id },
      include: {
        originCountry: true,
        destCountry: true,
        extraCharges: true,
      },
    });

    return NextResponse.json(finalPricing);
  } catch (error) {
    console.error("[SHIPPING_PRICING_PATCH]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    // Use transaction to delete related records
    await db.$transaction(async (tx) => {
      // Delete extra charges first
      await tx.extraChargeRule.deleteMany({
        where: { pricingId: id },
      });

      // Delete main pricing
      await tx.shippingPricing.delete({
        where: { id },
      });
    });

    return NextResponse.json({ message: "Pricing deleted successfully" });
  } catch (error) {
    console.error("[SHIPPING_PRICING_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
