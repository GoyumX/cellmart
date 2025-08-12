import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Phone, Headphones } from "lucide-react";

export default function AdminSearchFilters({ 
    searchTerm, 
    setSearchTerm, 
    filterType, 
    setFilterType, 
    reservations 
}) {
    const phoneCount = reservations?.filter(r => r.productType === "Phone").length || 0;
    const accessoryCount = reservations?.filter(r => r.productType === "Accessory" || r.productType === "Accessories").length || 0;
    const totalCount = reservations?.length || 0;

    return (
        <Card className="bg-white/5 border-gray-700">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by name, email, contact number, or user ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/6 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            variant={filterType === "all" ? "secondary" : "default"}
                            onClick={() => setFilterType("all")}
                            size="sm"
                        >
                            All ({totalCount})
                        </Button>
                        <Button
                            variant={filterType === "phone" ? "secondary" : "default"}
                            onClick={() => setFilterType("phone")}
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Phone className="h-4 w-4" />
                            Phones ({phoneCount})
                        </Button>
                        <Button
                            variant={filterType === "Accessories" ? "secondary" : "default"}
                            onClick={() => setFilterType("Accessories")}
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Headphones className="h-4 w-4" />
                            Accessories ({accessoryCount})
                        </Button>
                    </div>
                </div>
                {searchTerm && (
                    <p className="text-sm text-gray-400 mt-2">
                        Showing results for "{searchTerm}" 
                    </p>
                )}
            </CardContent>
        </Card>
    );
}