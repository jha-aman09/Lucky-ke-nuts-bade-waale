import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8 animate-fade-in-up">Return Policy</h1>

        <div className="space-y-6 text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Return Eligibility</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you are not satisfied, you may return items
              within 30 days of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Return Process</h2>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li>Contact our customer service team</li>
              <li>Ship the item back to us in original condition</li>
              <li>Once received and inspected, we'll process your refund</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refunds</h2>
            <p>
              Refunds will be processed within 5-7 business days of us receiving and inspecting your return. The refund
              will be issued to your original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>For return inquiries, please contact us at hello@spicevalley.com</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
