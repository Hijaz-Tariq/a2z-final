interface CalculationParams {
  weight: string;
  length: string;
  width: string;
  height: string;
  units: string;
  originCountryId: number;
  destCountryId: number;
}

interface CalculationResult {
  cost: number;
  chargeableWeight: number;
  actualWeightKg: number;
  volumetricWeight: number;
  currency: string;
}

export const costCalculations = ({
  weight,
  length,
  width,
  height,
  units,
  originCountryId,
  destCountryId,
}: CalculationParams): CalculationResult => {
  const weightValue = parseFloat(weight);
  const lengthValue = parseFloat(length);
  const widthValue = parseFloat(width);
  const heightValue = parseFloat(height);

  // Calculate volumetric weight
  let volumetricWeight;
  if (units === "kg-cm") {
    volumetricWeight = (lengthValue * widthValue * heightValue) / 5000;
  } else {
    const cmLength = lengthValue * 2.54;
    const cmWidth = widthValue * 2.54;
    const cmHeight = heightValue * 2.54;
    volumetricWeight = (cmLength * cmWidth * cmHeight) / 5000;
  }

  // Convert to kg if using lbs
  const actualWeightKg =
    units === "kg-cm" ? weightValue : weightValue * 0.453592;
  const chargeable = Math.max(actualWeightKg, volumetricWeight);

  let calculatedCost = 0;
  let currency = "$"; // Default currency

  // Check if shipping from US to Palestine
  if (originCountryId === 233 && destCountryId === 169) {
    // US to Palestine
    currency = "$";
    if (chargeable <= 1) {
      calculatedCost = 100;
    } else {
      calculatedCost = 100 + (Math.ceil(chargeable) - 1) * 15;
    }
  }
  // Check if shipping from Palestine to US
  else if (originCountryId === 169 && destCountryId === 233) {
    // Palestine to US
    currency = "₪";
    if (chargeable <= 1) {
      calculatedCost = 200;
    } else if (chargeable <= 10) {
      calculatedCost = 200 + (Math.ceil(chargeable) - 1) * 30;
    } else if (chargeable <= 19) {
      calculatedCost = 200 + 9 * 30 + (Math.ceil(chargeable) - 10) * 20;
    } else if (chargeable <= 20) {
      calculatedCost = 650;
    } else {
      calculatedCost = 650 + (Math.ceil(chargeable) - 20) * 30;
    }
  }
  // Default pricing for other routes
  else {
    currency = "$";
    calculatedCost = chargeable * 50;
  }

  return {
    cost: calculatedCost,
    chargeableWeight: chargeable,
    actualWeightKg,
    volumetricWeight,
    currency,
  };
};
