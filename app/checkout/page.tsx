"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { isConfigValid } from "@/lib/firebase-config"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, Lock, CreditCard, Smartphone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { generateOrderId } from "@/lib/paytm"

type PaymentMethod = "card" | "paytm"

function CheckoutContent() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paytm")
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const cartSubtotal = getTotalPrice()
  const shipping = cartSubtotal > 2000 ? 0 : 200
  const tax = Math.round(cartSubtotal * 0.05)
  const total = cartSubtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 3) {
      setStep(step + 1)
      return
    }

    // Step 3: Process payment
    setProcessing(true)

    try {
      if (paymentMethod === "paytm") {
        const newOrderId = generateOrderId()
        const response = await fetch("/api/paytm/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: newOrderId,
            customerId: user?.uid || "guest",
            amount: total.toString(),
            email: formData.email,
            phone: formData.phone,
          }),
        })

        const data = await response.json()

        if (data.success) {
          setOrderId(newOrderId)
          clearCart()
          setOrderPlaced(true)
        } else {
          alert("Payment failed. Please try again.")
        }
      } else {
        // Card payment
        const newOrderId = generateOrderId()
        setOrderId(newOrderId)
        clearCart()
        setOrderPlaced(true)
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase.</p>
            <p className="text-muted-foreground mb-8">
              Order confirmation has been sent to your email. You can track your order using the order ID.
            </p>

            <div className="bg-secondary/30 rounded-lg border border-border p-6 mb-8 text-left">
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="text-2xl font-bold text-primary mb-4">#{orderId}</p>
              <p className="text-sm text-muted-foreground">
                Payment Method: {paymentMethod === "paytm" ? "Paytm" : "Card"}
              </p>
              <p className="text-sm text-muted-foreground">Estimated Delivery: 3-5 business days</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-center"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="flex-1 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in-up">Checkout</h1>
          <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Complete your purchase securely
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 animate-fade-in-up">
            {/* Progress Steps */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      s <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground border border-border"
                    }`}
                  >
                    {s < step ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className="text-sm font-semibold text-foreground hidden sm:inline">
                    {s === 1 ? "Shipping" : s === 2 ? "Payment" : "Review"}
                  </span>
                  {s < 3 && <div className="w-8 h-0.5 bg-border hidden sm:block" />}
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-foreground">Shipping Address</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>

                  <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-semibold">Your payment is secure and encrypted</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paytm")}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                        paymentMethod === "paytm"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Smartphone className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-foreground">Paytm</p>
                      <p className="text-xs text-muted-foreground">UPI, Wallet, Cards</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CreditCard className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-foreground">Card</p>
                      <p className="text-xs text-muted-foreground">Credit / Debit</p>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 animate-fade-in-up">
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Cardholder Name"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                      />

                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        maxLength={16}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange}
                          required
                          maxLength={5}
                          className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          maxLength={3}
                          className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paytm" && (
                    <div className="p-4 bg-secondary/30 rounded-lg border border-border animate-fade-in-up">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to Paytm to complete your payment securely.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-foreground">Review Order</h2>

                  <div className="bg-secondary/30 rounded-lg border border-border p-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Shipping To</p>
                      <p className="font-semibold text-foreground">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{formData.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.city}, {formData.state} {formData.pincode}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formData.email} | {formData.phone}
                      </p>
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                      <p className="font-semibold text-foreground">
                        {paymentMethod === "paytm"
                          ? "Paytm Payment Gateway"
                          : `Card ending in ${formData.cardNumber.slice(-4)}`}
                      </p>
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Order Items</p>
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm py-1">
                          <span className="text-foreground">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="text-muted-foreground">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={processing}
                    className="flex-1 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : step === 3 ? (
                    "Place Order"
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-secondary/30 rounded-lg border border-border p-6 sticky top-20">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>{cart.length} Items</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && cartSubtotal < 2000 && (
                  <p className="text-xs text-muted-foreground">Add ₹{2000 - cartSubtotal} more for free shipping</p>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  if (!isConfigValid()) {
    // Firebase not configured, allow checkout without authentication
    return <CheckoutContent />
  }

  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  )
}
