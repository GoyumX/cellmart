import ProductCard from "./ProductCard";
import BrandTab from "./BrandTab";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useGetAccessoriesQuery } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// removed unused useEffect import


export default function AllAccessories() {
  const { data: accessories, isLoading, isError, error } = useGetAccessoriesQuery();

  const types = ["ALL", "Earbuds", "Bluetooth Speakers", "Cables", "Chargers", "Powerbanks"];

  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "ALL";

  const [selectedType, setSelectedType] = useState(initialType);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const typeFromUrl = searchParams.get("type") || "ALL";
    setSelectedType(typeFromUrl);
  }, [searchParams]);

  const handleSelectedType = (type) => {
    setSelectedType(type);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  
  const filteredAccessories = selectedType === "ALL" 
    ? accessories 
    : accessories?.filter((accessory) => 
        accessory.type.toLowerCase().includes(selectedType.toLowerCase())
      );

  const sortedAccessories = filteredAccessories ? [...filteredAccessories].sort((a, b) => {
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
            All Accessories
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our complete collection of mobile accessories
          </p>
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {types.map((type) => (
              <BrandTab 
                key={type} 
                selectedbrand={selectedType} 
                name={type} 
                onClick={handleSelectedType} 
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
            All Accessories
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our complete collection of mobile accessories
          </p>
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {types.map((type) => (
              <BrandTab 
                key={type} 
                selectedbrand={selectedType} 
                name={type} 
                onClick={handleSelectedType} 
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
          <p className="text-red-500">Error loading accessories</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-12">
      <div className="mb-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          All Accessories
        </h2>
        <p className="text-lg text-muted-foreground">
          Choose from our complete collection of mobile accessories. From earbuds to powerbanks, find everything you need for your devices.
        </p>
      </div>
      
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        
        <div className="flex items-center gap-2 flex-wrap">
          {types.map((type) => (
            <BrandTab 
              key={type} 
              selectedbrand={selectedType} 
              name={type} 
              onClick={handleSelectedType} 
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
        {sortedAccessories.length > 0 ? (
          sortedAccessories.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No accessories found for this type.</p>
        )}
      </div>
    </section>
  );
}