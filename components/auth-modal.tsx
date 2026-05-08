"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { testAccounts } from "@/lib/test-accounts"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const { login, signup, isTestMode } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (activeTab === "signup" && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      if (activeTab === "login") {
        await login(email, password)
        setSuccessMessage("Login successful!")
        setTimeout(() => {
          onClose()
        }, 1000)
      } else {
        await signup(email, password, name)
        setSuccessMessage("Account created successfully!")
        setTimeout(() => {
          onClose()
        }, 1000)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fillTestCredentials = (testEmail: string, testPassword: string) => {
    setEmail(testEmail)
    setPassword(testPassword)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md animate-slide-up flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-border flex-shrink-0">
          <h2 className="text-2xl font-bold text-foreground">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:rotate-90 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-border flex-shrink-0">
          <button
            onClick={() => {
              setActiveTab("login")
              setError("")
              setSuccessMessage("")
            }}
            className={`flex-1 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "login"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab("signup")
              setError("")
              setSuccessMessage("")
            }}
            className={`flex-1 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === "signup"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {isTestMode && activeTab === "login" && (
            <div className="px-6 pt-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg space-y-3">
                <p className="text-sm font-semibold text-amber-800">Test Mode - Local Development</p>
                <p className="text-xs text-amber-700">Use these test accounts to login without Firebase:</p>
                <div className="space-y-2">
                  {testAccounts.map((account, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => fillTestCredentials(account.email, account.password)}
                      className="w-full text-left p-2 bg-amber-500/5 hover:bg-amber-500/10 rounded border border-amber-500/10 transition-colors text-xs"
                    >
                      <div className="font-medium text-amber-900">{account.name}</div>
                      <div className="text-amber-700">
                        {account.email} / {account.password}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {activeTab === "signup" && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Enter your password"
              />
            </div>

            {activeTab === "signup" && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm animate-bounce-in">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-sm animate-bounce-in">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : activeTab === "login" ? "Login" : "Create Account"}
            </button>

            {activeTab === "login" && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    window.location.href = "/forgot-password"
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
