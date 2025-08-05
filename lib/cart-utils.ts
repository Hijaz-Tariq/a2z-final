import { CartItem } from "../types/cart";

export interface CartTotals {
  subtotal: number;
  discountedTotal: number;
  totalDiscount: number;
  total: number;
  itemCount: number;
}

export const calculateCartTotals = (items: CartItem[]): CartTotals => {
  const subtotal = items.reduce((sum, item) => {
    return sum + (Number(item.originalPrice) * item.quantity);
  }, 0);

  const discountedTotal = items.reduce((sum, item) => {
    const price = item.discountPrice 
      ? Number(item.discountPrice) 
      : Number(item.originalPrice);
    return sum + (price * item.quantity);
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalDiscount = subtotal - discountedTotal;

  return {
    subtotal,
    discountedTotal,
    totalDiscount,
    total: discountedTotal, // Base total before tax/shipping
    itemCount
  };
};

export const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price));
};