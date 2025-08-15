import { Button } from "@/components/ui/button";
import {  Sparkles, ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  const handleSearch = (e) => {
    e.preventDefault();
    const searachQuery = e.target.search.value;
    console.log(searachQuery);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-amber-900/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-orange-900/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-yellow-900/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* CSS for the animation */}
      <style jsx>{`
        .search-container {
          height: 60px;
        }
        
        @media (min-width: 640px) {
          .search-container {
            height: 76px;
          }
        }
        
        .animated-border,
        .glow-effect,
        .white-gradient,
        .border-gradient {
          height: 100%;
          width: 100%;
          position: absolute;
          overflow: hidden;
          z-index: -1;
          border-radius: 9999px;
          filter: blur(3px);
        }
        
        .search-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .animated-border::before,
        .glow-effect::before,
        .white-gradient::before,
        .border-gradient::before {
          content: "";
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
          position: absolute;
          width: 900px;
          height: 900px;
          background-repeat: no-repeat;
          background-position: 0 0;
          animation: rotate 10s linear infinite;
          animation-play-state: running;
          transition: transform 0.6s ease;
        }
        
        .white-gradient::before {
          filter: brightness(1.4);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0) 0%,
            #c98f65,
            rgba(0, 0, 0, 0) 8%,
            rgba(0, 0, 0, 0) 50%,
            #f28e8e,
            rgba(0, 0, 0, 0) 58%
          );
        }
        
        .border-gradient::before {
          filter: brightness(1.3);
          background-image: conic-gradient(
            #3a2e20,
            #c98f65 5%,
            #3a2e20 14%,
            #3a2e20 50%,
            #f28e8e 60%,
            #3a2e20 64%
          );
        }
        
        .animated-border::before {
          filter: brightness(1.3);
          background-image: conic-gradient(
            rgba(0, 0, 0, 0),
            #725d4a,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 50%,
            #d16e5a,
            rgba(0, 0, 0, 0) 60%
          );
        }
        
        .glow-effect {
          overflow: hidden;
          filter: blur(30px);
          opacity: 0.4;
          max-height: 100%;
          max-width: 100%;
        }
        
        .glow-effect::before {
          filter: brightness(1.3);
          background-image: conic-gradient(
            #000,
            #c98f65 5%,
            #000 38%,
            #000 50%,
            #f28e8e 60%,
            #000 87%
          );
        }
        
        @keyframes rotate {
          100% {
            transform: translate(-50%, -50%) rotate(450deg);
          }
        }
        
        .search-input {
          background: #000000;
          border: none;
          outline: none;
          width: 100%;
          height: calc(100% - 4px);
          border-radius: 9999px;
          color: #e5e7eb;
          padding: 0 1rem;
          font-size: 0.875rem;
          margin: 2px;
        }
        
        @media (min-width: 640px) {
          .search-input {
            padding: 0 1.5rem;
            font-size: 1.125rem;
          }
        }
        
        .search-input::placeholder {
          color: rgba(229, 231, 235, 0.4);
        }
        
        .search-input:focus {
          outline: none;
          box-shadow: none;
        }
        
        .search-button {
          position: absolute;
          top: 50%;
          right: 6px;
          transform: translateY(-50%);
          z-index: 10;
          isolation: isolate;
          overflow: hidden;
        }

        .input-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .gentle-pulse {
          animation: gentlePulse 3s ease-in-out infinite;
        }

        @keyframes gentlePulse {
          0%, 100% { 
            opacity: 1;
          }
          50% { 
            opacity: 0.7;
          }
        }

        .subtle-float {
          animation: subtleFloat 4s ease-in-out infinite;
        }

        @keyframes subtleFloat {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-3px);
          }
        }

        .sparkle-animation {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% { 
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
        }

        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-8px) rotate(5deg);
          }
        }
      `}</style>

      <div className="relative z-20 flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-cyan-800/10 via-cyan-200/10 to-cyan-200/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8 hover:from-cyan-800/20 hover:via-cyan-200/20 hover:to-cyan-800/20 transition-all duration-300 group">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 sparkle-animation" />
          <span>AI-Powered Device Discovery</span>
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 floating-icon" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 text-center leading-tight tracking-tight">
          <span className="text-gray-100">
            Find Your Perfect
          </span>
          <span className="block text-gray-100">
            Mobile Device
          </span>
        </h1>
      
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 text-center max-w-3xl leading-relaxed font-light px-4">
          Describe your ideal mobile device and our 
          <span className="text-gray-300 font-medium"> AI will find the perfect match </span>
          tailored just for you
        </p>

        <div className="w-full max-w-5xl mb-6 sm:mb-8 px-4">
          <div className="relative group">
            <div className="search-container relative">
              <div className="search-wrapper">
                <div className="glow-effect" />
                <div className="animated-border" />
                <div className="animated-border" />
                <div className="animated-border" />
                <div className="white-gradient rounded-full max-w-full max-h-full" />
                <div className="border-gradient rounded-full max-w-full max-h-full" />
                
                <div className="input-container">
                  
                <form className="search-input" onSubmit={handleSearch}>

                  <input
                    type="text"
                    name="search"
                    placeholder="I need a phone with excellent camera, long battery life, under 150,000 LKR ..."
                    className="search-input pl-16 sm:pl-20 pr-20 sm:pr-52 text-sm sm:text-base"
                  />
                  
                  <Button
                    type="submit"
                    className="search-button rounded-full w-20 sm:w-32 md:w-48 h-[calc(100%-16px)] flex items-center gap-1 sm:gap-2 hover:bg-gray-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-sky-500" />
                    <span className="hidden sm:inline text-sm sm:text-lg">AI Search</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 sm:hidden" />
                  </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mb-12 sm:mb-16 px-4">
          <span className="hidden sm:flex items-center gap-2 text-gray-400 text-sm mr-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Popular searches:
          </span>
          {[
            "Gaming phones",
            "Best camera phones", 
            "Budget under $500",
            "Latest 5G devices",
            "Long battery life"
          ].map((suggestion, index) => (
            <button
              key={index}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-900/40 hover:bg-gray-800/30 border border-gray-700/50 hover:border-gray-800/30 text-gray-300 hover:text-yellow-100 text-xs sm:text-sm transition-all duration-300 backdrop-blur-sm hover:transform hover:scale-105">
              {suggestion}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center px-4">
          <div className="group cursor-pointer p-4 sm:p-6 rounded-2xl bg-gray-800/30 border border-gray-800/50  transition-all duration-300 hover:transform hover:scale-105 ">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 group-hover:text-blue-500/60 mb-2 transition-colors">
              12K+
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Devices Available</div>
          </div>
          <div className="group cursor-pointer p-4 sm:p-6 rounded-2xl bg-gray-800/30 border border-gray-800/50  transition-all duration-300 hover:transform hover:scale-105 ">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 group-hover:text-blue-500/60 mb-2 transition-colors">
              50K+
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Happy Customers</div>
          </div>
          <div className="group cursor-pointer p-4 sm:p-6 rounded-2xl bg-gray-800/30 border border-gray-800/50  transition-all duration-300 hover:transform hover:scale-105 ">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 group-hover:text-blue-500/60 mb-2 transition-colors">
              99%
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Match Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
}