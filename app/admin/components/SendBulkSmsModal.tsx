// admin/components/SendBulkSmsModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Recipient {
  name: string;
  phone: string;
}

interface SendBulkSmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: Recipient[];
  onSend: (phone: string, message: string) => Promise<void>;
}

export function SendBulkSmsModal({
  isOpen,
  onClose,
  recipients,
  onSend,
}: SendBulkSmsModalProps) {
  const [message, setMessage] = useState('Hello, your shipment is ready! - A2Z Logistics');
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState<{ sent: number; total: number; errors: string[] } | null>(null);

  const uniqueRecipients = Array.from(
    new Map(recipients.map(r => [r.phone, r])).values()
  );

  const handleSubmit = async () => {
    if (!message.trim() || uniqueRecipients.length === 0) return;
    setIsSending(true);
    setProgress({ sent: 0, total: uniqueRecipients.length, errors: [] });

    const errors: string[] = [];
    for (const recipient of uniqueRecipients) {
      try {
        await onSend(recipient.phone, message.trim());
        setProgress(p => p ? { ...p, sent: p.sent + 1 } : null);
      } catch (err) {
        errors.push(`${recipient.name} (${recipient.phone}), ${err}`);
      }
    }

    setIsSending(false);
    if (errors.length === 0) {
      onClose();
    } else {
      setProgress(p => p ? { ...p, errors } : null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Send Bulk SMS</DialogTitle>
          <p className="text-sm text-gray-500">
            Sending to {uniqueRecipients.length} recipient(s)
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {progress?.errors && progress.errors.length > 0 && (
            <div className="text-red-500 text-sm">
              <p>Failed for:</p>
              <ul className="list-disc pl-5">
                {progress.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              disabled={isSending}
            />
          </div>

          {isSending && progress && (
            <div className="text-sm text-gray-600">
              Sent: {progress.sent} / {progress.total}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSending || !message.trim()}>
            {isSending ? 'Sending...' : 'Send to All'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}