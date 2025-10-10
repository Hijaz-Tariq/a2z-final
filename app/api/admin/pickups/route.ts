// // import { NextResponse } from 'next/server';
// // import { db } from '../../../../lib/db';
// // import { auth } from '@/auth';

// // export async function GET() {

// //      const session = await auth();
// //   if (!session?.user || session.user.role !== "ADMIN") {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   try {
// //     // const session = await auth();

// //     // if (!session?.user) {
// //     //   return NextResponse.json(
// //     //     { error: "Unauthorized" },
// //     //     { status: 401 }
// //     //   );
// //     // }

// //     const pickups = await db.pickup.findMany({
// //       include: {
// //         User: {
// //           select: {
// //             name: true,
// //             email: true
// //           }
// //         }
// //       },
// //       orderBy: {
// //         scheduledDate: 'desc'
// //       },
// //       take: 50 // Limit to 50 most recent pickups
// //     });

// //     return NextResponse.json(pickups);
// //   } catch (error) {
// //     console.error('[PICKUPS_GET]', error);
// //     return NextResponse.json(
// //       { error: "Internal server error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { db } from "../../../../lib/db";
// import { auth } from "@/auth";

// export async function GET() {
//   try {
//     const session = await auth();

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const pickups = await db.pickup.findMany({
//       include: {
//         User: true,
//         GuestCheckout: true,
//         GuestSession: true,
//         pickupContact: true,
//         deliveryContact: true,
//         items: true,
//         packages: true,
//         customPickupAddress: true,
//         customDeliveryAddress: true,
//       },
//       orderBy: {
//         scheduledDate: "desc",
//       },
//       take: 100,
//     });

//     return NextResponse.json(pickups);
//   } catch (error) {
//     console.error("[PICKUPS_GET]", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pickups = await db.pickup.findMany({
      include: {
        User: true,
        GuestCheckout: true,
        GuestSession: true,
        pickupContact: true,
        deliveryContact: true,
        items: true,
        packages: true,
        customPickupAddress: true,
        customDeliveryAddress: true,
      },
      orderBy: {
        scheduledDate: "desc",
      },
      take: 100,
    });

    const pickupsWithPackageItems = pickups.map((pickup) => {
      const packagesWithItems = pickup.packages.map((pkg) => {
        // force all itemIds into strings
        const itemIds = Array.isArray(pkg.itemIds)
          ? pkg.itemIds.map((id) => String(id))
          : [];

        // match against pickup.items
        const items = pickup.items.filter((item) =>
          itemIds.includes(String(item.id))
        );

        return {
          ...pkg,
          items, // attach resolved items
        };
      });

      return {
        ...pickup,
        packages: packagesWithItems,
      };
    });

    return NextResponse.json(pickupsWithPackageItems);
  } catch (error) {
    console.error("[PICKUPS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
