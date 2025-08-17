import CreatePhoneForm from "@/components/CreatePhoneForm";
import CreateAccessoryForm from "@/components/CreateAccessoryForm";
import AdminProductsManagement from "@/components/AdminProductsManagement";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router";
import { 
    Smartphone, 
    Headphones, 
    Users,  
    Shield, 
    Sparkles,
    ChevronRight,
    Phone,
    ShoppingBag
} from "lucide-react";

export default function AdminPage() {
    const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
    const [accessoryDialogOpen, setAccessoryDialogOpen] = useState(false);

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1000ms'}}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '500ms'}}></div>
                </div>

                <div className="relative container mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full">
                                    <Shield className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-4">
                            CELLMART
                        </h1>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
                                Admin Control Center
                            </h2>
                            <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
                        </div>
                    </div>

                    <div className="mb-12">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
                                <DialogTrigger asChild>
                                    <Card className="group cursor-pointer bg-white/5 border-blue-500/40 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                                        <CardContent className="p-8 text-center">
                                            <div className="flex justify-center mb-4">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                                    <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                        <Smartphone className="h-8 w-8 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                                Add Phone
                                            </h4>
                                            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                                Add new mobile devices to inventory
                                            </p>
                                            <ChevronRight className="h-5 w-5 text-blue-400 mx-auto mt-3 group-hover:translate-x-1 transition-transform" />
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="bg-black border-0 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[95vh] p-0">
                                    <ScrollArea className="max-h-[95vh] w-full">
                                        <div className="p-6">
                                            <CreatePhoneForm onSuccess={() => setPhoneDialogOpen(false)} />
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>                 
 
                            <Dialog open={accessoryDialogOpen} onOpenChange={setAccessoryDialogOpen}>
                                <DialogTrigger asChild>
                                    <Card className="group cursor-pointer bg-white/5 border-blue-400/40 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/25">
                                        <CardContent className="p-8 text-center">
                                            <div className="flex justify-center mb-4">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                                    <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                        <Headphones className="h-8 w-8 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                                Add Accessory
                                            </h4>
                                            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                                Add new accessories to catalog
                                            </p>
                                            <ChevronRight className="h-5 w-5 text-blue-400 mx-auto mt-3 group-hover:translate-x-1 transition-transform" />
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="bg-black border-0 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[95vh] p-0">
                                    <ScrollArea className="max-h-[95vh] w-full">
                                        <div className="p-6">
                                            <CreateAccessoryForm onSuccess={() => setAccessoryDialogOpen(false)} />
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>

                            {/* View Reservations */}
                            <Link to="/admin/reservations">
                                <Card className="group cursor-pointer bg-white/5 border-blue-500/40 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 h-full">
                                    <CardContent className="p-8 text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                    <Users className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                            View Reservations
                                        </h4>
                                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                            Manage customer bookings
                                        </p>
                                        <ChevronRight className="h-5 w-5 text-blue-400 mx-auto mt-3 group-hover:translate-x-1 transition-transform" />
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Manage Products */}
                            <Link to="/admin/products">
                                <Card className="group cursor-pointer bg-white/5 border-blue-400/40 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/25 h-full">
                                    <CardContent className="p-8 text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                                <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                    <ShoppingBag className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                            Manage Products
                                        </h4>
                                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                            Edit & delete inventory items
                                        </p>
                                        <ChevronRight className="h-5 w-5 text-blue-400 mx-auto mt-3 group-hover:translate-x-1 transition-transform" />
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}