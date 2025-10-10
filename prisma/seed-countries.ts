// // scripts/seed-countries.ts
// import { db } from '../lib/db';
// import  countriesminified from '../public/products/countriesminified.json';

// function transformCountries() {
//   const countriesRequiringDocs = ['PS', 'AF']; // Add the iso2 codes that need docs

//   return countriesminified.map(country => ({
//     id: country.id,
//     name: country.name,
//     code: country.iso2,
//     requiresDocs: countriesRequiringDocs.includes(country.iso2),
//   }));
// }

// // const countries = [
// //   { id: 233, name: "United States", code: "US", requiresDocs: false },
// //   { id: 169, name: "Palestine", code: "PS", requiresDocs: true },
// //   { id: 106, name: "Israel", code: "IL", requiresDocs: true },
// //   { id: 1, name: "Afghanistan", code: "AF", requiresDocs: true },
// //   { id: 2, name: "Albania", code: "AL", requiresDocs: false },
// //   { id: 3, name: "Algeria", code: "DZ", requiresDocs: false },
// //   { id: 4, name: "Andorra", code: "AD", requiresDocs: false },
// //   { id: 5, name: "Angola", code: "AO", requiresDocs: false },
// //   { id: 6, name: "Antigua and Barbuda", code: "AG", requiresDocs: false },
// //   { id: 7, name: "Argentina", code: "AR", requiresDocs: false },
// //   { id: 8, name: "Armenia", code: "AM", requiresDocs: false },
// //   { id: 9, name: "Australia", code: "AU", requiresDocs: false },
// //   { id: 10, name: "Austria", code: "AT", requiresDocs: false },
// //   // Add more countries as needed...
// // ];

// async function seedCountries() {
//   try {
//     console.log('🌱 Seeding countries...');

//     const countries = transformCountries();
//     for (const country of countries) {
//       await db.country.upsert({
//         where: { id: country.id },
//         update: {},
//         create: country,
//       });
//     }

//     console.log('✅ Countries seeded successfully!');
//   } catch (error) {
//     console.error('❌ Error seeding countries:', error);
//   } finally {
//     await db.$disconnect();
//   }
// }

// seedCountries();

// scripts/seed-countries.ts
import { db } from "../lib/db";
// import countriesData from "./countries-data.json";
import  countriesminified from '../public/products/countriesminified.json';
function transformCountries() {
  const countriesRequiringDocs = ["PS", "IL", "AF"]; // Add the iso2 codes that need docs

  return countriesminified.map((country) => ({
    id: country.id,
    name: country.name,
    code: country.iso2,
    requiresDocs: countriesRequiringDocs.includes(country.iso2),
  }));
}

async function seedCountries() {
  try {
    console.log("🌱 Seeding countries...");

    const countries = transformCountries();

    // First, let's check for duplicate codes in our data
    const codeCounts: { [code: string]: number } = {};
    countries.forEach((country) => {
      codeCounts[country.code] = (codeCounts[country.code] || 0) + 1;
    });

    const duplicates = Object.entries(codeCounts).filter(
      ([_, count]) => count > 1
    );
    if (duplicates.length > 0) {
      console.log(
        "⚠️  Duplicate country codes found:",
        duplicates.map(([code]) => code)
      );
    }

    for (const country of countries) {
      try {
        await db.country.upsert({
          where: { code: country.code }, // Use code as the unique identifier
          update: {
            name: country.name,
            requiresDocs: country.requiresDocs,
          },
          create: country,
        });
      } catch (error) {
        console.error(
          `❌ Error upserting country ${country.name} (${country.code}):`,
          error
        );
        // Continue with other countries even if one fails
      }
    }

    console.log(`✅ Countries seeding completed!`);
  } catch (error) {
    console.error("❌ Error seeding countries:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

seedCountries();
