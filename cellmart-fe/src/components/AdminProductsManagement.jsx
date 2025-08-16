import { Separator } from "@/components/ui/separator";
import AdminPhonesListing from "./AdminPhonesListing";
import AdminAccessoriesListing from "./AdminAccessoriesListing";

export default function AdminProductsManagement() {
    return (
        <div className="min-h-screen bg-black text-gray-100 p-3 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="text-center px-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                        Product Management
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                        Manage all phones and accessories - Edit, Delete, and View details
                    </p>
                </div>

                {/* Phone Management Section */}
                <AdminPhonesListing />

                {/* Separator */}
                <Separator className="bg-gray-800 my-6 sm:my-8" />

                {/* Accessories Management Section */}
                <AdminAccessoriesListing />
            </div>
        </div>
    );
}
