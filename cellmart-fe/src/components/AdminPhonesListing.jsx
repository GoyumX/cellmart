import { useState } from "react";
import { useGetPhonesQuery, useDeletePhoneMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Phone, Package } from "lucide-react";
import { toast } from "sonner";
import EditPhoneDialog from "./EditPhoneDialog";

export default function AdminPhonesListing() {
    const { data: phones, isLoading, refetch } = useGetPhonesQuery();
    const [deletePhone] = useDeletePhoneMutation();
    const [editingPhone, setEditingPhone] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleDelete = async (phoneId, phoneName) => {
        if (window.confirm(`Are you sure you want to delete ${phoneName}?`)) {
            try {
                await deletePhone(phoneId).unwrap();
                toast.success("Phone deleted successfully");
                refetch();
            } catch (error) {
                toast.error("Failed to delete phone");
                console.error("Error deleting phone:", error);
            }
        }
    };

    const handleEdit = (phone) => {
        setEditingPhone(phone);
        setEditDialogOpen(true);
    };

    const handleEditSuccess = () => {
        setEditDialogOpen(false);
        setEditingPhone(null);
        refetch();
        toast.success("Phone updated successfully");
    };

    if (isLoading) {
        return (
            <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Phone Management</h2>
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

    if (!phones || phones.length === 0) {
        return (
            <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Phone Management</h2>
                </div>
                <Card className="bg-gray-900 border-gray-700">
                    <CardContent className="p-8 sm:p-12 text-center">
                        <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No phones found</h3>
                        <p className="text-sm sm:text-base text-gray-400">Add some phones to get started.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 px-2">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Phone Management ({phones.length})</h2>
            </div>
            
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {phones.map((phone) => (
                    <Card key={phone._id} className="bg-white/5 border-gray-700 hover:bg-white/8 transition-colors">
                        <CardHeader className="pb-2 sm:pb-3">
                            <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-800">
                                <img
                                    src={phone.image}
                                    alt={`${phone.brand} ${phone.model}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-phone.jpg';
                                    }}
                                />
                            </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                            <div>
                                <CardTitle className="text-white text-base sm:text-lg mb-1 leading-tight">
                                    {phone.brand} {phone.model}
                                </CardTitle>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="default" className="text-xs">Phone</Badge>
                                    <span className="text-lg sm:text-xl font-bold text-green-400">
                                        Rs. {Number(phone.price).toLocaleString('en-LK')}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Storage Options</p>
                                    <p className="text-gray-300 text-sm">{phone.storage}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Colors</p>
                                    <p className="text-gray-300 text-sm">{phone.colors}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Warranty</p>
                                    <p className="text-gray-300 text-sm">{phone.warranty}</p>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-700">
                                <p className="text-gray-400 text-xs sm:text-sm truncate">{phone.pointdesc}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(phone)}
                                    className="flex-1 bg-blue-600/20 border-blue-500/50 text-blue-300 hover:bg-blue-600/30 text-xs sm:text-sm"
                                >
                                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(phone._id, `${phone.brand} ${phone.model}`)}
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

            {/* Edit Phone Dialog */}
            <EditPhoneDialog
                phone={editingPhone}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
}
