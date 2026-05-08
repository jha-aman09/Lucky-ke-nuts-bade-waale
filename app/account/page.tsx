"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { User, Mail, Loader2, CheckCircle2, Package, LogOut } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName)
    }
  }, [user])

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
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in-up">My Account</h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4 animate-slide-up">
                <Link
                  href="/account"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 text-foreground hover:text-primary transition-all duration-200"
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
            <div className="md:col-span-2 space-y-6">
              {/* Profile Info */}
              <div className="bg-card border border-border rounded-lg p-8 animate-slide-up">
                <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>

                {success && (
                  <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-600 px-4 py-3 rounded-lg flex items-center gap-2 animate-wiggle">
                    <CheckCircle2 className="w-5 h-5" />
                    <p className="text-sm">Profile updated successfully!</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Full Name</Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="pl-10 bg-muted cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>

                  <Button
                    onClick={() => {
                      setSuccess(true)
                      setTimeout(() => setSuccess(false), 3000)
                    }}
                    className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-95"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>

              {/* Account Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-6 text-center animate-slide-up hover:shadow-lg transition-shadow duration-300">
                  <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">0</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 text-center animate-slide-up hover:shadow-lg transition-shadow duration-300">
                  <User className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">Member</p>
                  <p className="text-sm text-muted-foreground">Account Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
