import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Award, Users, Leaf, Heart } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "We believe in purity. No additives, no preservatives, just nature's best.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Every product is handpicked and tested to ensure the highest standards.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to serve you with excellence.",
    },
    {
      icon: Heart,
      title: "Sustainable",
      description: "We support fair trade practices and sustainable farming methods.",
    },
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "/placeholder.svg",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "/placeholder.svg",
    },
    {
      name: "Amit Patel",
      role: "Quality Manager",
      image: "/placeholder.svg",
    },
    {
      name: "Neha Singh",
      role: "Customer Relations",
      image: "/placeholder.svg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Spice Valley</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bringing the authentic flavors of India to your table since 2015. We're passionate about quality,
              tradition, and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Spice Valley was founded with a simple mission: to bring the finest dry fruits and spices from across
                India directly to your home. What started as a small family business has grown into a trusted name in
                premium quality products.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We work directly with farmers and producers across India, ensuring fair prices and sustainable
                practices. Every product in our collection is carefully selected, tested, and packaged with love.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to serve over 50,000 happy customers who trust us for their daily needs and special
                occasions.
              </p>
            </div>

            <div className="relative h-96 animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <div className="relative h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <Image
                  src="/premium-dry-fruits-spices-collection.jpg"
                  alt="Spice Valley story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">What drives us every single day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">Passionate people behind the brand</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-all duration-300">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "10+", label: "Years Experience" },
              { number: "100%", label: "Natural Products" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
