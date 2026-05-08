"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingCartBadge } from "@/components/floating-cart-badge"
import { useCart } from "@/lib/cart-context"
import { Star, Filter, X, Check, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products"

const categories = [
  { id: "all", name: "All Products" },
  { id: "nuts", name: "Nuts & Seeds" },
  { id: "dried-fruits", name: "Dried Fruits" },
  { id: "spices", name: "Spices & Blends" },
]

export default function ProductsPage() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set())
  const [openDropdown, setOpenDropdown] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered
  }, [selectedCategory, priceRange, sortBy])

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    setAddedItems((prev) => new Set([...prev, product.id]))
    setTimeout(() => {
      setAddedItems((prev) => {
        const updated = new Set(prev)
        updated.delete(product.id)
        return updated
      })
    }, 1500)
  }

  const currentCategoryName = categories.find((c) => c.id === selectedCategory)?.name

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 animate-fade-in-up text-balance">
            Our Products
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Discover our complete collection of premium dry fruits and spices
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden"} lg:block animate-slide-in-left`}>
            <div className="bg-secondary/30 rounded-xl p-4 md:p-6 border border-border sticky top-20 max-h-fit overflow-y-auto">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Dropdown */}
              <div className="mb-6 md:mb-8">
                <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Category</h4>
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground font-semibold flex justify-between items-center hover:border-primary/50 transition-all duration-200 active:bg-primary/10"
                  >
                    {currentCategoryName}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${openDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-10 overflow-hidden animate-fade-in-up">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id)
                            setOpenDropdown(false)
                          }}
                          className={`w-full text-left px-4 py-3 transition-all duration-200 ${
                            selectedCategory === cat.id
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Filter with Styled Slider */}
              <div className="mb-6 md:mb-8">
                <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Price Range</h4>
                <div className="space-y-4">
                  <style>{`
                    input[type='range'] {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 100%;
                      height: 8px;
                      background: linear-gradient(to right, 
                        var(--color-primary) 0%, 
                        var(--color-primary) ${((priceRange[1] - priceRange[0]) / 1500) * 100}%, 
                        var(--color-border) ${((priceRange[1] - priceRange[0]) / 1500) * 100}%, 
                        var(--color-border) 100%);
                      border-radius: 5px;
                      outline: none;
                    }
                    
                    input[type='range']::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 20px;
                      height: 20px;
                      background: var(--color-primary);
                      border: 3px solid var(--color-background);
                      border-radius: 50%;
                      cursor: pointer;
                      box-shadow: 0 2px 8px rgba(var(--primary), 0.4);
                      transition: all 0.2s;
                    }
                    
                    input[type='range']::-webkit-slider-thumb:hover {
                      transform: scale(1.1);
                      box-shadow: 0 4px 12px rgba(var(--primary), 0.6);
                    }
                    
                    input[type='range']::-moz-range-thumb {
                      width: 20px;
                      height: 20px;
                      background: var(--color-primary);
                      border: 3px solid var(--color-background);
                      border-radius: 50%;
                      cursor: pointer;
                      box-shadow: 0 2px 8px rgba(var(--primary), 0.4);
                      transition: all 0.2s;
                    }
                    
                    input[type='range']::-moz-range-thumb:hover {
                      transform: scale(1.1);
                      box-shadow: 0 4px 12px rgba(var(--primary), 0.6);
                    }

                    input[type='range']::-moz-range-track {
                      background: transparent;
                      border: none;
                    }
                  `}</style>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm md:text-base"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-95"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Results Count */}
            <div className="mb-6 text-sm md:text-base text-muted-foreground animate-fade-in-up">
              Showing {filteredProducts.length} products
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-background rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${(index % 6) * 0.05}s` }}
                >
                  {/* Product Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-secondary/50">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold animate-bounce-in">
                      New
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2 text-sm md:text-base">
                      {product.name}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 md:w-4 h-3 md:h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                    </div>

                    {/* Price and Button */}
                    <div className="flex justify-between items-center">
                      <span className="text-base md:text-lg font-bold text-primary">₹{product.price}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddToCart(product)
                        }}
                        className={`px-2 md:px-3 py-1 rounded-lg font-semibold transition-all duration-200 text-xs md:text-sm flex items-center gap-1 active:scale-95 ${
                          addedItems.has(product.id)
                            ? "bg-green-500 text-white"
                            : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        {addedItems.has(product.id) ? (
                          <>
                            <Check className="w-3 h-3" />
                            Added
                          </>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 animate-fade-in-up">
                <p className="text-base md:text-lg text-muted-foreground mb-4">No products found in this category.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all")
                    setPriceRange([0, 1500])
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-95"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingCartBadge />
      <Footer />
    </div>
  )
}
