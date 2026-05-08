"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import { auth, isConfigValid } from "./firebase-config"
import { isLocalDevelopment, testLogin, testSignup, testAccountToUser } from "./test-accounts"

interface AuthContextType {
  user: User | null
  loading: boolean
  signup: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  isTestMode: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  isTestMode: false,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isTestMode, setIsTestMode] = useState(false)

  useEffect(() => {
    const shouldUseTestMode = isLocalDevelopment() && !isConfigValid
    setIsTestMode(shouldUseTestMode)

    if (shouldUseTestMode) {
      // Use test auth - check localStorage for test user
      const storedTestUser = localStorage.getItem("testUser")
      if (storedTestUser) {
        try {
          const testUser = JSON.parse(storedTestUser)
          setUser(testUser as User)
        } catch (error) {
          localStorage.removeItem("testUser")
        }
      }
      setLoading(false)
      return
    }

    // Use Firebase auth if configured
    if (!isConfigValid || !auth) {
      setLoading(false)
      setUser(null)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    if (isTestMode) {
      const testAccount = testSignup(email, password, name)
      const testUser = testAccountToUser(testAccount) as User
      setUser(testUser)
      localStorage.setItem("testUser", JSON.stringify(testUser))
      return
    }

    // Use Firebase auth
    if (!auth) {
      throw new Error("Authentication is not available. Please configure Firebase environment variables.")
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName: name })
  }

  const login = async (email: string, password: string) => {
    if (isTestMode) {
      const testAccount = testLogin(email, password)
      if (!testAccount) {
        throw new Error("Invalid email or password")
      }
      const testUser = testAccountToUser(testAccount) as User
      setUser(testUser)
      localStorage.setItem("testUser", JSON.stringify(testUser))
      return
    }

    // Use Firebase auth
    if (!auth) {
      throw new Error("Authentication is not available. Please configure Firebase environment variables.")
    }
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    if (isTestMode) {
      setUser(null)
      localStorage.removeItem("testUser")
      return
    }

    // Use Firebase auth
    if (!auth) {
      throw new Error("Authentication is not available. Please configure Firebase environment variables.")
    }
    await signOut(auth)
  }

  const resetPassword = async (email: string) => {
    if (isTestMode) {
      alert("Test Mode: Password reset email would be sent to " + email)
      return
    }

    // Use Firebase auth
    if (!auth) {
      throw new Error("Authentication is not available. Please configure Firebase environment variables.")
    }
    await sendPasswordResetEmail(auth, email)
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    isTestMode,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
