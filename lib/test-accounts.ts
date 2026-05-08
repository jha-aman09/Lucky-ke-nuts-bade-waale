// Test accounts for local development - NEVER use in production!
// Add your test accounts here for local testing without Firebase

export interface TestAccount {
  id: string
  email: string
  password: string
  name: string
  createdAt: string
}

// Default test accounts - you can add more here
export const testAccounts: TestAccount[] = [
  {
    id: "test-user-1",
    email: "test@example.com",
    password: "test123",
    name: "Test User",
    createdAt: new Date().toISOString(),
  },
  {
    id: "test-user-2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    createdAt: new Date().toISOString(),
  },
  {
    id: "test-user-3",
    email: "demo@spicevalley.com",
    password: "demo123",
    name: "Demo Customer",
    createdAt: new Date().toISOString(),
  },
]

// Check if we're in development mode (localhost)
export const isLocalDevelopment = () => {
  if (typeof window === "undefined") return false
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "" ||
    process.env.NODE_ENV === "development"
  )
}

// Test auth functions for local development
export const testLogin = (email: string, password: string): TestAccount | null => {
  const account = testAccounts.find((acc) => acc.email === email && acc.password === password)
  return account || null
}

export const testSignup = (email: string, password: string, name: string): TestAccount => {
  // Check if account already exists
  const existing = testAccounts.find((acc) => acc.email === email)
  if (existing) {
    throw new Error("An account with this email already exists")
  }

  // Create new test account
  const newAccount: TestAccount = {
    id: `test-user-${Date.now()}`,
    email,
    password,
    name,
    createdAt: new Date().toISOString(),
  }

  // Add to test accounts array (in memory only)
  testAccounts.push(newAccount)

  return newAccount
}

// Convert test account to User-like object
export const testAccountToUser = (account: TestAccount) => {
  return {
    uid: account.id,
    email: account.email,
    displayName: account.name,
    emailVerified: true,
  }
}
