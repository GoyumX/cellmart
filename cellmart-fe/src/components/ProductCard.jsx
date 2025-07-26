import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function ProductCard(props) {

    return (
        <div
            key={props.product._id}
            className="block group relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                    src={props.product.image}
                    alt={props.product.name}
                    className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
                />
            </div>
            <div className="mt-3 space-y-2">
                <h3 className="font-semibold text-lg">{props.product.model}</h3>
                <div className="flex items-baseline space-x-2">
                    <span className="text-m ">Rs. {props.product.price}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;