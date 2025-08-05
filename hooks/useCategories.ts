// // hooks/useCategories.ts
// import { useEffect, useState } from 'react';
// // import { DiamondPercent, LayoutDashboard } from 'lucide-react';
// type Category = {
//   id: string;
//   name: string;
//   slug: string;
//   mainImage: string;
//   // Add other fields from your database as needed
// };

// export const useCategories = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('/api/categories');
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const data = await response.json();
//         setCategories(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const categoriesWithSpecials = [
//     {
//       id: 'discounts-offers',
//       name: "Discounts & Offers",
//       slug: "discounts-offers",
//       href: "/allCategories",
//       // icon: <DiamondPercent className="h-5 w-5" />,
//       mainImage: "/products/discounts.jpg",
//       isSpecial: true
//     },
//     {
//       id: 'all-categories',
//       name: "All Categories",
//       slug: "all-categories",
//       href: "/allCategories",
//       // icon: <LayoutDashboard className="h-5 w-5" />,
//       mainImage: "/products/all-categories.webp",
//       isSpecial: true
//     },
//     ...categories // Add the DB categories after special ones
//   ];

//   return { categories: categoriesWithSpecials, loading, error };
// };

// hooks/useCategories.ts
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  mainImage: string | null;
  href?: string;
  isSpecial?: boolean;
  // Add other fields from your database as needed
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [specialCards, setSpecialCards] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const { special, categories: regularCategories } =
          await response.json();

        // Transform special cards to match Category type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedSpecials = special.map((card: any) => ({
          ...card,
          isSpecial: true,
          href:
            card.slug === "discounts-offers"
              ? "/allCategories?filter=discounts"
              : "/allCategories",
        }));

        setSpecialCards(formattedSpecials);
        setCategories(regularCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Combine with special cards first
  const allCategories = [...specialCards, ...categories];

  return {
    categories: allCategories,
    loading,
    error,
    specialCards,
    regularCategories: categories,
  };
};
