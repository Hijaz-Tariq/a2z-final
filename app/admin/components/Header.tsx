// // Header.tsx
// "use client";
// import { Menu, Search, Bell } from "lucide-react";

// export default function Header({ searchQuery, setSearchQuery, setSidebarOpen }) {
//   return (
//     <header className="bg-white shadow">
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center">
//           <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-700 mr-3">
//             <Menu className="h-6 w-6" />
//           </button>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="text-gray-500 hover:text-gray-700 relative">
//             <Bell className="h-6 w-6" />
//             <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
//           </button>
//           <div className="flex items-center">
//             <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
//             <span className="ml-2 text-sm font-medium text-gray-700">Admin User</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";
import { Menu, Search, Bell } from "lucide-react";
import React from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  setSidebarOpen,
}: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-500 hover:text-gray-700 mr-3"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
