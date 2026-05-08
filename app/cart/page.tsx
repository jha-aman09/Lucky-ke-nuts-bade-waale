"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 2000 ? 0 : 200
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in-up">Shopping Cart</h1>
          <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Review your items before checkout
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some delicious products to get started!</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 animate-fade-in-up">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-background flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                      <p className="text-primary font-bold">₹{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-background rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-secondary rounded transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-secondary rounded transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-foreground">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors duration-200 mt-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:gap-3 transition-all duration-300"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-secondary/30 rounded-lg border border-border p-6 sticky top-20">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{total}</span>
                </div>

                {subtotal <= 2000 && (
                  <p className="text-xs text-muted-foreground mb-4 p-2 bg-primary/10 rounded">
                    Free shipping on orders above ₹2000
                  </p>
                )}

                <Link
                  href="/checkout"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button className="w-full px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
