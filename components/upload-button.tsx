// // "use client";

// // import { useState } from "react";
// // import { UploadButton } from "@/utils/uploadthing";
// // import { Loader2 } from "lucide-react";

// // export function CommercialDocumentUpload({
// //   countryId,
// //   onUploadComplete,
// // }: {
// //   countryId: number;
// //   onUploadComplete: (url: string) => void;
// // }) {
// //   const [isUploading, setIsUploading] = useState(false);

// //   if (![106, 169].includes(countryId)) return null;

// //   return (
// //     <div className="mt-4">
// //       <label className="block text-sm font-medium mb-2">
// //         Commercial Document (Required for this country)
// //       </label>
// //       <div className="flex items-center gap-4">
// //         <UploadButton
// //           endpoint="commercialDocument"
// //           onUploadBegin={() => setIsUploading(true)}
// //           onClientUploadComplete={(res) => {
// //             setIsUploading(false);
// //             if (res?.[0]?.ufsUrl) {
// //               onUploadComplete(res[0].ufsUrl);
// //             }
// //           }}
// //           onUploadError={(error: Error) => {
// //             setIsUploading(false);
// //             console.error("Upload error:", error);
// //           }}
// //           appearance={{
// //             button: "ut-ready:bg-primary ut-uploading:cursor-not-allowed bg-primary text-white",
// //             container: "w-fit",
// //             allowedContent: "hidden",
// //           }}
// //         />
// //         {isUploading && (
// //           <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //             <Loader2 className="h-4 w-4 animate-spin" />
// //             <span>Uploading...</span>
// //           </div>
// //         )}
// //       </div>
// //       <p className="text-xs text-muted-foreground mt-1">
// //         Only PDF files up to 4MB are accepted
// //       </p>
// //     </div>
// //   );
// // }

// // components/upload-button.tsx
// "use client";

// import { useState } from "react";
// import { UploadButton } from "../utils/uploadthing";
// import { Loader2, File, CheckCircle2 } from "lucide-react";
// import { Button } from "../components/ui/button";

// export function CommercialDocumentUpload({
//     countryId,
//     onUploadComplete,
// }: {
//     countryId: number;
//     onUploadComplete: (url: string) => void;
// }) {
//     const [isUploading, setIsUploading] = useState(false);
//     const [uploadedFile, setUploadedFile] = useState<{
//         name: string;
//         url: string;
//     } | null>(null);

//     if (![106, 169].includes(countryId)) return null;

//     return (
//         <div className="mt-4 space-y-2">
//             <label className="block text-sm font-medium">
//                 Commercial Document (Required)
//             </label>

//             {!uploadedFile ? (
//                 <div className="flex items-center gap-4">
//                     <UploadButton
//                         endpoint="commercialDocument"
//                         onUploadBegin={() => {
//                             setIsUploading(true);
//                             setUploadedFile(null);
//                         }}
//                         onClientUploadComplete={(res) => {
//                             setIsUploading(false);
//                             if (res?.[0]) {
//                                 setUploadedFile({
//                                     name: res[0].name,
//                                     url: res[0].url,
//                                 });
//                                 onUploadComplete(res[0].url);
//                             }
//                         }}
//                         onUploadError={(error) => {
//                             setIsUploading(false);
//                             console.error("Upload error:", error);
//                         }}
//                         appearance={{
//                             button: "ut-ready:bg-primary bg-primary text-white px-4 py-2 rounded-md",
//                             container: "w-fit",
//                             allowedContent: "hidden",
//                         }}
//                     />
//                     {isUploading && (
//                         <div className="flex items-center gap-2 text-sm">
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             <span>Uploading...</span>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div className="flex items-center gap-3 p-3 border rounded-md bg-green-50">
//                     <div className="flex items-center gap-2 flex-1">
//                         <File className="h-5 w-5 text-green-600" />
//                         <span className="text-sm font-medium">{uploadedFile.name}</span>
//                         <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
//                     </div>
//                     <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setUploadedFile(null)}
//                         className="text-red-600 hover:text-red-700"
//                     >
//                         Change
//                     </Button>
//                 </div>
//             )}

//             {/* <p className="text-xs text-muted-foreground mt-1">
//         Only PDF files up to 4MB are accepted
//       </p> */}
//         </div>
//     );
// }

// "use client";

// import { useState } from "react";
// import { UploadButton } from "../utils/uploadthing";
// import { Loader2, File, Image as ImageIcon, CheckCircle2, X } from "lucide-react";
// import { Button } from "../components/ui/button";

// type FileUploadProps = {
//   onUploadComplete: (url: string | string[]) => void;
//   endpoint: "commercialDocument" | "productImages";
//   label?: string;
//   required?: boolean;
//   multiple?: boolean;
//   fileType?: "document" | "image";
//   countryId?: number; // Only needed for commercial documents
// };

// export function FileUpload({
//   onUploadComplete,
//   endpoint,
//   label = "File Upload",
//   required = false,
//   multiple = false,
//   fileType = "document",
//   countryId,
// }: FileUploadProps) {
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);

//   // Only show for specific countries if countryId is provided
//   if (countryId && ![106, 169].includes(countryId)) return null;

//   const FileIcon = fileType === "image" ? ImageIcon : File;
//   const successColor = fileType === "image" ? "bg-green-50" : "bg-blue-50";

//   const handleUploadComplete = (res: any[]) => {
//     const newFiles = res.map((file) => ({
//       name: file.name,
//       url: file.url,
//     }));

//     setUploadedFiles(multiple ? [...uploadedFiles, ...newFiles] : newFiles);
//     onUploadComplete(multiple ? [...uploadedFiles.map(f => f.url), ...newFiles.map(f => f.url)] : newFiles[0].url);
//   };

//   const removeFile = (index: number) => {
//     const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
//     setUploadedFiles(updatedFiles);
//     onUploadComplete(multiple ? updatedFiles.map(f => f.url) : "");
//   };

//   return (
//     <div className="mt-4 space-y-2">
//       <label className="block text-sm font-medium">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>

//       {uploadedFiles.length === 0 ? (
//         <div className="flex items-center gap-4">
//           <UploadButton
//             endpoint={endpoint}
//             onUploadBegin={() => setIsUploading(true)}
//             onClientUploadComplete={handleUploadComplete}
//             onUploadError={(error) => {
//               setIsUploading(false);
//               console.error("Upload error:", error);
//             }}
//             appearance={{
//               button: "ut-ready:bg-primary bg-primary text-white px-4 py-2 rounded-md",
//               container: "w-fit",
//               allowedContent: "hidden",
//             }}
//             config={{ mode: multiple ? "auto" : "manual" }}
//           />
//           {isUploading && (
//             <div className="flex items-center gap-2 text-sm">
//               <Loader2 className="h-4 w-4 animate-spin" />
//               <span>Uploading...</span>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {uploadedFiles.map((file, index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-3 p-3 border rounded-md ${successColor}`}
//             >
//               <div className="flex items-center gap-2 flex-1">
//                 <FileIcon className="h-5 w-5 text-green-600" />
//                 <span className="text-sm font-medium line-clamp-1">
//                   {file.name}
//                 </span>
//                 <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
//               </div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => removeFile(index)}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           ))}
//           {multiple && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setUploadedFiles([])}
//               className="mt-2"
//             >
//               Upload More Files
//             </Button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { UploadButton } from "../utils/uploadthing";
// import { Loader2, File, CheckCircle2, X } from "lucide-react";
// import { Button } from "../components/ui/button";
// // import type { OurFileRouter } from "../../../api/uploadthing/core";
// import type { OurFileRouter } from "../app/api/uploadthing/core";

// type FileUploadProps = {
//   onUploadComplete: (url: string) => void;
//   endpoint: keyof OurFileRouter;
//   label?: string;
//   required?: boolean;
//   multiple?: boolean;
//   countryId?: number;
// };

// export function FileUpload({
//   onUploadComplete,
//   endpoint,
//   label = "File Upload",
//   required = false,
//   countryId,
// }: FileUploadProps) {
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);
//   const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null);

//   if (countryId && ![106, 169].includes(countryId)) return null;

//   const handleUploadComplete = (res: { name: string; url: string }[]) => {
//     setIsUploading(false);
//     if (!res || res.length === 0) {
//       setUploadError("No files were uploaded");
//       return;
//     }

//     const file = res[0];
//     setUploadedFile(file);
//     setUploadError(null);
//     onUploadComplete(file.url);
//   };

//   const removeFile = () => {
//     setUploadedFile(null);
//     onUploadComplete("");
//   };

//   return (
//     <div className="mt-4 space-y-2">
//       <label className="block text-sm font-medium">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>

//       {!uploadedFile ? (
//         <div className="flex items-center gap-4">
//           <UploadButton
//             endpoint={endpoint}
//             onUploadBegin={() => {
//               setIsUploading(true);
//               setUploadError(null);
//             }}
//             onClientUploadComplete={handleUploadComplete}
//             onUploadError={(error) => {
//               setIsUploading(false);
//               setUploadError(error.message);
//               console.error("Upload error:", error);
//             }}
//             onBeforeUploadBegin={(files) => {
//               console.log("Starting upload for:", files);
//               return files;
//             }}
//             appearance={{
//               button: "ut-ready:bg-primary bg-primary text-white px-4 py-2 rounded-md",
//               container: "w-fit",
//               allowedContent: "hidden",
//             }}
//             config={{ mode: "manual" }} // Force single file
//           />
//           {isUploading && (
//             <div className="flex items-center gap-2 text-sm">
//               <Loader2 className="h-4 w-4 animate-spin" />
//               <span>Uploading...</span>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex items-center gap-3 p-3 border rounded-md bg-blue-50">
//           <div className="flex items-center gap-2 flex-1">
//             <File className="h-5 w-5 text-green-600" />
//             <span className="text-sm font-medium line-clamp-1">
//               {uploadedFile.name}
//             </span>
//             <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={removeFile}
//             className="text-red-600 hover:text-red-700"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       )}

//       {uploadError && (
//         <p className="text-sm text-red-500 mt-2">{uploadError}</p>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { UploadButton } from "../utils/uploadthing";
import { Loader2, File, CheckCircle2, X } from "lucide-react";
import { Button } from "../components/ui/button";
import type { OurFileRouter } from "../app/api/uploadthing/core";

type FileUploadProps = {
  onUploadComplete: (urls: string[]) => void;
  endpoint: keyof OurFileRouter;
  label?: string;
  required?: boolean;
  multiple?: boolean;
  countryId?: number;
};

export function FileUpload({
  onUploadComplete,
  endpoint,
  label = "File Upload",
  required = false,
  multiple = false, 
  countryId,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null);

  if (countryId && ![106, 169].includes(countryId)) return null;

  // const handleUploadComplete = (res: { name: string; url: string }[]) => {
  //   setIsUploading(false);
  //   if (!res || res.length === 0) {
  //     setUploadError("No files were uploaded");
  //     return;
  //   }

  //   const file = res[0];
  //   setUploadedFile(file);
  //   setUploadError(null);
  //   onUploadComplete(file.url);
  // };

  const handleUploadComplete = (res: { name: string; url: string }[]) => {
    setIsUploading(false);
    if (!res || res.length === 0) {
      setUploadError("No files were uploaded");
      return;
    }

    setUploadError(null);

    if (multiple) {
      // ✅ Return an array of URLs
      onUploadComplete(res.map(file => file.url));
      setUploadedFile(null); // Optional: don't show single-file preview for multiple uploads
    } else {
      const file = res[0];
      setUploadedFile(file);
      onUploadComplete([file.url]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedFile(null);
    onUploadComplete([""]);
  };

  return (
    <div className="mt-4 space-y-2">
      <label className="block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {!uploadedFile ? (
        <div className="flex items-center gap-4">
          <UploadButton
            endpoint={endpoint}
            onUploadBegin={() => {
              setIsUploading(true);
              setUploadError(null);
            }}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error) => {
              setIsUploading(false);
              setUploadError(error.message);
              console.error("Upload error:", error);
            }}
            onBeforeUploadBegin={(files) => {
              console.log("Starting upload for:", files);
              return files;
            }}
            appearance={{
              button: "ut-ready:bg-primary bg-primary text-white px-4 py-2 rounded-md",
              container: "w-fit",
              allowedContent: "hidden",
            }}
            config={{ mode: "manual" }}
          />
          {isUploading && (
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Uploading...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3 border rounded-md bg-blue-50">
          <div className="flex items-center gap-2 flex-1">
            <File className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium line-clamp-1">
              {uploadedFile?.name || "Uploaded file"}
            </span>
            <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {uploadError && (
        <p className="text-sm text-red-500 mt-2">{uploadError}</p>
      )}
    </div>
  );
}