import { useParams } from "react-router";
import { useGetAccessoryByIdQuery } from "@/lib/api";
import { Headphones, Star, Shield, Zap, Volume2, Bluetooth } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router";

const AccessoryPage = () => {
  const { id } = useParams();
  const { data: accessory, isLoading, error, isError } = useGetAccessoryByIdQuery(id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price );
  };

  const getAccessoryIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'earbuds':
      case 'headphones':
        return Headphones;
      case 'charger':
      case 'cable':
        return Zap;
      case 'speaker':
        return Volume2;
      default:
        return Bluetooth;
    }
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
        <p className="text-red-400">Error: {error?.message || "Failed to load accessory details"}</p>
      </div>
    );

  const keyFeatures = accessory.pointdesc.split(',').filter(f => f.trim());
  const AccessoryIcon = getAccessoryIcon(accessory.type);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={accessory.image}
                alt={`${accessory.brand} ${accessory.model}`}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-0">
                {accessory.type}
              </Badge>
              {keyFeatures.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 border-0">
                  {feature.trim()}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white">{accessory.brand} {accessory.model}</h1>
                <div className="flex items-center mt-2">
                  <AccessoryIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <p className="text-gray-400">CellMart {accessory.type} Collection</p>
                </div>
              </div>
              <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 text-gray-400">
                <Star className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-white">4.7</span>
              <span className="text-gray-400">(1,832 reviews)</span>
            </div>

            <p className="text-gray-300 leading-relaxed">{accessory.description}</p>

            <Card className="bg-gray-900 border-gray-800">
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

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4 text-white">Product Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-300">Brand</span>
                    <span className="text-gray-400">{accessory.brand}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-300">Type</span>
                    <span className="text-gray-400">{accessory.type}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-300">Model</span>
                    <span className="text-gray-400">{accessory.model}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="text-gray-300">Warranty</span>
                    </div>
                    <span className="text-gray-400">{accessory.warranty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div>
                <p className="text-3xl font-bold text-white">{formatPrice(accessory.price)}</p>
                <p className="text-sm text-gray-400">One-time payment</p>
              </div>
              <SignedOut>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/sign-in">Sign in to Reserve</Link>
                </Button>
              </SignedOut>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoryPage;