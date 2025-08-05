// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { Product } from "@prisma/client";

// interface ProductCardProps {
//     product?: Product; // Make optional
// }

// function ProductCard({ product }: ProductCardProps) {
//     // Handle undefined product
//     if (!product) {
//         return (
//             <div className="h-full rounded-lg overflow-hidden shadow-md bg-gray-100 animate-pulse">
//                 <div className="h-48 w-full bg-gray-200" />
//                 <div className="p-4 space-y-2">
//                     <div className="h-5 w-3/4 bg-gray-200 rounded" />
//                     <div className="h-4 w-1/2 bg-gray-200 rounded" />
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <Link href={`/store/products/${product.id}`} scroll={false} passHref>
//             <motion.div
//                 className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//                 initial={{ scale: 0.95 }}
//                 whileHover={{ scale: 0.98 }}
//                 whileTap={{ scale: 0.96 }}
//                 transition={{ type: "spring", bounce: 0.4 }}
//             >
//                 <div className="relative h-48 w-full">
//                     {product.images?.[0] ? (
//                         <motion.div
//                             layoutId={`product-image-${product.id}`}
//                             transition={{ type: "spring", bounce: 0.2 }}
//                         >
//                             <Image
//                                 src={product.images[0]}
//                                 alt={product.name || "Product image"}
//                                 fill
//                                 className="object-cover"
//                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                             />
//                         </motion.div>
//                     ) : (
//                         <div className="bg-gray-100 w-full h-full flex items-center justify-center">
//                             <span className="text-gray-400">No image</span>
//                         </div>
//                     )}
//                 </div>
//                 <div className="p-4">
//                     <h3 className="font-medium text-lg truncate">
//                         {product.name || "Unnamed Product"}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-2">
//                         {product.discountPrice ? (
//                             <>
//                                 <span className="text-red-500 font-semibold">
//                                     ${product.discountPrice.toFixed(2)}
//                                 </span>
//                                 <span className="text-gray-400 line-through text-sm">
//                                     ${product.price?.toFixed(2)}
//                                 </span>
//                             </>
//                         ) : (
//                             <span className="text-gray-600">
//                                 ${product.price?.toFixed(2)}
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>
//         </Link>
//     );
// }

// export default ProductCard;

'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const products = [
    {
        id: '1',
        name: 'Product 1',
        price: 29.99,
        image: '/products/1.webp'
    },
    // ... more products
];

export default function ProductsPage() {
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {products.map((product) => (
                <Link
                    href={`/store/products/${product.id}`}
                    key={product.id}
                    scroll={false}
                >
                    <motion.div
                        className="bg-white rounded-lg overflow-hidden shadow-md"
                        layoutId={`product-${product.id}`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', bounce: 0.4 }}
                    >
                        <motion.div
                            className="relative h-48 w-full"
                            layoutId={`image-${product.id}`}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </motion.div>
                        <div className="p-3">
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-gray-600">${product.price}</p>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}