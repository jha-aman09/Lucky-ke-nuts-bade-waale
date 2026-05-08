"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"

interface ProductCardAnimatedProps {
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  description: string
}

export function ProductCardAnimated({
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  description,
}: ProductCardAnimatedProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div
      className="group bg-background rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-secondary/50">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {originalPrice && (
            <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              Sale
            </div>
          )}
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">In Stock</div>
        </div>

        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-fade-in-up">
            <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105">
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-all duration-300 ${
                i < Math.floor(rating) ? "fill-primary text-primary" : "text-border"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-primary">{price}</span>
          {originalPrice && <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdded ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
