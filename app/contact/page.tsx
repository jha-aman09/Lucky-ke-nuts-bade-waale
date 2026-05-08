"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+91 (555) 123-4567",
      subtext: "Mon-Fri, 9AM-6PM IST",
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@spicevalley.com",
      subtext: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "New Delhi, India",
      subtext: "Serving all of India",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div
                key={info.title}
                className="p-8 bg-secondary/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                <p className="text-foreground font-semibold mb-1">{info.details}</p>
                <p className="text-sm text-muted-foreground">{info.subtext}</p>
              </div>
            )
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-secondary/30 rounded-xl border border-border p-8 md:p-12 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-700 animate-scale-in">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
