// "use client";

// import { useState } from "react";
// import { UploadButton } from "@/utils/uploadthing";
// import { Loader2 } from "lucide-react";

// export function CommercialDocumentUpload({
//   countryId,
//   onUploadComplete,
// }: {
//   countryId: number;
//   onUploadComplete: (url: string) => void;
// }) {
//   const [isUploading, setIsUploading] = useState(false);

//   if (![106, 169].includes(countryId)) return null;

//   return (
//     <div className="mt-4">
//       <label className="block text-sm font-medium mb-2">
//         Commercial Document (Required for this country)
//       </label>
//       <div className="flex items-center gap-4">
//         <UploadButton
//           endpoint="commercialDocument"
//           onUploadBegin={() => setIsUploading(true)}
//           onClientUploadComplete={(res) => {
//             setIsUploading(false);
//             if (res?.[0]?.ufsUrl) {
//               onUploadComplete(res[0].ufsUrl);
//             }
//           }}
//           onUploadError={(error: Error) => {
//             setIsUploading(false);
//             console.error("Upload error:", error);
//           }}
//           appearance={{
//             button: "ut-ready:bg-primary ut-uploading:cursor-not-allowed bg-primary text-white",
//             container: "w-fit",
//             allowedContent: "hidden",
//           }}
//         />
//         {isUploading && (
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <Loader2 className="h-4 w-4 animate-spin" />
//             <span>Uploading...</span>
//           </div>
//         )}
//       </div>
//       <p className="text-xs text-muted-foreground mt-1">
//         Only PDF files up to 4MB are accepted
//       </p>
//     </div>
//   );
// }

// components/upload-button.tsx
"use client";

import { useState } from "react";
import { UploadButton } from "../utils/uploadthing";
import { Loader2, File, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";

export function CommercialDocumentUpload({
    countryId,
    onUploadComplete,
}: {
    countryId: number;
    onUploadComplete: (url: string) => void;
}) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<{
        name: string;
        url: string;
    } | null>(null);

    if (![106, 169].includes(countryId)) return null;

    return (
        <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium">
                Commercial Document (Required)
            </label>

            {!uploadedFile ? (
                <div className="flex items-center gap-4">
                    <UploadButton
                        endpoint="commercialDocument"
                        onUploadBegin={() => {
                            setIsUploading(true);
                            setUploadedFile(null);
                        }}
                        onClientUploadComplete={(res) => {
                            setIsUploading(false);
                            if (res?.[0]) {
                                setUploadedFile({
                                    name: res[0].name,
                                    url: res[0].url,
                                });
                                onUploadComplete(res[0].url);
                            }
                        }}
                        onUploadError={(error) => {
                            setIsUploading(false);
                            console.error("Upload error:", error);
                        }}
                        appearance={{
                            button: "ut-ready:bg-primary bg-primary text-white px-4 py-2 rounded-md",
                            container: "w-fit",
                            allowedContent: "hidden",
                        }}
                    />
                    {isUploading && (
                        <div className="flex items-center gap-2 text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Uploading...</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3 p-3 border rounded-md bg-green-50">
                    <div className="flex items-center gap-2 flex-1">
                        <File className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">{uploadedFile.name}</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadedFile(null)}
                        className="text-red-600 hover:text-red-700"
                    >
                        Change
                    </Button>
                </div>
            )}

            {/* <p className="text-xs text-muted-foreground mt-1">
        Only PDF files up to 4MB are accepted
      </p> */}
        </div>
    );
}