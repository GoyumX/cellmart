import { useState } from "react";
import { useGetAccessoriesQuery, useDeleteAccessoryMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Headphones, Package } from "lucide-react";
import { toast } from "sonner";
import EditAccessoryDialog from "./EditAccessoryDialog";

export default function AdminAccessoriesListing() {
    const { data: accessories, isLoading, refetch } = useGetAccessoriesQuery();
    const [deleteAccessory] = useDeleteAccessoryMutation();
    const [editingAccessory, setEditingAccessory] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleDelete = async (accessoryId, accessoryName) => {
        if (window.confirm(`Are you sure you want to delete ${accessoryName}?`)) {
            try {
                await deleteAccessory(accessoryId).unwrap();
                toast.success("Accessory deleted successfully");
                refetch();
            } catch (error) {
                toast.error("Failed to delete accessory");
                console.error("Error deleting accessory:", error);
            }
        }
    };

    const handleEdit = (accessory) => {
        setEditingAccessory(accessory);
        setEditDialogOpen(true);
    };

    const handleEditSuccess = () => {
        setEditDialogOpen(false);
        setEditingAccessory(null);
        refetch();
        toast.success("Accessory updated successfully");
    };

    if (isLoading) {
        return (
            <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Accessory Management</h2>
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="bg-white/5 border-gray-700">
                            <CardContent className="p-4 sm:p-6">
                                <div className="animate-pulse space-y-3 sm:space-y-4">
                                    <div className="w-full h-32 sm:h-48 bg-gray-700 rounded-lg"></div>
                                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!accessories || accessories.length === 0) {
        return (
            <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Accessory Management</h2>
                </div>
                <Card className="bg-gray-900 border-gray-700">
                    <CardContent className="p-8 sm:p-12 text-center">
                        <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No accessories found</h3>
                        <p className="text-sm sm:text-base text-gray-400">Add some accessories to get started.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 px-2">
                <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Accessory Management ({accessories.length})</h2>
            </div>
            
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {accessories.map((accessory) => (
                    <Card key={accessory._id} className="bg-white/5 border-gray-700 hover:bg-white/8 transition-colors">
                        <CardHeader className="pb-2 sm:pb-3">
                            <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-800">
                                <img
                                    src={accessory.image}
                                    alt={`${accessory.brand} ${accessory.model}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-accessory.jpg';
                                    }}
                                />
                            </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                            <div>
                                <CardTitle className="text-white text-base sm:text-lg mb-1 leading-tight">
                                    {accessory.brand} {accessory.model}
                                </CardTitle>
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <Badge variant="secondary" className="text-xs">{accessory.type}</Badge>
                                    <span className="text-lg sm:text-xl font-bold text-green-400">
                                        Rs. {Number(accessory.price).toLocaleString('en-LK')}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Type</p>
                                    <p className="text-gray-300 text-sm">{accessory.type}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Warranty</p>
                                    <p className="text-gray-300 text-sm">{accessory.warranty}</p>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-700">
                                <p className="text-gray-400 text-xs sm:text-sm truncate">{accessory.pointdesc}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(accessory)}
                                    className="flex-1 bg-green-600/20 border-green-500/50 text-green-300 hover:bg-green-600/30 text-xs sm:text-sm"
                                >
                                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(accessory._id, `${accessory.brand} ${accessory.model}`)}
                                    className="flex-1 text-xs sm:text-sm"
                                >
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Edit Accessory Dialog */}
            <EditAccessoryDialog
                accessory={editingAccessory}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
}
