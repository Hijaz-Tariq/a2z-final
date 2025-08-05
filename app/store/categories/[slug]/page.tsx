// import * as React from 'react'
// import { useParams } from 'next/navigation'
// import { Product } from "@prisma/client"
// import { Card } from "@/components/ui/card"
// import Image from "next/image"
// import Link from "next/link"

// export default function CategoryPage() {
//     const params = useParams()
//     const slug = params?.slug as string

//     const [products, setProducts] = React.useState<Product[]>([])
//     const [categoryName, setCategoryName] = React.useState("")
//     const [loading, setLoading] = React.useState(true)
//     const [error, setError] = React.useState<string | null>(null)

//     React.useEffect(() => {
//         if (!slug) return

//         const fetchProducts = async () => {
//             try {
//                 setLoading(true)
//                 const response = await fetch(`/api/categories/${slug}/products`)

//                 if (!response.ok) {
//                     throw new Error(await response.text())
//                 }

//                 const data = await response.json()
//                 setProducts(data.products)
//                 setCategoryName(data.categoryName)
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : "Unknown error")
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchProducts()
//     }, [slug])

//     if (loading) return <div className="p-4">Loading products...</div>
//     if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-2xl font-bold mb-6">{categoryName || "Products"}</h1>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                 ))}
//             </div>

//             {products.length === 0 && !loading && (
//                 <div className="text-center py-12">
//                     <p className="text-gray-500">No products found in this category.</p>
//                 </div>
//             )}
//         </div>
//     )
// }

// function ProductCard({ product }: { product: Product }) {
//     return (
//         <Link href={`/store/products/${product.id}`} passHref>
//             <Card className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//                 <div className="relative h-48 w-full">
//                     {product.images?.[0] ? (
//                         <Image
//                             src={product.images[0]}
//                             alt={product.name}
//                             fill
//                             className="object-cover"
//                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                         />
//                     ) : (
//                         <div className="bg-gray-100 w-full h-full flex items-center justify-center">
//                             <span className="text-gray-400">No image</span>
//                         </div>
//                     )}
//                 </div>
//                 <div className="p-4">
//                     <h3 className="font-medium text-lg">{product.name}</h3>
//                     <div className="flex items-center gap-2 mt-2">
//                         {product.discountPrice ? (
//                             <>
//                                 <span className="text-red-500 font-semibold">
//                                     ${product.discountPrice.toFixed(2)}
//                                 </span>
//                                 <span className="text-gray-400 line-through text-sm">
//                                     ${product.price.toFixed(2)}
//                                 </span>
//                             </>
//                         ) : (
//                             <span className="text-gray-600">
//                                 ${product.price.toFixed(2)}
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             </Card>
//         </Link>
//     )
// }

'use client'
import * as React from 'react'
import { useParams } from 'next/navigation'
import { Product } from "@prisma/client"
// import { Card } from "@/components/ui/card"
// import Image from "next/image"
// import Link from "next/link"
import { ProductCard } from '../../components/ProductCard'
// import { ProductCard } from '../../components/ProductCard'

export default function CategoryPage() {
    const params = useParams()
    const slug = params?.slug as string

    const [products, setProducts] = React.useState<Product[]>([])
    const [categoryName, setCategoryName] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (!slug) return

        const fetchProducts = async () => {
            try {
                setLoading(true)
                let apiUrl = `/api/categories/${slug}/products`
                
                // Handle special cases
                if (slug === 'all-categories') {
                    apiUrl = '/api/products' // You'll need to create this endpoint
                }
                
                const response = await fetch(apiUrl)

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                setProducts(data.products || data) // Adjust based on your API response structure
                
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{categoryName || "Products"}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found in this category.</p>
                </div>
            )}
        </div>
    )
}

