'use client';

import { useState } from 'react';
import { QRScanner } from './ui/scanner';
import { Button } from './ui/button';
import { QrCode, SendHorizontal } from 'lucide-react';

export function TrackingInput() {
    const [showScanner, setShowScanner] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [scanError, setScanError] = useState('');
    const [cameraError, setCameraError] = useState('');

    const handleScan = (result: string) => {
        setTrackingNumber(result.trim());
        setScanError('');
        setShowScanner(false);
    };

    const handleCameraError = (message: string) => {
        setCameraError(message);
        setShowScanner(false);
    };

    const handleTrackSubmit = async () => {
        if (!trackingNumber.trim()) {
            setScanError('Please enter or scan a tracking number');
            return;
        }

        try {
            // Your API call here
            console.log('Tracking number submitted:', trackingNumber);
            setTrackingNumber('');
            setScanError('');
        } catch (error) {
            setScanError(error instanceof Error ? error.message : 'Failed to track package');
        }
    };

    return (
        <div className="flex-1 max-w-2xl mx-4">
            <div className="flex items-center w-full">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowScanner(true)}
                    className="text-white hover:bg-primary/90"
                    aria-label="Scan tracking number"
                >
                    <QrCode className="h-6 w-6" />
                </Button>
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Enter tracking number"
                        value={trackingNumber}
                        onChange={(e) => {
                            setTrackingNumber(e.target.value);
                            setScanError('');
                        }}
                        className="w-full px-2 py-2 rounded-lg text-gray-900 focus:px-4 focus:py-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-gray-500 bg-white text-sm md:text-base pr-12"
                        onKeyPress={(e) => e.key === 'Enter' && handleTrackSubmit()}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleTrackSubmit}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary/70 text-white rounded-lg transition-colors duration-300"
                        aria-label="Submit tracking number"
                    >
                        <SendHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {scanError && <p className="text-red-500 mt-2 text-sm">{scanError}</p>}

            {cameraError && (
                <p className="text-red-500 mt-2 text-sm">
                    {cameraError} <button
                        onClick={() => setShowScanner(true)}
                        className="underline hover:text-red-400"
                    >
                        Try again
                    </button>
                </p>
            )}

            {showScanner && (
                <QRScanner
                    onScan={handleScan}
                    onClose={() => setShowScanner(false)}
                    onError={handleCameraError}
                />
            )}
        </div>
    );
}