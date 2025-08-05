'use client';

import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { X } from 'lucide-react';

interface QRScannerProps {
    onScan: (result: string) => void;
    onClose: () => void;
    onError: (message: string) => void;
}

export const QRScanner = ({ onScan, onClose, onError }: QRScannerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [cameraError, setCameraError] = useState('');
    const readerRef = useRef(new BrowserQRCodeReader());
    const streamRef = useRef<MediaStream | null>(null);
    const controllerRef = useRef<ReturnType<typeof BrowserQRCodeReader.prototype.decodeFromVideoDevice> | null>(null);

    useEffect(() => {
        let videoElement: HTMLVideoElement | null = null;
        let isMounted = true;

        const initScanner = async () => {
            try {
                videoElement = videoRef.current;
                if (!videoElement) return;

                // Get camera stream
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });

                if (!isMounted) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }

                streamRef.current = stream;
                videoElement.srcObject = stream;

                // Start QR scanning
                controllerRef.current = readerRef.current.decodeFromVideoDevice(
                    undefined,
                    videoElement,
                    (result, error) => {
                        if (!isMounted) return;

                        if (result) {
                            onScan(result.getText());
                            onClose();
                        }

                        if (error) {
                            const errorMessage = error.message || error.toString();
                            if (!errorMessage.includes('No QR code found')) {
                                console.error('Scan error:', error);
                            }
                        }
                    }
                );

            } catch (err) {
                if (!isMounted) return;

                let errorMessage = 'Camera access failed';
                if (err instanceof OverconstrainedError) {
                    errorMessage = 'Camera configuration not supported';
                } else if (err instanceof DOMException) {
                    errorMessage = 'Camera permission denied';
                }

                setCameraError(errorMessage);
                onError(errorMessage);
                onClose();
            }
        };

        initScanner();

        return () => {
            isMounted = false;

            // Cleanup camera stream
            // if (streamRef.current) {
            //     streamRef.current.getTracks().forEach(track => track.stop());
            //     streamRef.current = null;
            // }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    if (track.readyState === 'live') track.stop();
                });
            }

            // Cleanup video element reference using local variable
            if (videoElement) {
                videoElement.srcObject = null;
            }

            // Cleanup QR reader
            if (controllerRef.current) {
                controllerRef.current.then(controller => controller.stop());
                controllerRef.current = null;
            }
        };
    }, [onScan, onClose, onError]);

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
                aria-label="Close scanner"
            >
                <X className="h-8 w-8" />
            </button>

            {cameraError ? (
                <div className="text-white text-center p-4">
                    <p className="text-lg font-medium mb-2">{cameraError}</p>
                    <p className="text-sm">Please ensure:</p>
                    <ul className="text-sm list-disc list-inside">
                        <li>A camera is connected</li>
                        <li>Browser permissions are granted</li>
                        <li>No other app is using the camera</li>
                    </ul>
                </div>
            ) : (
                <video
                    ref={videoRef}
                    className="max-w-[90vw] max-h-[90vh] aspect-video rounded-lg"
                    aria-label="QR code scanner preview"
                    autoPlay
                    playsInline
                />
            )}
        </div>
    );
};