import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const countries = await db.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error("[COUNTRIES_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}