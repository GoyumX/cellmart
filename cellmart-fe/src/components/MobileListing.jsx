import ProductCard from "./ProductCard";
import BrandTab from "./BrandTab";
import { useState } from "react";
import { useGetPhonesQuery } from "@/lib/api";

export default function MobileListings() {

  const {data: mobiles ,isLoading, isError, error} =useGetPhonesQuery();
  
  const brands = ["ALL", "Apple", "Samsung", "Google", "OnePlus", "Redmi"]

  const [selectedbrand, setSelectedBrand] = useState("ALL");

  const handleSelectedBrand = (brand) => {
    setSelectedBrand(brand);
  }

  const filteredmobiles = selectedbrand === "ALL" ? mobiles : mobiles.filter((mobile) => {
    return mobile.brand.toLowerCase().includes(selectedbrand.toLowerCase());
  })

  if(isLoading){
    return (
      <section className="px-8 py-8 lg:py-12">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Latest Mobile Phone Arrivals
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the Perfect Mobile Among the Latest at Cellmart,
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {
            brands.map((brand) => {
              return (<BrandTab key={brand} selectedbrand={selectedbrand} name={brand} onClick={handleSelectedBrand} />)
            })
          }
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-medium">Loading amazing phones for you...</span>
          </div>
        </div>
      </section>
    );
  }

  if(isError){
    return (
      <section className="px-8 py-8 lg:py-12">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Latest Mobile Phone Arrivals
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the Perfect Mobile Among the Latest at Cellmart,
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {
            brands.map((brand) => {
              return (<BrandTab key={brand} selectedbrand={selectedbrand} name={brand} onClick={handleSelectedBrand} />)
            })
          }
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        <p>Error </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-12">
      <div className="mb-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Latest Mobile Phone Arrivals
        </h2>
        <p className="text-lg text-muted-foreground">
          Find the Perfect Mobile Among the Latest at Cellmart,
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {
          brands.map((brand) => {
            return (<BrandTab key={brand} selectedbrand={selectedbrand} name={brand} onClick={handleSelectedBrand} />)
          })
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {
          filteredmobiles.slice().reverse().slice(0, 12).map((product) => {
            return (<ProductCard key={product._id} product={product} />)
          })
        }
      </div>
    </section>
  );
}