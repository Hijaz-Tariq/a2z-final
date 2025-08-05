// // components/ProductsGrid.tsx
// "use client";

// import { ProductGridCard } from "./GridCard";
// import { useProducts } from "@/hooks/useProducts";
// import { Skeleton } from "@/components/ui/skeleton";

// interface ProductsGridProps {
//     sortBy?: "newest" | "updated";
// }

// export function ProductsGrid({ sortBy = "newest" }: ProductsGridProps) {
//     const { products, loading, error } = useProducts(sortBy);

//     if (loading) {
//         return (
//             <div className="grid grid-cols-2 gap-4 sm:hidden pt-2">
//                 {[...Array(4)].map((_, i) => (
//                     <Skeleton key={i} className="h-[300px] rounded-lg" />
//                 ))}
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="text-red-500 p-4 sm:hidden">Error: {error}</div>;
//     }

//     return (
//         <div className="grid grid-cols-2 gap-4 sm:hidden pt-2">
//             {products.slice(0, 4).map((product) => (
//                 <ProductGridCard key={product.id} product={product} />
//             ))}
//         </div>
//     );
// }

// components/ProductsGrid.tsx
"use client";

import { ProductGridCard } from "./GridCard";
import { useProducts } from "../../../hooks/useProducts";
import { Skeleton } from "../../../components/ui/skeleton";

interface ProductsGridProps {
    sortBy?: "offers" | "updated" | "newest";
    isForOffersPage?: boolean;
}

export function ProductsGrid({ sortBy = "newest", isForOffersPage = false }: ProductsGridProps) {
    const queryParams = isForOffersPage
        ? { forOffers: "true" }
        : { sort: sortBy };

    const { products, loading, error } = useProducts(queryParams);

    if (loading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:hidden pt-2">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[300px] rounded-lg" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4 sm:hidden">Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:hidden pt-2">
            {products.slice(0, 4).map((product) => (
                <ProductGridCard
                    key={product.id}
                    product={product}
                    // showCountdown={isForOffersPage}
                />
            ))}
        </div>
    );
}