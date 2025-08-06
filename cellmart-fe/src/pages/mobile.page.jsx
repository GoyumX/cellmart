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
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="w-full h-[400px] rounded-lg bg-gray-800" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-24 bg-gray-800" />
                <Skeleton className="h-6 w-32 bg-gray-800" />
                <Skeleton className="h-6 w-28 bg-gray-800" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-8 w-64 mb-2 bg-gray-800" />
                  <Skeleton className="h-4 w-48 bg-gray-800" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
              </div>
              <Skeleton className="h-4 w-36 bg-gray-800" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-800" />
                <Skeleton className="h-4 w-full bg-gray-800" />
                <Skeleton className="h-4 w-3/4 bg-gray-800" />
              </div>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-32 mb-4 bg-gray-800" />
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center">
                        <Skeleton className="h-5 w-5 mr-2 bg-gray-800" />
                        <Skeleton className="h-4 w-24 bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-8 w-24 mb-1 bg-gray-800" />
                  <Skeleton className="h-4 w-16 bg-gray-800" />
                </div>
                <Skeleton className="h-12 w-32 bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (isError) 
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
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
                <h1 className="text-3xl font-bold text-white">{phone.model}</h1>
                <div className="flex items-center mt-2">
                  <Smartphone className="h-5 w-5 text-gray-400 mr-1" />
                  <p className="text-gray-400">CellMart Premium Collection</p>
                </div>
              </div>
              <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 text-gray-400">
                <Star className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-white">{random}</span>
            </div>

            <p className="text-gray-300">{phone.description}</p>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4 text-white">Key Features</h2>
                <div className="space-y-3">
                  {keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature.trim()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <HardDrive className="h-5 w-5 mr-2 text-gray-400" />
                  <h3 className="text-lg font-semibold text-white">Storage Options</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {storageOptions.map((storage, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      {storage}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Palette className="h-5 w-5 mr-2 text-gray-400" />
                  <h3 className="text-lg font-semibold text-white">Available Colors</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      {color}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5  border-gray-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4 text-white">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300">Pro Camera</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300">Fast Processor</span>
                  </div>
                  <div className="flex items-center">
                    <Battery className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300">Long Battery</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-300">{phone.warranty}</span>
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