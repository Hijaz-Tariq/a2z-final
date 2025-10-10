import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  //    config: {
  //   callbackUrl: "https://a2z-express.com/api/uploadthing", // your public URL
  // },
});
