"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, ChevronDown, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { MegaMenu } from "./mega-menu"
import { AuthModal } from "./auth-modal"

export function Header() {
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()
  const cartCount = getTotalItems()
  const [isOpen, setIsOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login")

  return (
    <>
      <header className="sticky top-0 z-40 bg-background border-b border-border backdrop-blur-sm bg-background/80">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg md:text-xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                SV
              </div>
              <span className="font-bold text-lg md:text-xl hidden sm:inline text-foreground group-hover:text-primary transition-colors duration-200">
                Spice Valley
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group text-sm lg:text-base"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>

              <div className="relative group">
                <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base">
                  Products
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <MegaMenu />
                </div>
              </div>

              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group text-sm lg:text-base"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group text-sm lg:text-base"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              {user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm hidden lg:inline">{user.displayName || "Account"}</span>
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-slide-up z-50">
                      {user.email === "admin@example.com" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors duration-200 border-b border-border font-semibold"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsUserMenuOpen(false)
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors duration-200 flex items-center gap-2 border-t border-border"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalTab("login")
                    setIsAuthModalOpen(true)
                  }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  Login
                </button>
              )}

              <Link href="/cart" className="relative group">
                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-foreground group-hover:text-primary transition-colors duration-200 group-hover:scale-110 group-hover:-rotate-12" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-bold animate-bounce-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-foreground hover:text-primary transition-colors duration-200 hover:scale-110"
              >
                {isOpen ? <X className="w-6 h-6 animate-spin-slow" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Redesigned full-screen mobile menu */}
          {isOpen && (
            <div className="md:hidden fixed inset-0 top-16 bg-background border-t border-border overflow-y-auto z-40 animate-slide-up">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {user ? (
                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{user.displayName || "User"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {user.email === "admin@example.com" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsOpen(false)}
                          className="block py-2 px-3 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-primary/20"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/account"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        className="w-full text-left py-2 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalTab("signup")
                      setIsAuthModalOpen(true)
                      setIsOpen(false)
                    }}
                    className="block w-full py-4 px-4 mb-4 text-center bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-200 active:scale-95"
                  >
                    Login / Sign Up
                  </button>
                )}

                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block py-4 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-semibold text-lg border-b border-border"
                >
                  Home
                </Link>

                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full text-left py-4 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 flex items-center justify-between font-semibold text-lg border-b border-border"
                >
                  Products
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${isProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProductsOpen && (
                  <div className="pl-2 py-4 space-y-2 bg-primary/5 rounded-lg mx-4 mb-4 animate-slide-up">
                    <Link
                      href="/products?category=nuts"
                      onClick={() => {
                        setIsOpen(false)
                        setIsProductsOpen(false)
                      }}
                      className="block text-base text-muted-foreground hover:text-primary transition-all duration-200 py-3 px-4 rounded-lg hover:bg-primary/10 hover:translate-x-1"
                    >
                      Nuts & Seeds
                    </Link>
                    <Link
                      href="/products?category=dried-fruits"
                      onClick={() => {
                        setIsOpen(false)
                        setIsProductsOpen(false)
                      }}
                      className="block text-base text-muted-foreground hover:text-primary transition-all duration-200 py-3 px-4 rounded-lg hover:bg-primary/10 hover:translate-x-1"
                    >
                      Dried Fruits
                    </Link>
                    <Link
                      href="/products?category=spices"
                      onClick={() => {
                        setIsOpen(false)
                        setIsProductsOpen(false)
                      }}
                      className="block text-base text-muted-foreground hover:text-primary transition-all duration-200 py-3 px-4 rounded-lg hover:bg-primary/10 hover:translate-x-1"
                    >
                      Spices & Blends
                    </Link>
                  </div>
                )}

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="block py-4 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-semibold text-lg border-b border-border"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block py-4 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-semibold text-lg"
                >
                  Contact
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block py-4 px-4 mt-6 text-center bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-200 active:scale-95"
                >
                  View Cart ({cartCount})
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
    </>
  )
}
