import ProductCard from "./productCard";
import BrandTab from "./BrandTab";
import { useState } from "react";
import { useGetAccessoriesQuery } from "@/lib/api";

export default function AccessoriesListing() {

  const {data: accessories ,isLoading, isError, error} =useGetAccessoriesQuery();

  const types = ["ALL", "Earbuds", "Bluetooth Speakers", "Cables", "Chargers", "Powerbanks"]

  const [selectedtypes, setSelectedtypes] = useState("ALL");

  const handleSelectedtypes = (types) => {
    setSelectedtypes(types);
  }

  const filteredaccessories = selectedtypes === "ALL" ? accessories : accessories.filter((accessories) => {
    return accessories.type.toLowerCase().includes(selectedtypes.toLowerCase());
  })

  if(isError){
    return (
      <section className="px-8 py-3 ">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Check Out the New Accessories Arrivals 
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the most reliable and effcient accessories here at Cellmart
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {
            types.map((types) => {
              return (<BrandTab key={types} selectedtypes={selectedtypes} name={types} onClick={handleSelectedtypes} />)
            })
          }
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        <p>Error</p>
        </div>
      </section>
    );
  }

  if(isLoading){
    return (
      <section className="px-8 py-3 ">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Check Out the New Accessories Arrivals 
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the most reliable and effcient accessories here at Cellmart
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {
            types.map((types) => {
              return (<BrandTab key={types} selectedtypes={selectedtypes} name={types} onClick={handleSelectedtypes} />)
            })
          }
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-medium">Loading amazing accessories for you...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-3 ">
      <div className="mb-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Check Out the New Accessories Arrivals 
        </h2>
        <p className="text-lg text-muted-foreground">
          Choose the most reliable and effcient accessories here at Cellmart
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {
          types.map((types) => {
            return (<BrandTab key={types} selectedtypes={selectedtypes} name={types} onClick={handleSelectedtypes} />)
          })
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {
          filteredaccessories.slice().reverse().slice(0, 8).map((product) => {
            return (<ProductCard key={product._id} product={product} />)
          })
        }
      </div>
    </section>
  );
}