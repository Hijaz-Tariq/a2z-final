// import * as React from "react";
// import { useState } from "react";
// import {
//     CountrySelect,
//     StateSelect,
// } from "react-country-state-city";
// // import "react-country-state-city/dist/react-country-state-city.css";
// import "@/app/styles/react-country-state-city.css";

// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "./button";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface CalculatorProps {
//     trigger: React.ReactNode;
// }

// function nextButton() {
//     console.log('Distination Card')
// }

// const Calculator = ({ trigger }: CalculatorProps) => {
//     const [countryid, setCountryid] = useState(0);
//     const [stateid, setstateid] = useState(0);
//     const [isMobile, setIsMobile] = useState(false);

//     React.useEffect(() => {
//         // Detect mobile devices
//         const isMobileDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
//         setIsMobile(isMobileDevice);
//     }, []);

//     return (
//         <Drawer>
//             <DrawerTrigger asChild>{trigger}</DrawerTrigger>
//             <DrawerContent className="px-4 py-6">
//                 {" "}
//                 {/* Added vertical padding */}
//                 <DrawerHeader className="flex flex-col items-center px-2">
//                     <DrawerTitle className="mb-4 text-xl">
//                         Shipping Calculator
//                     </DrawerTitle>
//                     <div className="flex justify-center w-full">
//                         <Card className="w-full max-w-[95%] md:max-w-md">
//                             <CardHeader className="px-4 py-3">
//                                 <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
//                                     <span>Shipping From 🛫</span>
//                                     <CountrySelect
//                                         src="/products"
//                                         onChange={(e) => {
//                                             setCountryid(e.id);
//                                         }}
//                                         placeHolder="Select Country"
//                                     />
//                                     <StateSelect
//                                         disabled={!countryid}
//                                         countryid={countryid}
//                                         onChange={(e) => {
//                                             setstateid(e.id);
//                                             console.log(e);
//                                         }}
//                                         placeHolder="Select State"
//                                     />
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent className="px-4 py-2">

//                             </CardContent>
//                         </Card>
//                         <Card className="w-full max-w-[95%] md:max-w-md hidden">
//                             <CardHeader className="px-4 py-3">
//                                 <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
//                                     <span>Shipping To 🛬</span>
//                                     <CountrySelect
//                                         src="/products"
//                                         onChange={(e) => {
//                                             setCountryid(e.id);
//                                         }}
//                                         placeHolder="Select Country"
//                                     />
//                                     <StateSelect
//                                         disabled={!countryid}
//                                         countryid={countryid}
//                                         onChange={(e) => {
//                                             setstateid(e.id);
//                                             console.log(e);
//                                         }}
//                                         placeHolder="Select State"
//                                     />
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent className="px-4 py-2">

//                             </CardContent>
//                         </Card>
//                     </div>
//                 </DrawerHeader>
//                 <DrawerFooter className="px-2 pb-2">
//                     {" "}
//                     {/* Reduced padding */}
//                     <div className="flex flex-col items-center gap-3">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col">
//                                     <Button onClick={nextButton}>NEXT</Button>

//                                 </div>
//                             </div>
//                         </div>
//                         <p className="text-primary text-xs text-center px-2">
//                             {" "}
//                             {/* Smaller text */}

//                             **Approximate prices, excluding customs and taxes**
//                         </p>
//                         <div className="flex flex-col md:flex-row gap-2 w-full max-w-md justify-center hidden">
//                             <Button className="w-full md:w-32 h-10">
//                                 {" "}
//                                 {/* Full width on mobile */}
//                                 Submit
//                             </Button>
//                             <DrawerClose asChild>
//                                 <Button
//                                     variant="outline"
//                                     className="w-full md:w-32 h-10 text-black"
//                                 >
//                                     Cancel
//                                 </Button>
//                             </DrawerClose>
//                         </div>
//                     </div>
//                 </DrawerFooter>
//             </DrawerContent>
//         </Drawer>
//     );
// };

// export default Calculator;

// import * as React from "react";
// import { useState, useRef } from "react";
// import {
//     CountrySelect,
//     StateSelect,
// } from "react-country-state-city";
// import "@/app/styles/react-country-state-city.css";

// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "./button";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";

// interface CalculatorProps {
//     trigger: React.ReactNode;
// }

// const Calculator = ({ trigger }: CalculatorProps) => {
//     const [originCountryid, setOriginCountryid] = useState(0);
//     const [originStateid, setOriginStateid] = useState(0);
// const [destCountryid, setDestCountryid] = useState(0);
// const [destStateid, setDestStateid] = useState(0);
//     const [isMobile, setIsMobile] = useState(false);
//     const carouselRef = useRef(null);

//     React.useEffect(() => {
//         // Detect mobile devices
//         const isMobileDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
//         setIsMobile(isMobileDevice);

//         // Add a custom style to fix dropdown positioning
//         const style = document.createElement('style');
//         style.innerHTML = `
//             .stdropdown-menu {
//                 position: absolute;
//                 z-index: 9999 !important; /* Very high z-index to ensure it's on top of everything */
//                 max-height: 200px !important;
//                 overflow-y: auto !important;
//                 top: auto !important;
//                 bottom: 100% !important; /* Force drop up */
//                 transform: translateY(-4px) !important;
//                 box-shadow: 0 -4px 8px rgba(0,0,0,0.1) !important;
//             }

//             .carousel-container {
//                 position: relative;
//                 z-index: 1;
//             }

//             .stdropdown-container {
//                 position: relative;
//                 z-index: 50;
//             }

//             /* Ensure the dropdown is fully visible */
//             .drawer-content {
//                 overflow: visible !important;
//             }

//             .card-container {
//                 overflow: visible !important;
//             }
//         `;
//         document.head.appendChild(style);

//         return () => {
//             document.head.removeChild(style);
//         };
//     }, []);

//     const handleNextStep = () => {
//         if (carouselRef.current) {
//             // @ts-ignore
//             carouselRef.current.scrollNext();
//         }
//     };

//     return (
//         <Drawer>
//             <DrawerTrigger asChild>{trigger}</DrawerTrigger>
//             <DrawerContent className="px-4 py-6 drawer-content">
//                 <DrawerHeader className="flex flex-col items-center px-2">
//                     <DrawerTitle className="mb-4 text-xl">
//                         Shipping Calculator
//                     </DrawerTitle>
//                     <div className="flex justify-center w-full carousel-container">
//                         <Carousel className="w-full max-w-[95%] md:max-w-md" ref={carouselRef}>
//                             <CarouselContent>
//                                 {/* Step 1: Shipping From */}
//                                 <CarouselItem>
//                                     <div className="card-container">
//                                         <Card className="w-full overflow-visible">
//                                             <CardHeader className="px-4 py-3">
//                                                 <CardTitle className="flex flex-col items-start gap-2 text-base md:text-lg">
//                                                     <span className="w-full text-center mb-2">Shipping From 🛫</span>
//                                                     <div className="w-full" style={{ position: 'relative', zIndex: 2000 }}>
//                                                         <CountrySelect
//                                                             src="/products"
//                                                             onChange={(e) => {
//                                                                 setOriginCountryid(e.id);
//                                                             }}
//                                                             placeHolder="Select Country"
//                                                             className="mb-2 w-full"
//                                                         />
//                                                     </div>
//                                                     <div className="w-full" style={{ position: 'relative', zIndex: 1000 }}>
//                                                         <StateSelect
//                                                             disabled={!originCountryid}
//                                                             countryid={originCountryid}
//                                                             onChange={(e) => {
//                                                                 setOriginStateid(e.id);
//                                                             }}
//                                                             placeHolder="Select State"
//                                                             className="w-full"
//                                                         />
//                                                     </div>
//                                                 </CardTitle>
//                                             </CardHeader>
//                                             <CardContent className="px-4 py-2">
// <Button
//     onClick={handleNextStep}
//     className="w-full mt-4"
//     disabled={!originCountryid || !originStateid}
// >
//                                                     NEXT
//                                                 </Button>
//                                             </CardContent>
//                                         </Card>
//                                     </div>
//                                 </CarouselItem>

//                                 {/* Step 2: Shipping To */}
//                                 <CarouselItem>
//                                     <div className="card-container">
//                                         <Card className="w-full overflow-visible">
//                                             <CardHeader className="px-4 py-3">
//                                                 <CardTitle className="flex flex-col items-start gap-2 text-base md:text-lg">
//                                                     <span className="w-full text-center mb-2">Shipping To 🛬</span>
//                                                     <div className="w-full" style={{ position: 'relative', zIndex: 2000 }}>
//                                                         <CountrySelect
//                                                             src="/products"
//                                                             onChange={(e) => {
//                                                                 setDestCountryid(e.id);
//                                                             }}
//                                                             placeHolder="Select Country"
//                                                             className="mb-2 w-full"
//                                                         />
//                                                     </div>
//                                                     <div className="w-full" style={{ position: 'relative', zIndex: 1000 }}>
//                                                         <StateSelect
//                                                             disabled={!destCountryid}
//                                                             countryid={destCountryid}
//                                                             onChange={(e) => {
//                                                                 setDestStateid(e.id);
//                                                             }}
//                                                             placeHolder="Select State"
//                                                             className="w-full"
//                                                         />
//                                                     </div>
//                                                 </CardTitle>
//                                             </CardHeader>
//                                             <CardContent className="px-4 py-2">
//                                                 <Button
//                                                     onClick={handleNextStep}
//                                                     className="w-full mt-4"
//                                                     disabled={!destCountryid || !destStateid}
//                                                 >
//                                                     CALCULATE
//                                                 </Button>
//                                             </CardContent>
//                                         </Card>
//                                     </div>
//                                 </CarouselItem>

//                                 {/* Step 3: Results */}
//                                 <CarouselItem>
//                                     <Card className="w-full">
//                                         <CardHeader className="px-4 py-3">
//                                             <CardTitle className="text-center">
//                                                 Shipping Results
//                                             </CardTitle>
//                                         </CardHeader>
//                                         <CardContent className="px-4 py-4">
//                                             <div className="space-y-4">
//                                                 <div className="flex justify-between">
//                                                     <span>Standard Shipping:</span>
//                                                     <span className="font-semibold">$25.00</span>
//                                                 </div>
//                                                 <div className="flex justify-between">
//                                                     <span>Express Shipping:</span>
//                                                     <span className="font-semibold">$45.00</span>
//                                                 </div>
//                                                 <div className="flex justify-between">
//                                                     <span>Priority Shipping:</span>
//                                                     <span className="font-semibold">$65.00</span>
//                                                 </div>
//                                                 <div className="pt-4">
//                                                     <Button className="w-full">
//                                                         CONTINUE TO CHECKOUT
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </CardContent>
//                                     </Card>
//                                 </CarouselItem>
//                             </CarouselContent>
//                         </Carousel>
//                     </div>
//                 </DrawerHeader>
//                 <DrawerFooter className="px-2 pb-2">
//                     <div className="flex flex-col items-center gap-3">
//                         <p className="text-primary text-xs text-center px-2">
//                             **Approximate prices, excluding customs and taxes**
//                         </p>
//                         <DrawerClose asChild>
//                             <Button
//                                 variant="outline"
//                                 className="w-32 h-10 text-black"
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

//////////////////////////////////////////////////From here
// import * as React from "react";
// import { useState } from "react";
// import {
//     CountrySelect,
//     StateSelect,
// } from "react-country-state-city";
// // import "react-country-state-city/dist/react-country-state-city.css";
// import "@/app/styles/react-country-state-city.css";

// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "./button";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface CalculatorProps {
//     trigger: React.ReactNode;
// }

// function nextButton() {
//     console.log('Distination Card')
// }

// const Calculator = ({ trigger }: CalculatorProps) => {
//     const [originCountryid, setOriginCountryid] = useState(0);
//     const [originStateid, setOriginStateid] = useState(0);
//     // const [destCountryid, setDestCountryid] = useState(0);
//     // const [destStateid, setDestStateid] = useState(0);
//     const [countryid, setCountryid] = useState(0);
//     const [stateid, setstateid] = useState(0);
//     const [isMobile, setIsMobile] = useState(false);

//     React.useEffect(() => {
//         // Detect mobile devices
//         const isMobileDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
//         setIsMobile(isMobileDevice);
//     }, []);

//     return (
//         <Drawer>
//             <DrawerTrigger asChild>{trigger}</DrawerTrigger>
//             <DrawerContent className="px-4 py-6">
//                 {" "}
//                 {/* Added vertical padding */}
//                 <DrawerHeader className="flex flex-col items-center px-2">
//                     <DrawerTitle className="mb-4 text-xl">
//                         Shipping Calculator
//                     </DrawerTitle>
//                     <div className="flex justify-center w-full">
//                         <Card className="w-full max-w-[95%] md:max-w-md gap-0">
//                             <CardHeader className="px-4 py-3">
//                                     <span>Shipping From 🛫</span>
//                                 <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
//                                     <CountrySelect
//                                         src="/products"
//                                         onChange={(e) => {
//                                             setOriginCountryid(e.id);
//                                         }}
//                                         placeHolder="Select Country"
//                                     />
//                                     <StateSelect
//                                         disabled={!originCountryid}
//                                         countryid={originCountryid}
//                                         onChange={(e) => {
//                                             setOriginStateid(e.id);
//                                             // console.log(e);
//                                         }}
//                                         placeHolder="Select State"
//                                     />
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent className="px-4 py-2">
//                                 <Button
//                                     onClick={nextButton}
//                                     className="w-full mt-4"
//                                     disabled={!originCountryid || !originStateid}
//                                 >
//                                     NEXT
//                                 </Button>
//                             </CardContent>
//                         </Card>

//                     </div>

//                     {/* Reduced padding */}

//                 </DrawerHeader>
//                 <DrawerFooter className="px-2 pb-2">
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
//         </Drawer >
//     );
// };

// export default Calculator;

////////////////////////////////////////////////////////// To here

// import * as React from "react";
// import { useState } from "react";
// import {
//     CountrySelect,
//     StateSelect,
// } from "react-country-state-city";
// // import "react-country-state-city/dist/react-country-state-city.css";
// import "@/app/styles/react-country-state-city.css";

// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
//     type CarouselApi,
// } from "@/components/ui/carousel";

// import { Button } from "./button";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface CalculatorProps {
//     trigger: React.ReactNode;
// }

// function nextButton() {
//     console.log('Distination Card')
// }

// const Calculator = ({ trigger }: CalculatorProps) => {
//     const [originCountryid, setOriginCountryid] = useState(0);
//     const [originStateid, setOriginStateid] = useState(0);
//     const [destCountryid, setDestCountryid] = useState(0);
//     const [destStateid, setDestStateid] = useState(0);
//     const [api, setApi] = useState<CarouselApi>();

//     const [units, setUnits] = useState('kg-cm');
//     const [weight, setWeight] = useState('');
//     const [length, setLength] = useState('');
//     const [width, setWidth] = useState('');
//     const [height, setHeight] = useState('');
//     // const [countryid, setCountryid] = useState(0);
//     // const [stateid, setstateid] = useState(0);
//     const [isMobile, setIsMobile] = useState(false);

//     React.useEffect(() => {
//         // Detect mobile devices
//         const isMobileDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
//         setIsMobile(isMobileDevice);
//     }, []);

//     return (
//         <Drawer>
//             <DrawerTrigger asChild>{trigger}</DrawerTrigger>
//             <DrawerContent className="px-4 py-6">
//                 {" "}
//                 {/* Added vertical padding */}
//                 <DrawerHeader className="flex flex-col items-center px-2">
//                     <DrawerTitle className="mb-4 text-xl">
//                         Shipping Calculator
//                     </DrawerTitle>
//                     <Carousel className="w-full max-w-xs" setApi={setApi}>
//                         <CarouselContent >

//                             <CarouselItem >
//                                 <div className="p-1">
//                                     <div className="flex justify-center w-full">
//                                         <Card className="w-full max-w-[95%] md:max-w-md gap-0">
//                                             <CardHeader className="px-4 py-3">
//                                                 <span>Shipping From 🛫</span>
//                                                 <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
//                                                     <CountrySelect
//                                                         src="/products"
//                                                         onChange={(e) => {
//                                                             setOriginCountryid(e.id);
//                                                         }}
//                                                         placeHolder="Select Country"
//                                                     />
//                                                     <StateSelect
//                                                         disabled={!originCountryid}
//                                                         countryid={originCountryid}
//                                                         onChange={(e) => {
//                                                             setOriginStateid(e.id);
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
//                             <CarouselItem >
//                                 <div className="p-1">
//                                     <div className="flex justify-center w-full">
//                                         <Card className="w-full max-w-[95%] md:max-w-md gap-0">
//                                             <CardHeader className="px-4 py-3">
//                                                 <span>Shipping To 🛬</span>
//                                                 <CardTitle className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
//                                                     <CountrySelect
//                                                         src="/products"
//                                                         onChange={(e) => {
//                                                             setDestCountryid(e.id);
//                                                         }}
//                                                         placeHolder="Select Country"
//                                                     />
//                                                     <StateSelect
//                                                         disabled={!destCountryid}
//                                                         countryid={destCountryid}
//                                                         onChange={(e) => {
//                                                             setDestStateid(e.id);
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
//                             <CarouselItem>
//                                 <div className="p-1">
//                                     <div className="flex justify-center w-full">
//                                         <Card className="w-full max-w-[95%] md:max-w-md gap-0">
//                                             <CardHeader className="px-4 py-3">
//                                                 <span>Package Details 📦</span>
//                                                 <CardTitle className="flex flex-col gap-4 text-base md:text-lg">
//                                                     <div className="space-y-4">
//                                                         {/* Measurement System Select */}
//                                                         <div className="flex flex-col gap-2">
//                                                             <label className="text-sm font-medium">Measurement System</label>
//                                                             <select
//                                                                 value={units}
//                                                                 onChange={(e) => setUnits(e.target.value)}
//                                                                 className="p-2 border rounded-md"
//                                                             >
//                                                                 <option value="kg-cm">kg & cm</option>
//                                                                 <option value="lbs-in">lbs & inches</option>
//                                                             </select>
//                                                         </div>

//                                                         {/* Weight Input */}
//                                                         <div className="flex flex-col gap-2">
//                                                             <label className="text-sm font-medium">
//                                                                 Weight ({units.startsWith('kg') ? 'kg' : 'lbs'})
//                                                             </label>
//                                                             <input
//                                                                 type="number"
//                                                                 value={weight}
//                                                                 onChange={(e) => setWeight(e.target.value)}
//                                                                 className="p-2 border rounded-md"
//                                                                 required
//                                                             />
//                                                         </div>

//                                                         {/* Dimensions Grid */}
//                                                         <div className="grid grid-cols-2 gap-4">
//                                                             <div className="flex flex-col gap-2">
//                                                                 <label className="text-sm font-medium">
//                                                                     Length ({units.endsWith('cm') ? 'cm' : 'in'})
//                                                                 </label>
//                                                                 <input
//                                                                     type="number"
//                                                                     value={length}
//                                                                     onChange={(e) => setLength(e.target.value)}
//                                                                     className="p-2 border rounded-md"
//                                                                     required
//                                                                 />
//                                                             </div>
//                                                             <div className="flex flex-col gap-2">
//                                                                 <label className="text-sm font-medium">
//                                                                     Width ({units.endsWith('cm') ? 'cm' : 'in'})
//                                                                 </label>
//                                                                 <input
//                                                                     type="number"
//                                                                     value={width}
//                                                                     onChange={(e) => setWidth(e.target.value)}
//                                                                     className="p-2 border rounded-md"
//                                                                     required
//                                                                 />
//                                                             </div>
//                                                             <div className="flex flex-col gap-2">
//                                                                 <label className="text-sm font-medium">
//                                                                     Height ({units.endsWith('cm') ? 'cm' : 'in'})
//                                                                 </label>
//                                                                 <input
//                                                                     type="number"
//                                                                     value={height}
//                                                                     onChange={(e) => setHeight(e.target.value)}
//                                                                     className="p-2 border rounded-md"
//                                                                     required
//                                                                 />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </CardTitle>
//                                             </CardHeader>
//                                             <CardContent className="px-4 py-2">
//                                                 <Button
//                                                     onClick={() => {
//                                                         // Handle form submission here
//                                                         console.log('Submitted:', { units, weight, length, width, height });
//                                                     }}
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
//                         </CarouselContent>
//                         <CarouselPrevious />
//                         <CarouselNext />
//                     </Carousel>
//                 </DrawerHeader>
//                 <DrawerFooter className="px-2 pb-2">
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
//         </Drawer >
//     );
// };

// export default Calculator;

/////////////////////////////////////////////////////////////

import * as React from "react";
import { useState } from "react";

import { costCalculations } from "../../utils/calculations";
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

// function isCountry(obj: any): obj is Country {
//     return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
// }

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
// function isState(obj: any): obj is State {
//     return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
// }

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
    const [calculationBreakdown, setCalculationBreakdown] = useState<{
        actual: number;
        volumetric: number;
    } | null>(null);
    const [api, setApi] = useState<CarouselApi>();
    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //     setIsMobile(/iPhone|iPad|iPod/i.test(navigator.userAgent));
    // }, []);

    // const calculateShippingCost = () => {
    //     const weightValue = parseFloat(weight);
    //     const lengthValue = parseFloat(length);
    //     const widthValue = parseFloat(width);
    //     const heightValue = parseFloat(height);

    //     let volumetricWeight;
    //     if (units === "kg-cm") {
    //         volumetricWeight = (lengthValue * widthValue * heightValue) / 5000;
    //     } else {
    //         const cmLength = lengthValue * 2.54;
    //         const cmWidth = widthValue * 2.54;
    //         const cmHeight = heightValue * 2.54;
    //         volumetricWeight = (cmLength * cmWidth * cmHeight) / 5000;
    //     }

    //     const actualWeightKg =
    //         units === "kg-cm" ? weightValue : weightValue * 0.453592;
    //     const chargeable = Math.max(actualWeightKg, volumetricWeight);
    //     const calculatedCost = chargeable * 50;

    //     setChargeableWeight(chargeable);
    //     setCost(calculatedCost);
    //     setCalculationBreakdown({
    //         actual: actualWeightKg,
    //         volumetric: volumetricWeight,
    //     });
    //     api?.scrollNext();
    // };

    const handleCalculate = () => {
        if (!weight || !length || !width || !height) return;

        const result = costCalculations({
            weight,
            length,
            width,
            height,
            units,
            originCountryId: originCountryid,
            destCountryId: destCountryid
        });

        setChargeableWeight(result.chargeableWeight);
        setCost(result.cost);
        setCurrency(result.currency);
        setCalculationBreakdown({
            actual: result.actualWeightKg,
            volumetric: result.volumetricWeight
        });
        api?.scrollNext();
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
    };

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
                                                            // Handle input change case if needed
                                                        }}
                                                        placeHolder="Select Country"
                                                    />
                                                    <StateSelect
                                                        disabled={!originCountryid}
                                                        countryid={originCountryid}
                                                        // onChange={(e) => setOriginStateid(e.id)}
                                                        onChange={(e: unknown) => {
                                                            if (isState(e)) {
                                                                setOriginStateid(e.id);
                                                            }
                                                            // Handle input change case if needed
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
                                                        // onChange={(e) => setDestCountryid(e.id)}
                                                        onChange={(e: unknown) => {
                                                            if (isCountry(e)) {
                                                                setDestCountryid(e.id);
                                                            }
                                                            // Handle input change case if needed
                                                        }}
                                                        placeHolder="Select Country"
                                                    />
                                                    <StateSelect
                                                        disabled={!destCountryid}
                                                        countryid={destCountryid}
                                                        // onChange={(e) => setDestStateid(e.id)}
                                                        onChange={(e: unknown) => {
                                                            if (isState(e)) {
                                                                setDestStateid(e.id);
                                                            }
                                                            // Handle input change case if needed
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
                                                <Button
                                                    onClick={handleCalculate}
                                                    className="w-full mt-4"
                                                    disabled={!weight || !length || !width || !height}
                                                >
                                                    CALCULATE
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
                                                                    Total Cost: {currency}{cost?.toFixed(2)}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div className="flex justify-between">
                                                                    <span>Standard Shipping:</span>
                                                                    <span className="font-semibold">
                                                                        {currency}{currency === "$" ? "25.00" : "90.00"}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>Express Shipping:</span>
                                                                    <span className="font-semibold">{currency}{currency === "$" ? "45.00" : "160.00"}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>Priority Shipping:</span>
                                                                    <span className="font-semibold">{currency}{currency === "$" ? "65.00" : "230.00"}</span>
                                                                </div>
                                                                {/* <div className="pt-4">
                                                                    {" "}
                                                                    <Button className="w-full">
                                                                        CONTINUE TO CHECKOUT
                                                                    </Button>
                                                                </div>{" "} */}
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
