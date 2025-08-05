"use client";

import { useRef } from "react";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { useProducts } from "../../../hooks/useProducts"
import { ProductCard } from "./ProductCard";
import { Skeleton } from "../../../components/ui/skeleton";

export function ScrollableServices() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { products, loading, error } = useProducts();

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (error) {
        return (
            <section className="container mx-auto py-16 px-4">
                <h2 className="mb-8 text-center text-3xl font-bold">Store</h2>
                <div className="text-center text-red-500">{error}</div>
            </section>
        );
    }

    return (
        <section className="container mx-auto py-16 px-4 relative">
            <h2 className="mb-8 text-center text-3xl font-bold">Store</h2>

            {/* Navigation Arrows - Desktop Only */}
            <div className="hidden md:block">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white p-2 rounded-full z-50 transition-all shadow-lg hover:scale-110"
                    aria-label="Scroll left"
                >
                    <SquareChevronLeft className="h-8 w-8" />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white p-2 rounded-full z-50 transition-all shadow-lg hover:scale-110"
                    aria-label="Scroll right"
                >
                    <SquareChevronRight className="h-8 w-8" />
                </button>
            </div>

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex snap-x snap-mandatory overflow-x-auto pb-6 scrollbar-hide md:pb-8"
            >
                <div className="flex space-x-4">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="min-w-[280px] snap-start flex-shrink-0 
                         md:min-w-[320px] lg:min-w-[360px] xl:min-w-[400px]"
                            >
                                <Skeleton className="h-[400px] w-full" />
                            </div>
                        ))
                    ) : (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="min-w-[280px] snap-start flex-shrink-0 
                         md:min-w-[320px] lg:min-w-[360px] xl:min-w-[400px]"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}


