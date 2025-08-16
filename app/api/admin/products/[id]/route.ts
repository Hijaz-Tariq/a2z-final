// // // app/api/admin/products/[id]/route.ts
// // import { NextResponse } from "next/server";
// // import { auth } from "@/auth";
// // import { db } from "../../../../../lib/db";

// // export const dynamic = "force-dynamic";

// // // In App Router dynamic API routes, params is a Promise and must be awaited
// // type Context = { params: Promise<{ id: string }> };

// // // function ensureAdmin() = async () => {
// // //   const session = await auth();
// // //   if (!session?.user || session.user.role !== "ADMIN") {
// // //     return false;
// // //   }
// // //   return true;
// // // };

// // // ---------- GET /api/admin/products/[id]
// // export async function GET(_req: Request, context: Context) {
// // //   if (!(await ensureAdmin())) {
// // //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// // const session = await auth();
// //   if (!session?.user || session.user.role !== "ADMIN") {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   const { id } = await context.params;

// //   const product = await db.product.findUnique({
// //     where: { id },
// //     // include: {
// //     //   category: { select: { id: true, name: true } },
// //     // },
// //   });

// //   if (!product) {
// //     return NextResponse.json({ error: "Product not found" }, { status: 404 });
// //   }

// //   return NextResponse.json(product);
// // }

// // // ---------- PUT /api/admin/products/[id]  (full or partial update)
// // export async function PUT(req: Request, context: Context) {
// //     const session = await auth();
// //   if (!session?.user || session.user.role !== "ADMIN") {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   const { id } = await context.params;
// //   const body = await req.json();

// //   // Helpers to coerce inputs safely
// //   const num = (v: any) =>
// //     v === "" || v == null ? null : typeof v === "number" ? v : parseFloat(v);
// //   const int = (v: any) =>
// //     v === "" || v == null ? null : typeof v === "number" ? v : parseInt(v, 10);

// //   const data: any = {};
// //   // Scalars (keep existing if not provided)
// //   if ("name" in body) data.name = body.name ?? "";
// //   if ("description" in body) data.description = body.description ?? "";
// //   if ("dimensions" in body) data.dimensions = body.dimensions ?? null;
// //   if ("sku" in body) data.sku = body.sku ?? null;
// //   if ("serviceType" in body) data.serviceType = body.serviceType ?? null;
// //   if ("categoryId" in body) data.categoryId = body.categoryId ?? null;

// //   // Booleans
// //   if ("isOnSale" in body) data.isOnSale = Boolean(body.isOnSale);
// //   if ("isAvailable" in body) data.isAvailable = Boolean(body.isAvailable);

// //   // Numbers / Decimals
// //   if ("price" in body) data.price = num(body.price) ?? 0;
// //   if ("discountPrice" in body) data.discountPrice = num(body.discountPrice);
// //   if ("stock" in body) data.stock = int(body.stock) ?? 0;
// //   if ("weight" in body) data.weight = num(body.weight);

// //   // Dates
// //   if ("saleEndsAt" in body) {
// //     data.saleEndsAt = body.saleEndsAt ? new Date(body.saleEndsAt) : null;
// //   }

// //   // Arrays / JSON
// //   if ("images" in body) data.images = Array.isArray(body.images) ? body.images : [];
// //   if ("features" in body) data.features = body.features ?? null;

// //   // mainImage is required by your schema (String, not optional). Only set if provided.
// //   if ("mainImage" in body && body.mainImage) {
// //     data.mainImage = body.mainImage;
// //   }

// //   try {
// //     const updated = await db.product.update({
// //       where: { id },
// //       data,
// //     });
// //     return NextResponse.json(updated);
// //   } catch (e) {
// //     console.error("Product update error:", e);
// //     return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
// //   }
// // }

// // // ---------- PATCH /api/admin/products/[id]  (alias to PUT for partial updates)
// // export const PATCH = PUT;

// // // ---------- DELETE /api/admin/products/[id]
// // export async function DELETE(_req: Request, context: Context) {
// //    const session = await auth();
// //   if (!session?.user || session.user.role !== "ADMIN") {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   const { id } = await context.params;

// //   try {
// //     await db.product.delete({ where: { id } });
// //     return NextResponse.json({ message: "Product deleted" });
// //   } catch (e) {
// //     console.error("Product delete error:", e);
// //     return NextResponse.json(
// //       { error: "Failed to delete product (check related records)" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import { db } from "../../../../../lib/db";

// interface Context {
//   params: { id: string };
// }
// // ✅ Update product
// // export async function PUT(
// //   request: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   const session = await auth();
// //   if (!session?.user || session.user.role !== "ADMIN") {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   try {
// //     const body = await request.json();
// //     const { id } = params;

// //     const updatedProduct = await db.product.update({
// //       where: { id },
// //       data: {
// //         name: body.name,
// //         price: parseFloat(body.price),
// //         description: body.description || "",
// //         stock: parseInt(body.stock) || 0,
// //         isOnSale: body.isOnSale || false,
// //         discountPrice: body.discountPrice
// //           ? parseFloat(body.discountPrice)
// //           : null,
// //         isAvailable: body.isAvailable !== false,
// //         categoryId: body.categoryId,
// //         weight: body.weight ? parseFloat(body.weight) : null,
// //         dimensions: body.dimensions || null,
// //         sku: body.sku || null,
// //         saleEndsAt: body.saleEndsAt ? new Date(body.saleEndsAt) : null,
// //         images: body.images || [],
// //         features: body.features || null,
// //         mainImage: body.mainImage || null,
// //         serviceType: body.serviceType || null,
// //       },
// //     });

// //     return NextResponse.json(updatedProduct);
// //   } catch (error) {
// //     console.error("Product update error:", error);
// //     return NextResponse.json(
// //       { error: "Failed to update product" },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function PUT(request: Request, context: Context) {
//   const session = await auth();
//   if (!session?.user || session.user.role !== "ADMIN") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   try {
//     const body = await request.json();
//     const { id } = context.params; // ✅ now correct

//     const updatedProduct = await db.product.update({
//       where: { id },
//       data: {
//         name: body.name,
//         price: parseFloat(body.price),
//         description: body.description || "",
//         stock: parseInt(body.stock) || 0,
//         isOnSale: body.isOnSale || false,
//         discountPrice: body.discountPrice
//           ? parseFloat(body.discountPrice)
//           : null,
//         isAvailable: body.isAvailable !== false,
//         categoryId: body.categoryId,
//         weight: body.weight ? parseFloat(body.weight) : null,
//         dimensions: body.dimensions || null,
//         sku: body.sku || null,
//         saleEndsAt: body.saleEndsAt ? new Date(body.saleEndsAt) : null,
//         images: body.images || [],
//         features: body.features || null,
//         mainImage: body.mainImage || null,
//         serviceType: body.serviceType || null,
//       },
//     });

//     return NextResponse.json(updatedProduct);
//   } catch (error) {
//     console.error("Product update error:", error);
//     return NextResponse.json(
//       { error: "Failed to update product" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete product
// // export async function DELETE(
// //   request: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   const session = await auth();
// //   if (!session?.user || session.user.role !== "ADMIN") {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   try {
// //     const { id } = params;

// //     await db.product.delete({
// //       where: { id },
// //     });

// //     return NextResponse.json({ message: "Product deleted successfully" });
// //   } catch (error) {
// //     console.error("Product deletion error:", error);
// //     return NextResponse.json(
// //       { error: "Failed to delete product" },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function DELETE(request: Request, context: Context) {
//   const session = await auth();
//   if (!session?.user || session.user.role !== "ADMIN") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   try {
//     const { id } = context.params;

//     await db.product.delete({ where: { id } });

//     return NextResponse.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Product deletion error:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../../lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // <- must be Promise
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id } = await context.params; // ✅ await the promise

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        price: parseFloat(body.price),
        description: body.description || "",
        stock: parseInt(body.stock) || 0,
        isOnSale: body.isOnSale || false,
        discountPrice: body.discountPrice
          ? parseFloat(body.discountPrice)
          : null,
        isAvailable: body.isAvailable !== false,
        categoryId: body.categoryId,
        weight: body.weight ? parseFloat(body.weight) : null,
        dimensions: body.dimensions || null,
        sku: body.sku || null,
        saleEndsAt: body.saleEndsAt ? new Date(body.saleEndsAt) : null,
        images: body.images || [],
        features: body.features || null,
        mainImage: body.mainImage || null,
        serviceType: body.serviceType || null,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await context.params; // ✅ await here

    await db.product.delete({ where: { id } });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
