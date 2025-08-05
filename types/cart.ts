export interface Product {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    // Add other product fields you need
  }
  
  // export interface CartItem {
  //   id: string;
  //   productId: string;
  //   quantity: number;
  //   originalPrice: number;
  //   discountPrice?: number;
  //   product?: Product;
  // }
  
  export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    originalPrice: number;
    discountPrice?: number;
    priceLocked: boolean; // Add this
    product?: Product;
  }

  export interface Cart {
    id: string;
    items: CartItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }