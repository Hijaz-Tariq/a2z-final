'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getProductImage } from '../../../utils/product-utils'

import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'

interface ProductWithRatingCount {
    discountPrice: number
    id: string
    name: string
    price: number
    mainImage: string
    images: string[]
    averageRating: number
    ratingsCount: number
    isOnSale: boolean
}

const StarIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
    </svg>
)

// const getProductImage = (product: ProductWithRatingCount): string => {

//     if (product.mainImage) {
//         return product.mainImage
//     }

//     if (product.images && product.images.length > 0) {
//         const randomIndex = Math.floor(Math.random() * product.images.length)
//         return product.images[randomIndex]
//     }

//     return '/placeholder-product-image.jpg' 
// }

export const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState<ProductWithRatingCount[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/bestrates', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setBestSellers(data);

            } catch (error) {
                console.error('Failed to fetch bestsellers:', error);
                // setError(error.message);
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchBestSellers();
    }, []);

    if (loading) {
        return (
            <div className="bg-accent/50 text-white py-8 px-4">
                <h2 className="text-2xl font-bold text-center mb-6">Best Sellers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className=" bg-white text-primary rounded-lg overflow-hidden shadow-lg h-96 animate-pulse">
                            <div className="bg-gray-200 h-48 w-full"></div>
                            <div className="p-4 space-y-2">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-10 bg-gray-200 rounded mt-4"></div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-fuchsia-900 text-white py-8 px-4">
                <h2 className="text-2xl font-bold text-center mb-6">Best Sellers</h2>
                <div className="text-center py-8 text-red-200">
                    Error loading best sellers: {error}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-accent/90 text-primary py-2 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Best Reviews</h2>
            <div className="flex overflow-x-auto space-x-0 snap-x md:grid md:grid-cols-3 md:gap-6 max-w-6xl mx-auto">
                {bestSellers.map((product) => (
                    <Card key={product.id} className="min-w-[150px] snap-start flex-shrink-0 md:min-w-0 bg-white text-primary rounded-lg py-0 md:py-6 gap-0 md:gap-6 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <div className="relative h-32 md:h-48 w-full"> {/* Changed height for mobile */}
                            <Image
                                // src={product.mainImage}
                                src={getProductImage({
                                    mainImage: product.mainImage,
                                    images: product.images
                                })}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-2 md:p-4 min-w-64"> {/* Reduced padding on mobile */}
                            <h3 className="font-bold text-sm md:text-lg mb-1 truncate">{product.name}</h3> {/* Smaller text and truncate */}
                            <div className="flex items-center mb-1 md:mb-2"> {/* Reduced margin */}
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(product.averageRating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300 fill-current'}`}
                                    />
                                ))}
                                <span className="ml-1 text-xs md:text-sm text-gray-600">
                                    ({product.ratingsCount})
                                </span>
                            </div>
                            {/* <p className="text-primary font-bold text-base md:text-xl">${product.price.toFixed(2)}</p> */}
                            {product.isOnSale == true ?

                                //   (product.saleEndsAt === null || new Date(product.saleEndsAt) > new Date());
                                // const discountPercentage = isOnSale && product.discountPrice
                                //    Math.round(((product.price - product.discountPrice) / product.price) * 100)
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
                                        {/* Save ${(product.price - product.discountPrice).toFixed(2)} */}
                                    </p>
                                </div>
                                : <p className="text-primary font-bold text-base md:text-xl">${Number(product.price).toFixed(2)}</p>

                            }
                            <Button size="sm" className="w-full mt-2 md:mt-4 text-xs md:text-base bg-primary hover:bg-primary/90">
                                Add to Cart
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}