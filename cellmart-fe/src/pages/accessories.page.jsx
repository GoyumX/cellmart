import ProductCard from "../components/ProductCard";
import BrandTab from "../components/BrandTab";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AllAccessories() {
  const { data: accessories, isLoading, isError, error } = useGetAccessoriesQuery();

  const types = ["ALL", "Earbuds", "Bluetooth Speakers", "Cables", "Chargers", "Powerbanks"];

  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "ALL";
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [selectedType, setSelectedType] = useState(initialType);
  const [sortOrder, setSortOrder] = useState("default");
  const [page, setPage] = useState(initialPage);
  
  const limit = 12; // limiter ekk set krl items per section

  useEffect(() => {
    const typeFromUrl = searchParams.get("type") || "ALL";
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setSelectedType(typeFromUrl);
    setPage(pageFromUrl);
  }, [searchParams]);

  const handleSelectedType = (type) => {
    setSelectedType(type);
    setPage(1); 
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setPage(1);  // page eke sort change krm resetter
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    
  };

  const filteredAccessories = selectedType === "ALL" 
    ? accessories 
    : accessories?.filter((accessory) => 
        accessory.type.toLowerCase().includes(selectedType.toLowerCase())
      );

  // Sort filtereee
  const sortedAccessories = filteredAccessories ? [...filteredAccessories].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOrder === "high-to-low") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  }) : [];

  const total = sortedAccessories.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const currentItems = sortedAccessories.slice(startIndex, startIndex + limit);

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

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isLoading 
            ? "Loading..." 
            : `${total} ${total === 1 ? "accessory" : "accessories"} found`
          }
        </h2>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-4 text-center py-12 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">No accessories found</h3>
            <p className="text-muted-foreground">
              Try selecting a different type or adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* Pagination section*/}
      {totalPages > 1 && (
        <div className="mt-8 w-full mx-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(page - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNum)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}