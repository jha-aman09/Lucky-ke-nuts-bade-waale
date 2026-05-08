"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCartBadge } from "@/components/floating-cart-badge"
import { useCart } from "@/lib/cart-context"
import { ArrowRight, Star, Truck, Shield, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/products"
import { useState } from "react"

export default function Home() {
  const { addItem } = useCart()
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set())

  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "No additives or preservatives, just pure goodness",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Fresh products delivered within 2-3 business days",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Handpicked and tested for premium quality",
    },
  ]

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20 lg:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full animate-bounce-in">
                <span className="text-xs sm:text-sm font-semibold text-primary">Premium Quality Guaranteed</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight text-balance">
                Taste the Authentic Flavors of India
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                Discover our handpicked collection of premium dry fruits and spices, sourced directly from the finest
                farms across India. Experience quality, freshness, and tradition in every bite.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 text-sm md:text-base"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 text-sm md:text-base"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Trusted by 10K+ customers</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-full animate-slide-in-left">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <div className="relative h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl hover:shadow-primary/20 transition-shadow duration-300">
                <Image
                  src="/premium-dry-fruits-spices-collection.jpg"
                  alt="Premium dry fruits collection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Why Choose Spice Valley?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We're committed to bringing you the finest quality dry fruits and spices with exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="p-6 md:p-8 bg-background rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12 animate-fade-in-up">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-sm md:text-base text-muted-foreground">Our bestselling premium selections</p>
            </div>
            <Link
              href="/products"
              className="text-primary font-semibold hover:gap-2 flex items-center gap-1 transition-all duration-300 text-sm md:text-base"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 8).map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-background rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up block"
                style={{ animationDelay: `${(index % 4) * 0.05}s` }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden bg-secondary/50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold animate-bounce-in">
                    New
                  </div>
                </div>

                <div className="p-3 md:p-4">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2 text-sm md:text-base">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 md:w-4 h-3 md:h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-bold text-primary">₹{product.price}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product)
                      }}
                      className={`px-2 md:px-3 py-1 rounded-lg transition-all duration-200 text-xs md:text-sm font-semibold active:scale-95 ${
                        addedItems.has(product.id)
                          ? "bg-green-500 text-white"
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {addedItems.has(product.id) ? "✓ Added" : "Add"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8">
            Get exclusive offers, recipes, and updates on new arrivals delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm md:text-base"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <FloatingCartBadge />
      <Footer />
    </div>
  )
}
