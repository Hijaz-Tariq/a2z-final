// lib/countryMapping.ts
import countriesData from '../public/products/countriesminified.json';

export const COUNTRY_CODE_TO_ID: Record<string, number> = {};
export const COUNTRY_ID_TO_CODE: Record<number, string> = {};

// Build mapping at startup
countriesData.forEach(country => {
  COUNTRY_CODE_TO_ID[country.iso2] = country.id;
  COUNTRY_ID_TO_CODE[country.id] = country.iso2;
});

// Fallbacks
COUNTRY_CODE_TO_ID['PS'] = 169;
COUNTRY_CODE_TO_ID['PS48'] = 106;
COUNTRY_CODE_TO_ID['US'] = 233;