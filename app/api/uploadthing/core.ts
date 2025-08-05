// import { createUploadthing, type FileRouter } from "uploadthing/next";

// import { db } from "@/lib/db";
// import { getSelf } from "@/lib/auth-service";
// import { currentUser } from "@/lib/auth";

// const f = createUploadthing();

// const handleAuth = async () => {
//   const user = await currentUser();
//   const userId = user?.id;

//   if (!userId || user.role !== "TEACHER") throw new Error("Unauthorized");
//   return { userId };
// };

// export const ourFileRouter = {
//   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   courseAttachment: f(["text", "image", "video", "audio", "pdf"])
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
// idImage: f(["text", "image", "video", "audio", "pdf"])
// .middleware(async () => {
//   const self = await getSelf();
//   return { user: self };
// })
// .onUploadComplete(() => {}),
//   imageUploader: f({
//     image: {
//       maxFileCount: 1,
//       maxFileSize: "4MB",
//     },
//   })
//     .middleware(async () => {
//       const self = await getSelf();
//       return { user: self };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       await db.user.update({
//         where: { id: metadata.user.id },
//         data: {
//           image: file.url,
//         },
//       });
//     }),
//   thumbnailUploader: f({
//     image: {
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     .middleware(async () => {
//       const self = await getSelf();

//       return { user: self };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       await db.stream.update({
//         where: {
//           userId: metadata.user.id,
//         },
//         data: {
//           thumbnailUrl: file.url,
//         },
//       });

//       return { fileUrl: file.url };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
// urFileRouter;

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth"; // Import your auth configuration
import { getCookie } from "../../../lib/cookies";

const f = createUploadthing();

// Helper to get session or guest session ID
const getAuthContext = async (req: Request) => {
  // Use your existing auth configuration
  const session = await auth();
  if (session?.user) return { userId: session.user.id, isGuest: false };

  // For guest sessions
  const cookies = req.headers.get("cookie") || "";
  const guestSessionId = getCookie(cookies, "guest_session_id");
  if (guestSessionId) return { userId: guestSessionId, isGuest: true };

  throw new UploadThingError("Unauthorized");
};

export const ourFileRouter = {
  commercialDocument: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/pdf": { maxFileSize: "4MB", maxFileCount: 1 },
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const auth = await getAuthContext(req);
      return {
        userId: auth.userId,
        isGuest: auth.isGuest,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(
        `Commercial document uploaded by ${
          metadata.isGuest ? "guest" : "user"
        }:`,
        metadata.userId
      );
      console.log("File URL:", file.ufsUrl);

      return {
        uploadedBy: metadata.userId,
        isGuest: metadata.isGuest,
        documentUrl: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
