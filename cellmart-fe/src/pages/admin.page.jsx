import AllAccessories from "@/components/AllAccessories";
import AllDevices from "@/components/AllDevices";
import CreatePhoneForm from "@/components/CreatePhoneForm";
import CreateAccessoryForm from "@/components/CreateAccessoryForm";
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
import { useState } from "react";

export default function AdminPagePage() {
    const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
    const [accessoryDialogOpen, setAccessoryDialogOpen] = useState(false);

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome CELLMART Admin</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Add Phone Dialog */}
                <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="w-full sm:w-auto">
                            Add Phone
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-950 border-0 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[95vh] p-0">
                        <ScrollArea className="max-h-[95vh] w-full">
                            <div className="p-6">
                                <CreatePhoneForm onSuccess={() => setPhoneDialogOpen(false)} />
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>

                {/* Add Accessory Dialog */}
                <Dialog open={accessoryDialogOpen} onOpenChange={setAccessoryDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="w-full sm:w-auto">
                            Add Accessory
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-950 border-0 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[95vh] p-0">
                        <ScrollArea className="max-h-[95vh] w-full">
                            <div className="p-6">
                                <CreateAccessoryForm onSuccess={() => setAccessoryDialogOpen(false)} />
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>

            <AllDevices/>
            <AllAccessories/>
        </main>
    );
}