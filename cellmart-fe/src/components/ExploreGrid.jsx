import { Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExploreGrid() {
  return (
    <div className="px-8 py-8 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-6">
          <div className="relative rounded-3xl p-8 h-[300px] flex flex-col justify-between z-0">
            <div className="w-10 h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center z-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-4 z-0">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 z-0">
                  Search and Explore more devices
                </h2>
                <p className="text-gray-300 z-0">Take a look at a range of devices available to choose from.</p>
              </div>
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 rounded-full w-100 mx-auto flex items-center justify-center gap-2 z-0"
              >
                <a href="/devices">
                  Show All Devices
                  <ArrowRight />
                </a>
              </Button>
            </div>
            <img
              src="/assets/grid/215355701.jpg"
              alt=""
              className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10 pointer-events-none"
            />
          </div>

          <div className="relative rounded-3xl p-8 h-[300px] flex flex-col justify-between z-0">
            <div className="w-10 h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center z-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-4 z-0">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 z-0">
                  Search and Explore more accessories
                </h2>
                <p className="text-gray-300 z-0">Take a look at a vaiety of our available accessories to choose from.</p>
              </div>
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 rounded-full w-100 mx-auto flex items-center justify-center gap-2 z-0"
              >
                <a href="/accessories">
                  Show All Accessories
                  <ArrowRight />
                </a>
              </Button>
            </div>
            <img
              src="/assets/grid/308797093.jpg"
              alt=""
              className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10 pointer-events-none"
            />
          </div>
        </div>

        <div className="relative rounded-3xl p-8 min-h-[620px] flex items-center justify-center z-0">
          <div className="max-w-md text-center z-0">
            <h2 className="text-2xl font-bold text-white leading-tight shadow-lg z-0">
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