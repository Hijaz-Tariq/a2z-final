"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiFilter} from "react-icons/fi";
import { FaMobileAlt, FaHome, FaBook, FaGamepad, FaCar, FaUtensils } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";

const Navbar = () => {
  const pathname = usePathname();

  // Sample categories data
  const categories = [
    { name: "All", icon: <div className="grid place-items-center w-10 h-10 rounded-full bg-gray-100">ALL</div> },
    { name: "Clothing", icon: <GiLargeDress className="text-xl" /> },
    { name: "Electronics", icon: <FaMobileAlt className="text-xl" /> },
    { name: "Home", icon: <FaHome className="text-xl" /> },
    { name: "Books", icon: <FaBook className="text-xl" /> },
    { name: "Games", icon: <FaGamepad className="text-xl" /> },
    { name: "Food", icon: <FaUtensils className="text-xl" /> },
    { name: "Auto", icon: <FaCar className="text-xl" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 border-b">
        {/* Logo */}
        {/* <Link href="/" className="text-2xl font-bold text-gray-800">
          A2Z-Store
        </Link> */}

        {/* Search Bar */}
        <div className="relative flex-1 max-w-2xl w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <FiSearch className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Action Icons */}
        {/* <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-700 hover:text-red-500 transition-colors">
            <FiHeart className="text-xl" />
            <span className="sr-only">Wishlist</span>
          </button>
          
          <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <FiShoppingCart className="text-xl" />
            <span className="sr-only">Cart</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
            <FiUser className="text-xl" />
            <span className="sr-only">Account</span>
          </button>
        </div> */}
         {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className={`flex flex-col items-center min-w-fit pb-1 border-b-2 ${
                pathname.includes(`/category/${category.name.toLowerCase()}`)
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent hover:border-gray-300 text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                {category.icon}
              </div>
              <span className="text-xs font-medium">{category.name}</span>
            </Link>
          ))}
      </div>

      {/* Categories Bar */}
      {/* <div className="container mx-auto px-4 py-3 overflow-x-auto">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className={`flex flex-col items-center min-w-fit pb-1 border-b-2 ${
                pathname.includes(`/category/${category.name.toLowerCase()}`)
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent hover:border-gray-300 text-gray-600 hover:text-gray-900"
              } transition-colors`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                {category.icon}
              </div>
              <span className="text-xs font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;