"use client";

import { Button } from "../components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../types/cart";

export function CartTrigger() {
  const { cart } = useCart();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-white hover:bg-primary/90"
      aria-label="Cart"
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {cart?.items?.length ? (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
        </span>
      ) : null}
    </Button>
  );
}