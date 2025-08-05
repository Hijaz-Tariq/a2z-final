// // "use client";

// // import { useEffect, useState, useCallback } from "react";
// // import { useSession } from "next-auth/react";
// // import { Cart } from "@/types/cart"; // Adjust import path as needed

// // export const useCart = () => {
// //   const { data: session } = useSession();
// //   const [cart, setCart] = useState<Cart | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   // const fetchCart = useCallback(async () => {
// //   //   try {
// //   //     setLoading(true);
// //   //     const response = await fetch('/api/cart');

// //   //     if (!response.ok) {
// //   //       throw new Error('Failed to fetch cart');
// //   //     }

// //   //     const data = await response.json();

// //   //     if (data.mergedCart) {
// //   //       setCart(data.mergedCart);
// //   //       localStorage.removeItem('guest_session_id');
// //   //     } else {
// //   //       setCart(data);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Cart fetch error:", error);
// //   //     setCart(null); // Reset cart on error
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // }, [session?.user]);

// //   const fetchCart = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch("/api/cart");

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       // Check if response is JSON before parsing
// //       const contentType = response.headers.get("content-type");
// //       if (!contentType?.includes("application/json")) {
// //         const text = await response.text();
// //         throw new Error(`Expected JSON but got: ${text.substring(0, 100)}`);
// //       }

// //       const data = await response.json();
// //       setCart(data);
// //       if (data.mergedCart) {
// //         setCart(data.mergedCart);
// //         localStorage.removeItem("guest_session_id");
// //       } else {
// //         setCart(data);
// //       }
// //     } catch (error) {
// //       console.error("Cart fetch error:", error);
// //       setCart(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [session?.user]);

// //   // const addToCart = async (productId: string, quantity: number = 1) => {
// //   //   try {
// //   //     const response = await fetch("/api/cart/items", {
// //   //       method: "POST",
// //   //       headers: { "Content-Type": "application/json" },
// //   //       body: JSON.stringify({ productId, quantity }),
// //   //     });

// //   //     if (!response.ok) {
// //   //       throw new Error(`Failed to add to cart: ${response.status}`);
// //   //     }

// //   //     await fetchCart();
// //   //     return true;
// //   //   } catch (error) {
// //   //     console.error("Add to cart error:", error);
// //   //     return false;
// //   //   }
// //   // };

// //   const addToCart = async (productId: string, quantity: number = 1) => {
// //     try {
// //       const response = await fetch("/api/cart/items", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ productId, quantity }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || `HTTP ${response.status}`);
// //       }

// //       const updatedCart = await response.json();
// //       setCart(updatedCart);
// //       return true;
// //     } catch (error) {
// //       console.error("Add to cart failed:", error);
// //       return false;
// //     }
// //   };
// //   useEffect(() => {
// //     fetchCart();
// //   }, [fetchCart]);

// //   return {
// //     cart,
// //     loading,
// //     addToCart,
// //     fetchCart,
// //     // isEmpty: !cart || cart.items.length === 0,
// // isEmpty: !cart || !cart.items || cart.items.length === 0
// //   };
// // };

// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useSession } from "next-auth/react";
// import { Cart } from "@/types/cart"; // Adjust import path as needed

// export const useCart = () => {
//   const { data: session } = useSession();
//   const [cart, setCart] = useState<Cart | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/cart");

//       if (!response.ok) {
//         throw new Error("Failed to fetch cart");
//       }

//       const data = await response.json();

//       if (data.mergedCart) {
//         setCart(data.mergedCart);
//         localStorage.removeItem("guest_session_id");
//       } else {
//         setCart(data);
//       }
//     } catch (error) {
//       console.error("Cart fetch error:", error);
//       setCart(null); // Reset cart on error
//     } finally {
//       setLoading(false);
//     }
//   }, [session?.user]);

//   const addToCart = async (productId: string, quantity: number = 1) => {
//     try {
//       const response = await fetch("/api/cart/items", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId, quantity }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to add to cart: ${response.status}`);
//       }

//       await fetchCart();
//       return true;
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   return {
//     cart,
//     loading,
//     addToCart,
//     fetchCart,
//     isEmpty: !cart || cart.items.length === 0,
//   };
// };

// // "use client";

// // import { useEffect, useState, useCallback } from "react";
// // import { useSession } from "next-auth/react";

// // interface CartItem {
// //     id: string;
// //     productId: string;
// //     quantity: number;
// //     product?: {
// //       id: string;
// //       name: string;
// //       price: number;
// //       // Add other product fields you need
// //     };
// //   }

// //   interface Cart {
// //     id: string;
// //     items: CartItem[];
// //     // Add other cart fields you need
// //   }

// //   export const useCart = () => {
// //     const [cart, setCart] = useState<Cart | null>(null);

// // //   const [cart, setCart] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

// //   // Use optional chaining with useSession since SessionProvider might not be present
// //   const session = useSession?.()?.data;

// //   // Initialize or retrieve guest session
// //   const initGuestSession = useCallback(async () => {
// //     if (session?.user) return;

// //     let sessionId = localStorage.getItem("guestSessionId");
// //     if (!sessionId) {
// //       const response = await fetch("/api/guest/session", { method: "POST" });
// //       const data = await response.json();
// //       sessionId = data.sessionId;
// //       if (!sessionId) throw new Error("No session ID received");
// //       localStorage.setItem("guestSessionId", sessionId);
// //     }

// //     // TypeScript now knows sessionId is string here
// //     setGuestSessionId(sessionId);
// //   }, [session?.user]);
// //   const fetchCart = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const url = session?.user
// //         ? "/api/cart"
// //         : `/api/guest/cart?sessionId=${guestSessionId}`;

// //       if (!session?.user && !guestSessionId) return;

// //       const response = await fetch(url);
// //       if (!response.ok) throw new Error("Failed to fetch cart");
// //       const data = await response.json();
// //       setCart(data);
// //     } catch (error) {
// //       console.error("Cart fetch error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [session?.user, guestSessionId]);

// //   const addToCart = async (productId: string, quantity: number = 1) => {
// //     try {
// //       const url = session?.user ? "/api/cart/items" : "/api/guest/cart/items";

// //       const body = session?.user
// //         ? { productId, quantity }
// //         : { productId, quantity, sessionId: guestSessionId };

// //       const response = await fetch(url, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });

// //       if (!response.ok) throw new Error("Failed to add to cart");
// //       await fetchCart();
// //       return true;
// //     } catch (error) {
// //       console.error("Add to cart error:", error);
// //       return false;
// //     }
// //   };

// //   useEffect(() => {
// //     initGuestSession();
// //   }, [initGuestSession]);

// //   useEffect(() => {
// //     if (session?.user || guestSessionId) {
// //       fetchCart();
// //     }
// //   }, [session, guestSessionId, fetchCart]);

// //   return { cart, loading, addToCart, fetchCart };
// // };

// hooks/useCart.ts - Improved version
"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Cart } from "../types/cart"; // Adjust import path as needed

export const useCart = () => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // const fetchCart = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch('/api/cart');

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch cart');
  //     }

  //     const data = await response.json();

  //     if (data.mergedCart) {
  //       setCart(data.mergedCart);
  //       localStorage.removeItem('guest_session_id');
  //     } else {
  //       setCart(data);
  //     }
  //   } catch (error) {
  //     console.error("Cart fetch error:", error);
  //     setCart(null); // Reset cart on error
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [session?.user]);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}`);
      }

      const data = await response.json();
      setCart(data);
      if (data.mergedCart) {
        setCart(data.mergedCart);
        localStorage.removeItem("guest_session_id");
      } else {
        setCart(data);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [session?.user]);

  // const addToCart = async (productId: string, quantity: number = 1) => {
  //   try {
  //     const response = await fetch("/api/cart/items", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ productId, quantity }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to add to cart: ${response.status}`);
  //     }

  //     await fetchCart();
  //     return true;
  //   } catch (error) {
  //     console.error("Add to cart error:", error);
  //     return false;
  //   }
  // };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error("Add to cart failed:", error);
      return false;
    }
  };
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart,
    loading,
    addToCart,
    fetchCart,
    isEmpty: !cart || cart.items.length === 0,
  };
};
