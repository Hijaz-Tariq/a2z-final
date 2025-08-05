// // components/CategoryGrid.tsx
// import Image from 'next/image';
// import { useCategories } from '@/hooks/useCategories';
// import { Card } from '@/components/ui/card';

// export const CategoryGrid = () => {
//     const { categories, loading, error } = useCategories();

//     if (loading) return <div>Loading categories...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         // <div className="flex gap-4 overflow-x-auto pb-4">
//         //     {categories.map((category) => (
//         //         <Card key={category.id} className="flex-shrink-0 w-40 h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//         //             <div className="relative h-32 w-full">
//         //                 <Image
//         //                     src={category.mainImage}
//         //                     alt={category.name}
//         //                     fill
//         //                     className="object-cover"
//         //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         //                 />
//         //             </div>
//         //             <div className="text-center">
//         //                 <h3 className="font-medium text-primary">{category.name}</h3>
//         //             </div>
//         //         </Card>
//         //     ))}
//         // </div>

//         <div className="flex gap-4 overflow-x-auto pb-4">
//             {categories.map((category) => (
//                 <Card key={category.id} className="flex-shrink-0 w-40 h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//                     <div className="relative h-32 w-full">
//                         {category.mainImage ? (
//                             <Image
//                                 src={category.mainImage}
//                                 alt={category.name}
//                                 fill
//                                 className="object-cover"
//                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                             />
//                         ) : (
//                             <div className="bg-gray-100 w-full h-full flex items-center justify-center">
//                                 <span className="text-gray-400">No image</span>
//                             </div>
//                         )}
//                     </div>
//                     <div className="p-2 text-center">
//                         <h3 className="font-medium text-primary">{category.name}</h3>
//                     </div>
//                 </Card>
//             ))}
//         </div>

//     );
// };

//**********************************25-7 */

// components/CategoryGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { useCategories } from "../../../hooks/useCategories";
import { Card } from "../../../components/ui/card";

export const CategoryGrid = () => {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col">
      {/* Categories row */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/store/categories/${category.slug || "MISSING_SLUG"}`}
            passHref
          >
            <Card
              key={category.id}
              className="flex-shrink-0 w-40 h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-32 w-full">
                {category.mainImage ? (
                  <Image
                    src={category.mainImage}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-2 text-center">
                <h3 className="font-medium text-primary">{category.name}</h3>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
