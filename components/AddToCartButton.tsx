'use client';

import { ShoppingBasket } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../hooks/useCart';
import { SessionProvider } from 'next-auth/react';
import { CartItem } from '../types/cart';

export function AddToCartButton({
    productId,
    quantity = 1
}: {
    productId: string;
    quantity?: number;
}) {
    const { cart, loading, addToCart } = useCart();
    const cartItem = cart?.items.find((item: CartItem) => item.productId === productId);
    const inCart = Boolean(cartItem);

    const handleClick = async () => {
        await addToCart(productId, quantity);
        // Optionally show toast notification
    };

    return (
        <SessionProvider>
        <Button
            onClick={handleClick}
            className={`p-2 rounded-lg font-bold transition-colors ${inCart
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
            size="icon"
            disabled={loading}
            aria-label={inCart ? 'Update cart' : 'Add to cart'}
        >
            {inCart ? (
                <div className="relative">
                    <ShoppingBasket className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItem?.quantity}
                    </span>
                </div>
            ) : (
                <ShoppingBasket className="w-5 h-5" />
            )}
        </Button>
        </SessionProvider>
    );
}