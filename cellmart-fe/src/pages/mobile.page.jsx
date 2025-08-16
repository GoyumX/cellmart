import { useParams } from "react-router";
import { useEffect } from 'react';

import { useGetPhoneByIdQuery } from "@/lib/api";
import { Smartphone, MapPin, Star, Wifi, Zap, Camera, Battery, Shield, HardDrive, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReservationForm from "@/components/ReservationForm";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router";

const PhonePage = () => {

  let random = Math.random() * (5.0 - 4.0) + 4.0;
  random = parseFloat(random.toFixed(1));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { id } = useParams();
  const { data: phone, isLoading, error, isError } = useGetPhoneByIdQuery(id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price );
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="w-full h-[400px] rounded-lg bg-white/5" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-24 bg-white/5" />
                <Skeleton className="h-6 w-32 bg-white/5" />
                <Skeleton className="h-6 w-28 bg-white/5" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-8 w-64 mb-2 bg-white/5" />
                  <Skeleton className="h-4 w-48 bg-white/5" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
              </div>
              <Skeleton className="h-4 w-36 bg-white/5" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-3/4 bg-white/5" />
              </div>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-32 mb-4 bg-white/5" />
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center">
                        <Skeleton className="h-5 w-5 mr-2 bg-white/5" />
                        <Skeleton className="h-4 w-24 bg-white/5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-8 w-24 mb-1 bg-white/5" />
                  <Skeleton className="h-4 w-16 bg-white/5" />
                </div>
                <Skeleton className="h-12 w-32 bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (isError) 
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <p className="text-red-400">Error: {error?.message || "Failed to load phone details"}</p>
      </div>
    );

  const keyFeatures = phone.pointdesc.split(',').filter(f => f.trim());
  const storageOptions = phone.storage.split(',').map(s => s.trim());
  const colorOptions = phone.colors.split(',').map(c => c.trim());

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
              <img
                src={phone.image}
                alt={`${phone.brand} ${phone.model}`}
                className="absolute inset-0 w-full h-full object-contain p-4"/>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white/5  rounded-lg border border-gray-800 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{formatPrice(phone.price)}</p>
                <p className="text-xs sm:text-sm text-gray-400">One-time payment</p>
              </div>
              <SignedOut>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/sign-in">Sign in to Reserve</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">Reserve Mobile Device</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-gray-800 text-gray-100 max-w-sm sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-white text-lg sm:text-xl">Reserve Your Mobile Device</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Fill in your details and we'll contact you within 24 hours to complete your reservation.
                      </DialogDescription>
                    </DialogHeader>
                    <ReservationForm phoneId={id}/>
                  </DialogContent>
                </Dialog>
              </SignedIn>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{phone.model}</h1>
                <div className="flex items-center mt-2">
                  <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-1" />
                  <p className="text-gray-400 text-sm sm:text-base">CellMart Premium Collection</p>
                </div>
              </div>
              <Button variant="outline" size="icon" className="border-gray-700 hover:bg-amber-200 text-gray-400 w-8 h-8 sm:w-10 sm:h-10">
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-white text-sm sm:text-base">{random}</span>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{phone.description}</p>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Key Features</h2>
                <div className="space-y-2 sm:space-y-3">
                  {keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{feature.trim()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center mb-3">
                  <HardDrive className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Storage Options</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {storageOptions.map((storage, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-gray-600 text-gray-300 hover:bg-white/5 text-xs sm:text-sm">
                      {storage}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center mb-3">
                  <Palette className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Available Colors</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-gray-600 text-gray-300 hover:bg-white/5 text-xs sm:text-sm">
                      {color}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center">
                    <Camera className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300 text-sm sm:text-base">Pro Camera</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300 text-sm sm:text-base">Fast Processor</span>
                  </div>
                  <div className="flex items-center">
                    <Battery className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300 text-sm sm:text-base">Long Battery</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300 text-sm sm:text-base">{phone.warranty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePage;