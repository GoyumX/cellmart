import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Globe, Menu } from "lucide-react";
import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

function Navigation() {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const brands = ["ALL", "Apple", "Samsung", "Google", "Oneplus", "Redmi"];
  const types = ["ALL", "Earbuds", "Bluetooth Speakers", "Cables", "Chargers", "Powerbanks"];

  return (
    <nav className="z-10 bg-black text-white">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
            aria-label="Open Menu"
            onClick={() => setMobileOpen((p) => !p)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-gray-300 transition-colors">
            CELLMART
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 transition-colors">
                    Mobile Phones
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 min-w-[500px]">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">Browse</p>
                        <div className="space-y-3">
                          <Link
                            to="/phones"
                            className="relative block rounded-md overflow-hidden group"
                          >
                            <img 
                              src="/assets/nav/5581374735.png" 
                              alt="Mobile Phones" 
                              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                              <span className="text-white text-sm font-medium px-3 py-1 bg-white/20 backdrop-blur-sm rounded-md border border-white/30">
                                Show All Mobile Phones
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">Brands</p>
                        <div className="grid grid-cols-1 gap-1 mb-3">
                          {brands.map((brand) => (
                            <Link
                              key={brand}
                              to={`/phones?brand=${encodeURIComponent(brand)}`}
                              className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                            >
                              {brand}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 transition-colors">
                    Accessories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 min-w-[500px]">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">Browse</p>
                        <div className="space-y-3">
                          <Link
                            to="/accessories"
                            className="relative block rounded-md overflow-hidden group"
                          >
                            <img 
                              src="/assets/nav/815127596.png" 
                              alt="Accessories" 
                              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                              <span className="text-white text-sm font-medium px-3 py-1 bg-white/20 backdrop-blur-sm rounded-md border border-white/30">
                                Show All Accessories
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">Types</p>
                        <div className="grid grid-cols-1 gap-1 mb-3">
                          {types.map((type) => (
                            <Link
                              key={type}
                              to={`/accessories?type=${encodeURIComponent(type)}`}
                              className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                            >
                              {type}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <SignedIn>
              {user?.publicMetadata?.role === "admin" && (
                <Link to={`/admin`} className="transition-colors hover:text-gray-300">
                  Admin Panel
                </Link>
              )}
            </SignedIn>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" className="hidden sm:flex px-3 py-3 text-white hover:bg-white/20 transition-colors hover:text-white">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base"> EN </span>
          </Button>
          <SignedOut>
            <Button variant="default" asChild className="text-sm sm:text-base text-white hover:bg-white/20 transition-colors">
              <Link to="/sign-in">Log In</Link>
            </Button>
            <Button variant="default"  asChild className="text-sm sm:text-base text-white hover:bg-white/20 transition-colors">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <Button asChild className="text-sm sm:text-base">
              <Link to="/account">My Account</Link>
            </Button>
          </SignedIn>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mt-4 mb-3 font-semibold">Mobile Phones</p>
              <div className="space-y-1">
                <Link 
                  onClick={() => setMobileOpen(false)} 
                  to="/phones" 
                  className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                >
                  Show All Mobile Phones
                </Link>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {brands.map((brand) => (
                    <Link
                      key={brand}
                      to={`/phones?brand=${encodeURIComponent(brand)}`}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">Accessories</p>
              <div className="space-y-1">
                <Link 
                  onClick={() => setMobileOpen(false)} 
                  to="/accessories" 
                  className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                >
                  Show All Accessories
                </Link>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {types.map((type) => (
                    <Link
                      key={type}
                      to={`/accessories?type=${encodeURIComponent(type)}`}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <SignedIn>
              {user?.publicMetadata?.role === "admin" && (
                <Link 
                  to={`/admin`} 
                  onClick={() => setMobileOpen(false)} 
                  className="block text-sm hover:text-gray-300 transition-colors mt-4 px-3 py-2"
                >
                  Admin Panel
                </Link>
              )}
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;