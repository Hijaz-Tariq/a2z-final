// utils/unit-conversions.ts
export const convertToMetric = {
    weight: (lbs: number) => lbs * 0.453592, // lbs to kg
    length: (inches: number) => inches * 2.54, // inches to cm
  };
  
  export const convertFromMetric = {
    weight: (kg: number) => kg / 0.453592, // kg to lbs
    length: (cm: number) => cm / 2.54, // cm to inches
  };
  
  export const calculateVolumetricWeight = (length: number, width: number, height: number) => {
    return (length * width * height) / 5000; // Always uses cm
  };