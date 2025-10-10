/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const originCountryId = searchParams.get("originCountryId");
    const destCountryId = searchParams.get("destCountryId");

    if (!originCountryId || !destCountryId) {
      return NextResponse.json(
        { error: "Missing originCountryId or destCountryId" },
        { status: 400 }
      );
    }

    // Get pricing rules for this route
    const pricing = await db.shippingPricing.findFirst({
      where: {
        originCountryId: parseInt(originCountryId),
        destCountryId: parseInt(destCountryId),
        isActive: true,
      },
      include: {
        extraCharges: {
          where: { isActive: true },
        },
      },
    });

    if (!pricing) {
      return NextResponse.json(
        { error: "No pricing found for this route" },
        { status: 404 }
      );
    }

    // Return the pricing rules (not calculated cost)
    return NextResponse.json({
      pricing: {
        tier1Price: pricing.tier1Price,
        tier2Price: pricing.tier2Price,
        tier3Price: pricing.tier3Price,
        tier4Price: pricing.tier4Price,
        tier5Price: pricing.tier5Price,
        currency: pricing.currency,
        extraCharges: pricing.extraCharges.map((charge) => ({
          ruleType: charge.ruleType,
          conditionValue: charge.conditionValue,
          conditionValue2: charge.conditionValue2,
          chargeAmount: charge.chargeAmount,
          currency: charge.currency,
        })),
      },
    });
  } catch (error) {
    console.error("[SHIPPING_CALCULATE_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { originCountryId, destCountryId, packages, items } = body;

    // Get pricing for this route
    const pricing = await db.shippingPricing.findFirst({
      where: {
        originCountryId: parseInt(originCountryId),
        destCountryId: parseInt(destCountryId),
        isActive: true,
      },
      include: {
        extraCharges: {
          where: { isActive: true },
        },
      },
    });

    if (!pricing) {
      return NextResponse.json(
        { error: "No pricing found for this route" },
        { status: 404 }
      );
    }

    // Calculate total weight
    const totalWeight = packages.reduce(
      (sum: number, pkg: any) => sum + pkg.weight,
      0
    );

    // Calculate base cost
    let baseCost = 0;
    if (totalWeight <= 1) baseCost = pricing.tier1Price;
    else if (totalWeight <= 10) baseCost = pricing.tier2Price;
    else if (totalWeight <= 15) baseCost = pricing.tier3Price;
    else if (totalWeight <= 20) baseCost = pricing.tier4Price;
    else
      baseCost = pricing.tier4Price + (totalWeight - 20) * pricing.tier5Price;

    // Calculate extra charges
    let extraCharges = 0;
    const totalValue = items.reduce(
      (sum: number, item: any) => sum + item.value * item.quantity,
      0
    );

    for (const rule of pricing.extraCharges) {
      switch (rule.ruleType) {
        case "TOTAL_WEIGHT_VALUE":
          if (
            totalWeight < (rule.conditionValue || 0) &&
            totalValue > (rule.conditionValue2 || 0)
          ) {
            extraCharges += rule.chargeAmount;
          }
          break;
        case "DIMENSION_THRESHOLD":
          const hasOversized = packages.some(
            (pkg: any) =>
              pkg.dimensions.length > (rule.conditionValue || 0) ||
              pkg.dimensions.width > (rule.conditionValue || 0) ||
              pkg.dimensions.height > (rule.conditionValue || 0)
          );
          if (hasOversized) extraCharges += rule.chargeAmount;
          break;
        case "PACKAGE_WEIGHT":
          const hasHeavyPackage = packages.some(
            (pkg: any) => pkg.weight > (rule.conditionValue || 0)
          );
          if (hasHeavyPackage) extraCharges += rule.chargeAmount;
          break;
      }
    }

    const totalCost = baseCost + extraCharges;

    return NextResponse.json({
      baseCost,
      extraCharges,
      totalCost,
      currency: pricing.currency,
      totalWeight,
      totalValue,
      requiresDocs: pricing.originDocsRequired || pricing.destDocsRequired,
      breakdown: {
        baseCost,
        extraCharges,
        totalCost,
      },
    });
  } catch (error) {
    console.error("[SHIPPING_CALCULATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
