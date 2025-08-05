// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Funnel, Search } from 'lucide-react';
// import { storeCategories } from './filterItems';

// export function SearchInput() {
//     const [showCategories, setShowCategories] = useState(false);

//     return (
//         <div className="flex-1 max-w-2xl mx-4">
//             <div className="flex items-center w-full">
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowCategories(true)}
//                     className="text-white hover:bg-primary/90"
//                     aria-label="Scan tracking number"
//                 >
//                     <Funnel className="h-6 w-6" />
//                 </Button>
//                 <div className="relative flex-1">
//                     <input
//                         type="text"
//                         placeholder="Search for a product"
//                         className="w-full px-2 py-2 rounded-lg text-gray-900 focus:px-4 focus:py-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-gray-500 bg-white text-sm md:text-base pr-12"

//                     />
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary/70 text-white rounded-lg transition-colors duration-300"
//                         aria-label="Submit tracking number"
//                     >
//                         <Search className="h-4 w-4" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }





'use client';

import { Button } from "./ui/button";
import { Funnel, Search } from 'lucide-react';

interface SearchInputProps {
    onFunnelClick: () => void;
}

export function SearchInput({ onFunnelClick }: SearchInputProps) {
    return (
        <div className="flex-1 max-w-2xl mx-4">
            <div className="flex items-center w-full">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onFunnelClick}
                    className="text-white hover:bg-primary/90"
                    aria-label="Filter categories"
                >
                    <Funnel className="h-6 w-6" />
                </Button>
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search for a product"
                        className="w-full px-2 py-2 rounded-lg text-gray-900 focus:px-4 focus:py-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-gray-500 bg-white text-sm md:text-base pr-12"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary/70 text-white rounded-lg transition-colors duration-300"
                        aria-label="Search products"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}