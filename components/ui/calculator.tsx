// import * as React from "react";
// import { useState } from "react";
// import { calculatePackageShippingCost } from "../../utils/shipping-calculations"
// import { CountrySelect, StateSelect } from "react-country-state-city";
// import "../../app/styles/react-country-state-city.css";
// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "../../components/ui/drawer";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselApi,
// } from "../../components/ui/carousel";
// import { Button } from "./button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

// interface CalculatorProps {
//     trigger: React.ReactNode;
// }
// interface Country {
//     id: number;
//     name: string;
//     // other properties
// }
// interface State {
//     id: number;
//     name: string;
//     // other properties
// }

// function isCountry(obj: unknown): obj is Country {
//     return (
//         typeof obj === 'object' &&
//         obj !== null &&
//         'id' in obj &&
//         typeof (obj as { id: unknown }).id === 'number' &&
//         'name' in obj &&
//         typeof (obj as { name: unknown }).name === 'string'
//     );
// }

// function isState(obj: unknown): obj is State {
//     return (
//         typeof obj === 'object' &&
//         obj !== null &&
//         'id' in obj &&
//         typeof (obj as { id: unknown }).id === 'number' &&
//         'name' in obj &&
//         typeof (obj as { name: unknown }).name === 'string'
//     );
// }
// const Calculator = ({ trigger }: CalculatorProps) => {
//     const [originCountryid, setOriginCountryid] = useState(0);
//     const [originStateid, setOriginStateid] = useState(0);
//     const [destCountryid, setDestCountryid] = useState(0);
//     const [destStateid, setDestStateid] = useState(0);
//     const [currency, setCurrency] = useState("$");
//     const [units, setUnits] = useState("kg-cm");
//     const [weight, setWeight] = useState("");
//     const [length, setLength] = useState("");
//     const [width, setWidth] = useState("");
//     const [height, setHeight] = useState("");
//     const [cost, setCost] = useState<number | null>(null);
//     const [chargeableWeight, setChargeableWeight] = useState(0);
//     const [api, setApi] = useState<CarouselApi>();
//     const [calculationBreakdown, setCalculationBreakdown] = useState<{
//         actual: number;
//         volumetric: number;
//     } | null>(null);
//     const handleCalculate = () => {
//         if (!weight || !length || !width || !height) return;

//         // Convert string inputs to numbers
//         const weightNum = Number(weight);
//         const lengthNum = Number(length);
//         const widthNum = Number(width);
//         const heightNum = Number(height);

//         // Map units to the expected unitSystem
//         const unitSystem = units === "kg-cm" ? "metric" : "imperial";

//         const result = calculatePackageShippingCost(
//             {
//                 id: "",
//                 packageType: "standard", // You need to provide a packageType
//                 weight: weightNum,
//                 dimensions: { // This should be a dimensions object
//                     length: lengthNum,
//                     width: widthNum,
//                     height: heightNum
//                 },
//                 itemIds: [] // You need to provide itemIds (empty array if none)
//             },
//             originCountryid,
//             destCountryid,
//             unitSystem
//         );

//         setChargeableWeight(result.chargeableWeight);
//         setCost(result.cost);
//         setCurrency(result.currency);
//         setCalculationBreakdown({
//             actual: result.actualWeightKg,
//             volumetric: result.volumetricWeight
//         });
//         api?.scrollNext();
//     };

//     const resetCalculator = () => {
//         api?.scrollTo(0);
//         setOriginCountryid(0);
//         setOriginStateid(0);
//         setDestCountryid(0);
//         setDestStateid(0);
//         setUnits("kg-cm");
//         setWeight("");
//         setLength("");
//         setWidth("");
//         setHeight("");
//         setCost(null);
//         setCalculationBreakdown(null);
//     };

//     return (
//         <Drawer>
//             <DrawerTrigger asChild>{trigger}</DrawerTrigger>
//             <DrawerContent className="px-4 py-6">
//                 <DrawerHeader className="flex flex-col items-center px-2">
//                     <DrawerTitle className="mb-0 text-sm">
//                         Shipping Calculator
//                     </DrawerTitle>
//                     <Carousel className="w-full max-w-xs" setApi={setApi}>
//                         <CarouselContent className="ml-0">
//                             {/* Slide 1: Shipping From */}
//                             <CarouselItem className="pl-0 basis-full">
//                                 <div className="p-1">
//                                     <div className="flex justify-center w-full">
//                                         <Card className="w-full max-w-[95%] md:max-w-md gap-0">
//                                             <CardHeader className="px-4 py-3">
//                                                 <span>Shipping From 🛫</span>
//                                                 <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
//                                                     <CountrySelect
//                                                         src="/products"
//                                                         onChange={(e: unknown) => {
//                                                             if (isCountry(e)) {
//                                                                 setOriginCountryid(e.id);
//                                                             }
//                                                             // Handle input change case if needed
//                                                         }}
//                                                         placeHolder="Select Country"
//                                                     />
//                                                     <StateSelect
//                                                         disabled={!originCountryid}
//                                                         countryid={originCountryid}
//                                                         // onChange={(e) => setOriginStateid(e.id)}
//                                                         onChange={(e: unknown) => {
//                                                             if (isState(e)) {
//                                                                 setOriginStateid(e.id);
//                                                             }
//                                                             // Handle input change case if needed
//                                                         }}
//                                                         placeHolder="Select State"
//                                                     />
//                                                 </CardTitle>
//                                             </CardHeader>
//                                             <CardContent className="px-4 py-2">
//                                                 <Button
//                                                     onClick={() => api?.scrollNext()}
//                                                     className="w-full mt-4"
//                                                     disabled={!originCountryid || !originStateid}
//                                                 >
//                                                     NEXT
//                                                 </Button>
//                                             </CardContent>
//                                         </Card>
//                                     </div>
//                                 </div>
//                             </CarouselItem>

//                             {/* Slide 2: Shipping To */}
//                             <CarouselItem className="pl-0 basis-full">
//                                 <div className="p-1">
//                                     <div className="flex justify-center w-full">
//                                         <Card className="w-full max-w-[95%] md:max-w-md gap-0">
//                                             <CardHeader className="px-4 py-3">
//                                                 <span>Shipping To 🛬</span>
//                                                 <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
//                                                     <CountrySelect
//                                                         src="/products"
//                                                         // onChange={(e) => setDestCountryid(e.id)}
//                                                         onChange={(e: unknown) => {
//                                                             if (isCountry(e)) {
//                                                                 setDestCountryid(e.id);
//                                                             }
//                                                             // Handle input change case if needed
//                                                         }}
//                                                         placeHolder="Select Country"
//                                                     />
//                                                     <StateSelect
//                                                         disabled={!destCountryid}
//                                                         countryid={destCountryid}
//                                                         // onChange={(e) => setDestStateid(e.id)}
//                                                         onChange={(e: unknown) => {
//                                                             if (isState(e)) {
//                                                                 setDestStateid(e.id);
//                                                             }
//                                                             // Handle input change case if needed
//                                                         }}
//                                                         placeHolder="Select State"
//                                                     />
//                                                 </CardTitle>
//                                             </CardHeader>
//                                             <CardContent className="px-4 py-2">
//                                                 <Button
//                                                     onClick={() => api?.scrollNext()}
//                                                     className="w-full mt-4"
//                                                     disabled={!destCountryid || !destStateid}
//                                                 >
//                                                     NEXT
//                                                 </Button>
//                                             </CardContent>
//                                         </Card>
//                                     </div>
//                                 </div>
//                             </CarouselItem>

//                             {/* Slide 3: Package Details */}
//                             <CarouselItem className="pl-0 basis-full">
//                                 <div className="p-1">
//                                     <div className="flex justify-center w-full">
//                                         <Card className="w-full max-w-[95%] md:max-w-md gap-0 py-0">
//                                             <CardHeader className="px-4 py-3">
//                                                 <span>Package Details 📦</span>
//                                                 <CardTitle className="flex flex-col gap-4 text-base md:text-lg">
//                                                     <div className="space-y-4">
//                                                         <div className="flex flex-col gap-2">
//                                                             <label className="text-sm font-medium">
//                                                                 Measurement System
//                                                             </label>
//                                                             <select
//                                                                 value={units}
//                                                                 onChange={(e) => setUnits(e.target.value)}
//                                                                 className="p-2 border rounded-md"
//                                                             >
//                                                                 <option value="kg-cm">kg & cm</option>
//                                                                 <option value="lbs-in">lbs & inches</option>
//                                                             </select>
//                                                         </div>

//                                                         <div className="flex flex-col gap-2">
//                                                             <label className="text-sm font-medium">
//                                                                 Weight ({units.startsWith("kg") ? "kg" : "lbs"})
//                                                             </label>
//                                                             <input
//                                                                 type="number"
//                                                                 value={weight}
//                                                                 onChange={(e) => setWeight(e.target.value)}
//                                                                 className="p-2 border rounded-md"
//                                                                 min="0"
//                                                                 required
//                                                             />
//                                                         </div>

//                                                         <div className="grid grid-cols-2 gap-4">
//                                                             {["length", "width", "height"].map(
//                                                                 (dimension, idx) => (
//                                                                     <div
//                                                                         className="flex flex-col gap-2"
//                                                                         key={dimension}
//                                                                     >
//                                                                         <label className="text-sm font-medium">
//                                                                             {dimension.charAt(0).toUpperCase() +
//                                                                                 dimension.slice(1)}{" "}
//                                                                             ({units.endsWith("cm") ? "cm" : "in"})
//                                                                         </label>
//                                                                         <input
//                                                                             type="number"
//                                                                             value={[length, width, height][idx]}
//                                                                             onChange={(e) => {
//                                                                                 const setters = [
//                                                                                     setLength,
//                                                                                     setWidth,
//                                                                                     setHeight,
//                                                                                 ];
//                                                                                 setters[idx](e.target.value);
//                                                                             }}
//                                                                             className="p-2 border rounded-md"
//                                                                             min="0"
//                                                                             required
//                                                                         />
//                                                                     </div>
//                                                                 )
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </CardTitle>
//                                             </CardHeader>
//                                             <CardContent className="px-4">
//                                                 <Button
//                                                     onClick={handleCalculate}
//                                                     className="w-full mt-4"
//                                                     disabled={!weight || !length || !width || !height}
//                                                 >
//                                                     CALCULATE
//                                                 </Button>
//                                             </CardContent>
//                                         </Card>
//                                     </div>
//                                 </div>
//                             </CarouselItem>

//                             {/* Slide 4: Results */}
//                             <CarouselItem className="pl-0 basis-full">
//                                 <div className="p-1">
//                                     <div className="flex justify-center w-full">
//                                         <Card className="w-full max-w-[95%] md:max-w-md gap-0">
//                                             <CardHeader className="px-4 py-3">
//                                                 <span>Shipping Cost 💰</span>
//                                                 <CardTitle className="flex flex-col gap-4 text-base md:text-lg">
//                                                     {cost !== null && calculationBreakdown && (
//                                                         <div className="space-y-4">
//                                                             <div className="space-y-2">
//                                                                 <p className="text-sm">
//                                                                     Actual Weight:{" "}
//                                                                     {calculationBreakdown.actual.toFixed(2)} kg
//                                                                 </p>
//                                                                 <p className="text-sm">
//                                                                     Volumetric Weight:{" "}
//                                                                     {calculationBreakdown.volumetric.toFixed(2)}{" "}
//                                                                     kg
//                                                                 </p>
//                                                                 <p className="text-sm font-semibold">
//                                                                     Chargeable Weight:{" "}
//                                                                     {chargeableWeight.toFixed(2)} kg
//                                                                 </p>
//                                                                 <p className="text-lg font-bold text-primary">
//                                                                     Total Cost: {currency}{cost?.toFixed(2)}
//                                                                 </p>
//                                                             </div>
//                                                             <div className="space-y-4">
//                                                                 <div className="flex justify-between">
//                                                                     <span>Standard Shipping:</span>
//                                                                     <span className="font-semibold">
//                                                                         {currency}{currency === "$" ? "25.00" : "90.00"}
//                                                                     </span>
//                                                                 </div>
//                                                                 <div className="flex justify-between">
//                                                                     <span>Express Shipping:</span>
//                                                                     <span className="font-semibold">{currency}{currency === "$" ? "45.00" : "160.00"}</span>
//                                                                 </div>
//                                                                 <div className="flex justify-between">
//                                                                     <span>Priority Shipping:</span>
//                                                                     <span className="font-semibold">{currency}{currency === "$" ? "65.00" : "230.00"}</span>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </CardTitle>
//                                             </CardHeader>
//                                             <CardContent className="px-4 py-2">
//                                                 <Button className="w-full">
//                                                     CONTINUE TO CHECKOUT
//                                                 </Button>
//                                                 <Button
//                                                     onClick={resetCalculator}
//                                                     className="w-full my-4"
//                                                 >
//                                                     START OVER
//                                                 </Button>

//                                             </CardContent>
//                                         </Card>
//                                     </div>
//                                 </div>
//                             </CarouselItem>
//                         </CarouselContent>
//                     </Carousel>
//                 </DrawerHeader>
//                 <DrawerFooter className="px-2 pb-2 sticky bottom-1">
//                     <div className="flex flex-col items-center gap-3">
//                         <p className="text-primary text-xs text-center px-2">
//                             **Approximate prices, excluding customs and taxes**
//                         </p>
//                         <DrawerClose asChild>
//                             <Button
//                                 variant="outline"
//                                 className="w-full md:w-32 h-10 text-black"
//                             >
//                                 Cancel
//                             </Button>
//                         </DrawerClose>
//                     </div>
//                 </DrawerFooter>
//             </DrawerContent>
//         </Drawer>
//     );
// };

// export default Calculator;



import * as React from "react";
import { useState } from "react";
import { calculatePackageShippingCost } from "../../utils/shipping-calculations"
import { CountrySelect, StateSelect } from "react-country-state-city";
import "../../app/styles/react-country-state-city.css";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../components/ui/drawer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
} from "../../components/ui/carousel";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

interface CalculatorProps {
    trigger: React.ReactNode;
}
interface Country {
    id: number;
    name: string;
    // other properties
}
interface State {
    id: number;
    name: string;
    // other properties
}

function isCountry(obj: unknown): obj is Country {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        typeof (obj as { id: unknown }).id === 'number' &&
        'name' in obj &&
        typeof (obj as { name: unknown }).name === 'string'
    );
}

function isState(obj: unknown): obj is State {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        typeof (obj as { id: unknown }).id === 'number' &&
        'name' in obj &&
        typeof (obj as { name: unknown }).name === 'string'
    );
}

const Calculator = ({ trigger }: CalculatorProps) => {
    const [originCountryid, setOriginCountryid] = useState(0);
    const [originStateid, setOriginStateid] = useState(0);
    const [destCountryid, setDestCountryid] = useState(0);
    const [destStateid, setDestStateid] = useState(0);
    const [currency, setCurrency] = useState("$");
    const [units, setUnits] = useState("kg-cm");
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [cost, setCost] = useState<number | null>(null);
    const [chargeableWeight, setChargeableWeight] = useState(0);
    const [api, setApi] = useState<CarouselApi>();
    const [calculationBreakdown, setCalculationBreakdown] = useState<{
        actual: number;
        volumetric: number;
    } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculationError, setCalculationError] = useState<string | null>(null);

    const handleCalculate = async () => {
        if (!weight || !length || !width || !height) return;

        setIsCalculating(true);
        setCalculationError(null);

        try {
            // Convert string inputs to numbers
            const weightNum = Number(weight);
            const lengthNum = Number(length);
            const widthNum = Number(width);
            const heightNum = Number(height);

            // Map units to the expected unitSystem
            const unitSystem = units === "kg-cm" ? "metric" : "imperial";

            const result = await calculatePackageShippingCost(
                {
                    id: "",
                    packageType: "standard",
                    weight: weightNum,
                    dimensions: {
                        length: lengthNum,
                        width: widthNum,
                        height: heightNum
                    },
                    itemIds: []
                },
                originCountryid,
                destCountryid,
                unitSystem
            );

            setChargeableWeight(result.chargeableWeight);
            setCost(result.cost);
            setCurrency(result.currency);
            setCalculationBreakdown({
                actual: result.actualWeightKg,
                volumetric: result.volumetricWeight
            });
            api?.scrollNext();
        } catch (error) {
            console.error('Calculation error:', error);
            setCalculationError('Failed to calculate shipping cost. Please try again.');
        } finally {
            setIsCalculating(false);
        }
    };

    const resetCalculator = () => {
        api?.scrollTo(0);
        setOriginCountryid(0);
        setOriginStateid(0);
        setDestCountryid(0);
        setDestStateid(0);
        setUnits("kg-cm");
        setWeight("");
        setLength("");
        setWidth("");
        setHeight("");
        setCost(null);
        setCalculationBreakdown(null);
        setCalculationError(null);
        setIsCalculating(false);
    };

    // Helper function to get shipping options based on currency
    const getShippingOptions = () => {
        if (currency === "ILS") {
            return [
                { type: "Standard Shipping", price: "90.00" },
                { type: "Express Shipping", price: "160.00" },
                { type: "Priority Shipping", price: "230.00" }
            ];
        } else {
            return [
                { type: "Standard Shipping", price: "25.00" },
                { type: "Express Shipping", price: "45.00" },
                { type: "Priority Shipping", price: "65.00" }
            ];
        }
    };

    const shippingOptions = getShippingOptions();

    return (
        <Drawer>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className="px-4 py-6">
                <DrawerHeader className="flex flex-col items-center px-2">
                    <DrawerTitle className="mb-0 text-sm">
                        Shipping Calculator
                    </DrawerTitle>
                    <Carousel className="w-full max-w-xs" setApi={setApi}>
                        <CarouselContent className="ml-0">
                            {/* Slide 1: Shipping From */}
                            <CarouselItem className="pl-0 basis-full">
                                <div className="p-1">
                                    <div className="flex justify-center w-full">
                                        <Card className="w-full max-w-[95%] md:max-w-md gap-0">
                                            <CardHeader className="px-4 py-3">
                                                <span>Shipping From 🛫</span>
                                                <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
                                                    <CountrySelect
                                                        src="/products"
                                                        onChange={(e: unknown) => {
                                                            if (isCountry(e)) {
                                                                setOriginCountryid(e.id);
                                                            }
                                                        }}
                                                        placeHolder="Select Country"
                                                    />
                                                    <StateSelect
                                                        disabled={!originCountryid}
                                                        countryid={originCountryid}
                                                        onChange={(e: unknown) => {
                                                            if (isState(e)) {
                                                                setOriginStateid(e.id);
                                                            }
                                                        }}
                                                        placeHolder="Select State"
                                                    />
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="px-4 py-2">
                                                <Button
                                                    onClick={() => api?.scrollNext()}
                                                    className="w-full mt-4"
                                                    disabled={!originCountryid || !originStateid}
                                                >
                                                    NEXT
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CarouselItem>

                            {/* Slide 2: Shipping To */}
                            <CarouselItem className="pl-0 basis-full">
                                <div className="p-1">
                                    <div className="flex justify-center w-full">
                                        <Card className="w-full max-w-[95%] md:max-w-md gap-0">
                                            <CardHeader className="px-4 py-3">
                                                <span>Shipping To 🛬</span>
                                                <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
                                                    <CountrySelect
                                                        src="/products"
                                                        onChange={(e: unknown) => {
                                                            if (isCountry(e)) {
                                                                setDestCountryid(e.id);
                                                            }
                                                        }}
                                                        placeHolder="Select Country"
                                                    />
                                                    <StateSelect
                                                        disabled={!destCountryid}
                                                        countryid={destCountryid}
                                                        onChange={(e: unknown) => {
                                                            if (isState(e)) {
                                                                setDestStateid(e.id);
                                                            }
                                                        }}
                                                        placeHolder="Select State"
                                                    />
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="px-4 py-2">
                                                <Button
                                                    onClick={() => api?.scrollNext()}
                                                    className="w-full mt-4"
                                                    disabled={!destCountryid || !destStateid}
                                                >
                                                    NEXT
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CarouselItem>

                            {/* Slide 3: Package Details */}
                            <CarouselItem className="pl-0 basis-full">
                                <div className="p-1">
                                    <div className="flex justify-center w-full">
                                        <Card className="w-full max-w-[95%] md:max-w-md gap-0 py-0">
                                            <CardHeader className="px-4 py-3">
                                                <span>Package Details 📦</span>
                                                <CardTitle className="flex flex-col gap-4 text-base md:text-lg">
                                                    <div className="space-y-4">
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-sm font-medium">
                                                                Measurement System
                                                            </label>
                                                            <select
                                                                value={units}
                                                                onChange={(e) => setUnits(e.target.value)}
                                                                className="p-2 border rounded-md"
                                                            >
                                                                <option value="kg-cm">kg & cm</option>
                                                                <option value="lbs-in">lbs & inches</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-sm font-medium">
                                                                Weight ({units.startsWith("kg") ? "kg" : "lbs"})
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={weight}
                                                                onChange={(e) => setWeight(e.target.value)}
                                                                className="p-2 border rounded-md"
                                                                min="0"
                                                                step="0.1"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            {["length", "width", "height"].map(
                                                                (dimension, idx) => (
                                                                    <div
                                                                        className="flex flex-col gap-2"
                                                                        key={dimension}
                                                                    >
                                                                        <label className="text-sm font-medium">
                                                                            {dimension.charAt(0).toUpperCase() +
                                                                                dimension.slice(1)}{" "}
                                                                            ({units.endsWith("cm") ? "cm" : "in"})
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            value={[length, width, height][idx]}
                                                                            onChange={(e) => {
                                                                                const setters = [
                                                                                    setLength,
                                                                                    setWidth,
                                                                                    setHeight,
                                                                                ];
                                                                                setters[idx](e.target.value);
                                                                            }}
                                                                            className="p-2 border rounded-md"
                                                                            min="0"
                                                                            step="0.1"
                                                                            required
                                                                        />
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="px-4">
                                                {/* Error Display */}
                                                {calculationError && (
                                                    <div className="text-red-500 text-sm mb-4 p-2 border border-red-200 rounded bg-red-50">
                                                        {calculationError}
                                                    </div>
                                                )}
                                                
                                                <Button
                                                    onClick={handleCalculate}
                                                    className="w-full mt-4"
                                                    disabled={!weight || !length || !width || !height || isCalculating}
                                                >
                                                    {isCalculating ? "CALCULATING..." : "CALCULATE"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CarouselItem>

                            {/* Slide 4: Results */}
                            <CarouselItem className="pl-0 basis-full">
                                <div className="p-1">
                                    <div className="flex justify-center w-full">
                                        <Card className="w-full max-w-[95%] md:max-w-md gap-0">
                                            <CardHeader className="px-4 py-3">
                                                <span>Shipping Cost 💰</span>
                                                <CardTitle className="flex flex-col gap-4 text-base md:text-lg">
                                                    {cost !== null && calculationBreakdown && (
                                                        <div className="space-y-4">
                                                            <div className="space-y-2">
                                                                <p className="text-sm">
                                                                    Actual Weight:{" "}
                                                                    {calculationBreakdown.actual.toFixed(2)} kg
                                                                </p>
                                                                <p className="text-sm">
                                                                    Volumetric Weight:{" "}
                                                                    {calculationBreakdown.volumetric.toFixed(2)}{" "}
                                                                    kg
                                                                </p>
                                                                <p className="text-sm font-semibold">
                                                                    Chargeable Weight:{" "}
                                                                    {chargeableWeight.toFixed(2)} kg
                                                                </p>
                                                                <p className="text-lg font-bold text-primary">
                                                                    Total Cost: {currency} {cost.toFixed(2)}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {shippingOptions.map((option, index) => (
                                                                    <div key={index} className="flex justify-between">
                                                                        <span>{option.type}:</span>
                                                                        <span className="font-semibold">
                                                                            {currency}{option.price}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="px-4 py-2">
                                                <Button className="w-full">
                                                    CONTINUE TO CHECKOUT
                                                </Button>
                                                <Button
                                                    onClick={resetCalculator}
                                                    className="w-full my-4"
                                                >
                                                    START OVER
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </DrawerHeader>
                <DrawerFooter className="px-2 pb-2 sticky bottom-1">
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-primary text-xs text-center px-2">
                            **Approximate prices, excluding customs and taxes**
                        </p>
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                className="w-full md:w-32 h-10 text-black"
                            >
                                Cancel
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default Calculator;