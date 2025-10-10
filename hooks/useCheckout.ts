// // hooks/useCheckout.ts
// import { useState } from 'react';
// import { useSession } from 'next-auth/react';

// export interface CheckoutRequest {
//   type: 'product' | 'cart' | 'pickup';
//   items: Array<{
//     productId: string;
//     quantity: number;
//     price: number;
//     name?: string;
//   }>;
//   customerInfo?: {
//     email: string;
//     name: string;
//     phone?: string;
//   };
//   shippingAddress?: {
//     line1: string;
//     line2?: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     country: string;
//   };
//   pickupDetails?: {
//     scheduledDate: string;
//     timeWindow: string;
//     specialNotes?: string;
//     pickupWarehouseId?: string;
//     customPickupAddress?: any;
//     deliveryWarehouseId?: string;
//     customDeliveryAddress?: any;
//     itemsDescription?: string;
//     totalWeight?: number;
//     packageCount?: number;
//   };
//   cartId?: string; // For cart checkout
// }

// export interface CheckoutResponse {
//   url: string;
//   orderId: string;
//   pickupId?: string;
//   guestSessionId?: string;
// }

// export function useCheckout() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { data: session, status } = useSession();

//   const checkout = async (checkoutData: CheckoutRequest): Promise<CheckoutResponse> => {
//     setIsLoading(true);
//     setError(null);
// const initialStatus = status;
//     try {
//       const guestSessionToken = typeof window !== 'undefined'
//         ? localStorage.getItem('guest_session_id')
//         : null;

//       // Determine authentication status
//       let finalIsGuest = status === 'unauthenticated';
//       let finalIsAuthenticated = status === 'authenticated';

//       // If session is loading, wait briefly
//       if (status === 'loading') {
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         finalIsGuest = status === 'unauthenticated';
//         finalIsAuthenticated = status === 'authenticated';
//       }

//       // Collect guest info if needed
//       let customerInfo = checkoutData.customerInfo;
//       if (finalIsGuest && !customerInfo) {
//         // In a real app, use a proper form modal instead of prompts
//         const email = prompt("Please enter your email for the order:");
//         const name = prompt("Please enter your name:");
//         const phone = prompt("Please enter your phone number (optional):") || "";

//         if (!email || !name) {
//           throw new Error("Email and name are required for guest checkout");
//         }

//         customerInfo = { email, name, phone };
//       }

//       // Determine the correct API endpoint
//       let endpoint = '/api/checkout';
//       if (checkoutData.type === 'pickup') {
//         endpoint = '/api/checkout/pickup';
//       }

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(finalIsAuthenticated && session?.user?.id && {
//             Authorization: `Bearer ${session.user.id}`,
//           }),
//         },
//         body: JSON.stringify({
//           ...checkoutData,
//           customerInfo,
//           isGuest: finalIsGuest,
//           guestSessionToken: finalIsGuest ? guestSessionToken : null,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       return result;

//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Unknown error";
//       setError(errorMessage);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { checkout, isLoading, error };
// }

// hooks/useCheckout.ts
import { useState } from "react";
import { useSession } from "next-auth/react";

export interface CheckoutRequest {
  type: "product" | "cart" | "pickup";
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name?: string;
  }>;
  customerInfo?: {
    email: string;
    name: string;
    phone?: string;
  };
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  pickupDetails?: {
    scheduledDate: string;
    timeWindow: string;
    specialNotes?: string;
    pickupWarehouseId?: string;
    customPickupAddress?: any;
    deliveryWarehouseId?: string;
    customDeliveryAddress?: any;
    itemsDescription?: string;
    totalWeight?: number;
    packageCount?: number;
  };
  cartId?: string; // For cart checkout
}

export interface CheckoutResponse {
  url: string;
  orderId: string;
  pickupId?: string;
  guestSessionId?: string;
}

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const checkout = async (
    checkoutData: CheckoutRequest
  ): Promise<CheckoutResponse> => {
    setIsLoading(true);
    setError(null);
    const initialStatus = status;

    try {
      const guestSessionToken =
        typeof window !== "undefined"
          ? localStorage.getItem("guest_session_id")
          : null;

      // Use the initial status and handle loading state
      let finalIsGuest = initialStatus === "unauthenticated";
      let finalIsAuthenticated = initialStatus === "authenticated";

      // If session is loading, wait briefly and handle appropriately
      if (initialStatus === "loading") {
        // Wait for auth to potentially resolve
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Since we can't get the updated status directly, we need to handle this differently
        // For guest checkout scenarios, we'll proceed as guest after timeout
        // In a real app, you might want to:
        // 1. Throw an error and let the component handle retry
        // 2. Or proceed with guest checkout

        console.warn("Session loading timed out, proceeding as guest");
        finalIsGuest = true;
        finalIsAuthenticated = false;
      }

      // Collect guest info if needed
      let customerInfo = checkoutData.customerInfo;
      if (finalIsGuest && !customerInfo) {
        // In a real app, use a proper form modal instead of prompts
        const email = prompt("Please enter your email for the order:");
        const name = prompt("Please enter your name:");
        const phone =
          prompt("Please enter your phone number (optional):") || "";

        if (!email || !name) {
          throw new Error("Email and name are required for guest checkout");
        }

        customerInfo = { email, name, phone };
      }

      // Determine the correct API endpoint
      let endpoint = "/api/checkout";
      if (checkoutData.type === "pickup") {
        endpoint = "/api/checkout/pickup";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(finalIsAuthenticated &&
            session?.user?.id && {
              Authorization: `Bearer ${session.user.id}`,
            }),
        },
        body: JSON.stringify({
          ...checkoutData,
          customerInfo,
          isGuest: finalIsGuest,
          guestSessionToken: finalIsGuest ? guestSessionToken : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkout, isLoading, error };
}
