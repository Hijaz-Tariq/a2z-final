// // components/ProductGridCard.tsx
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Card } from "@/components/ui/card";
// import { Product } from "@prisma/client";

// interface ProductGridCardProps {
//   product: Product;
// }

// export function ProductGridCard({ product }: ProductGridCardProps) {
//   const imageUrl = product.mainImage 
//     ? product.mainImage.startsWith('http')
//       ? product.mainImage
//       : `https://utfs.io/f/${product.mainImage}`
//     : null;

//   return (
//     <Card className="h-[300px] overflow-hidden group hover:shadow-lg transition-all duration-300">
//       <Link href={`/store/${product.id}`} className="block h-full">
//         {/* Slightly smaller image section for grid layout */}
//         <div className="relative h-[60%] transition-transform duration-300 group-hover:scale-105">
//           {imageUrl ? (
//             <Image
//               src={imageUrl}
//               alt={product.name}
//               fill
//               className="object-cover"
//               sizes="(max-width: 640px) 160px, 240px"
//               priority={false}
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-500">No Image</span>
//             </div>
//           )}
//         </div>

//         {/* Compact content area */}
//         <div className="p-3 h-[40%] flex flex-col justify-center">
//           <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>
//           <p className="text-primary font-bold mt-1 text-sm">
//             ${product.price.toFixed(2)}
//             <span className="text-gray-600 text-xs font-normal">${product.discountPrice!.toFixed(2)}</span>
//           </p>
//           {product.averageRating && product.averageRating > 0 && (
//             <div className="flex items-center mt-1">
//               <span className="text-yellow-500 text-sm">★</span>
//               <span className="text-xs text-gray-600 ml-1">
//                 {product.averageRating.toFixed(1)}
//               </span>
//             </div>
//           )}
//         </div>
//       </Link>
//     </Card>
//   );
// }



// components/ProductGridCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "../../../components/ui/card";
import { Product } from "@prisma/client";
import { getProductImage } from "../../../utils/product-utils";

interface ProductGridCardProps {
  product: Product;
}

export function ProductGridCard({ product }: ProductGridCardProps) {
  // const imageUrl = product.mainImage
  //   ? product.mainImage.startsWith('http')
  //     ? product.mainImage
  //     : `https://utfs.io/f/${product.mainImage}`
  //   : null;

  const isOnSale = product.isOnSale &&
    (product.saleEndsAt === null || new Date(product.saleEndsAt) > new Date());
  const discountPercentage = isOnSale && product.discountPrice
    ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)
    : 0;

  return (
    <Card className="h-[300px] overflow-hidden group hover:shadow-lg transition-all duration-300 relative py-0 md:py-4">
      {isOnSale && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-md">
          {discountPercentage}% OFF
        </div>
      )}

      <Link href={`/store/${product.id}`} className="block h-full">
        {/* Image section remains compact */}
        <div className="relative h-[60%] transition-transform duration-300 group-hover:scale-105">
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
              sizes="(max-width: 640px) 160px, 240px"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Updated price display to match ProductCard */}
        <div className="p-3 h-[40%] flex flex-col justify-center">
          <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>

          {isOnSale && product.discountPrice ? (
            <div className="flex flex-col mt-1">
              <div className="flex items-baseline gap-1.5">
                <p className="text-primary font-bold text-sm">
                  ${Number(product.discountPrice).toFixed(2)}
                </p>
                <p className="text-gray-400 line-through text-xs">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
              <p className="text-green-600 text-xs mt-0.5">
                Save ${(Number(product.price) - Number(product.discountPrice)).toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-primary font-bold text-sm mt-1">
              ${Number(product.price).toFixed(2)}
              <span className="text-gray-600 text-xs font-normal">/shipment</span>
            </p>
          )}

          {product.averageRating && product.averageRating > 0 && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-xs text-gray-600 ml-1">
                {product.averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}