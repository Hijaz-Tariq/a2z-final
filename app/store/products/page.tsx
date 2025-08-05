'use client';
import * as React from 'react'
import { motion } from 'framer-motion';
import { Product } from '@prisma/client';

import { ProductCard } from '../components/ProductCard';

export default function ProductsPage() {
    const slug = 'all-categories'

    const [products, setProducts] = React.useState<Product[]>([])
    const [categoryName, setCategoryName] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (!slug) return

        const fetchProducts = async () => {
            try {
                setLoading(true)
                let apiUrl = `/api/products`

                // Handle special cases
                if (slug === 'all-categories') {
                    apiUrl = '/api/products'
                }

                const response = await fetch(apiUrl)

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                setProducts(data.products || data)

                // Set appropriate category name
                if (slug === 'all-categories') {
                    setCategoryName("All Products")
                } else if (slug === 'discounts-offers') {
                    setCategoryName("Discounts & Offers")
                } else {
                    setCategoryName(data.categoryName || "Products")
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [slug])

    if (loading) return <div className="p-4">Loading products...</div>
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                            scale: 1.03,
                            transition: {
                                type: "tween",
                                ease: "easeOut",
                                duration: 0.2
                            }
                        }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>
        </div >
    );
}