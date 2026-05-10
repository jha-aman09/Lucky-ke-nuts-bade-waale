# Dry Fruits app - V2

Modern e-commerce web app for browsing and purchasing dry fruits, built with Next.js App Router and a component-rich UI stack.

## Highlights

- Next.js 16 App Router with React 19.
- Tailwind CSS v4 styling and Radix UI primitives.
- Firebase-ready auth/database integration.
- Paytm payment flow integration.
- Reusable UI components and feature pages for shop, cart, checkout, and admin.

## Tech Stack

- Framework: Next.js 16 (App Router)
- UI: React 19, Radix UI, Tailwind CSS
- Forms & Validation: React Hook Form, Zod
- State/Utilities: class-variance-authority, clsx, tailwind-merge
- Charts & UI Extras: Recharts, embla carousel, sonner, lucide-react
- Backend Services: Firebase
- Payments: Paytm

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- pnpm (recommended), or npm/yarn

### Install

pnpm install

### Run in development

pnpm dev

### Build for production

pnpm build

### Start production server

pnpm start

### Lint

pnpm lint

## Environment Variables

Create a .env.local file in the project root with these variables:

### App

- NEXT_PUBLIC_APP_URL=

### Firebase

- NEXT_PUBLIC_FIREBASE_API_KEY=
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
- NEXT_PUBLIC_FIREBASE_APP_ID=

### Paytm

- NEXT_PUBLIC_PAYTM_MERCHANT_ID=
- PAYTM_MERCHANT_KEY=
- NEXT_PUBLIC_PAYTM_WEBSITE=WEBSTAGING
- NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE=Retail
- NEXT_PUBLIC_PAYTM_CHANNEL_ID=WEB
- NEXT_PUBLIC_PAYTM_CALLBACK_URL=

Notes:

- Firebase config is validated at runtime; missing or invalid values disable Firebase features gracefully.
- Paytm callback defaults to ${NEXT_PUBLIC_APP_URL}/api/paytm/callback if not provided.

## Project Structure

- app/: Next.js App Router pages and API routes
- components/: shared UI components
- components/ui/: base UI primitives
- hooks/: reusable hooks
- lib/: configuration and app utilities
- public/: static assets
- styles/: global styles

## Dependencies (runtime)

- @hookform/resolvers: Glue between React Hook Form and Zod schemas.
- @radix-ui/*: Accessible UI primitives for dialogs, menus, toggles, tabs, etc.
- @vercel/analytics: Vercel analytics integration.
- autoprefixer: CSS vendor prefixing.
- class-variance-authority: Variant-based class composition.
- clsx: Conditional classnames.
- cmdk: Command palette UI.
- date-fns: Date utilities.
- embla-carousel-react: Carousel slider.
- firebase: Auth and Firestore SDK.
- input-otp: OTP input component.
- lucide-react: Icon set.
- next: React framework.
- next-themes: Theme switching.
- paytmchecksum: Paytm checksum generation.
- react, react-dom: UI library and renderer.
- react-day-picker: Date picker.
- react-hook-form: Form state management.
- react-resizable-panels: Resizable layout panels.
- recharts: Charts.
- sonner: Toasts/notifications.
- tailwind-merge: Smart class merging for Tailwind.
- tailwindcss-animate: Animation utilities.
- vaul: Drawer component.
- zod: Schema validation.

## Dev Dependencies

- @tailwindcss/postcss: Tailwind v4 PostCSS integration.
- @types/node, @types/react, @types/react-dom: TypeScript types.
- postcss: CSS processing.
- tailwindcss: Utility-first CSS.
- tw-animate-css: Animation utilities.
- typescript: Type checking.

## Scripts

- dev: Start local dev server
- build: Build for production
- start: Start production server
- lint: Lint codebase

## Notes

- The app uses server and client components. Components that access browser APIs are marked with "use client".
- Update Paytm credentials before processing real payments.

## License

Proprietary. All rights reserved.
