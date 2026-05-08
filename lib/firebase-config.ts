import type { FirebaseApp } from "firebase/app"
import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"

// Check if all required Firebase environment variables are present and valid
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

// Validate that all config values exist, are not empty, and look valid
const isConfigValid = Boolean(
  apiKey && authDomain && projectId && appId && apiKey.length > 10 && authDomain.includes(".") && projectId.length > 3,
)

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

if (isConfigValid) {
  try {
    const { initializeApp, getApps } = require("firebase/app")
    const { getAuth } = require("firebase/auth")
    const { getFirestore } = require("firebase/firestore")

    const firebaseConfig = {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    }

    // Initialize Firebase
    const apps = getApps()
    if (apps.length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = apps[0]
    }

    auth = getAuth(app)
    db = getFirestore(app)
  } catch (error) {
    // Silently fail and leave undefined
    app = undefined
    auth = undefined
    db = undefined
  }
}

export { app, auth, db, isConfigValid }
