// 'use client';

// import { useQRCode } from 'next-qrcode';
// import QRCode from 'qrcode';
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { useState, useEffect } from 'react';

// interface SuccessAlertProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   pickupId?: string;
// }

// export const SuccessAlert = ({ open, onOpenChange, pickupId }: SuccessAlertProps) => {
//   const { Canvas } = useQRCode();
//   const [downloadUrl, setDownloadUrl] = useState<string>('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const base =
//     (process.env.NEXT_PUBLIC_APP_URL as string) ??
//     (typeof window !== "undefined" ? window.location.origin : "");
//   const trackUrl = pickupId ? `${base}/track/${pickupId}` : "";

//   // Generate download URL when pickupId changes
//   useEffect(() => {
//     const generateDownloadQr = async () => {
//       if (!pickupId) return;
//       setIsGenerating(true);
//       try {
//         const url = await QRCode.toDataURL(trackUrl, {
//           errorCorrectionLevel: 'M',
//           margin: 2,
//           scale: 4,
//           width: 160,
//           color: {
//             dark: '#000000',
//             light: '#ffffff',
//           }
//         });
//         setIsGenerating(true);
//         setDownloadUrl(url);
//       } catch (err) {
//         console.error('Error generating QR code for download:', err);
//       } finally {
//         setIsGenerating(false);
//       }
//     };

//     generateDownloadQr();
//   }, [pickupId, trackUrl]);

//   const handleDownload = () => {
//     if (!downloadUrl) return;

//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.download = `pickup-${pickupId}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={onOpenChange}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Your pickup created successfully</AlertDialogTitle>
//           <div className="text-sm text-muted-foreground">
//             Our Team will contact you soon, for continuing the process.
//             {pickupId && (
//               <div className="mt-4 flex flex-col items-center space-y-2">
//                 <p className="font-medium">Pickup ID: {pickupId}</p>
//                 <Canvas
//                   text={trackUrl}
//                   options={{
//                     errorCorrectionLevel: 'M',
//                     margin: 2,
//                     scale: 4,
//                     width: 160,
//                     color: {
//                       dark: '#000000',
//                       light: '#ffffff',
//                     },
//                   }}
//                 />
//                 <p className="text-xs text-muted-foreground">Scan this QR code for tracking</p>
//               </div>
//             )}
//           </div>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogAction
//             onClick={handleDownload}
//             disabled={isGenerating || !downloadUrl}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">  {isGenerating ? 'Generating...' : 'Download QR Code'}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

'use client';

import { useQRCode } from 'next-qrcode';
import QRCode from 'qrcode';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SuccessAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pickupId?: string;
  brandName?: string;
  logoUrl?: string;
}

export const SuccessAlert = ({
  open,
  onOpenChange,
  pickupId,
  brandName = "Your Brand",
  logoUrl = "/logo.png"
}: SuccessAlertProps) => {
  const { Canvas } = useQRCode();
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const base =
    (process.env.NEXT_PUBLIC_APP_URL as string) ??
    (typeof window !== "undefined" ? window.location.origin : "");
  const trackUrl = pickupId ? `${base}/track/${pickupId}` : "";

  // Generate download URL when pickupId changes
  useEffect(() => {
    const generateDownloadQr = async () => {
      if (!pickupId) return;
      setIsGenerating(true);
      try {
        // Create a canvas to draw the QR code with logo
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Generate base QR code
        const qrSize = 400;
        await QRCode.toCanvas(canvas, trackUrl, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: qrSize,
          color: {
            dark: '#000000',
            light: '#ffffff',
          }
        });

        // Add logo to the center of QR code if provided
        if (logoUrl && typeof window !== 'undefined') {
          const logo = new window.Image();
          logo.crossOrigin = "Anonymous";
          logo.src = logoUrl;

          await new Promise<void>((resolve, reject) => {
            logo.onload = () => resolve();
            logo.onerror = () => reject(new Error('Failed to load logo'));
          });

          // Calculate logo position and size
          const logoSize = qrSize * 0.15;
          const logoPosition = (qrSize - logoSize) / 2;

          // Draw white background for logo
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(logoPosition - 2, logoPosition - 2, logoSize + 4, logoSize + 4);

          // Draw logo
          ctx.drawImage(logo, logoPosition, logoPosition, logoSize, logoSize);
        }

        // Convert to data URL for download
        setDownloadUrl(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Error generating QR code for download:', err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateDownloadQr();
  }, [pickupId, trackUrl, logoUrl]);

  const handleDownload = () => {
    if (!downloadUrl) return;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${brandName.replace(/\s+/g, '-').toLowerCase()}-pickup-${pickupId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={brandName}
                className="h-8 w-8 object-contain"
                width={50}
                height={50}
              />
            )}
            <span>{brandName} - Pickup Created Successfully</span>
          </AlertDialogTitle>
          <div className="text-sm text-muted-foreground">
            Our Team will contact you soon, for continuing the process.
            {pickupId && (
              <div className="mt-4 flex flex-col items-center space-y-2">
                <p className="font-medium">Pickup ID: {pickupId}</p>
                <div className="relative">
                  <Canvas
                    text={trackUrl}
                    options={{
                      errorCorrectionLevel: 'H',
                      margin: 1,
                      scale: 4,
                      width: 200,
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                    }}
                  />
                  {logoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={logoUrl}
                        alt={brandName}
                        className="h-8 w-8 object-contain bg-white p-1 rounded"
                        width={50}
                        height={50}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Scan this QR code for tracking</p>
              </div>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleDownload}
            disabled={isGenerating || !downloadUrl}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            {isGenerating ? 'Generating...' : `Download ${brandName} QR Code`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};