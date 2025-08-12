import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Phone, Headphones, Mail, User, Hash, Shield, Package } from "lucide-react";
import { toast } from "sonner";

export default function AdminReservationCard({ reservation, productData, onDelete, isLoading }) {
    const isPhone = reservation.productType === "Phone";
    const product = productData;


    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${reservation.name}'s reservation for ${product?.brand} ${product?.model}?`)) {
            try {
                await onDelete(reservation._id);
                toast.success(`Reservation for ${reservation.name} deleted successfully`);
            } catch (error) {
                toast.error("Failed to delete reservation");
                console.error("Error deleting reservation:", error);
            }
        }
    };

    if (isLoading || !product) {
        return (
            <Card className="bg-white/5 border-gray-700 text-gray-100">
                <CardContent className="p-6">
                    <div className="animate-pulse">
                        <div className="flex space-x-4">
                            <div className="w-24 h-24 bg-gray-700 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white/5 border-gray-700 text-gray-100 hover:bg-white/8 transition-colors">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        {isPhone ? (
                            <Phone className="h-6 w-6 text-blue-400 mt-1" />
                        ) : (
                            <Headphones className="h-6 w-6 text-green-400 mt-1" />
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {product.brand} {product.model}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={isPhone ? "default" : "secondary"} className="text-xs">
                                    {reservation.productType}
                                </Badge>
                                <span className="text-2xl font-bold text-green-400">
                                    Rs. {Number(product.price).toLocaleString('en-LK')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        className="h-9 px-3 shrink-0"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Customer Information - Prominent Display */}
                <div className="bg-white/5 rounded-lg p-4 border border-gray-600">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-400" />
                        Customer Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Full Name</p>
                            <p className="text-white font-semibold text-lg">{reservation.name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Contact Number</p>
                            <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-gray-400" />
                                <p className="text-white font-medium">{reservation.contactNumber}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Email Address</p>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <p className="text-white font-medium break-all">{reservation.gmail}</p>
                            </div>
                        </div>
                        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wide text-wrap">User ID</p>
                            <p className="text-gray-300 font-mono text-sm bg-gray-700 px-2 py-1 rounded">
                                {reservation.userId}
                            </p>
                        </div>
                        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wide ">Reservation ID</p>
                            <p className="text-gray-300 font-mono text-sm bg-gray-700 px-2 py-1 rounded">
                                {reservation._id}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Product Information */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src={product.image}
                            alt={`${product.brand} ${product.model}`}
                            className="w-32 h-32 object-cover rounded-lg bg-gray-800 border border-gray-600"
                            onError={(e) => {
                                console.log(e);
                            }}
                        />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                        {/* Key Features */}
                        {product.pointdesc && (
                            <div>
                                <h5 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    Key Features
                                </h5>
                                <div className="flex flex-wrap gap-1">
                                    {product.pointdesc.split(',').map((feature, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs bg-gray-800 border-gray-600 text-gray-300 break-words max-w-full whitespace-normal leading-tight text-wrap"
                                        >
                                            {feature.trim()} {/*  p-2   sm:max-w-[45%] md:max-w-none*/}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Phone-specific details */}
                        {isPhone && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.storage && (
                                    <div>
                                        <h6 className="text-xs text-gray-400 uppercase tracking-wide mb-2">Storage Options</h6>
                                        <div className="flex flex-wrap gap-1">
                                            {product.storage.split(',').map((storage, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs bg-blue-900 text-blue-200">
                                                    {storage.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {product.colors && (
                                    <div>
                                        <h6 className="text-xs text-gray-400 uppercase tracking-wide mb-2">Available Colors</h6>
                                        <div className="flex flex-wrap gap-1">
                                            {product.colors.split(',').map((color, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs bg-purple-900 text-purple-200">
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
                            <div>
                                <h6 className="text-xs text-gray-400 uppercase tracking-wide mb-2">Accessory Type</h6>
                                <Badge variant="secondary" className="bg-green-900 text-green-200">
                                    {product.type}
                                </Badge>
                            </div>
                        )}

                        {/* Warranty */}
                        {product.warranty && (
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-400 uppercase tracking-wide">Warranty:</span>
                                <span className="text-gray-300 font-medium">{product.warranty}</span>
                            </div>
                        )}

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h6 className="text-xs text-gray-400 uppercase tracking-wide mb-2">Description</h6>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {product.description.length > 300
                                        ? `${product.description.substring(0, 300)}...`
                                        : product.description
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}