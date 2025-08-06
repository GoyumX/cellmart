import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Phone, Headphones, Mail, User, Hash, Calendar, Package } from "lucide-react";
import { toast } from "sonner";

const ReservationCard = ({ reservation, productData, onDelete, isLoading }) => {
    const isPhone = reservation.productType === "Phone";
    const product = productData;


    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to cancel this reservation?")) {
            try {
                await onDelete(reservation._id);
                toast.success("Reservation cancelled successfully");
            } catch (error) {
                toast.error("Failed to cancel reservation");
                console.error("Error cancelling reservation:", error);
            }
        }
    };

    if (isLoading || !product) {
        return (
            <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6">
                    <div className="animate-pulse">
                        <div className="flex space-x-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isPhone ? (
                            <Phone className="h-6 w-6 text-blue-600" />
                        ) : (
                            <Headphones className="h-6 w-6 text-green-600" />
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {product.brand} {product.model}
                            </h3>
                            <Badge variant={isPhone ? "default" : "secondary"} className="text-xs">
                                {reservation.productType}
                            </Badge>
                        </div>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        className="h-9 px-3"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancel
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Product Details */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src={product.image}
                            alt={`${product.brand} ${product.model}`}
                            className="w-28 h-28 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                                console.log(e);
                            }}
                        />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                        <div>
                                <div>
                                <p className="text-2xl font-bold text-green-600">
                                    Rs. {Number(product.price).toLocaleString('en-LK')}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Reserved Product</p>
                                </div>
                            <p className="text-sm text-gray-500 mt-1">Reserved Product</p>
                        </div>
                        
                        {/* Key Features     mobile responsiveness fixedd*/}
                        {product.pointdesc && (
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                                <div className="flex flex-wrap gap-1">
                                    {product.pointdesc.split(',').slice(0, 4).map((feature, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs bg-blue-50 border-blue-200 text-blue-700 break-words max-w-full whitespace-normal p-2 leading-tight text-wrap sm:max-w-[45%] md:max-w-none"
                                        >
                                            {feature.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Phone-specific details */}
                        {isPhone && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                {product.storage && (
                                    <div>
                                        <span className="font-medium text-gray-700">Storage:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {product.storage.split(',').slice(0, 3).map((storage, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {storage.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {product.colors && (
                                    <div>
                                        <span className="font-medium text-gray-700">Colors:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {product.colors.split(',').slice(0, 3).map((color, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {color.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Accessory-specific details */}
                        {!isPhone && product.type && (
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Type:</span>
                                <Badge variant="secondary" className="ml-2 text-xs">
                                    {product.type}
                                </Badge>
                            </div>
                        )}

                        {/* Warranty */}
                        {product.warranty && (
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Warranty:</span>
                                <span className="text-gray-600 ml-2">{product.warranty}</span>
                            </div>
                        )}
                    </div>
                </div>

                <Separator className="bg-gray-200" />

                {/* Reservation Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Reservation Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium text-gray-800">{reservation.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Contact:</span>
                            <span className="font-medium text-gray-800">{reservation.contactNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium text-gray-800">{reservation.gmail}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReservationCard;

