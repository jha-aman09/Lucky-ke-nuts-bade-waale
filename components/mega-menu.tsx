"use client"

import Link from "next/link"
import { Leaf, Sparkles, Flame } from "lucide-react"

export function MegaMenu() {
  const categories = [
    {
      title: "Nuts & Seeds",
      icon: Leaf,
      items: [
        { name: "Almonds", href: "/products?category=almonds" },
        { name: "Cashews", href: "/products?category=cashews" },
        { name: "Walnuts", href: "/products?category=walnuts" },
        { name: "Pistachios", href: "/products?category=pistachios" },
        { name: "Pine Nuts", href: "/products?category=pine-nuts" },
      ],
    },
    {
      title: "Dried Fruits",
      icon: Sparkles,
      items: [
        { name: "Raisins", href: "/products?category=raisins" },
        { name: "Dates", href: "/products?category=dates" },
        { name: "Apricots", href: "/products?category=apricots" },
        { name: "Figs", href: "/products?category=figs" },
        { name: "Cranberries", href: "/products?category=cranberries" },
      ],
    },
    {
      title: "Spices & Blends",
      icon: Flame,
      items: [
        { name: "Cardamom", href: "/products?category=cardamom" },
        { name: "Saffron", href: "/products?category=saffron" },
        { name: "Cloves", href: "/products?category=cloves" },
        { name: "Cinnamon", href: "/products?category=cinnamon" },
        { name: "Spice Blends", href: "/products?category=blends" },
      ],
    },
  ]

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-8 w-max animate-scale-in fixed left-1/2 -translate-x-1/2 top-full mt-2">
      <div className="grid grid-cols-3 gap-8">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.title} className="group">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Featured Banner */}
      <div className="mt-8 pt-8 border-t border-border">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 flex items-center justify-between group hover:from-primary/20 hover:to-accent/20 transition-all duration-300">
          <div>
            <p className="font-semibold text-foreground">New Arrivals</p>
            <p className="text-sm text-muted-foreground">Fresh stock of premium Himalayan products</p>
          </div>
          <Link
            href="/products?sort=new"
            className="text-primary font-semibold hover:gap-2 flex items-center gap-1 transition-all duration-300"
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  )
}
