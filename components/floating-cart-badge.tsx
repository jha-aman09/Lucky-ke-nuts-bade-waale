"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"

export function FloatingCartBadge() {
  const { getTotalItems } = useCart()
  const cartCount = getTotalItems()
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {isVisible && (
        <Link
          href="/cart"
          className="relative flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 hover:shadow-primary/50 hover:shadow-lg animate-bounce-in group"
        >
          <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-20" />
          <div className="relative flex flex-col items-center justify-center">
            <ShoppingCart className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </div>

          {/* Hover tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-foreground text-background text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {cartCount} Items in Cart
          </div>

          {/* Floating particles animation */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-slide-up transition-all duration-300" />
          </div>
        </Link>
      )}
    </div>
  )
}
