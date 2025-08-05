// // 'use client';

// // import {
// //     NewspaperIcon,
// //     ShoppingCartIcon,
// //     CalculatorIcon,
// //     CalendarIcon,
// // } from 'lucide-react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { useEffect, useRef, useState } from 'react';

// // export default function Footer() {
// //     const pathname = usePathname();
// //     const [indicatorStyle, setIndicatorStyle] = useState({});
// //     const tabsRef = useRef<HTMLDivElement>(null);

// //     const tabs = [
// //         { href: '/', icon: NewspaperIcon, label: 'News' },
// //         { href: '/store', icon: ShoppingCartIcon, label: 'Store' },
// //         { href: '/calculator', icon: CalculatorIcon, label: 'Calculator' },
// //         { href: '/booking', icon: CalendarIcon, label: 'Booking' },
// //     ];

// //     useEffect(() => {
// //         if (tabsRef.current) {
// //             const activeTabIndex = tabs.findIndex(tab => tab.href === pathname);
// //             const tabWidth = tabsRef.current.offsetWidth / tabs.length;
// //             const newPosition = tabWidth * activeTabIndex;

// //             setIndicatorStyle({
// //                 transform: `translateX(${newPosition}px)`,
// //                 width: `${tabWidth}px`,
// //             });
// //         }
// //     }, [pathname]);

// //     return (
// //         <footer className="fixed bottom-0 left-0 w-full bg-primary border-t border-accent/20 z-50 pb-safe">
// //             <div className="relative px-2">
// //                 {/* Animated background indicator */}
// //                 <div
// //                     className="absolute top-0 h-full transition-all duration-300 ease-out-back"
// //                     style={indicatorStyle}
// //                 >
// //                     <div className="w-full h-full bg-white/10 rounded-t-xl shadow-lg backdrop-blur-sm" />
// //                 </div>

// //                 <nav ref={tabsRef} className="relative grid grid-cols-4">
// //                     {tabs.map(({ href, icon: Icon, label }) => (
// //                         <Link
// //                             key={href}
// //                             href={href}
// //                             className="relative py-1 px-2 flex flex-col items-center group"
// //                         >
// //                             <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
// //                                 <Icon
// //                                     className={`h-6 w-6 mb-1 transition-colors ${pathname === href ? 'text-accent' : 'text-white'
// //                                         }`}
// //                                 />
// //                                 <span
// //                                     className={`text-xs font-medium transition-colors ${pathname === href ? 'text-accent' : 'text-white/80'
// //                                         }`}
// //                                 >
// //                                     {label}
// //                                 </span>
// //                             </div>
// //                         </Link>
// //                     ))}
// //                 </nav>
// //             </div>
// //         </footer>
// //     );
// // }


// 'use client';

// import {
//     NewspaperIcon,
//     CalculatorIcon,
//     Store,
//     PackageOpen,
// } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import Image from 'next/image';

// export default function Footer() {
//     const pathname = usePathname();
//     const [indicatorStyle, setIndicatorStyle] = useState({});
//     const tabsRef = useRef<HTMLDivElement>(null);

//     // Memoize tabs array to prevent unnecessary re-renders
//     const tabs = useMemo(() => [
//         { href: '/', icon: NewspaperIcon, label: 'News' },
//         { href: '/store', icon: Store, label: 'Store' },
//         { href: '/calculator', icon: CalculatorIcon, label: 'Calculator' },
//         { href: '/newParcel', icon: PackageOpen, label: 'New Parcel' },
//     ], []); // Empty dependency array means this only runs once

//     useEffect(() => {
//         if (tabsRef.current) {
//             const activeTabIndex = tabs.findIndex(tab => tab.href === pathname);
//             const safeIndex = activeTabIndex === -1 ? 0 : activeTabIndex;
//             const tabWidth = tabsRef.current.offsetWidth / tabs.length;
//             const newPosition = tabWidth * safeIndex;

//             setIndicatorStyle({
//                 transform: `translateX(${newPosition}px)`,
//                 width: `${tabWidth}px`,
//             });
//         }
//     }, [pathname, tabs]);

//     return (
//         <footer className="fixed bottom-0 left-0 w-full bg-primary border-t border-accent/20 z-50 pb-safe pt-2">
//             {/* Centered Logo */}
//             {/* <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-50">
//                 <Link
//                     href="/#"
//                     className="bg-primary rounded-full p-1 border-1 border-accent/20 shadow-xl flex items-center justify-center"
//                     style={{
//                         boxShadow: '0 4px 20px rgba(255, 147, 5, 0.2)'
//                     }}
//                 >
//                     <div className="bg-white/15 rounded-full">
//                         <div className="relative w-12 h-12">
//                             <Image
//                                 src="/logo2.svg"
//                                 alt="A2Z Express"
//                                 fill
//                                 className="object-contain"
//                             />
//                         </div>
//                     </div>
//                 </Link>
//             </div> */}

//             <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-50 group">
//                 <Link
//                     href="/#"
//                     className="bg-primary rounded-full p-1 border-2 border-accent/20 shadow-xl flex items-center justify-center relative"
//                     style={{
//                         boxShadow: '0 4px 20px rgba(255, 147, 5, 0.2)'
//                     }}
//                 >
//                     {/* Orbital Ring */}
//                     <div className="absolute -inset-0.5 border-2 border-primary/30 rounded-full animate-spin-slow">
//                         {/* Meteor */}
//                         <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-accent to-transparent rounded-full filter blur-[2px]">
//                             <div className="absolute inset-0 bg-white/50 animate-pulse rounded-full" />
//                         </div>
//                     </div>

//                     {/* Logo Container */}
//                     <div className="relative z-10 bg-white/15 rounded-full">
//                         <div className="relative w-12 h-12">
//                             <Image
//                                 src="/logo2.svg"
//                                 alt="A2Z Express"
//                                 fill
//                                 className="object-contain drop-shadow-lg"
//                             />
//                         </div>
//                     </div>
//                 </Link>
//             </div>

//             <div className="relative h-full px-2">
//                 {/* Animated background highlight */}
//                 <div
//                     className="absolute bottom-0 h-full bg-white/10 rounded-t-xl transition-all duration-300 ease-out-back shadow-lg"
//                     style={indicatorStyle}
//                 />

//                 <nav ref={tabsRef} className="relative grid grid-cols-4 h-full gap-4">
//                     {tabs.map(({ href, icon: Icon, label }) => (
//                         <Link
//                             key={href}
//                             href={href}
//                             className="relative flex items-center justify-center group h-full"
//                         >
//                             <div className="relative flex flex-col items-center z-10">
//                                 <div className="h-7 w-7 flex items-center justify-center">
//                                     <Icon
//                                         className={`transition-all duration-300 ${pathname === href
//                                             ? 'text-accent scale-75'
//                                             : 'text-white/80 hover:text-white scale-100'
//                                             }`}
//                                     />
//                                 </div>
//                                 <span
//                                     className={`text-xs font-medium transition-all duration-300 ${pathname === href
//                                         ? 'text-accent opacity-100 translate-y-0'
//                                         : 'opacity-0 -translate-y-2'
//                                         }`}
//                                 >
//                                     {label}
//                                 </span>
//                             </div>
//                         </Link>
//                     ))}
//                 </nav>
//             </div>
//         </footer>
//     );
// }

///////////////////////////////////////////////////////////

// 'use client';

// import {
//     NewspaperIcon,
//     CalculatorIcon,
//     Store,
//     PackageOpen,
// } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import Image from 'next/image';
// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "./ui/button";

// export default function Footer() {
//     const pathname = usePathname();
//     const [indicatorStyle, setIndicatorStyle] = useState({});
//     const tabsRef = useRef<HTMLDivElement>(null);

//     // Memoize tabs array to prevent unnecessary re-renders
//     const tabs = useMemo(() => [
//         { href: '/', icon: NewspaperIcon, label: 'News' },
//         { href: '/store', icon: Store, label: 'Store' },
//         { href: '/calculator', icon: CalculatorIcon, label: 'Calculator' },
//         // Remove the href for "New Parcel" since it will open the drawer
//         { href: '#', icon: PackageOpen, label: 'New Parcel' },
//     ], []); // Empty dependency array means this only runs once

//     useEffect(() => {
//         if (tabsRef.current) {
//             const activeTabIndex = tabs.findIndex(tab => tab.href === pathname);
//             const safeIndex = activeTabIndex === -1 ? 0 : activeTabIndex;
//             const tabWidth = tabsRef.current.offsetWidth / tabs.length;
//             const newPosition = tabWidth * safeIndex;

//             setIndicatorStyle({
//                 transform: `translateX(${newPosition}px)`,
//                 width: `${tabWidth}px`,
//             });
//         }
//     }, [pathname, tabs]);

//     return (
//         <footer className="fixed bottom-0 left-0 w-full bg-primary border-t border-accent/20 z-50 pb-safe pt-2">
//             {/* Centered Logo */}
//             <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-50 group">
//                 <Link
//                     href="/#"
//                     className="bg-primary rounded-full p-1 border-2 border-accent/20 shadow-xl flex items-center justify-center relative"
//                     style={{
//                         boxShadow: '0 4px 20px rgba(255, 147, 5, 0.2)'
//                     }}
//                 >
//                     {/* Orbital Ring */}
//                     <div className="absolute -inset-0.5 border-2 border-primary/30 rounded-full animate-spin-slow">
//                         {/* Meteor */}
//                         <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-accent to-transparent rounded-full filter blur-[2px]">
//                             <div className="absolute inset-0 bg-white/50 animate-pulse rounded-full" />
//                         </div>
//                     </div>

//                     {/* Logo Container */}
//                     <div className="relative z-10 bg-white/15 rounded-full">
//                         <div className="relative w-12 h-12">
//                             <Image
//                                 src="/logo2.svg"
//                                 alt="A2Z Express"
//                                 fill
//                                 className="object-contain drop-shadow-lg"
//                             />
//                         </div>
//                     </div>
//                 </Link>
//             </div>

//             <div className="relative h-full px-2">
//                 {/* Animated background highlight */}
//                 <div
//                     className="absolute bottom-0 h-full bg-white/10 rounded-t-xl transition-all duration-300 ease-out-back shadow-lg"
//                     style={indicatorStyle}
//                 />

//                 <nav ref={tabsRef} className="relative grid grid-cols-4 h-full gap-4">
//                     {tabs.map(({ href, icon: Icon, label }) => {
//                         // Special handling for "New Parcel" to trigger the drawer
//                         if (label === 'New Parcel') {
//                             return (
//                                 <Drawer key={href}>
//                                     <DrawerTrigger asChild>
//                                         <div className="relative flex items-center justify-center group h-full cursor-pointer">
//                                             <div className="relative flex flex-col items-center z-10">
//                                                 <div className="h-7 w-7 flex items-center justify-center">
//                                                     <Icon
//                                                         className={`transition-all duration-300 ${pathname === href
//                                                             ? 'text-accent scale-75'
//                                                             : 'text-white/80 hover:text-white scale-100'
//                                                             }`}
//                                                     />
//                                                 </div>
//                                                 <span
//                                                     className={`text-xs font-medium transition-all duration-300 ${pathname === href
//                                                         ? 'text-accent opacity-100 translate-y-0'
//                                                         : 'opacity-0 -translate-y-2'
//                                                         }`}
//                                                 >
//                                                     {label}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </DrawerTrigger>
//                                     <DrawerContent>
//                                         <DrawerHeader>
//                                             <DrawerTitle>Are you absolutely sure?</DrawerTitle>
//                                             <DrawerDescription>This action cannot be undone.</DrawerDescription>
//                                         </DrawerHeader>
//                                         <DrawerFooter>
//                                             <Button>Submit</Button>
//                                             {/* Use onClick from DrawerClose instead of wrapping Button */}
//                                             <DrawerClose asChild>
//                                                 <Button variant="outline" className='text-black'>Cancel</Button>
//                                             </DrawerClose>
//                                         </DrawerFooter>
//                                     </DrawerContent>
//                                 </Drawer>
//                             );
//                         }

//                         // Regular links for other tabs
//                         return (
//                             <Link
//                                 key={href}
//                                 href={href}
//                                 className="relative flex items-center justify-center group h-full"
//                             >
//                                 <div className="relative flex flex-col items-center z-10">
//                                     <div className="h-7 w-7 flex items-center justify-center">
//                                         <Icon
//                                             className={`transition-all duration-300 ${pathname === href
//                                                 ? 'text-accent scale-75'
//                                                 : 'text-white/80 hover:text-white scale-100'
//                                                 }`}
//                                         />
//                                     </div>
//                                     <span
//                                         className={`text-xs font-medium transition-all duration-300 ${pathname === href
//                                             ? 'text-accent opacity-100 translate-y-0'
//                                             : 'opacity-0 -translate-y-2'
//                                             }`}
//                                     >
//                                         {label}
//                                     </span>
//                                 </div>
//                             </Link>
//                         );
//                     })}
//                 </nav>
//             </div>
//         </footer>
//     );
// }



'use client';

import {
    NewspaperIcon,
    CalculatorIcon,
    Store,
    PackageOpen,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Calculator from './ui/calculator'; // Import the new drawer component

export default function Footer() {
    const pathname = usePathname();
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef<HTMLDivElement>(null);

    // Memoize tabs array to prevent unnecessary re-renders
    const tabs = useMemo(() => [
        { href: '/', icon: NewspaperIcon, label: 'News' },
        { href: '/store', icon: Store, label: 'Store' },
        { href: '/#', icon: CalculatorIcon, label: 'Calculator' },
        // Remove the href for "New Parcel" since it will open the drawer
        { href: '/newParcel', icon: PackageOpen, label: 'New Parcel' },
    ], []); // Empty dependency array means this only runs once

    useEffect(() => {
        if (tabsRef.current) {
            const activeTabIndex = tabs.findIndex(tab => tab.href === pathname);
            const safeIndex = activeTabIndex === -1 ? 0 : activeTabIndex;
            const tabWidth = tabsRef.current.offsetWidth / tabs.length;
            const newPosition = tabWidth * safeIndex;

            setIndicatorStyle({
                transform: `translateX(${newPosition}px)`,
                width: `${tabWidth}px`,
            });
        }
    }, [pathname, tabs]);

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-primary border-t border-accent/20 z-50 pb-safe pt-2">
            {/* Centered Logo */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-50 group">
                <Link
                    href="/#"
                    className="bg-primary rounded-full p-1 border-2 border-accent/20 shadow-xl flex items-center justify-center relative"
                    style={{
                        boxShadow: '0 4px 20px rgba(255, 147, 5, 0.2)'
                    }}
                >
                    {/* Orbital Ring */}
                    <div className="absolute -inset-0.5 border-2 border-primary/30 rounded-full animate-spin-slow">
                        {/* Meteor */}
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-accent to-transparent rounded-full filter blur-[2px]">
                            <div className="absolute inset-0 bg-white/50 animate-pulse rounded-full" />
                        </div>
                    </div>

                    {/* Logo Container */}
                    <div className="relative z-10 bg-white/15 rounded-full">
                        <div className="relative w-12 h-12">
                            <Image
                                src="/logo2.svg"
                                alt="A2Z Express"
                                fill
                                className="object-contain drop-shadow-lg"
                            />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="relative h-full px-2">
                {/* Animated background highlight */}
                <div
                    className="absolute bottom-0 h-full bg-white/10 rounded-t-xl transition-all duration-300 ease-out-back shadow-lg"
                    style={indicatorStyle}
                />

                <nav ref={tabsRef} className="relative grid grid-cols-4 h-full gap-4">
                    {tabs.map(({ href, icon: Icon, label }) => {
                        // Special handling for "Calculator" to trigger the drawer
                        if (label === 'Calculator') {
                            return (
                                <Calculator
                                    key={href}
                                    trigger={
                                        <div className="relative flex items-center justify-center group h-full cursor-pointer">
                                            <div className="relative flex flex-col items-center z-10">
                                                <div className="h-7 w-7 flex items-center justify-center">
                                                    <Icon
                                                        className={`transition-all duration-300 ${pathname === href
                                                            ? 'text-accent scale-75'
                                                            : 'text-white/80 hover:text-white scale-100'
                                                            }`}
                                                    />
                                                </div>
                                                <span
                                                    className={`text-xs font-medium transition-all duration-300 ${pathname === href
                                                        ? 'text-accent opacity-100 translate-y-0'
                                                        : 'opacity-0 -translate-y-2'
                                                        }`}
                                                >
                                                    {label}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                />
                            );
                        }

                        // Regular links for other tabs
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="relative flex items-center justify-center group h-full"
                            >
                                <div className="relative flex flex-col items-center z-10">
                                    <div className="h-7 w-7 flex items-center justify-center">
                                        <Icon
                                            className={`transition-all duration-300 ${pathname === href
                                                ? 'text-accent scale-75'
                                                : 'text-white/80 hover:text-white scale-100'
                                                }`}
                                        />
                                    </div>
                                    <span
                                        className={`text-xs font-medium transition-all duration-300 ${pathname === href
                                            ? 'text-accent opacity-100 translate-y-0'
                                            : 'opacity-0 -translate-y-2'
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </footer>
    );
}