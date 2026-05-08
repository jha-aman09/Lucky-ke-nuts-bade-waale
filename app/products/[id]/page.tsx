"use client"

import { useState, use } from "react";
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCartBadge } from "@/components/floating-cart-badge"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, Check } from "lucide-react"

export default function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link href="/products" className="text-primary hover:underline">
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1500)
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mb-8 animate-fade-in-up"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>

        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-secondary/50 rounded-2xl overflow-hidden h-96 md:h-full md:min-h-96 flex items-center justify-center animate-fade-in-up">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Product Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              {product.category === "nuts" && "Nuts & Seeds"}
              {product.category === "dried-fruits" && "Dried Fruits"}
              {product.category === "spices" && "Spices & Blends"}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.rating} out of 5)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">₹{product.price}</span>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors duration-200 active:scale-95"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors duration-200 active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 mb-4 ${
                addedToCart ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {addedToCart ? (
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-6 h-6" />
                  Added to Cart
                </div>
              ) : (
                "Add to Cart"
              )}
            </button>

            {/* Additional Info */}
            <div className="bg-secondary/30 rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Premium Quality Guarantee</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 100% authentic and fresh</li>
                <li>✓ Sourced directly from Indian farms</li>
                <li>✓ No artificial additives or preservatives</li>
                <li>✓ Money-back guarantee</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group bg-background rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden bg-secondary/50">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {p.name}
                    </h3>
                    <span className="text-lg font-bold text-primary">₹{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <FloatingCartBadge />
      <Footer />
    </div>
  )
}
