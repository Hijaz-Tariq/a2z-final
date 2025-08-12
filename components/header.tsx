// // 'use client';

// // import { useState } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Menu, X, ShoppingCartIcon } from 'lucide-react';
// // import Link from 'next/link';
// // import { menuItems } from './menuItems';
// // // import { filterItems } from './menuItems';
// // import { TrackingInput } from './track'; // Import the tracking component
// // import { SearchInput } from "./search";
// // import { usePathname } from 'next/navigation';

// // export default function Header() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const pathname = usePathname();
// //   const storeRoute = pathname.startsWith('/store');
// //   return (
// //     <header className="bg-primary text-white py-4 relative">
// //       <div className="container mx-auto px-4 flex justify-between items-center">
// //         {/* Mobile Menu Button */}
// //         <div className="flex-none">
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="text-white hover:bg-primary/90 -ml-2"
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// //             aria-label="Open menu"
// //           >
// //             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
// //           </Button>
// //         </div>

// //         {/* Mobile Menu Overlay (keep this the same) */}
// //         {isMenuOpen && (
// //           <div className="fixed inset-0 z-9999 bg-black/50" onClick={() => setIsMenuOpen(false)}>
// //             <div className="absolute left-0 top-0 h-full max-w-2xl bg-primary p-6 space-y-4"
// //               onClick={(e) => e.stopPropagation()}>
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 className="absolute right-4 top-4 text-white"
// //                 onClick={() => setIsMenuOpen(false)}
// //                 aria-label="Close menu"
// //               >
// //                 <X className="h-6 w-6" />
// //               </Button>

// //               <nav className="mt-12 space-y-4">
// //                 {menuItems.map((item) => (
// //                   <Link
// //                     key={item.href}
// //                     href={item.href}
// //                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/80 transition-colors"
// //                     onClick={() => setIsMenuOpen(false)}
// //                   >
// //                     {item.icon}
// //                     <span className="text-lg">{item.name}</span>
// //                   </Link>
// //                 ))}
// //               </nav>
// //             </div>
// //           </div>
// //         )}

// //         {/* Center: Use TrackingInput component */}

// //         {storeRoute ?
// //           <SearchInput />
// //           : <TrackingInput />}

// //         {/* Right: Cart */}
// //         <div className="flex-none">
// //           <Link href="/cart">
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               className="text-white hover:bg-primary/90 -mr-2"
// //               aria-label="View cart"
// //             >
// //               <ShoppingCartIcon className="h-6 w-6" />
// //             </Button>
// //           </Link>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }



// 'use client';

// import { useState } from 'react';
// import { Button } from './ui/button';
// import { Menu, X, ShoppingCartIcon } from 'lucide-react';
// import Link from 'next/link';
// import { menuItems } from './menuItems';
// import { TrackingInput } from './track';
// import { SearchInput } from "./search";
// import { usePathname } from 'next/navigation';
// import { storeCategories } from './filterItems';

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const pathname = usePathname();
//   const storeRoute = pathname.startsWith('/store');

//   return (
//     <>
//       <header className="bg-primary text-white py-4 relative">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           {/* Mobile Menu Button */}
//           <div className="flex-none">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-white hover:bg-primary/90 -ml-2"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Open menu"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>

//           {/* Mobile Menu Overlay */}
//           {isMenuOpen && (
//             <div className="fixed inset-0 z-9999 bg-black/50" onClick={() => setIsMenuOpen(false)}>
//               <div className="absolute left-0 top-0 h-full max-w-2xl bg-primary p-6 space-y-4"
//                 onClick={(e) => e.stopPropagation()}>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-4 top-4 text-white"
//                   onClick={() => setIsMenuOpen(false)}
//                   aria-label="Close menu"
//                 >
//                   <X className="h-6 w-6" />
//                 </Button>

//                 <nav className="mt-12 space-y-4">
//                   {menuItems.map((item) => (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/80 transition-colors"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {item.icon}
//                       <span className="text-lg">{item.name}</span>
//                     </Link>
//                   ))}
//                 </nav>
//               </div>
//             </div>
//           )}

//           {/* Center: Search or Tracking */}
//           {storeRoute ?
//             <SearchInput onFunnelClick={() => setShowCategories(!showCategories)} />
//             : <TrackingInput />}

//           {/* Right: Cart */}
//           <div className="flex-none">
//             <Link href="/cart">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white hover:bg-primary/90 -mr-2"
//                 aria-label="View cart"
//               >
//                 <ShoppingCartIcon className="h-6 w-6" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Categories Bar */}
//       {/* {storeRoute && showCategories && (
//         <div className=" py-3 overflow-x-auto">
//           <div className="container mx-auto px-4">
//             <div className="flex space-x-6 min-w-max justify-center">
//               {storeCategories.map((category) => (
//                 // <Link
//                 //   key={category.name}
//                 //   href={category.href || '#'}
//                 //   className="flex flex-col items-center space-y-1 min-w-[80px]"
//                 // >
//                 //   <div className="p-2 bg-gray-100 rounded-full">
//                 //     {category.icon}
//                 //   </div>
//                 //   <span className="text-xs text-gray-700">{category.name}</span>
//                 // </Link>
//                 <>
//                   <Button
//                     key={category.name}
//                     variant="ghost"
//                     size="icon"
//                     className="flex flex-col items-center space-y-1 min-w-[80px] bg-accent/50"
//                     onClick={() => setIsMenuOpen(false)}
//                     aria-label="Close menu"
//                   >
//                     <div className="p-2 bg-gray-100 rounded-full">
//                       {category.icon}
//                     </div>
//                     <span className="text-xs text-gray-700">{category.name}</span>
//                   </Button>
//                 </>
//               ))}
//             </div>
//           </div>
//         </div>
//       )} */}

//       {storeRoute && showCategories && (
//         <div className=" py-3 overflow-x-auto no-scrollbar">
//           <div className="container mx-auto px-4">
//             <div className="flex space-x-4 min-w-max justify-center">
//               {/* {storeCategories.map((category) => (
//                 <Button
//                   key={category.name}
//                   variant="ghost"
//                   className="flex flex-col items-center space-y-1 min-w-[80px] px-2 bg-accent/50"
//                 >
//                   <div className="p-2 bg-gray-100 rounded-full">
//                     {category.icon}
//                   </div>
//                   <span className="text-xs text-gray-700 whitespace-nowrap">
//                     {category.name}
//                   </span>
//                 </Button>
//               ))} */}
//               {storeCategories.map((category) => (
//                 <div key={category.name} className="flex flex-col items-center gap-2 flex-shrink-0 bg-accent rounded-2xl p-2">
//                   <Button
//                     className="rounded-full h-14 w-14 p-0 flex items-center justify-center"
//                   >
//                     <div className="text-xl">{category.icon}</div>
//                   </Button>
//                   <span className="text-primary text-sm whitespace-nowrap">{category.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//     </>
//   );
// }

'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { getMenuItems} from './menuItems';
import { TrackingInput } from './track';
import { SearchInput } from "./search";
import { usePathname } from 'next/navigation';
import { storeCategories } from './filterItems';
import { Cart } from '@/store/components/Cart';
import { useSession } from 'next-auth/react';
export default function Header() {
    const { data: session } = useSession();
  const role = session?.user?.role;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const pathname = usePathname();
  const storeRoute = pathname.startsWith('/store');
  const menuItems = getMenuItems(role);
  return (
    <>
      <header className="bg-primary text-white py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div className="flex-none">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-primary/90 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-9999 bg-black/50" onClick={() => setIsMenuOpen(false)}>
              <div className="absolute left-0 top-0 h-full max-w-2xl bg-primary p-6 space-y-4"
                onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 text-white"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>

                <nav className="mt-12 space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/80 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="text-lg">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Center: Search or Tracking */}
          {storeRoute ?
            <SearchInput onFunnelClick={() => setShowCategories(!showCategories)} />
            : <TrackingInput />}

          {/* Right: Cart */}
          {/* <div className="flex-none">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-primary/90 -mr-2"
              onClick={() => setIsCartOpen(true)}
              aria-label="View cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </Button>
          </div> */}
          <Cart />
        </div>
      </header>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-9999 bg-black/50" onClick={() => setIsCartOpen(false)}>
          <div className="absolute right-0 top-0 h-full max-w-2xl w-full bg-white p-6 text-gray-900"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Cart Content */}
            <div className="space-y-4">
              {/* Replace with your actual cart items */}
              <div className="p-4 border rounded-lg">
                <p>Cart Item 1</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p>Cart Item 2</p>
              </div>
              
              {/* Checkout Button */}
              <Button className="w-full mt-6">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

      {storeRoute && showCategories && (
        <div className="py-3 overflow-x-auto no-scrollbar">
          <div className="container mx-auto px-4">
            <div className="flex space-x-4 min-w-max justify-center">
              {storeCategories.map((category) => (
                <div key={category.name} className="flex flex-col items-center gap-2 flex-shrink-0 bg-accent rounded-2xl p-2">
                  <Button
                    className="rounded-full h-14 w-14 p-0 flex items-center justify-center"
                  >
                    <div className="text-xl">{category.icon}</div>
                  </Button>
                  <span className="text-primary text-sm whitespace-nowrap">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}