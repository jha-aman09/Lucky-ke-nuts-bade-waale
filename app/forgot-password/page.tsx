"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2, CheckCircle2, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mb-4 animate-bounce-in">
            SV
          </div>
          <h2 className="text-3xl font-bold text-foreground">Reset Password</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {"We'll send you an email with instructions to reset your password"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-lg p-8 animate-slide-up">
          {success ? (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Check Your Email</h3>
              <p className="text-sm text-muted-foreground">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <Link href="/login">
                <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start gap-2 animate-wiggle">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-95"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <Link href="/login">
                <Button variant="ghost" className="w-full" type="button">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
