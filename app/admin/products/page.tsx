"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { products } from "@/lib/products"
import { Search, Plus, Edit, Trash2, Eye, X } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  rating: number
  description: string
}

function AdminProductsContent() {
  const { user, isTestMode } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "",
    rating: 4.5,
  })

  useEffect(() => {
    if (user) {
      if (isTestMode && user.email !== "admin@example.com") {
        router.push("/")
      }
      setLoading(false)
    } else {
      router.push("/")
    }
  }, [user, isTestMode, router])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }, [searchQuery])

  const openAddModal = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      category: "",
      price: 0,
      description: "",
      image: "",
      rating: 4.5,
    })
    setIsModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      rating: product.rating,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would call an API to save to database
    console.log("[v0] Saving product:", formData)
    alert(editingProduct ? "Product updated successfully!" : "Product added successfully!")
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // In production, this would call an API to delete from database
      console.log("[v0] Deleting product:", id)
      alert("Product deleted successfully!")
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Product Management</h1>
          <p className="text-muted-foreground">Manage your dry fruits inventory</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 animate-slide-up">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Product</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Price</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Rating</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-foreground font-semibold">₹{product.price}</td>
                    <td className="py-4 px-4 text-foreground">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/products/${product.id}`)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="View Product"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl animate-slide-up">
              <div className="flex justify-between items-center p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Select category</option>
                      <option value="nuts">Nuts & Seeds</option>
                      <option value="dried-fruits">Dried Fruits</option>
                      <option value="spices">Spices & Blends</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                    <input
                      type="number"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      required
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="Enter rating"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminProducts() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <AdminProductsContent />
    </Suspense>
  )
}
