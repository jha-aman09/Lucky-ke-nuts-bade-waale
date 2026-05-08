import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                SV
              </div>
              <span className="font-bold text-lg">Spice Valley</span>
            </div>
            <p className="text-sm opacity-75">
              Premium Indian dry fruits and spices, delivered fresh to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping-policy" className="hover:text-primary transition-colors duration-200">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-primary transition-colors duration-200">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@spicevalley.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Spice Valley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
