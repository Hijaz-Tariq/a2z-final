// // import { auth } from "@/auth";
// // import { db } from "../../../../lib/db";
// // import { NextResponse } from "next/server";

// // export async function GET() {
// //   const session = await auth();

// //   // Protect admin route
// //   if (!session?.user || session.user.role !== "ADMIN") {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   const users = await db.user.findMany({
// //     select: {
// //       id: true,
// //       name: true,
// //       email: true,
// //       role: true,
// //       createdAt: true,
// //     },
// //     orderBy: { createdAt: "desc" },
// //   });

// //   return NextResponse.json(users);
// // }


// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import { db } from "../../../../lib/db";

// // GET /api/admin/users
// export async function GET() {
//   const session = await auth();
//   if (!session?.user || session.user.role !== "ADMIN") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   const users = await db.user.findMany({
//     select: { id: true, name: true, email: true, role: true, createdAt: true },
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(users);
// }

// // PATCH /api/admin/users
// export async function PATCH(request: Request) {
//   const session = await auth();
//   if (!session?.user || session.user.role !== "ADMIN") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   const { userId, role } = await request.json();

//   if (!userId || !role) {
//     return NextResponse.json({ error: "Missing userId or role" }, { status: 400 });
//   }

//   // Optionally: validate role against enum values here

//   const updatedUser = await db.user.update({
//     where: { id: userId },
//     data: { role },
//   });

//   return NextResponse.json(updatedUser);
// }

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../lib/db";
// import { Role } from "@prisma/client";

// GET /api/admin/users
export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const users = await db.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

// PATCH /api/admin/users
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();

  if (Array.isArray(body)) {
    // Batch update
    const updates = body;

    try {
      await db.$transaction(
        updates.map(({ userId, role }) =>
          db.user.update({
            where: { id: userId },
            data: { role },
          })
        )
      );
      return NextResponse.json({ message: "Users updated successfully" });
    } catch (error) {
      console.error("Batch update error:", error);
      return NextResponse.json({ error: "Batch update failed" }, { status: 500 });
    }
  }

  // Single update (fallback)
  const { userId, role } = body;
  if (!userId || !role) {
    return NextResponse.json({ error: "Missing userId or role" }, { status: 400 });
  }

    if ( role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { role },
  });

  return NextResponse.json(updatedUser);
}
