import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Spice
              Valley's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer</h2>
            <p>
              The materials on Spice Valley's website are provided on an 'as is' basis. Spice Valley makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at hello@spicevalley.com</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
