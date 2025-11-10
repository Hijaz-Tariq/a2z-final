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
// } from "../../components/ui/alert-dialog";
// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// interface SuccessAlertProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   pickupId?: string;
//   brandName?: string;
//   logoUrl?: string;
// }

// export const SuccessAlert = ({
//   open,
//   onOpenChange,
//   pickupId,
//   brandName = "A2Z-Express",
//   logoUrl = "/logo.png"
// }: SuccessAlertProps) => {
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
//         // Create a canvas to draw the QR code with logo
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         // Generate base QR code
//         const qrSize = 400;
//         await QRCode.toCanvas(canvas, trackUrl, {
//           errorCorrectionLevel: 'H',
//           margin: 1,
//           width: qrSize,
//           color: {
//             dark: '#000000',
//             light: '#ffffff',
//           }
//         });

//         // Add logo to the center of QR code if provided
//         if (logoUrl && typeof window !== 'undefined') {
//           const logo = new window.Image();
//           logo.crossOrigin = "Anonymous";
//           logo.src = logoUrl;

//           await new Promise<void>((resolve, reject) => {
//             logo.onload = () => resolve();
//             logo.onerror = () => reject(new Error('Failed to load logo'));
//           });

//           // Calculate logo position and size
//           const logoSize = qrSize * 0.15;
//           const logoPosition = (qrSize - logoSize) / 2;

//           // Draw white background for logo
//           ctx.fillStyle = '#ffffff';
//           ctx.fillRect(logoPosition - 2, logoPosition - 2, logoSize + 4, logoSize + 4);

//           // Draw logo
//           ctx.drawImage(logo, logoPosition, logoPosition, logoSize, logoSize);
//         }

//         // Convert to data URL for download
//         setDownloadUrl(canvas.toDataURL('image/png'));
//       } catch (err) {
//         console.error('Error generating QR code for download:', err);
//       } finally {
//         setIsGenerating(false);
//       }
//     };

//     generateDownloadQr();
//   }, [pickupId, trackUrl, logoUrl]);

//   const handleDownload = () => {
//     if (!downloadUrl) return;

//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.download = `${brandName.replace(/\s+/g, '-').toLowerCase()}-pickup-${pickupId}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={onOpenChange}>
//       <AlertDialogContent className="max-w-md">
//         <AlertDialogHeader>
//           <AlertDialogTitle className="flex items-center gap-2">
//             {logoUrl && (
//               <Image
//                 src={logoUrl}
//                 alt={brandName}
//                 className="h-8 w-8 object-contain"
//                 width={50}
//                 height={50}
//               />
//             )}
//             <span>{brandName} - Pickup Created Successfully</span>
//           </AlertDialogTitle>
//           <div className="text-sm text-muted-foreground">
//             Our Team will contact you soon, for continuing the process.
//             {pickupId && (
//               <div className="mt-4 flex flex-col items-center space-y-2">
//                 <p className="font-medium">Pickup ID: {pickupId}</p>
//                 <div className="relative">
//                   <Canvas
//                     text={trackUrl}
//                     options={{
//                       errorCorrectionLevel: 'H',
//                       margin: 1,
//                       scale: 4,
//                       width: 200,
//                       color: {
//                         dark: '#000000',
//                         light: '#ffffff',
//                       },
//                     }}
//                   />
//                   {logoUrl && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Image
//                         src={logoUrl}
//                         alt={brandName}
//                         className="h-8 w-8 object-contain bg-white p-1 rounded"
//                         width={50}
//                         height={50}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-xs text-muted-foreground">Scan this QR code for tracking</p>
//               </div>
//             )}
//           </div>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogAction
//             onClick={handleDownload}
//             disabled={isGenerating || !downloadUrl}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//           >
//             {isGenerating ? 'Generating...' : `Download ${brandName} QR Code`}
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
} from "../../components/ui/alert-dialog";
import { useState, useEffect } from 'react';
import type { PickupFormData } from "@/utils/shipping-calculations"; // 👈 add this

interface SuccessAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pickupId?: string;
  brandName?: string;
  logoUrl?: string;
  formData?: PickupFormData; // 👈 add this
}

export const SuccessAlert = ({
  open,
  onOpenChange,
  pickupId,
  brandName = "A2Z-Express",
  logoUrl = "/logo.png",
  formData, // 👈 add this
}: SuccessAlertProps) => {
  const { Canvas } = useQRCode();
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const base =
    (process.env.NEXT_PUBLIC_APP_URL as string) ??
    (typeof window !== "undefined" ? window.location.origin : "");
  const trackUrl = pickupId ? `${base}/track/${pickupId}` : "";

  // Generate full label PNG (not just QR)
  useEffect(() => {
    const generateLabelImage = async () => {
      if (!pickupId || !formData) return;

      setIsGenerating(true);
      try {
        // Step 1: Create label content as a canvas
        const labelCanvas = document.createElement('canvas');
        const ctx = labelCanvas.getContext('2d');
        if (!ctx) return;

        // Set size (A6-like: 400x600px)
        labelCanvas.width = 400;
        labelCanvas.height = 600;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 400, 600);

        // Font settings
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#000000';

        // Logo (top center)
        if (logoUrl) {
          const logo = new window.Image();
          logo.crossOrigin = 'anonymous';
          logo.src = logoUrl;
          await new Promise((resolve) => {
            logo.onload = () => resolve(logo);
            logo.onerror = () => resolve(null);
          });

          if (logo.width > 0) {
            const logoSize = 60;
            ctx.drawImage(logo, (400 - logoSize) / 2, 20, logoSize, logoSize);
          }
        }

        // Brand name
        ctx.font = 'bold 16px Arial';
        ctx.fillText(brandName, 20, 90);

        // Pickup ID
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`Pickup ID: ${pickupId}`, 20, 120);

        // Divider
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, 145);
        ctx.lineTo(380, 145);
        ctx.stroke();

        // Sender
        ctx.font = 'bold 12px Arial';
        ctx.fillText('SENDER', 20, 160);
        ctx.font = '12px Arial';
        ctx.fillText(formData.pickupDetails.contact.name, 20, 175);
        ctx.fillText(formData.pickupDetails.address.line1, 20, 190);
        if (formData.pickupDetails.address.line2) {
          ctx.fillText(formData.pickupDetails.address.line2, 20, 205);
        }
        const senderCity = [
          formData.pickupDetails.address.city,
          formData.pickupDetails.address.state,
          formData.pickupDetails.address.postalCode
        ].filter(Boolean).join(', ');
        ctx.fillText(senderCity, 20, formData.pickupDetails.address.line2 ? 220 : 205);
        ctx.fillText(formData.pickupDetails.address.country, 20, formData.pickupDetails.address.line2 ? 235 : 220);

        // Recipient
        ctx.font = 'bold 12px Arial';
        ctx.fillText('RECIPIENT', 20, 260);
        ctx.font = '12px Arial';
        ctx.fillText(formData.deliveryDetails.contact.name, 20, 275);
        ctx.fillText(formData.deliveryDetails.address.line1, 20, 290);
        if (formData.deliveryDetails.address.line2) {
          ctx.fillText(formData.deliveryDetails.address.line2, 20, 305);
        }
        const recipientCity = [
          formData.deliveryDetails.address.city,
          formData.deliveryDetails.address.state,
          formData.deliveryDetails.address.postalCode
        ].filter(Boolean).join(', ');
        ctx.fillText(recipientCity, 20, formData.deliveryDetails.address.line2 ? 320 : 305);
        ctx.fillText(formData.deliveryDetails.address.country, 20, formData.deliveryDetails.address.line2 ? 335 : 320);

        // Package summary
        const totalWeight = formData.packages.reduce((sum, p) => sum + p.weight, 0);
        ctx.font = '12px Arial';
        ctx.fillText(`Packages: ${formData.packages.length}`, 20, 360);
        ctx.fillText(`Total Weight: ${totalWeight.toFixed(2)} kg`, 20, 375);

        // QR Code (bottom right)
        const qrSize = 120;
        const qrX = 400 - qrSize - 20;
        const qrY = 400;

        const qrCanvas = document.createElement('canvas');
        await QRCode.toCanvas(qrCanvas, trackUrl, {
          errorCorrectionLevel: 'H',
          width: qrSize,
          margin: 0,
        });

        // Add logo to QR
        if (logoUrl) {
          const qrCtx = qrCanvas.getContext('2d');
          if (qrCtx) {
            const logoSize = qrSize * 0.2;
            const pos = (qrSize - logoSize) / 2;
            qrCtx.fillStyle = '#ffffff';
            qrCtx.fillRect(pos - 2, pos - 2, logoSize + 4, logoSize + 4);
            const logoImg = new window.Image();
            logoImg.crossOrigin = 'anonymous';
            logoImg.src = logoUrl;
            await new Promise((resolve) => {
              logoImg.onload = () => resolve(logoImg);
              logoImg.onerror = () => resolve(null);
            });
            qrCtx.drawImage(logoImg, pos, pos, logoSize, logoSize);
          }
        }

        ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
        ctx.font = '10px Arial';
        ctx.fillText('Scan to track', qrX + qrSize / 2 - 30, qrY + qrSize + 5);

        // Footer
        ctx.font = '10px Arial';
        ctx.fillText('www.a2z-express.com', 20, 580);

        // Convert to data URL
        setDownloadUrl(labelCanvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Error generating label:', err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateLabelImage();
  }, [pickupId, formData, trackUrl, logoUrl, brandName]);

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${brandName.replace(/\s+/g, '-').toLowerCase()}-label-${pickupId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{brandName} - Pickup Created Successfully</AlertDialogTitle>
          <div className="text-sm text-muted-foreground">
            Our team will contact you soon to continue the process.
            {pickupId && formData && (
              <div className="mt-4 text-xs">
                <div><strong>Pickup ID:</strong> {pickupId}</div>
                <div className="mt-2">
                  <strong>SENDER:</strong><br />
                  {formData.pickupDetails.contact.name}<br />
                  {formData.pickupDetails.address.line1}<br />
                  {formData.pickupDetails.address.city}, {formData.pickupDetails.address.state} {formData.pickupDetails.address.postalCode}<br />
                  {formData.pickupDetails.address.country}
                </div>
                <div className="mt-2">
                  <strong>RECIPIENT:</strong><br />
                  {formData.deliveryDetails.contact.name}<br />
                  {formData.deliveryDetails.address.line1}<br />
                  {formData.deliveryDetails.address.city}, {formData.deliveryDetails.address.state} {formData.deliveryDetails.address.postalCode}<br />
                  {formData.deliveryDetails.address.country}
                </div>
                <div className="mt-2">
                  <strong>Summary:</strong><br />
                  Packages: {formData.packages.length} • Weight: {formData.packages.reduce((s, p) => s + p.weight, 0).toFixed(2)} kg
                </div>
                <div className="mt-3 flex justify-center">
                  <Canvas
                    text={trackUrl}
                    options={{
                      errorCorrectionLevel: 'H',
                      margin: 1,
                      scale: 4,
                      width: 160,
                      color: { dark: '#000000', light: '#ffffff' },
                    }}
                  />
                  <p className="text-center text-xs mt-1">Scan to track</p>
                </div>
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
            {isGenerating ? 'Generating Label...' : `Download Label`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};