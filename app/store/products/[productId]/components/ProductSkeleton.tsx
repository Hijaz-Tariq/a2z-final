// components/ProductSkeleton.tsx
import { ChevronLeft, Heart } from 'lucide-react';

export default function ProductSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image section skeleton */}
                    <div className="lg:w-2/3 flex flex-col lg:flex-row gap-4">
                        {/* Thumbnails skeleton - Desktop */}
                        <div className="hidden lg:flex flex-col gap-2 w-20">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-20 h-20 bg-gray-200 rounded-md animate-pulse"
                                />
                            ))}
                        </div>

                        {/* Main image skeleton */}
                        <div className="relative w-full aspect-square lg:aspect-[3/2] bg-gray-200 animate-pulse">
                            <div className="absolute top-4 left-4 z-20 p-2 bg-gray-300 rounded-full">
                                <ChevronLeft className="opacity-0" />
                            </div>
                            <div className="absolute top-4 right-4 z-20 p-2 bg-gray-300 rounded-full">
                                <Heart className="opacity-0" />
                            </div>
                        </div>

                        {/* Thumbnails skeleton - Mobile */}
                        <div className="lg:hidden flex gap-2 py-2 overflow-x-auto">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-[0_0_20%] h-16 bg-gray-200 rounded-md animate-pulse"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product details skeleton */}
                    <div className="lg:w-1/3 flex flex-col justify-between gap-6 h-full">
                        {/* Product name skeleton */}
                        <div className="lg:h-1/4">
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        </div>

                        {/* Rating skeleton */}
                        <div className="lg:h-1/4 flex items-center">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                                ))}
                                <div className="ml-2 w-8 h-5 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Description skeleton */}
                        <div className="lg:h-1/4 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                        </div>

                        {/* Price & Add to Cart skeleton */}
                        <div className="lg:h-1/4 bg-gray-50 p-4 rounded-lg lg:sticky lg:bottom-4 space-y-4">
                            <div className="flex justify-between">
                                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <div className="flex justify-around gap-2">
                                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}