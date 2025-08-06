import ProductCard from "./ProductCard";
import BrandTab from "./BrandTab";
import { useState } from "react";
import { useGetPhonesQuery } from "@/lib/api";

export default function MobileListings() {

  const {data: mobiles ,isLoading, isError, error} =useGetPhonesQuery();
  
  const brands = ["ALL", "Apple", "Samsung", "Google", "Oneplus", "Redmi"]

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
            Top trending Mobile Phones
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the prefect mobile phone for you
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
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if(isError){
    return (
      <section className="px-8 py-8 lg:py-12">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending Mobile Phones
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the prefect mobile phone for you
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
          Top trending Mobile Phones
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the prefect mobile phone for you
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
          filteredmobiles.slice(0, 8).map((product) => {
            return (<ProductCard key={product._id} product={product} />)
          })
        }
      </div>
    </section>
  );
}