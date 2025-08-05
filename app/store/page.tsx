// // 'use client'

// // import * as React from 'react'
// // import { Button } from '@/components/ui/button';
// // import Image from 'next/image';
// // import { useEffect, useState } from 'react';
// // import { ProductsGrid } from './components/productsGrid';
// // import { storeCategories } from '@/components/filterItems';
// // import { Card } from '@/components/ui/card';
// // import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import EmblaCarousel from './components/EmblaCarousel';
// // import { EmblaOptionsType } from 'embla-carousel'
// // import '../styles/embla.css'
// // import { BestSellers } from './components/bestRates';
// // const StorePage = () => {

// //   const productImages = [
// //     '/products/1.webp',
// //     '/products/2.webp',
// //     '/products/3.webp',
// //     '/products/a.jpg',
// //     '/products/b.avif',
// //     '/products/c.jpg',
// //   ];

// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   // const [sortBy, setSortBy] = useState<"newest" | "updated">("newest");
// //   const [sortBy, setSortBy] = useState<"offers" | "newest">("offers");
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentImageIndex((prevIndex) =>
// //         prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
// //       );
// //     }, 300000);

// //     return () => clearInterval(interval);
// //   }, [productImages.length]);

// //   // const OPTIONS: EmblaOptionsType = {}
// //   const SLIDE_COUNT = 5
// //   const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

// //   return (
// //     <div className="pb-8">
// //       {/* Hero Image Slider */}
// //       <div className="relative w-full h-64 md:h-80 lg:h-96">
// //         <Image
// //           src={productImages[currentImageIndex]}
// //           alt={`Product ${currentImageIndex + 1}`}
// //           fill
// //           className="object-cover"
// //           priority
// //         />
// //         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
// //           <Button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg text-lg">
// //             Shop All!
// //           </Button>
// //         </div>
// //       </div>
// //       {/* New Items Section */}
// //       <div className="text-accent pt-4">
// //         <Tabs
// //           value={sortBy}
// //           onValueChange={(value) => setSortBy(value as "offers" | "newest")}
// //           className='w-full flex justify-center sm:hidden'
// //         >
// //           <TabsList className='w-full'>
// //             <TabsTrigger value='offers'>Offers & Discounts</TabsTrigger>
// //             <TabsTrigger value="newest">Recently Added</TabsTrigger>
// //           </TabsList>
// //         </Tabs>
// //         <ProductsGrid sortBy={sortBy} isForOffersPage={sortBy === "offers"} />
// //         <div className="hidden sm:flex w-full mt-4 px-4"> {/* Added px-4 for container padding */}
// //           <div className="flex-1 mr-2"> {/* Takes half width minus gap */}
// //             {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
// //             <EmblaCarousel slides={SLIDES}/>
// //           </div>
// //           <div className="flex-1 ml-2"> {/* Takes half width minus gap */}
// //             {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
// //             <EmblaCarousel slides={SLIDES}/>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Categories Section */}
// //       <div className="bg-accent/10 py-6 px-4">
// //         <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
// //         <div className="flex overflow-x-auto pb-4 gap-4 px-2 justify-center">
// //           {storeCategories.map((category) => (
// //             <Card key={category.name} className="flex-shrink-0 w-40 h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
// //               <div className="relative h-32 w-full">
// //                 <Image
// //                   key={category.name}
// //                   src={`/products/${category.icon}`}
// //                   alt={category.name}
// //                   fill
// //                   className="object-cover"
// //                 />
// //               </div>
// //               <div className="p-3 text-center">
// //                 <h3 className="font-medium text-primary">{category.name}</h3>
// //               </div>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>
// //       <BestSellers />
// //     </div>
// //   );
// // }

// // export default StorePage;


// // // 'use client'

// // // import * as React from 'react'

// // // import { Button } from '@/components/ui/button';
// // // import Image from 'next/image';
// // // import { useEffect, useState } from 'react';
// // // import { ProductsGrid } from './components/productsGrid';
// // // import { storeCategories } from '@/components/filterItems';
// // // import { Card } from '@/components/ui/card';
// // // import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // import EmblaCarousel from './components/EmblaCarousel';
// // // import { EmblaOptionsType } from 'embla-carousel'
// // // import '../styles/embla.css'
// // // import { BestSellers } from './components/bestRates';
// // // const StorePage = () => {

// // //   const discountProducts = [
// // //     { id: 1, name: 'Summer Sale', discount: '30% OFF', image: '/products/sale1.jpg' },
// // //     { id: 2, name: 'Clearance', discount: '50% OFF', image: '/products/sale2.jpg' }
// // //   ]

// // //   const newProducts = [
// // //     { id: 1, name: 'New Arrival', tag: 'Just Added', image: '/products/new1.jpg' },
// // //     { id: 2, name: 'Latest Model', tag: 'Featured', image: '/products/new2.jpg' }
// // //   ]

// // //   const productImages = [
// // //     '/products/1.webp',
// // //     '/products/2.webp',
// // //     '/products/3.webp',
// // //     '/products/a.jpg',
// // //     '/products/b.avif',
// // //     '/products/c.jpg',
// // //   ];

// // //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// // //   // const [sortBy, setSortBy] = useState<"newest" | "updated">("newest");
// // //   const [sortBy, setSortBy] = useState<"offers" | "newest">("offers");
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       setCurrentImageIndex((prevIndex) =>
// // //         prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
// // //       );
// // //     }, 300000);

// // //     return () => clearInterval(interval);
// // //   }, [productImages.length]);

// // //   const OPTIONS: EmblaOptionsType = {}
// // //   const SLIDE_COUNT = 5
// // //   const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

// // //   return (
// // //     <div className="pb-8">
// // //       {/* Hero Image Slider */}
// // //       <div className="relative w-full h-64 md:h-80 lg:h-96">
// // //         <Image
// // //           src={productImages[currentImageIndex]}
// // //           alt={`Product ${currentImageIndex + 1}`}
// // //           fill
// // //           className="object-cover"
// // //           priority
// // //         />
// // //         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
// // //           <Button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg text-lg">
// // //             Shop All!
// // //           </Button>
// // //         </div>
// // //       </div>
// // //       {/* New Items Section */}
// // //       <div className="text-accent pt-4">
// // //         <Tabs
// // //           value={sortBy}
// // //           onValueChange={(value) => setSortBy(value as "offers" | "newest")}
// // //           className='w-full flex justify-center sm:hidden'
// // //         >
// // //           <TabsList className='w-full'>
// // //             <TabsTrigger value='offers'>Offers & Discounts</TabsTrigger>
// // //             <TabsTrigger value="newest">Recently Added</TabsTrigger>
// // //           </TabsList>
// // //         </Tabs>
// // //         <ProductsGrid sortBy={sortBy} isForOffersPage={sortBy === "offers"} />
// // //         {/* <div className="hidden sm:flex w-full mt-4 px-4"> 
// // //           <div className="flex-1 mr-2"> 
// // //             <EmblaCarousel slides={SLIDES} options={OPTIONS} />
// // //           </div>
// // //           <div className="flex-1 ml-2">
// // //             <EmblaCarousel slides={SLIDES} options={OPTIONS} />
// // //           </div>
// // //         </div> */}

// // //         {/* Desktop Carousels */}
// // //         <div className="hidden sm:block space-y-8 pt-8 px-4">
// // //           {/* Discounts Carousel */}
// // //           <EmblaCarousel
// // //             title="Offers & Discounts"
// // //             slides={discountProducts.map(product => (
// // //               <DiscountProductCard key={product.id} product={product} />
// // //             ))}
// // //             options={OPTIONS}
// // //           />

// // //           {/* New Products Carousel */}
// // //           <EmblaCarousel
// // //             title="Recently Added"
// // //             slides={newProducts.map(product => (
// // //               <NewProductCard key={product.id} product={product} />
// // //             ))}
// // //             options={OPTIONS}
// // //           />
// // //         </div>

// // //       </div>

// // //       {/* Categories Section */}
// // //       <div className="bg-accent/10 py-6 px-4">
// // //         <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
// // //         <div className="flex overflow-x-auto pb-4 gap-4 px-2 justify-center">
// // //           {storeCategories.map((category) => (
// // //             <Card key={category.name} className="flex-shrink-0 w-40 h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
// // //               <div className="relative h-32 w-full">
// // //                 <Image
// // //                   key={category.name}
// // //                   src={`/products/${category.icon}`}
// // //                   alt={category.name}
// // //                   fill
// // //                   className="object-cover"
// // //                 />
// // //               </div>
// // //               <div className="p-3 text-center">
// // //                 <h3 className="font-medium text-primary">{category.name}</h3>
// // //               </div>
// // //             </Card>
// // //           ))}
// // //         </div>
// // //       </div>
// // //       <BestSellers />
// // //     </div>
// // //   );
// // // }

// // // export default StorePage;

// ////////////////////////////////////////////////////////////////////// 14:42

// 'use client'

// import * as React from 'react'
// import { Product } from '@prisma/client';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { ProductsGrid } from './components/productsGrid';
// // import { storeCategories } from '@/components/filterItems';
// // import { Card } from '@/components/ui/card';
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import EmblaCarousel from './components/EmblaCarousel';
// // import { EmblaOptionsType } from 'embla-carousel'
// import '../styles/embla.css'
// import { BestSellers } from './components/bestRates';
// import { CategoryGrid } from './components/CategoryGrid';

// type LoadingState = {
//   offers: boolean;
//   newest: boolean;
// };

// type ErrorState = {
//   offers: string | null;
//   newest: string | null;
// };
// const StorePage = () => {
//   const productImages = [
//     '/products/1.webp',
//     '/products/2.webp',
//     '/products/3.webp',
//     '/products/a.jpg',
//     '/products/b.avif',
//     '/products/c.jpg',
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [sortBy, setSortBy] = useState<"offers" | "newest">("offers");
//   const [offersProducts, setOffersProducts] = useState<Product[]>([]);
//   const [newestProducts, setNewestProducts] = useState<Product[]>([]);
//   // const [loading, setLoading] = useState({
//   //   offers: true,
//   //   newest: true
//   // });
//   // const [error, setError] = useState({
//   //   offers: null,
//   //   newest: null
//   // });

//   const [loading, setLoading] = useState<LoadingState>({
//     offers: true,
//     newest: true
//   });
//   const [error, setError] = useState<ErrorState>({
//     offers: null,
//     newest: null
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 300000);

//     return () => clearInterval(interval);
//   }, [productImages.length]);

//   // Fetch both offers and newest products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Fetch offers
//         // const offersRes = await fetch('/api/products?forOffers=true');
//         const offersRes = await fetch('/api/products?forOffers=true');
//         if (!offersRes.ok) throw new Error('Failed to fetch offers');
//         const offersData = await offersRes.json();
//         setOffersProducts(offersData);

//         // Fetch newest
//         const newestRes = await fetch('/api/products?sort=newest');
//         const newestData = await newestRes.json();
//         setNewestProducts(newestData);

//         setLoading({ offers: false, newest: false });
//       } catch (err) {
//         // setError({
//         //   offers: err instanceof Error ? err.message : 'Failed to load offers',
//         //   newest: err instanceof Error ? err.message : 'Failed to load newest products'
//         // });
//         const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
//         setError({
//           offers: errorMessage,
//           newest: errorMessage
//         });
//         setLoading({ offers: false, newest: false });
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="pb-8">
//       {/* Hero Image Slider */}
//       <div className="relative w-full h-64 md:h-80 lg:h-96">
//         <Image
//           src={productImages[currentImageIndex]}
//           alt={`Product ${currentImageIndex + 1}`}
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
//           <Button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg text-lg">
//             Shop All!
//           </Button>
//         </div>
//       </div>

//       {/* New Items Section */}
//       <div className="text-accent pt-4">
//         <Tabs
//           value={sortBy}
//           onValueChange={(value) => setSortBy(value as "offers" | "newest")}
//           className='w-full flex justify-center sm:hidden'
//         >
//           <TabsList className='w-full'>
//             <TabsTrigger value='offers'>Offers & Discounts</TabsTrigger>
//             <TabsTrigger value="newest">Recently Added</TabsTrigger>
//           </TabsList>
//         </Tabs>
//         <ProductsGrid sortBy={sortBy} isForOffersPage={sortBy === "offers"} />

//         {/* Desktop View - Two Carousels */}
//         <div className="hidden sm:flex w-full mt-4 px-4 gap-4">
//           <div className="flex-1 bg-accent/90 rounded-xl">
//             <h3 className="text-xl font-bold text-primary mb-2 ml-4">Hot Offers</h3>
//             {loading.offers ? (
//               <div className="flex gap-4">
//                 {[...Array(4)].map((_, i) => (
//                   <div key={`offer-skel-${i}`} className="h-64 w-48 bg-gray-200 rounded-lg animate-pulse" />
//                 ))}
//               </div>
//             ) : error.offers ? (
//               <div className="text-red-500 p-4">{error.offers}</div>
//             ) : (
//               <EmblaCarousel
//                 slides={offersProducts.slice(0, 8)}
//                 isProductCarousel={true}
//               />
//             )}
//           </div>

//           <div className="flex-1 bg-accent/90 rounded-xl">
//             <h3 className="text-xl text-primary font-bold mb-2 ml-4">New Arrivals</h3>
//             {loading.newest ? (
//               <div className="flex gap-4">
//                 {[...Array(4)].map((_, i) => (
//                   <div key={`newest-skel-${i}`} className="h-64 w-48 bg-gray-200 rounded-lg animate-pulse" />
//                 ))}
//               </div>
//             ) : error.newest ? (
//               <div className="text-red-500 p-4">{error.newest}</div>
//             ) : (
//               <EmblaCarousel
//                 slides={newestProducts.slice(0, 8)}
//                 isProductCarousel={true}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Categories Section */}
//       <div className="bg-accent/10 py-6 px-4">
//         <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
//         <div className="flex overflow-x-auto pb-4 gap-4 px-2 justify-center">
//           {/* {storeCategories.map((category) => (
//             <Card key={category.name} className="flex-shrink-0 w-40 h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//               <div className="relative h-32 w-full">
//                 <Image
//                   key={category.name}
//                   src={`/products/${category.img}`}
//                   alt={category.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="text-center">
//                 <h3 className="font-medium text-primary">{category.name}</h3>
//               </div>
//             </Card>
//           ))} */}
//            <CategoryGrid />
//         </div>
//       </div>

//       <BestSellers />
//     </div>
//   );
// }

// export default StorePage;

'use client'

import * as React from 'react'
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './components/productsGrid';
// import { storeCategories } from '@/components/filterItems';
// import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import EmblaCarousel from './components/EmblaCarousel';
// import { EmblaOptionsType } from 'embla-carousel'
import '../styles/embla.css'
import { BestSellers } from './components/bestRates';
import { Product } from '@prisma/client';
import { CategoryGrid } from './components/CategoryGrid';
import Link from 'next/link';

type LoadingState = {
  offers: boolean;
  newest: boolean;
};

type ErrorState = {
  offers: string | null;
  newest: string | null;
};
const StorePage = () => {
  const productImages = [
    '/products/1.webp',
    '/products/2.webp',
    '/products/3.webp',
    '/products/a.jpg',
    '/products/b.avif',
    '/products/c.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sortBy, setSortBy] = useState<"offers" | "newest">("offers");
  const [offersProducts, setOffersProducts] = useState<Product[]>([]);
  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState<LoadingState>({
    offers: true,
    newest: true
  });
  const [error, setError] = useState<ErrorState>({
    offers: null,
    newest: null
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 300000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  // Fetch both offers and newest products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const offersRes = await fetch('/api/products?forOffers=true');
        if (!offersRes.ok) throw new Error('Failed to fetch offers');
        const offersData = await offersRes.json();
        setOffersProducts(offersData);

        // Fetch newest
        const newestRes = await fetch('/api/products?sort=newest');
        const newestData = await newestRes.json();
        setNewestProducts(newestData);

        setLoading({ offers: false, newest: false });
      } catch (err) {
  const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
        setError({
          offers: errorMessage,
          newest: errorMessage
        });
        setLoading({ offers: false, newest: false });
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pb-8">
      {/* Hero Image Slider */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src={productImages[currentImageIndex]}
          alt={`Product ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg text-lg">
            Shop All!
          </Button>
        </div>
      </div>

      {/* New Items Section */}
      <div className="text-accent pt-4">
        <Tabs
          value={sortBy}
          onValueChange={(value) => setSortBy(value as "offers" | "newest")}
          className='w-full flex justify-center sm:hidden'
        >
          <TabsList className='w-full'>
            <TabsTrigger value='offers'>Offers & Discounts</TabsTrigger>
            <TabsTrigger value="newest">Recently Added</TabsTrigger>
          </TabsList>
        </Tabs>
        <ProductsGrid sortBy={sortBy} isForOffersPage={sortBy === "offers"} />

        {/* Desktop View - Two Carousels */}
        <div className="hidden sm:flex w-full mt-4 px-4 gap-4">
          <div className="flex-1 bg-accent/90 rounded-xl">
            <h3 className="text-xl font-bold text-primary mb-2 ml-4">Hot Offers</h3>
            {loading.offers ? (
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={`offer-skel-${i}`} className="h-64 w-48 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : error.offers ? (
              <div className="text-red-500 p-4">{error.offers}</div>
            ) : (
              <EmblaCarousel
                slides={offersProducts.slice(0, 8)}
                isProductCarousel={true}
              />
            )}
          </div>

          <div className="flex-1 bg-accent/90 rounded-xl">
            <h3 className="text-xl text-primary font-bold mb-2 ml-4">New Arrivals</h3>
            {loading.newest ? (
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={`newest-skel-${i}`} className="h-64 w-48 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : error.newest ? (
              <div className="text-red-500 p-4">{error.newest}</div>
            ) : (
              <EmblaCarousel
                slides={newestProducts.slice(0, 8)}
                isProductCarousel={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-accent/10 py-6 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
        <div className="flex overflow-x-auto gap-4 px-2 justify-center">
          <CategoryGrid />
        </div>
        <div className="flex justify-end mt-2">
          <Link href="/store/categories/all-categories">
            <h5 className="text-primary hover:underline cursor-pointer pb-4">
              See All →
            </h5>
          </Link>
        </div>
      </div>

      <BestSellers />
    </div>
  );
}

export default StorePage;