import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import * as React from "react"

const testimonials = [
  {
    id: 1,
    name: "Nimesh Perera",
    city: "Nugegoda",
    avatar: "N",
    rating: 5,
    text: "CellMart’s customer service is the best! They helped me choose the right phone with so much patience."
  },
  {
    id: 2,
    name: "Kavindi Fernando",
    city: "Dehiwala",
    avatar: "K",
    rating: 4,
    text: "I’m really happy with CellMart’s friendly staff. They made the whole buying process so easy."
  },
  {
    id: 3,
    name: "Dinuka Jayasinghe",
    city: "Maharagama",
    avatar: "D",
    rating: 5,
    text: "Excellent customer care! CellMart guided me well when I was confused about which model to pick."
  },
  {
    id: 4,
    name: "Sajini Gunawardena",
    city: "Kotte",
    avatar: "S",
    rating: 5,
    text: "Such warm and professional service at CellMart. They even helped set up my new phone before I left!"
  },
  {
    id: 5,
    name: "Chamath Weerasinghe",
    city: "Battaramulla",
    avatar: "C",
    rating: 4,
    text: "I love how CellMart staff go out of their way to help. Great after-sales support too!"
  },
  {
    id: 6,
    name: "Hiruni Madushanka",
    city: "Rajagiriya",
    avatar: "H",
    rating: 5,
    text: "Best customer service in Colombo! CellMart made sure I was 100% satisfied with my purchase."
  },
  {
    id: 7,
    name: "Pasindu Samarasinghe",
    city: "Kolonnawa",
    avatar: "P",
    rating: 4,
    text: "Very helpful staff and quick service. CellMart is my go-to place for any phone upgrades."
  },
  {
    id: 8,
    name: "Isuru Ranasinghe",
    city: "Wellampitiya",
    avatar: "I",
    rating: 5,
    text: "Always a pleasant experience at CellMart. Their team is knowledgeable and super friendly."
  },
  {
    id: 9,
    name: "Dulani Silva",
    city: "Boralesgamuwa",
    avatar: "D",
    rating: 4,
    text: "I trust CellMart for their honest advice and top-notch customer support."
  },
  {
    id: 10,
    name: "Tharindu Abeysekara",
    city: "Piliyandala",
    avatar: "T",
    rating: 5,
    text: "I appreciate how CellMart staff take time to explain everything clearly. Great service!"
  },
  {
    id: 11,
    name: "Harsha Wickramasinghe",
    city: "Mount Lavinia",
    avatar: "H",
    rating: 5,
    text: "Amazing experience! CellMart’s customer service team is always welcoming and supportive."
  },
  {
    id: 12,
    name: "Nadeesha Bandara",
    city: "Moratuwa",
    avatar: "N",
    rating: 4,
    text: "Buying a phone from CellMart was stress-free thanks to their attentive staff."
  },
  {
    id: 13,
    name: "Sahan Peris",
    city: "Ratmalana",
    avatar: "S",
    rating: 5,
    text: "The best customer service in the city. CellMart really knows how to keep customers happy."
  },
  {
    id: 14,
    name: "Sanduni Karunaratne",
    city: "Kirulapone",
    avatar: "S",
    rating: 4,
    text: "Friendly team and quick service. CellMart never disappoints!"
  },
  {
    id: 15,
    name: "Ravindu Amarasinghe",
    city: "Thalawathugoda",
    avatar: "R",
    rating: 5,
    text: "CellMart’s customer support is excellent. I recommend them to all my friends!"
  }
];

  
const Testimonials = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    )

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 text-center mb-12">
          Hear from our satisfied customers about their experience with our products and services that we offer.
        </p>
        <Carousel
        plugins={[plugin.current]}
        className="w-full relative mt-6"
        opts={{
            loop: true,
        }}>

        <CarouselContent>
            {testimonials.map((testimonial,index) => (
            <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/3 xl:basis-1/3 pb-4 select-none"> 
              <div className="p-1  h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.country}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex gap-1 align-end">
					{Array.from({ length: 5 }).map((_, index) => (
						<Star key={index} size={16} fill={index < testimonial.rating ? "#FFE234" : "transparent"}strokeWidth={index < testimonial.rating ? "0" : "2"} className="text-[#FFE234]"/>
                ))}
				</div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
		<CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;