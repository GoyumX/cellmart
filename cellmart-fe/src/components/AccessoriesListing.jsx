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
            Top trending Accessories
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the most reliable and effcient accessories here at Cellmart
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {
            types.map((types) => {
              return (<BrandTab selectedtypes={selectedtypes} name={types} onClick={handleSelectedtypes} />)
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
            Top trending Accessories
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the most reliable and effcient accessories here at Cellmart
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {
            types.map((types) => {
              return (<BrandTab selectedtypes={selectedtypes} name={types} onClick={handleSelectedtypes} />)
            })
          }
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-3 ">
      <div className="mb-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending Accessories
        </h2>
        <p className="text-lg text-muted-foreground">
          Choose the most reliable and effcient accessories here at Cellmart
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {
          types.map((types) => {
            return (<BrandTab selectedtypes={selectedtypes} name={types} onClick={handleSelectedtypes} />)
          })
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {
          filteredaccessories.slice(0, 8).map((product) => {
            return (<ProductCard key={product._id} product={product} />)
          })
        }
      </div>
    </section>
  );
}