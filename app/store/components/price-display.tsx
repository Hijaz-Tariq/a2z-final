'use client';

import { formatPrice } from '../../../lib/cart-utils';

interface PriceDisplayProps {
  price: number | string;
  discountPrice?: number | string | null;
  quantity?: number;
  className?: string;
}

export function PriceDisplay({
  price,
  discountPrice,
  quantity = 1,
  className = ''
}: PriceDisplayProps) {
  const hasDiscount = discountPrice && Number(discountPrice) < Number(price);
  const calculatedPrice = hasDiscount ? discountPrice : price;
  const totalPrice = Number(calculatedPrice) * quantity;

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2">
        {hasDiscount && (
          <span className="text-sm line-through text-gray-500">
            {formatPrice(Number(price) * quantity)}
          </span>
        )}
        <span className={hasDiscount ? 'text-red-500' : ''}>
          {formatPrice(totalPrice)}
        </span>
      </div>
      {quantity > 1 && (
        <span className="text-xs text-gray-500">
          {formatPrice(calculatedPrice)} each
        </span>
      )}
    </div>
  );
}