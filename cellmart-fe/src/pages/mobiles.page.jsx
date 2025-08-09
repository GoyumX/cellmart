import ProductCard from "../components/ProductCard";
import BrandTab from "../components/BrandTab";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useGetPhonesQuery } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// removed unused useEffect import



export default function AllDevices() {
  const { data: mobiles, isLoading, isError, error } = useGetPhonesQuery();

  const brands = ["ALL", "Apple", "Samsung", "Google", "Oneplus", "Redmi"];

  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get("brand") || "ALL";

  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const brandFromUrl = searchParams.get("brand") || "ALL";
    setSelectedBrand(brandFromUrl);
  }, [searchParams]);

  const handleSelectedBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  
  const filteredMobiles = selectedBrand === "ALL" 
    ? mobiles 
    : mobiles?.filter((mobile) => 
        mobile.brand.toLowerCase().includes(selectedBrand.toLowerCase())
      );

 
  const sortedMobiles = filteredMobiles ? [...filteredMobiles].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOrder === "high-to-low") {
      return parseFloat(b.price) - parseFloat(a.price);
    }

    return 0; 
  }) : [];

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-12">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All Mobile Devices
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover all available mobile phones in our collection
          </p>
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {brands.map((brand) => (
              <BrandTab 
                key={brand} 
                selectedbrand={selectedBrand} 
                name={brand} 
                onClick={handleSelectedBrand} 
              />
            ))}
          </div>
          <div className="w-full md:w-48">
            <Select value={sortOrder} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-12">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All Mobile Devices
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover all available mobile phones in our collection
          </p>
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {brands.map((brand) => (
              <BrandTab 
                key={brand} 
                selectedbrand={selectedBrand} 
                name={brand} 
                onClick={handleSelectedBrand} 
              />
            ))}
          </div>
          <div className="w-full md:w-48">
            <Select value={sortOrder} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p className="text-red-500">Error loading devices</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-12">
      <div className="mb-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          All Mobile Devices
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover all available mobile phones in our collection. 
        </p>
      </div>
      
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        
        <div className="flex items-center gap-2 flex-wrap">
          {brands.map((brand) => (
            <BrandTab 
              key={brand} 
              selectedbrand={selectedBrand} 
              name={brand} 
              onClick={handleSelectedBrand} 
            />
          ))}
        </div>
        
       
        <div className="w-full md:w-48">
          <Select value={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="high-to-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {sortedMobiles.length > 0 ? (
          sortedMobiles.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No devices found for this brand.</p>
        )}
      </div>
    </section>
  );
}