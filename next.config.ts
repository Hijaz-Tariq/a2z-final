// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "uploadthing.com",
//       "utfs.io",
//       "*.ufs.sh", // Wildcard for all UploadThing file storage subdomains
//     ],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "uploadthing.com",
//       },
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//       },
//       {
//         protocol: "https",
//         hostname: "*.ufs.sh", // Wildcard pattern for all subdomains
//       },
//     ],
//   },
// };

// export default nextConfig;


// import type { NextConfig } from "next";
// import path from "path";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "*.ufs.sh", // Wildcard for all UploadThing subdomains
//       },
//       {
//         protocol: "https",
//         hostname: "utfs.io", // Primary UploadThing domain
//       },
//       {
//         protocol: "https",
//         hostname: "uploadthing.com", // Fallback
//       },
//        {
//         protocol: "https",
//         hostname: "r8wruyryhu.ufs.sh", // ✅ Add this line
//       },
//     ],
//   },

//   webpack: (config) => {
//     config.resolve.alias["@"] = path.resolve(__dirname);
//     return config;
//   },
// };

// export default nextConfig;


// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "*.ufs.sh", // Wildcard for all UploadThing file storage subdomains
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh", // Wildcard pattern for all subdomains
      },
    ],
  },
};

export default nextConfig;
