import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8 animate-fade-in-up">Shipping Policy</h1>

        <div className="space-y-6 text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Shipping Methods</h2>
            <p>We offer multiple shipping options to suit your needs:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days</li>
              <li>Overnight Shipping: Next business day</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Shipping Costs</h2>
            <p>
              Shipping costs are calculated based on your location and the weight of your order. Free shipping is
              available on orders over ₹500.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Delivery</h2>
            <p>
              All orders are carefully packaged to ensure freshness and quality. You will receive a tracking number via
              email once your order ships.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>For shipping inquiries, please contact us at hello@spicevalley.com or call +91 (555) 123-4567</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
