# Environment Setup Instructions

## Firebase Authentication Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: "Spice Valley" (or your preferred name)
4. Disable Google Analytics (optional for testing)
5. Click "Create project"

### Step 2: Enable Email/Password Authentication
1. In your Firebase project, go to **Build > Authentication**
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click on "Email/Password"
5. Toggle "Enable" to ON
6. Click "Save"

### Step 3: Get Firebase Configuration
1. Go to **Project Settings** (gear icon in sidebar)
2. Scroll down to "Your apps" section
3. Click the web icon `</>` to add a web app
4. Enter app nickname: "Spice Valley Web"
5. Register app
6. Copy the configuration values and paste into `.env.local`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `measurementId` → `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Step 4: Configure Email Templates (Optional)
1. Go to **Authentication > Templates**
2. Customize the "Password reset" email template
3. You can customize the sender name and email content

---

## Paytm Payment Gateway Setup

### Step 1: Create Paytm Merchant Account
1. Go to [Paytm Business](https://business.paytm.com/)
2. Click "Sign Up" or "Get Started"
3. Fill in your business details
4. Complete KYC verification

### Step 2: Get Test/Staging Credentials
1. Login to [Paytm Dashboard](https://dashboard.paytm.com/next/)
2. Go to **Developer Settings > API Keys**
3. Switch to **Staging/Test Mode** (toggle at top)
4. Copy your test credentials:
   - Merchant ID (MID)
   - Merchant Key

### Step 3: Configure in .env.local
```
PAYTM_MERCHANT_ID=YOUR_TEST_MERCHANT_ID
PAYTM_MERCHANT_KEY=YOUR_TEST_MERCHANT_KEY
PAYTM_ENVIRONMENT=staging
```

### Step 4: Test Payment Flow
For testing, use these test card details provided by Paytm:
- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (e.g., 123)
- **OTP:** 489871 (Paytm test OTP)

**Test UPI ID:** success@paytm
**Test Wallet:** Any test account

---

## Local Development Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create .env.local File
Copy the `.env.local` template and fill in your values:
- Firebase credentials from Firebase Console
- Paytm test credentials from Paytm Dashboard
- Keep `NEXT_PUBLIC_APP_URL=http://localhost:3000` for local testing

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Test the Application
1. Open [http://localhost:3000](http://localhost:3000)
2. Test authentication:
   - Sign up with a test email
   - Check your email for verification
   - Login with created account
   - Test password reset flow
3. Test shopping:
   - Add products to cart
   - Go to checkout
   - Fill in shipping details
   - Select Paytm payment
   - Complete test payment with test credentials

---

## For Testing Without Real Payment Gateway

If you want to test the app without setting up Paytm immediately, you can:

1. Comment out the Paytm payment initiation code in `app/checkout/page.tsx`
2. Use a mock payment flow that just shows success
3. The app will still work for authentication and shopping cart features

Alternatively, use these placeholder values in `.env.local`:
```
PAYTM_MERCHANT_ID=DEMO_MERCHANT
PAYTM_MERCHANT_KEY=DEMO_KEY_12345
PAYTM_ENVIRONMENT=staging
```

The payment will fail but the rest of the app will work normally.

---

## Production Deployment Checklist

Before deploying to production:

1. **Firebase:**
   - Add your production domain to authorized domains
   - Update email templates with your branding
   - Enable required sign-in methods

2. **Paytm:**
   - Switch from staging to production credentials
   - Change `PAYTM_ENVIRONMENT=production`
   - Complete business verification
   - Set up webhooks for payment notifications

3. **Environment Variables:**
   - Update `NEXT_PUBLIC_APP_URL` to your production URL
   - Never commit `.env.local` to version control
   - Use Vercel/hosting platform's environment variable settings

---

## Troubleshooting

### Firebase Authentication Issues
- **"Firebase: Error (auth/invalid-api-key)"**: Check your API key is correct
- **Email not sending**: Check spam folder, or configure custom SMTP in Firebase
- **"Firebase: Error (auth/unauthorized-domain)"**: Add your domain in Firebase Console > Authentication > Settings > Authorized domains

### Paytm Payment Issues
- **"Invalid merchant"**: Verify your Merchant ID and Key
- **Checksum validation failed**: Ensure your Merchant Key matches
- **Payment page not loading**: Check if you're using staging credentials with staging environment

### General Issues
- **Environment variables not loading**: Restart dev server after changing `.env.local`
- **Build errors**: Run `npm install` to ensure all dependencies are installed
