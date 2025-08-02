import { Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function ExploreGrid() {
  return (
    <div className="px-4 sm:px-8 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        <div className="space-y-6">
          <div className="relative rounded-3xl p-4 sm:p-8 h-[250px] sm:h-[300px] flex flex-col justify-between z-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center z-0">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="space-y-3 sm:space-y-4 z-0">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 z-0">
                  Search and Explore more devices
                </h2>
                <p className="text-sm sm:text-base text-gray-300 z-0">Take a look at a range of devices available to choose from.</p>
              </div>
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 rounded-full w-full sm:w-auto px-6 py-2 flex items-center justify-center gap-2 z-0"
              >
                <Link to="/devices">
                  Show All Devices
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            <img
              src="/assets/grid/215355701.jpg"
              alt=""
              className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10 pointer-events-none"
            />
          </div>

          <div className="relative rounded-3xl p-4 sm:p-8 h-[250px] sm:h-[300px] flex flex-col justify-between z-0">
            <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center z-0">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="space-y-3 sm:space-y-4 z-0">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 z-0">
                  Search and Explore more accessories
                </h2>
                <p className="text-sm sm:text-base text-gray-300 z-0">Take a look at a variety of our available accessories to choose from.</p>
              </div>
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 rounded-full w-full sm:w-auto px-6 py-2 flex items-center justify-center gap-2 z-0"
              >
                <Link to="/accessories">
                  Show All Accessories
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            <img
              src="/assets/grid/308797093.jpg"
              alt=""
              className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10 pointer-events-none"
            />
          </div>
        </div>

        <div className="relative rounded-3xl p-4 sm:p-8 min-h-[400px] sm:min-h-[620px] flex items-center justify-center z-0">
          <div className="max-w-md text-center z-0">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight shadow-lg z-0">
              With the wave of technology, we bring you the most latest and efficient smartphone devices and other accessories for an affordable pricetag for you to have an enthralling experience
            </h2>
          </div>
          <img
            src="/assets/grid/489672294.jpg"
            alt=""
            className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}