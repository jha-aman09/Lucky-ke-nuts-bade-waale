"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Are your products organic?",
      answer:
        "Yes, all our dry fruits and spices are sourced from certified organic farms across India. We maintain strict quality standards and ensure no artificial additives or preservatives are used in any of our products.",
    },
    {
      question: "How fresh are your products?",
      answer:
        "Our products are freshly harvested and packaged. We process orders quickly to ensure maximum freshness. Most items are shipped within 24 hours of order placement.",
    },
    {
      question: "Do you offer bulk orders?",
      answer:
        "Yes, we offer special pricing for bulk orders. Please contact our customer service team at hello@spicevalley.com for details about wholesale and bulk purchase options.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all products. If you are not satisfied with your purchase, you can return items in original condition for a full refund. See our Return Policy page for more details.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship within India only. International shipping may be available soon. Follow us for updates on expansion to other countries.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You will receive a tracking number via email once your order ships. You can use this to track your package in real-time with our shipping partner.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8 animate-fade-in-up">Frequently Asked Questions</h1>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-secondary/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center font-semibold text-foreground hover:text-primary transition-colors duration-200"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-border bg-secondary/20 text-muted-foreground animate-slide-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
