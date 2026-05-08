"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Package, User, LogOut, Loader2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in-up">My Orders</h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4 animate-slide-up">
                <Link
                  href="/account"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 text-foreground hover:text-primary transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary transition-all duration-200"
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Orders</span>
                </Link>
                <button
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-foreground hover:text-destructive transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8 text-center animate-slide-up">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">No Orders Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Link href="/products">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 active:scale-95">
                    Browse Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
