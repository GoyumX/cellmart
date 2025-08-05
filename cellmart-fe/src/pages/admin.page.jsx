import AllAccessories from "@/components/AllAccessories";
import AllDevices from "@/components/AllDevices";
import CreatePhoneForm from "@/components/CreatePhoneForm";
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

export default function AdminPage() {
    const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
    const [accessoryDialogOpen, setAccessoryDialogOpen] = useState(false);

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome CELLMART Admin</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="w-full sm:w-auto">
                            Add Phone
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black border-0 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[95vh] p-1">
                        <ScrollArea className="max-h-[95vh] w-full">
                            <div className="p-6">
                                <CreatePhoneForm onSuccess={() => setPhoneDialogOpen(false)} />
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