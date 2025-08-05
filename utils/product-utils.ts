export const getProductImage = (product: {
    mainImage: string | null;
    images?: string[];
  }): string => {
    // If mainImage exists, use it
    if (product.mainImage) {
      return product.mainImage;
    }
    
    // If images array exists and has items, pick random
    if (product.images && product.images.length > 0) {
      const randomIndex = Math.floor(Math.random() * product.images.length);
      return product.images[randomIndex];
    }
    
    // Fallback to placeholder
    return '/placeholder-product-image.jpg';
  };