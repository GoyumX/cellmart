import { Sparkles, Construction, Mail, ShoppingBag, ArrowRight } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-900/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1000ms'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-900/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '500ms'}}></div>
      </div>

      <div className="relative z-20 text-center max-w-4xl">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mb-6 hover:scale-110 transition-transform duration-300">
            <Construction className="w-12 h-12 text-white animate-bounce" style={{animationDuration: '2s'}} />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight">
          <span className="block hover:scale-105 transition-transform duration-300 inline-block">Coming</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 transition-transform duration-300 inline-block">
            Soon
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          This page is still in development. We'll get back to you soon!
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Our Products
          </button>
          
          <button 
            onClick={() => window.location.href = 'goyum.m27@gmail.com'}
            className="bg-gray-800/50 hover:bg-gray-700/50 text-white px-8 py-3 rounded-full font-semibold text-lg border border-gray-600/50 transition-all duration-300 hover:scale-105 hover:border-gray-500/50 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contact Cellmart
          </button>
        </div>

        {/* Additional info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="group p-6 rounded-2xl bg-gray-800/30 border border-gray-800/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-800/40">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm">We'll notify you when this page is ready</p>
          </div>

          <div className="group p-6 rounded-2xl bg-gray-800/30 border border-gray-800/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-800/40">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-white animate-pulse" style={{animationDelay: '200ms'}} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Explore Products</h3>
            <p className="text-gray-400 text-sm">Check out our current mobile devices</p>
          </div>

          <div className="group p-6 rounded-2xl bg-gray-800/30 border border-gray-800/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-800/40">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white animate-pulse" style={{animationDelay: '400ms'}} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Get Support</h3>
            <p className="text-gray-400 text-sm">Reach out to our customer service</p>
          </div>
        </div>

        {/* Back to home link */}
        <div className="mt-12">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}