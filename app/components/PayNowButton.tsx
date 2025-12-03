// components/PayNowButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast'; // your react-hot-toast hook

export function PayNowButton({ pickupId }: { pickupId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const handlePayNow = async () => {
    setIsPaying(true);
    try {
      const res = await fetch('/api/pickup/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pickupId }),
      });

      if (!res.ok) throw new Error('Failed to start payment');

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (err) {
      toast.error("Could not start payment. Please try again.");
      console.log(err)
      setIsPaying(false);
    }
  };

  return (
    <button
      onClick={handlePayNow}
      disabled={isPaying}
      className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
    >
      {isPaying ? 'Redirecting to payment...' : 'Pay Now'}
    </button>
  );
}