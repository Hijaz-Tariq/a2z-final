// // import { Inter } from 'next/font/google';
// // import type { Metadata } from 'next';
// // import './styles/globals.css';

// // import Header from '@/components/header';
// // import ClientWrapper from '@/components/client-wrapper';
// // import Footer from '@/components/footer';

// // const inter = Inter({
// //   subsets: ['latin'],
// //   variable: '--font-sans',
// // });

// // export const metadata: Metadata = {
// //   title: 'A2Z Express LLC',
// //   description: 'Global shipping solutions',
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en" className={inter.variable}>
// //       <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
// //         <ClientWrapper>
// //         {/* Header */}
// //     <Header />
// //         {/* Main Content with responsive padding */}
// //         <main className="flex-1 container mx-auto py-4 md:py-8 pb-20 md:pb-16 px-4">
// //           {children}
// //         </main>
// //         {/* Responsive Fixed Bottom Navigation */}
// //       <Footer />
// //         </ClientWrapper>
// //       </body>
// //     </html>
// //   );
// // }



// import { Inter } from 'next/font/google';
// import type { Metadata, Viewport } from 'next'; // Add Viewport type
// import './styles/globals.css';

// import Header from '@/components/header';
// import ClientWrapper from '@/components/client-wrapper';
// import Footer from '@/components/footer';

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-sans',
// });

// export const metadata: Metadata = {
//   title: 'A2Z Express LLC',
//   description: 'Global shipping solutions',
//   other: {
//     // Add iOS-specific meta tags here
//     'apple-mobile-web-app-capable': 'yes',
//     'apple-mobile-web-app-status-bar-style': 'black-translucent',
//   },
// };

// // Add viewport configuration
// export const viewport: Viewport = {
//   themeColor: '#ffffff',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={inter.variable}>
//       <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
//         <ClientWrapper>
//           {/* Header */}
//           <Header />
//           {/* Main Content with responsive padding */}
//           <main className="flex-1 container mx-auto py-4 md:py-8 pb-20 md:pb-16 px-4">
//             {children}
//           </main>
//           {/* Responsive Fixed Bottom Navigation */}
//           <Footer />
//         </ClientWrapper>
//       </body>
//     </html>
//   );
// }

import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './styles/globals.css';
import { Toaster } from 'react-hot-toast'; // Add this import

import Header from '../components/header';
import ClientWrapper from '../components/client-wrapper';
import Footer from '../components/footer';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'A2Z Express LLC',
  description: 'Global shipping solutions',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <ClientWrapper>
          {/* Header */}
          <Header />
          {/* Main Content with responsive padding */}
          <main className="flex-1 container mx-auto py-4 md:py-8 pb-20 md:pb-16 px-4">
            {children}
          </main>
          {/* Responsive Fixed Bottom Navigation */}
          <Footer />

          {/* Add the Toaster component here */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                maxWidth: '500px',
                width: '100%',
              },
              success: {
                iconTheme: {
                  primary: '#10B981', // green-500
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444', // red-500
                  secondary: '#fff',
                },
              },
            }}
          />
        </ClientWrapper>
      </body>
    </html>
    </SessionProvider>
  );
}