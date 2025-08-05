// // components/CartButton.tsx
// 'use client';

// import { ShoppingBasket } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCart } from '@/hooks/useCart';
// import { useEffect, useState } from 'react';

// interface CartButtonProps {
//     productId: string;
//     quantity?: number;
//     className?: string;
//     showQuantity?: boolean;
//     onAddToCart?: (success: boolean) => void;
// }

// export function CartButton({
//     productId,
//     quantity = 1,
//     className = '',
//     showQuantity = true,
//     onAddToCart,
// }: CartButtonProps) {
//     const { cart, loading, addToCart } = useCart();
//     const [isInCart, setIsInCart] = useState(false);
//     const [currentQuantity, setCurrentQuantity] = useState(0);
//     const [isAdding, setIsAdding] = useState(false);

//     useEffect(() => {
//         const item = cart?.items.find(item => item.productId === productId);
//         setIsInCart(!!item);
//         setCurrentQuantity(item?.quantity || 0);
//     }, [cart, productId]);

//     const handleClick = async () => {
//         setIsAdding(true);
//         try {
//             const success = await addToCart(productId, quantity);
//             if (onAddToCart) onAddToCart(success);
//         } finally {
//             setIsAdding(false);
//         }
//     };

//     return (
//         <Button
//             onClick={handleClick}
//             className={`relative p-2 rounded-lg font-bold transition-colors ${isInCart
//                     ? 'bg-green-600 hover:bg-green-700 text-white'
//                     : 'bg-black hover:bg-gray-800 text-white'
//                 } ${className}`}
//             size="icon"
//             disabled={loading || isAdding}
//             aria-label={isInCart ? 'Update cart' : 'Add to cart'}
//         >
//             <ShoppingBasket className="w-5 h-5" />

//             {showQuantity && isInCart && currentQuantity > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                     {currentQuantity}
//                 </span>
//             )}
//         </Button>
//     );
// }

// components/CartButton.tsx
// 'use client';

// import { ShoppingBasket } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCart } from '@/hooks/useCart';
// import { useEffect, useState } from 'react';
// import { SessionProvider } from 'next-auth/react';

// interface CartButtonProps {
//     productId: string;
//     quantity?: number;
//     className?: string;
//     showQuantityBadge?: boolean;
//     onAddToCart?: (success: boolean) => void;
//     iconSize?: number;
//     badgeSize?: number;
// }

// export function CartButton({
//     productId,
//     quantity = 1,
//     className = '',
//     showQuantityBadge = true,
//     onAddToCart,
//     iconSize = 20, // Default 20px (w-5 h-5)
//     badgeSize = 20, // Default 20px (w-5 h-5)
// }: CartButtonProps) {
//     const { cart, loading, addToCart } = useCart();
//     const [isInCart, setIsInCart] = useState(false);
//     const [currentQuantity, setCurrentQuantity] = useState(0);
//     const [isAdding, setIsAdding] = useState(false);

//     // Update cart state when cart changes
//     useEffect(() => {
//         const item = cart?.items.find(item => item.productId === productId);
//         setIsInCart(!!item);
//         setCurrentQuantity(item?.quantity || 0);
//     }, [cart, productId]);

//     const handleClick = async () => {
//         setIsAdding(true);
//         try {
//             const success = await addToCart(productId, quantity);
//             if (onAddToCart) onAddToCart(success);

//             // Optional: You could add a subtle animation here
//             // to confirm the add to cart action
//         } finally {
//             setIsAdding(false);
//         }
//     };

//     // Calculate dynamic styles
//     const buttonClasses = `p-2 rounded-lg font-bold transition-colors ${isInCart
//             ? 'bg-green-600 hover:bg-green-700 text-white'
//             : 'bg-black hover:bg-gray-800 text-white'
//         } ${className}`;

//     const badgeClasses = `absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center`;

//     return (
//         <SessionProvider>
//         <Button
//             onClick={handleClick}
//             className={buttonClasses}
//             size="icon"
//             disabled={loading || isAdding}
//             aria-label={isInCart ? 'Update cart' : 'Add to cart'}
//         >
//             <div className="relative">
//                 <ShoppingBasket
//                     className="transition-transform duration-150"
//                     style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
//                 />

//                 {showQuantityBadge && isInCart && currentQuantity > 0 && (
//                     <span
//                         className={badgeClasses}
//                         style={{
//                             width: `${badgeSize}px`,
//                             height: `${badgeSize}px`,
//                             fontSize: `${Math.max(10, badgeSize * 0.6)}px`
//                         }}
//                     >
//                         {currentQuantity}
//                     </span>
//                 )}
//             </div>
//         </Button>
//         </SessionProvider>
//     );
// }

// src/components/CartButton.tsx
import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { Button } from "./ui/button";
import { CartItem } from "../types/cart";

export function CartButton({
  productId,
  quantity = 1,
  onAddToCart,
}: {
  productId: string;
  quantity?: number;
  onAddToCart?: (success: boolean) => void;
}) {
  const { cart, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const item = cart?.items?.find((item: CartItem) => item.productId === productId);
    setIsInCart(!!item);
    setCurrentQuantity(item?.quantity || 0);
  }, [cart, productId]);

  const handleClick = async () => {
    setIsAdding(true);
    try {
      const success = await addToCart(productId, quantity);
      if (onAddToCart) onAddToCart(success);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isAdding}
      className="p-2 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
    >
      {isAdding ? "Adding..." : isInCart ? `In Cart (${currentQuantity})` : "Add to Cart"}
    </Button>
  );
}

