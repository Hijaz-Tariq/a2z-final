"use client";

import { useState, useCallback, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import {
  CirclePlus,
  CircleMinus,
  ChevronLeft,
  Heart,
  // ShoppingBasket,
} from "lucide-react";

import { Button } from "../../../../components/ui/button";
import ProductSkeleton from "./components/ProductSkeleton";

import { useProduct } from "../../../../hooks/useProducts";
import { CartButton } from "../../../../components/CartButton";
import { SessionProvider } from "next-auth/react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const router = useRouter();
  const { product, loading, error } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [emblaThumbsRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const onThumbnailClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Error loading product
          </h2>
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Product not found</h2>
          <p className="mb-4">
            The product you&lsquo;re looking for doesn&lsquo;t exist.
          </p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image section with thumbnails */}
          <div className="lg:w-2/3 flex flex-col lg:flex-row gap-4">
            {/* Thumbnails - Desktop (left side) */}
            <div className="hidden lg:flex flex-col gap-2 w-20">
              {product.images.map((image, index) => (
                <Button
                  key={index}
                  onClick={() => onThumbnailClick(index)}
                  className={`w-20 h-20 relative rounded-md overflow-hidden border-2 transition-colors ${selectedIndex === index
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </Button>
              ))}
            </div>

            {/* Main carousel */}
            <div className="relative w-full aspect-square lg:aspect-[3/2] bg-gray-100">
              <motion.div
                className="relative w-full h-full"
                layoutId={`product-image-${product.id}`}
                transition={{
                  type: "tween",
                  ease: [0.25, 0.1, 0.25, 1],
                  duration: 1.2,
                }}
              >
                <div className="embla overflow-hidden h-full" ref={emblaRef}>
                  <div className="embla__container flex h-full">
                    {product.images.map((image, index) => (
                      <div
                        className="embla__slide flex-[0_0_100%] min-w-0 h-full"
                        key={index}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={image}
                            alt={`${product.name} - Image ${index + 1}`}
                            fill
                            className="object-contain"
                            priority={index === 0}
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <Button
                onClick={() => router.back()}
                className="absolute top-4 left-4 z-20 p-2 bg-black/80 text-white rounded-full hover:bg-black"
                size="icon"
              >
                <ChevronLeft />
              </Button>
              <Button
                onClick={() => router.back()}
                className="absolute top-4 right-4 z-20 p-2 bg-black/80 text-white rounded-full hover:bg-black"
                size="icon"
              >
                <Heart />
              </Button>
            </div>

            {/* Thumbnails - Mobile (below carousel) */}
            <div className="lg:hidden ">
              <div className="embla overflow-hidden" ref={emblaThumbsRef}>
                <div className="embla__container flex gap-2 py-2">
                  {product.images.map((image, index) => (
                    <Button
                      key={index}
                      onClick={() => onThumbnailClick(index)}
                      className={`embla__slide flex-[0_0_20%] min-w-0 h-16 relative rounded-md overflow-hidden border-2 transition-colors ${selectedIndex === index
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                        }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="20vw"
                      />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product details section (1/3 width) */}
          <div className="lg:w-1/3 flex flex-col justify-between gap-6 h-full">
            {/* Row 1: Product Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:h-1/4"
            >
              <h1 className="text-2xl font-bold pt-4">{product.name}</h1>
            </motion.div>

            {/* Row 2: Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:h-1/4 flex items-center"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < Math.floor(product.averageRating!)
                      ? "text-yellow-500"
                      : "text-gray-300"
                      }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-600">
                  {product.averageRating!.toFixed(1)}
                </span>
              </div>
            </motion.div>

            {/* Row 3: Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:h-1/4 text-gray-600 overflow-y-auto"
            >
              {product.description}
            </motion.div>

            {/* Row 4: Price & Add to Cart (sticky on scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:h-1/4 bg-gray-50 p-4 rounded-lg lg:sticky lg:bottom-4"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Price</span>
                <span className="text-xl font-bold">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleDecrement}
                    className="text-gray-600 hover:text-black transition-colors"
                    variant="ghost"
                    size="icon"
                  >
                    <CircleMinus size={24} />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    onClick={handleIncrement}
                    className="text-gray-600 hover:text-black transition-colors"
                    variant="ghost"
                    size="icon"
                  >
                    <CirclePlus size={24} />
                  </Button>
                </div>
              </div>
              <div className="flex justify-around p2">
                <Button className="w-2/3 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  CheckOut - ${(Number(product.price) * quantity).toFixed(2)}
                </Button>
                <SessionProvider >
                  {/* <Button className="p-2 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"> */}
                    <CartButton
                      productId={product.id}
                      quantity={quantity}
                      onAddToCart={(success) => {
                        if (success) {
                          // Show toast notification
                        }
                      }}
                    />
                  {/* </Button> */}
                  </SessionProvider>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
