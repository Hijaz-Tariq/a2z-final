/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from '../../../hooks/use-media-query';
// import { Product } from '@prisma/client';
import { Button } from '../../../components/ui/button';
import type { CartItem } from '../../../types/cart';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../../components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerTrigger
} from '../../../components/ui/drawer';
import { ShoppingCartIcon, Loader2 } from 'lucide-react';

import { useCart } from '../../../hooks/useCart';
import { useCheckout } from '../../../hooks/useCheckout';

export function Cart() {

    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    // const { cart, loading, fetchCart } = useCart();

    const { cart, loading, fetchCart, clearCart } = useCart();
    const { checkout: initiateCheckout, isLoading: isCheckoutLoading } = useCheckout();

    // Fetch cart when drawer/dialog opens
    useEffect(() => {
        if (open) {
            fetchCart();
        }
    }, [open, fetchCart]);

    const getItemPrice = (item: any) => {
        const product = item.product;
        if (!product) return { price: 0, isOnSale: false };

        const isOnSale = product.isOnSale;
        const price = isOnSale ? product.discountPrice : product.price;
        return { price, isOnSale };
    };

    const handleCheckout = async () => {
        if (!cart?.items?.length) return;

        try {
            const items = cart.items.map(item => {
                const { price } = getItemPrice(item);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: price,
                    name: item.product?.name
                };
            });

            const result = await initiateCheckout({
                type: 'cart',
                items,
                cartId: cart.id,
                shippingAddress: {
                    line1: "123 Main St", // Get from user input in real app
                    city: "Anytown",
                    state: "CA",
                    postalCode: "12345",
                    country: "US",
                }
            });

            if (result.url) {
                // Clear cart on successful checkout initiation
                await clearCart();
                window.location.href = result.url;
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            alert(`Checkout failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    };

    const CartContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            );
        }

        return (
            <>
                <div className="space-y-6 p-6">
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cart?.items?.length ? (
                            cart.items.map((item: CartItem) => {
                                const { price: itemPrice, isOnSale } = getItemPrice(item);
                                const totalPrice = itemPrice * item.quantity;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-3 border rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.product?.name}</h4>
                                            <span className={isOnSale ? "text-red-500" : "text-sm ml-2"}>
                                                ${itemPrice} × {item.quantity}
                                            </span>
                                        </div>
                                        <p className="font-medium">
                                            <span className={isOnSale ? "text-red-500" : ""}>
                                                ${totalPrice.toFixed(2)}
                                            </span>
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8">
                                <p>Your cart is empty</p>
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    {cart?.items?.length ? (
                        <div className="space-y-2 border-t pt-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>
                                    ${cart.items.reduce((sum: number, item: CartItem) => {
                                        const { price } = getItemPrice(item);
                                        return sum + (price * item.quantity);
                                    }, 0).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>
                                    ${cart.items.reduce((sum: number, item: CartItem) => {
                                        const { price } = getItemPrice(item);
                                        return sum + (price * item.quantity);
                                    }, 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Checkout Button */}
                <div className="p-4 border-t">
                    {/* <Button className="w-full" size="lg" disabled={!cart?.items?.length}>
                        Proceed to Checkout
                    </Button> */}

                    <Button
                        className="w-full"
                        size="lg"
                        disabled={!cart?.items?.length || isCheckoutLoading}
                        onClick={handleCheckout}
                    >
                        {isCheckoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>

                </div>
            </>
        );
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative text-white hover:bg-primary/90"
                    >
                        <ShoppingCartIcon className="h-5 w-5" />
                        {cart?.items?.length ? (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
                            </span>
                        ) : null}
                        <span className="sr-only">Cart</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Your Cart</DialogTitle>
                    </DialogHeader>
                    <CartContent />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-white hover:bg-primary/90"
                >
                    <ShoppingCartIcon className="h-5 w-5" />
                    {cart?.items?.length ? (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
                        </span>
                    ) : null}
                    <span className="sr-only">Cart</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Your Cart</DrawerTitle>
                </DrawerHeader>
                <CartContent />
                <DrawerFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Continue Shopping
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
}


