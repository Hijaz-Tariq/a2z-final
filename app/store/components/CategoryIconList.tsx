// components/CategoryIconList.tsx
import { useCategories } from '../../../hooks/useCategories';
import { Button } from '../../../components/ui/button';// Adjust import based on your setup
import {
    DiamondPercent,
    BookHeart,
    Lamp,
    LayoutDashboard,
    Wheat,
    BriefcaseBusiness,
    Shirt
} from 'lucide-react';

// Map category names to icons
const getCategoryIcon = (name: string) => {
    switch (name) {
        case 'Discounts & Offers':
            return <DiamondPercent className="h-5 w-5" />;
        case 'All Categories':
            return <LayoutDashboard className="h-5 w-5" />;
        case 'Food':
            return <Wheat className="h-5 w-5" />;
        case 'Accessories':
            return <BriefcaseBusiness className="h-5 w-5" />;
        case 'Clothes':
            return <Shirt className="h-5 w-5" />;
        case 'Natural & Organic':
            return <BookHeart className="h-5 w-5" />;
        case 'Home Decor':
            return <Lamp className="h-5 w-5" />;
        default:
            return <LayoutDashboard className="h-5 w-5" />;
    }
};

export const CategoryIconList = () => {
    const { categories, loading, error } = useCategories();

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex gap-4 overflow-x-auto py-4">
            {categories.map((category) => (
                <div key={category.id} className="flex flex-col items-center gap-2 flex-shrink-0 bg-accent rounded-2xl p-2">
                    <Button className="rounded-full h-14 w-14 p-0 flex items-center justify-center">
                        <div className="text-xl">{getCategoryIcon(category.name)}</div>
                    </Button>
                    <span className="text-primary text-sm whitespace-nowrap">{category.name}</span>
                </div>
            ))}
        </div>
    );
};