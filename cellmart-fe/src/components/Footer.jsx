import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-6 py-7">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Logo and Mission */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <a href="/" className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              CELLMART
            </a>
            <p className="text-sm text-gray-400 max-w-xs">
              Our goal is to provide premium quality products at the best price for a wide variety of customers.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:w-1/3 flex flex-col md:flex-row justify-center gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">About Us</a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                </li>
                <li>
                  <a href="/career" className="hover:text-white transition-colors">Career</a>
                </li>
              </ul>
            </div>
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
                </li>
                <li>
                  <a href="/return" className="hover:text-white transition-colors">Return</a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter & Socials */}
          <div className="md:w-1/3 flex flex-col gap-6 items-start md:items-end">
            <div className="w-full max-w-xs">
              <h3 className="text-lg font-semibold text-white mb-3">Get Updates</h3>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-600" />
                <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
              </form>
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href="https://instagram.com"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors shadow-lg">
                <Instagram className="w-5 h-5 text-gray-300" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition-colors shadow-lg">
                <Twitter className="w-5 h-5 text-gray-300" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://facebook.com"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-500 transition-colors shadow-lg">
                <Facebook className="w-5 h-5 text-gray-300" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://discord.com"
                className="bg-gray-800 p-3 rounded-full hover:bg-indigo-600 transition-colors shadow-lg">
                <MessageCircle className="w-5 h-5 text-gray-300" />
                <span className="sr-only">Discord</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 mt-3 border-t border-gray-800">
          <p className="text-xs text-gray-500">©2025 CELLMART. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-xs hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-xs hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}