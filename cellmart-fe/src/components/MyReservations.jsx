import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Phone, Headphones, Mail, User, Hash, Calendar, Package } from "lucide-react";
import { toast } from "sonner";
import {
    useGetReservationQuery,
    useDeleteReservationMutation,
} from "@/lib/api";
import ReservationCard from "./ReservationCard";

const PhoneReservationsList = ({ reservations, onDelete }) => {
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhoneData = async () => {
            if (reservations.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const data = {};
            
            for (const reservation of reservations) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/phones/${reservation.productId}`);
                    if (response.ok) {
                        const phoneData = await response.json();
                        data[reservation.productId] = phoneData;
                    }
                } catch (error) {
                    console.error(`Error fetching phone ${reservation.productId}:`, error);
                }
            }
            
            setProductData(data);
            setLoading(false);
        };

        fetchPhoneData();
    }, [reservations]);

    return (
        <div className="space-y-4">
            {reservations.map((reservation) => (
                <ReservationCard
                    key={reservation._id}
                    reservation={reservation}
                    productData={productData[reservation.productId]}
                    onDelete={onDelete}
                    isLoading={loading}
                />
            ))}
        </div>
    );
};

const AccessoryReservationsList = ({ reservations, onDelete }) => {
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccessoryData = async () => {
            if (reservations.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const data = {};
            
            for (const reservation of reservations) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accessories/${reservation.productId}`);
                    if (response.ok) {
                        const accessoryData = await response.json();
                        data[reservation.productId] = accessoryData;
                    }
                } catch (error) {
                    console.error(`Error fetching accessory ${reservation.productId}:`, error);
                }
            }
            
            setProductData(data);
            setLoading(false);
        };

        fetchAccessoryData();
    }, [reservations]);

    return (
        <div className="space-y-4">
            {reservations.map((reservation) => (
                <ReservationCard
                    key={reservation._id}
                    reservation={reservation}
                    productData={productData[reservation.productId]}
                    onDelete={onDelete}
                    isLoading={loading}
                />
            ))}
        </div>
    );
};

export default function MyReservations() {
    const { user, isLoaded } = useUser();
    const { data: allReservations, isLoading, refetch } = useGetReservationQuery();
    const [deleteReservation] = useDeleteReservationMutation();

    // Filter user and get their reservation.,
    const userReservations = useMemo(() => {
        if (!allReservations || !user) return [];
        return allReservations.filter(reservation => reservation.userId === user.id);
    }, [allReservations, user]);

    // Methna logic ek balapamm
    const { phoneReservations, accessoryReservations } = useMemo(() => {
        return {
            phoneReservations: userReservations.filter(r => r.productType === "Phone"),
            accessoryReservations: userReservations.filter(r => r.productType === "Accessory" || r.productType === "Accessories"),
        };
    }, [userReservations]);

    const handleDeleteReservation = async (reservationId) => {
        try {
            await deleteReservation(reservationId).unwrap();
            refetch();
        } catch (error) {
            throw error;
        }
    };

    if (!isLoaded || isLoading) {
        return (
            <div className="w-full">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your reservations...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="w-full">
                <div className="text-center py-16">
                    <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Please Sign In</h2>
                    <p className="text-gray-600">You need to be signed in to view your reservations.</p>
                </div>
            </div>
        );
    }

    const totalReservations = userReservations.length;

    return (
        <div className="w-full">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        My Reservations
                    </h1>
                    <p className="text-gray-600">
                        Manage your product reservations ({totalReservations} total)
                    </p>
                </div>

                {totalReservations === 0 ? (
                    <Card className="bg-white border-gray-200">
                        <CardContent className="p-8 md:p-12 text-center">
                            <Package className="h-12 w-12 md:h-16 md:w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No Reservations Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't made any reservations yet. Browse our products to get started!</p>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Browse Products
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Phone Reservations */}
                        {phoneReservations.length > 0 && (
                            <div className="space-y-4 md:space-y-6">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                        Phone Reservations ({phoneReservations.length})
                                    </h2>
                                </div>
                                
                                <PhoneReservationsList 
                                    reservations={phoneReservations}
                                    onDelete={handleDeleteReservation}
                                />
                            </div>
                        )}

                        {/* Separator if both types exist */}
                        {phoneReservations.length > 0 && accessoryReservations.length > 0 && (
                            <Separator className="bg-gray-200" />
                        )}
                        
                        {/* Accessory Reservations */}
                        {accessoryReservations.length > 0 && (
                            <div className="space-y-4 md:space-y-6">
                                <div className="flex items-center gap-3">
                                    <Headphones className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                        Accessory Reservations ({accessoryReservations.length})
                                    </h2>
                                </div>
                                
                                <AccessoryReservationsList 
                                    reservations={accessoryReservations}
                                    onDelete={handleDeleteReservation}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}