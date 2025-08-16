import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SocialIcon } from 'react-social-icons'

import { Facebook, Instagram, Twitter, MessageCircle, Smartphone, Mail, ArrowUp, } from "lucide-react"

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-6">
          
          <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6">
            <a href="/" className="inline-flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white tracking-wider">CELLMART</span>
            </a>
            <p className="text-gray-400 leading-relaxed max-w-sm text-sm sm:text-base">
              Our mission is to provide premium quality mobile devices and exceptional service at the best prices for customers across Sri Lanka.
            </p>
            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="text-gray-500">Mon - Sat: 9:00 AM - 8:00 PM</div>
              <div className="text-gray-500">Piliyandala, Colombo, Sri Lanka</div>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/30"></div>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Story", href: "/story" },
                { name: "Careers", href: "/career" },
                { name: "Blog", href: "/blog" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group text-sm sm:text-base"
                  >
                    <span className="group-hover:text-white">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 relative">
              Support
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/30"></div>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "Returns & Exchanges", href: "/return" },
                { name: "FAQ", href: "/faq" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group text-sm sm:text-base"
                  >
                    <span className="group-hover:text-white">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 relative">
              Stay Connected
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-white/30"></div>
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed">
              Get the latest news, updates on new arrivals, exclusive deals, and tech news by following our,
            </p> 
            <div className="flex justify-center items-center gap-2 flex sm:gap-3">
            <SocialIcon bgColor="black" href="www.instagram.com" url="www.instagram.com" />
            <SocialIcon bgColor="black" href="www.tiktok.com" url="www.tiktok.com" />
            <SocialIcon bgColor="black" href="www.facebook.com" url="www.facebook.com" />
            <SocialIcon bgColor="black" href="www.twitter.com" url="www.twitter.com" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 sm:pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <p>© 2025 CELLMART. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                <a href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-500 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
              
              <button
                onClick={scrollToTop}
                className="bg-white/5 backdrop-blur-md p-1.5 sm:p-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                aria-label="Scroll to top">
                <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}