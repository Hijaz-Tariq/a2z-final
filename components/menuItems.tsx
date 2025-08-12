// import { MapPin, Headphones, Rocket, WalletCards, User } from 'lucide-react';

// export const menuItems = [
//   {
//     name: "Track Shipment",
//     href: "/track",
//     icon: <Rocket className="h-5 w-5" />
//   },
//   {
//     name: "Shipping Rates",
//     href: "/rates",
//     icon: <WalletCards className="h-5 w-5" />
//   },
//   {
//     name: "Our Locations",
//     href: "/locations",
//     icon: <MapPin className="h-5 w-5" />
//   },
//   {
//     name: "Support",
//     href: "/support",
//     icon: <Headphones className="h-5 w-5" />
//   },
//   {
//     name: "Account",
//     href: "/account",
//     icon: <User className="h-5 w-5" />
//   }
// ];

import { MapPin, Headphones, Rocket, WalletCards, User } from 'lucide-react';

export function getMenuItems(role?: string) {
  const items = [
    { name: "Track Shipment", href: "/track", icon: <Rocket className="h-5 w-5" /> },
    { name: "Shipping Rates", href: "/rates", icon: <WalletCards className="h-5 w-5" /> },
    { name: "Our Locations", href: "/locations", icon: <MapPin className="h-5 w-5" /> },
    { name: "Support", href: "/support", icon: <Headphones className="h-5 w-5" /> },
    { name: "Account", href: "/account", icon: <User className="h-5 w-5" /> },
  ];

  if (role === "ADMIN") {
    items.push({ name: "Admin Panel", href: "/admin", icon: <User className="h-5 w-5" /> });
  }

  return items;
}
