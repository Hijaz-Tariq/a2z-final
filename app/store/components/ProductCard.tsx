// //omponents/ProductCard.tsx
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Card } from "@/components/ui/card";
// import { Product } from "@prisma/client";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
// // Ensure the image URL is properly formatted
// const imageUrl = product.mainImage 
//   ? product.mainImage.startsWith('http')
//     ? product.mainImage
//     : `https://utfs.io/f/${product.mainImage}`
//   : null;

//   return (
//     <Card className="h-[400px] overflow-hidden group hover:shadow-lg transition-all duration-300">
//       <Link href={`/store/${product.id}`} className="block h-full">
//         <div className="relative h-[75%] transition-transform duration-300 group-hover:scale-105">
// {imageUrl ? (
//   <Image
//     src={imageUrl}
//     alt={product.name}
//     fill
//     className="object-cover"
//     sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
//     priority={false}
//   />
// ) : (
//   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//     <span className="text-gray-500">No Image</span>
//   </div>
// )}
//         </div>
//         <div className="p-4 h-[25%] flex flex-col justify-center">
//           <h3 className="text-lg font-semibold">{product.name}</h3>
//           <p className="text-primary font-bold mt-2">
//             ${product.price.toFixed(2)}
//             <span className="text-gray-600 text-sm font-normal">/shipment</span>
//           </p>
// {product.averageRating && product.averageRating > 0 && (
//   <div className="flex items-center mt-1">
//     <span className="text-yellow-500">★</span>
//     <span className="text-sm text-gray-600 ml-1">
//       {product.averageRating.toFixed(1)}
//     </span>
//   </div>
// )}
//         </div>
//       </Link>
//     </Card>
//   );
// }

// components/ProductCard.tsx
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Card } from "@/components/ui/card";
// import { Product } from "@prisma/client";
// import { useEffect, useState } from "react";
// import { getProductImage } from "@/utils/product-utils";

// interface ProductCardProps {
//   product: Product;
//   showCountdown?: boolean;
// }

// export function ProductCard({ product, showCountdown = false }: ProductCardProps) {
//   const [timeLeft, setTimeLeft] = useState<string>("");

//   const isOnSale = product.isOnSale &&
//     (product.saleEndsAt === null || new Date(product.saleEndsAt) > new Date());
//   const discountPercentage = isOnSale && product.discountPrice
//     ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
//     : 0;

//   useEffect(() => {
//     if (showCountdown && product.saleEndsAt) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const endDate = new Date(product.saleEndsAt!);
//         const diff = endDate.getTime() - now.getTime();

//         if (diff <= 0) {
//           clearInterval(interval);
//           setTimeLeft("Sale ended");
//           return;
//         }

//         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//         setTimeLeft(`${days}d ${hours}h ${minutes}m`);
//       }, 60000); // Update every minute

//       return () => clearInterval(interval);
//     }
//   }, [product.saleEndsAt, showCountdown]);

//   // Ensure the image URL is properly formatted
//   // const imageUrl = product.mainImage 
//   //   ? product.mainImage.startsWith('http')
//   //     ? product.mainImage
//   //     : `https://utfs.io/f/${product.mainImage}`
//   //   : null;

//   return (
//     <Card className="h-[400px] overflow-hidden group hover:shadow-lg transition-all duration-300 relative">
//       {isOnSale && (
//         <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-md">
//           {discountPercentage}% OFF
//           {showCountdown && product.saleEndsAt && timeLeft && (
//             <div className="text-[0.65rem] font-normal mt-1">
//               Ends in: {timeLeft}
//             </div>
//           )}
//         </div>
//       )}

//       <Link href={`/store/${product.id}`} className="block h-full">
//         <div className="relative h-[75%] transition-transform duration-300 group-hover:scale-105">
//           {getProductImage ? (
//             <Image
//               // src={imageUrl}
//               src={getProductImage({
//                 mainImage: product.mainImage,
//                 images: product.images
//               })}
//               alt={product.name}
//               fill
//               className="object-cover"
//               sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
//               priority={false}
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-500">No Image</span>
//             </div>
//           )}
//         </div>
//         <div className="p-4 h-[25%] flex flex-col justify-center">
//           <h3 className="text-lg font-semibold">{product.name}</h3>
//           <div className="flex items-center gap-2">
//             {isOnSale && product.discountPrice ? (
//               <>
//                 <p className="text-primary font-bold">
//                   ${product.discountPrice.toFixed(2)}
//                 </p>
//                 <p className="text-gray-400 line-through text-sm">
//                   ${product.price.toFixed(2)}
//                 </p>
//               </>
//             ) : (
//               <p className="text-primary font-bold">
//                 ${product.price.toFixed(2)}
//               </p>
//             )}
//             <span className="text-gray-600 text-sm">/shipment</span>
//           </div>
//           {product.averageRating && product.averageRating > 0 && (
//             <div className="flex items-center mt-1">
//               <span className="text-yellow-500">★</span>
//               <span className="text-sm text-gray-600 ml-1">
//                 {product.averageRating.toFixed(1)}
//               </span>
//             </div>
//           )}
//         </div>
//       </Link>
//     </Card>
//   );
// }


//***7/14********01:05am********* */

"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "../../../components/ui/card";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { getProductImage } from "../../../utils/product-utils";

interface ProductCardProps {
  product: Product;
  showCountdown?: boolean;
}

export function ProductCard({ product, showCountdown = false }: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const price = Number(product.price);
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;

  // const isOnSale = product.isOnSale &&
  //   (product.saleEndsAt === null || new Date(product.saleEndsAt) > new Date());
  // const discountPercentage = isOnSale && product.discountPrice
  //   ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
  //   : 0;

  const isOnSale = product.isOnSale &&
    (product.saleEndsAt === null || new Date(product.saleEndsAt) > new Date());
  const discountPercentage = isOnSale && discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  useEffect(() => {
    if (showCountdown && product.saleEndsAt) {
      const interval = setInterval(() => {
        const now = new Date();
        const endDate = new Date(product.saleEndsAt!);
        const diff = endDate.getTime() - now.getTime();

        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft("Sale ended");
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [product.saleEndsAt, showCountdown]);

  return (
    <Card className="h-[400px] overflow-hidden group hover:shadow-lg transition-all duration-300 relative">
      {isOnSale && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-md">
          {discountPercentage}% OFF
          {showCountdown && product.saleEndsAt && timeLeft && (
            <div className="text-[0.65rem] font-normal mt-1">
              Ends in: {timeLeft}
            </div>
          )}
        </div>
      )}

      <Link href={`/store/products/${product.id}`} className="block h-full">
        <div className="relative h-[75%] transition-transform duration-300 group-hover:scale-105">
          {getProductImage ? (
            <Image
              // src={imageUrl}
              src={getProductImage({
                mainImage: product.mainImage,
                images: product.images
              })}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4 h-[25%] flex flex-col justify-center">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="flex items-center gap-2">
            {/* {isOnSale && product.discountPrice ? (
              <>
                <p className="text-primary font-bold">
                  ${product.discountPrice.toFixed(2)}
                </p>
                <p className="text-gray-400 line-through text-sm">
                  ${product.price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-primary font-bold">
                ${product.price.toFixed(2)}
              </p>
            )} */}

            {isOnSale && discountPrice ? (
              <>
                <p className="text-primary font-bold">
                  ${discountPrice.toFixed(2)}
                </p>
                <p className="text-gray-400 line-through text-sm">
                  ${price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-primary font-bold">
                ${price.toFixed(2)}
              </p>
            )}

            <span className="text-gray-600 text-sm">/shipment</span>
          </div>
          {product.averageRating && product.averageRating > 0 && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600 ml-1">
                {product.averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}