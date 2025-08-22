import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

interface UseProductsParams {
  sort?: "offers" | "updated" | "newest";
  forOffers?: string;
}

interface ProductWithCategory extends Product {
  category: {
    name: string;
  };
}

export function useProducts(params: UseProductsParams = {}) {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();

        if (params.forOffers) {
          queryParams.append("forOffers", params.forOffers);
        } else if (params.sort) {
          queryParams.append("sort", params.sort);
        }

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.sort, params.forOffers]);

  return { products, loading, error };
}

export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // setLoading(true);
        const res = await fetch(`/api/products/${productId}`);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, loading, error };
}
