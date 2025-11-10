import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const agents = await db.agentProfile.findMany({
      where: { isVerified: true }, // optional: only show verified agents
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { user: { name: 'asc' } }
    });

    // Format for frontend
    const agentList = agents.map(agent => ({
      id: agent.id,
      name: agent.user.name || agent.user.email || 'Unnamed Agent'
    }));

    return NextResponse.json(agentList);
  } catch (error) {
    console.error("[AGENTS_GET]", error);
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}