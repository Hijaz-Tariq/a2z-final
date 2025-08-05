import { DiamondPercent, BookHeart, Lamp, LayoutDashboard, Wheat, BriefcaseBusiness, Shirt } from 'lucide-react';

export const storeCategories = [
  {
    name: "Discounts & Offers",
    slug: "discounts-offers",
    href: "/allCategories",
    icon: <DiamondPercent className="h-5 w-5" />,
    img: "discounts.jpg"
  },
  {
    name: "All Categories",
    slug: "all-categories",
    href: "/allCategories",
    icon: <LayoutDashboard className="h-5 w-5" />,
    img: "all-categories.webp"
  },
  {
    name: "Food",
    slug: "food",
    href: "/track",
    icon: <Wheat className="h-5 w-5" />,
    img: "food.png"
  },
  {
    name: "Accessories",
    slug: "accessories",
    href: "/rates",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    img: "accessories.jpg"
  },
  {
    name: "Clothes",
    slug: "clothes",
    href: "/locations",
    icon: <Shirt className="h-5 w-5" />,
    img: "clothes.jpg"
  },
  {
    name: "Natural & Organic",
    slug: "natural-organic",
    href: "/support",
    icon: <BookHeart className="h-5 w-5" />,
    img: "natural.jpg"
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    href: "/account",
    icon: <Lamp className="h-5 w-5" />,
    img: "home_decore.jpg"
  }
];