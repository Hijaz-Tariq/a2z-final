// admin/components/SendSmsModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface SendSmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientPhone: string;
  onSend: (phone: string, message: string) => Promise<void>;
}

export function SendSmsModal({
  isOpen,
  onClose,
  recipientName,
  recipientPhone,
  onSend,
}: SendSmsModalProps) {
  const [phone, setPhone] = useState(recipientPhone);
  const [message, setMessage] = useState(
    `Hello ${recipientName}, your shipment is ready for pickup! - A2Z Logistics`
  );

useEffect(() => {
  setPhone(recipientPhone);
  setMessage(`Hello ${recipientName}, your shipment is ready for pickup! - A2Z Logistics`);
}, [recipientName, recipientPhone]);

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!phone || !message.trim()) return;
    setIsSending(true);
    setError(null);
    try {
      await onSend(phone, message.trim());
      onClose(); // close on success
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to send SMS');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send SMS to {recipientName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={recipientPhone}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSending || !phone || !message.trim()}>
            {isSending ? 'Sending...' : 'Send SMS'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}