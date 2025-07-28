import { Star, Quote } from "lucide-react";
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
    text: "CellMart's customer service is the best! They helped me choose the right phone with so much patience."
  },
  {
    id: 2,
    name: "Kavindi Fernando",
    city: "Dehiwala",
    avatar: "K",
    rating: 4,
    text: "I'm really happy with CellMart's friendly staff. They made the whole buying process so easy."
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
    text: "Amazing experience! CellMart's customer service team is always welcoming and supportive."
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
    text: "CellMart's customer support is excellent. I recommend them to all my friends!"
  }
];

  
const Testimonials = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    )

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-sm font-medium mb-6">
            <Quote className="w-4 h-4" />
            <span>Customer Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Hear from our satisfied customers about their experience with our products and exceptional service
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            className="w-full relative"
            opts={{
                loop: true,
                align: "start",
            }}>

            <CarouselContent className="-ml-6">
                {testimonials.map((testimonial, index) => (
                <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 pl-6 pb-4 select-none"> 
                  <div className="h-full group">
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col hover:bg-white/[0.07] group-hover:transform group-hover:scale-[1.02]">
                      {/* Quote icon */}
                      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                        <Quote className="w-6 h-6 text-white" />
                      </div>

                      {/* Rating stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star 
                            key={starIndex} 
                            size={16} 
                            fill={starIndex < testimonial.rating ? "#fbbf24" : "transparent"}
                            strokeWidth={starIndex < testimonial.rating ? "0" : "1"} 
                            className={starIndex < testimonial.rating ? "text-amber-400" : "text-gray-600"}
                          />
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <blockquote className="text-gray-200 leading-relaxed mb-6 flex-grow text-lg">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Customer info */}
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/10 text-white flex items-center justify-center font-bold text-lg mr-4 border border-white/20">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                          <p className="text-gray-400 text-sm">{testimonial.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                ))}
            </CarouselContent>

            {/* Custom navigation buttons */}
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white backdrop-blur-md transition-all duration-300" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white backdrop-blur-md transition-all duration-300" />
          </Carousel>
        </div>

        {/* Bottom stats or call-to-action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2000+</div>
              <div className="text-gray-400 text-sm">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;