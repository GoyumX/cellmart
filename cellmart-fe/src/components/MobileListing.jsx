import MobileCard from "./MobileCard";
import BrandTab from "./BrandTab";
import { useState } from "react";

export default function MobileListings() {

  const mobiles = [
    {
      "_id": "6755d5f49a1ea956f3ce2475",
      "name": "Iphone 16 Pro Max",
      "brand": "Apple",
      "image": "https://www.istudio.store/cdn/shop/files/iPhone_16_Pro_Max_Natural_Titanium_PDP_Image_Position_2_Design__TH-TH.jpg?v=1725928783&width=823",
      "price": 600000 ,
      "description": "The Iphone 16 Pro Max is the latest and greatest phone from Apple. It has a 6.7-inch display, a 12-megapixel camera, and a 3,200mAh battery."
    },
    {
      "_id": "6755d5f49a1ea956f3ce2476",
      "name": "Samsung Galaxy S24 Ultra",
      "brand": "Samsung",
      "image": "https://images.samsung.com/is/image/samsung/p6pim/my/2401/gallery/my-galaxy-s24-s928-sm-s928bzkcxme-539301582?$720_576_JPG$",
      "price": 400000,
      "description": "The Samsung Galaxy S24 Ultra is the latest and greatest phone from Samsung. It has a 6.7-inch display, a 12-megapixel camera"
    },
  ]

  const brands = ["ALL", "Apple", "Samsung", "Google", "Oneplus", "Redmi"]

  const [selectedbrand, setSelectedBrand] = useState("ALL");

  const handleSelectedBrand = (brand) => {
    setSelectedBrand(brand);
  }

  const filteredmobiles = selectedbrand === "ALL" ? mobiles : mobiles.filter((mobile) => {
    return mobile.brand.toLowerCase().includes(selectedbrand.toLowerCase());
  })

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending mobile phones
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the prefect mobile phone for you
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {
          brands.map((brand) => {
            return (<BrandTab selectedbrand={selectedbrand} name={brand} onClick={handleSelectedBrand} />)
          })
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {
          filteredmobiles.map((mobile) => {
            return (<MobileCard key={mobile._id} mobile={mobile} />)
          })
        }
      </div>
    </section>
  );
}