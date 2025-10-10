import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pricing = await db.shippingPricing.findMany({
      include: {
        originCountry: true,
        destCountry: true,
        extraCharges: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 100,
    });

    return NextResponse.json(pricing);
  } catch (error) {
    console.error("[SHIPPING_PRICING_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const [originCountry, destCountry] = await Promise.all([
      db.country.findUnique({ where: { id: body.originCountryId } }),
      db.country.findUnique({ where: { id: body.destCountryId } }),
    ]);

    if (!originCountry) {
      return NextResponse.json(
        { error: `Origin country with ID ${body.originCountryId} not found` },
        { status: 400 }
      );
    }

    if (!destCountry) {
      return NextResponse.json(
        {
          error: `Destination country with ID ${body.destCountryId} not found`,
        },
        { status: 400 }
      );
    }

    // Check if pricing already exists for this route
    const existingPricing = await db.shippingPricing.findFirst({
      where: {
        originCountryId: body.originCountryId,
        destCountryId: body.destCountryId,
      },
    });

    if (existingPricing) {
      return NextResponse.json(
        { error: "Pricing already exists for this route" },
        { status: 409 }
      );
    }

    // Start transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
      // Create main pricing
      const pricing = await tx.shippingPricing.create({
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
          currency: body.currency || "USD",
        },
      });

      // Create extra charges if provided
      if (body.extraCharges) {
        const { extraCharges } = body;

        // Rule A: Total weight & value
        if (
          extraCharges.totalWeightThreshold &&
          extraCharges.totalValueThreshold &&
          extraCharges.weightValueCharge
        ) {
          await tx.extraChargeRule.create({
            data: {
              pricingId: pricing.id,
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
              pricingId: pricing.id,
              ruleType: "DIMENSION_THRESHOLD",
              conditionValue: extraCharges.dimensionThreshold,
              chargeAmount: extraCharges.dimensionCharge,
              currency: body.currency || "USD",
            },
          });
        }

        // Rule C: Package weight threshold
        if (
          extraCharges.packageWeightThreshold &&
          extraCharges.packageWeightCharge
        ) {
          await tx.extraChargeRule.create({
            data: {
              pricingId: pricing.id,
              ruleType: "PACKAGE_WEIGHT",
              conditionValue: extraCharges.packageWeightThreshold,
              chargeAmount: extraCharges.packageWeightCharge,
              currency: body.currency || "USD",
            },
          });
        }
      }

      return pricing;
    });

    // Return the created pricing with relations
    const createdPricing = await db.shippingPricing.findUnique({
      where: { id: result.id },
      include: {
        originCountry: true,
        destCountry: true,
        extraCharges: true,
      },
    });

    return NextResponse.json(createdPricing);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[SHIPPING_PRICING_POST]", error);

    // More specific error handling
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Pricing rule already exists for this route" },
        { status: 409 }
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Invalid country ID provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
