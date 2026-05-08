import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8 animate-fade-in-up">Privacy Policy</h1>

        <div className="space-y-6 text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
            <p>
              At Spice Valley, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Personal information you provide directly (name, email, phone)</li>
              <li>Information collected automatically through cookies and tracking</li>
              <li>Information from third-party sources</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Use of Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you marketing communications</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at hello@spicevalley.com</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
