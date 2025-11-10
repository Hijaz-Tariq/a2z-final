"use strict";
// // scripts/seed-countries.ts
// import { db } from '../lib/db';
// import  countriesminified from '../public/products/countriesminified.json';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var db_1 = require("../lib/db");
// import countriesData from "./countries-data.json";
var countriesminified_json_1 = require("../public/products/countriesminified.json");
function transformCountries() {
    var countriesRequiringDocs = ["PS", "IL", "AF"]; // Add the iso2 codes that need docs
    return countriesminified_json_1.default.map(function (country) { return ({
        id: country.id,
        name: country.name,
        code: country.iso2,
        requiresDocs: countriesRequiringDocs.includes(country.iso2),
    }); });
}
function seedCountries() {
    return __awaiter(this, void 0, void 0, function () {
        var countries, codeCounts_1, duplicates, _i, countries_1, country, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 10]);
                    console.log("🌱 Seeding countries...");
                    countries = transformCountries();
                    codeCounts_1 = {};
                    countries.forEach(function (country) {
                        codeCounts_1[country.code] = (codeCounts_1[country.code] || 0) + 1;
                    });
                    duplicates = Object.entries(codeCounts_1).filter(function (_a) {
                        var _ = _a[0], count = _a[1];
                        return count > 1;
                    });
                    if (duplicates.length > 0) {
                        console.log("⚠️  Duplicate country codes found:", duplicates.map(function (_a) {
                            var code = _a[0];
                            return code;
                        }));
                    }
                    _i = 0, countries_1 = countries;
                    _a.label = 1;
                case 1:
                    if (!(_i < countries_1.length)) return [3 /*break*/, 6];
                    country = countries_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db_1.db.country.upsert({
                            where: { code: country.code }, // Use code as the unique identifier
                            update: {
                                name: country.name,
                                requiresDocs: country.requiresDocs,
                            },
                            create: country,
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("\u274C Error upserting country ".concat(country.name, " (").concat(country.code, "):"), error_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log("\u2705 Countries seeding completed!");
                    return [3 /*break*/, 10];
                case 7:
                    error_2 = _a.sent();
                    console.error("❌ Error seeding countries:", error_2);
                    throw error_2;
                case 8: return [4 /*yield*/, db_1.db.$disconnect()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
seedCountries();
