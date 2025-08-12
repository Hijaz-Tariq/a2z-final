// import { redirect } from "next/navigation";

// import { currentRole } from "../../lib/auth";



// interface CreatorLayoutProps {
//     params: { username: string };
//     children: React.ReactNode;
// };

// const AdminLayout = async ({
//     params,
//     children,
// }: CreatorLayoutProps) => {

//     const role = await currentRole()
//     if (role !== 'ADMIN') {
//         redirect("/");
//     }

//     return (
//         <>
//             {/* <Header /> */}
//             <div className="flex h-full">
//                 {/* <Sidebar /> */}
//                 {params.username}
//                 <main className="flex-1 container mx-auto py-4 md:py-8 pb-20 md:pb-16 px-4">
//                     {children}
//                 </main>
//             </div>
//             {/* <Footer /> */}
//         </>
//     );
// }

// export default AdminLayout;

// import { redirect } from "next/navigation";
// import { currentRole } from "../../lib/auth";
// import React from "react";
// // import AdminEditProvider from "./AdminEditProvider"; // We’ll create this next
// import AdminEditProvider from "./AdminEditProvider";

// interface CreatorLayoutProps {
//   params: { username: string };
//   children: React.ReactNode;
// }

// const AdminLayout = async ({ params, children }: CreatorLayoutProps) => {
//   const role = await currentRole();
//   if (role !== "ADMIN") {
//     redirect("/");
//   }

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="flex h-full">
//         {/* <Sidebar /> */}
//         {params.username}

//         {/* Wrap children with the client provider */}
//         <main className="flex-1 container mx-auto py-4 md:py-8 pb-20 md:pb-16 px-4">
//           <AdminEditProvider>
//             {children}
//           </AdminEditProvider>
//         </main>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default AdminLayout;
import { redirect } from "next/navigation";
import { currentRole } from "../../lib/auth";
import React from "react";
import AdminEditProvider from "./AdminEditProvider";

interface CreatorLayoutProps {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
}

const AdminLayout = async ({ params, children }: CreatorLayoutProps) => {
  const { username } = await params; // await the async params
  const role = await currentRole();

  if (role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex h-full">
      {username}
      <main className="flex-1 container mx-auto py-4 md:py-8 pb-20 md:pb-16 px-4">
        <AdminEditProvider>
          {children}
        </AdminEditProvider>
      </main>
    </div>
  );
};

export default AdminLayout;
