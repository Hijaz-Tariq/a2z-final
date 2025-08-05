// import { PrismaClient } from "@prisma/client";

// const database = new PrismaClient();

// async function main() {
//   try {
//       await database.category.createMany({
//       data: [
//         {
//             name: "Food",
//             slug: "FOOD"
//         },
//         {
//             name: "Accessories",
//             slug: ""
//         },
//         { name: "Clothes" },
//         { name: "Natural & Organic" },
//         { name: "Home Decor" },
//       ],
//     });

//     console.log("Success");
//   } catch (error) {
//     console.error("Error seeding the database", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

// main();

import { PrismaClient } from "@prisma/client";
// import { storeCategories } from "@/components/filterItems";

const prisma = new PrismaClient();
const database = new PrismaClient();
async function main() {
  console.log("Start seeding...");

  // for (const category of storeCategories) {
    // const slug = category.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    await database.category.createMany({
      data: [
        { name: "Food", slug: "food" },
        { name: "Accessories", slug: "accessories" },
        { name: "Natural & Organic", slug: "natural-organic" },
        { name: "Clothes", slug: "clothes" },
        { name: "Home Decor", slug: "home-decor" },
      ],
    });
    console.log(`Created category`);
  }

  console.log("Seeding finished.");
// }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
