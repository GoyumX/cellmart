import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, MessageCircle, Smartphone, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-20 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-8 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-6">
          
          <div className="lg:col-span-1 flex flex-col gap-6">
            <a href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-wider">CELLMART</span>
            </a>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Our mission is to provide premium quality mobile devices and exceptional service at the best prices for customers across Sri Lanka.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="text-gray-500">🕒 Mon - Sat: 9:00 AM - 8:00 PM</div>
              <div className="text-gray-500">📍 Colombo, Sri Lanka</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/30"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Story", href: "/story" },
                { name: "Careers", href: "/career" },
                { name: "Blog", href: "/blog" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    <span className="group-hover:text-white">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Support
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/30"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "Help Center", href: "/help" },
                { name: "Returns & Exchanges", href: "/return" },
                { name: "FAQ", href: "/faq" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    <span className="group-hover:text-white">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Stay Connected
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/30"></div>
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Get the latest updates on new arrivals, exclusive deals, and tech news.
            </p>
            
            <form className="space-y-4 mb-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-transparent border-none text-white placeholder:text-gray-500 focus:border-none focus:outline-none focus-visible:ring-0 h-12 pl-4"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold h-12 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
            </form>

            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com", color: "hover:bg-pink-600" },
                { icon: Twitter, href: "https://twitter.com", color: "hover:bg-blue-500" },
                { icon: Facebook, href: "https://facebook.com", color: "hover:bg-blue-600" },
                { icon: MessageCircle, href: "https://discord.com", color: "hover:bg-indigo-600" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`group bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 ${social.color} transition-all duration-300 hover:transform hover:scale-110 hover:border-white/30`}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="sr-only">{social.icon.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
              <p>© 2025 CELLMART. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex gap-6 text-sm">
                <a href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-500 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
              
              <button
                onClick={scrollToTop}
                className="bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                aria-label="Scroll to top">
                <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}