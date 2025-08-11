import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, Headphones, Package } from "lucide-react";
import {
    useGetReservationQuery,
    useDeleteReservationMutation,
} from "@/lib/api";
import AdminSearchFilters from "./AdminSearchFilters";
import { PhoneReservationsList, AccessoryReservationsList } from "./ReservationLists";

export default function AdminReservations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const { data: reservations, isLoading, refetch } = useGetReservationQuery();
    const [deleteReservation] = useDeleteReservationMutation();

    // Filter and search reservations
    const filteredReservations = useMemo(() => {
        if (!reservations) return [];
        
        let filtered = reservations;

        // Filter by type
        if (filterType !== "all") {
            filtered = filtered.filter(r => r.productType.toLowerCase() === filterType.toLowerCase());
        }

        // Search by name, email, or contact
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(r => 
                r.name.toLowerCase().includes(search) ||
                r.gmail.toLowerCase().includes(search) ||
                r.contactNumber.toString().includes(search) ||
                r.userId.toLowerCase().includes(search)
            );
        }

        return filtered;
    }, [reservations, searchTerm, filterType]);

    // Separate reservations by type
    const { phoneReservations, accessoryReservations } = useMemo(() => {
        return {
            phoneReservations: filteredReservations.filter(r => r.productType === "Phone"),
            accessoryReservations: filteredReservations.filter(r => r.productType === "Accessories"),
        };
    }, [filteredReservations]);

    const handleDeleteReservation = async (reservationId) => {
        try {
            await deleteReservation(reservationId).unwrap();
            refetch();
        } catch (error) {
            throw error;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading all reservations...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const totalReservations = filteredReservations.length;

    return (
        <div className="min-h-screen bg-black text-gray-100 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Admin - All Reservations
                    </h1>
                    <p className="text-gray-400">
                        Manage all customer reservations across phones and accessories
                    </p>
                </div>

                {/* Search and Filters */}
                <AdminSearchFilters 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    reservations={reservations}
                />

                {totalReservations === 0 ? (
                    <Card className="bg-gray-900 border-gray-700">
                        <CardContent className="p-12 text-center">
                            <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {searchTerm ? "No reservations found" : "No reservations yet"}
                            </h3>
                            <p className="text-gray-400">
                                {searchTerm 
                                    ? "Try adjusting your search terms or filters."
                                    : "No customers have made any reservations yet."
                                }
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Phone Reservations */}
                        {phoneReservations.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-6 w-6 text-blue-400" />
                                    <h2 className="text-2xl font-bold text-white">
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
                            <Separator className="bg-gray-800" />
                        )}

                        {/* Accessory Reservations */}
                        {accessoryReservations.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Headphones className="h-6 w-6 text-green-400" />
                                    <h2 className="text-2xl font-bold text-white">
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