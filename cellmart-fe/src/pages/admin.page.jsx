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

export default function AdminPagePage() {
    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome CELLMART Admin</h2>
        <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="">Add Phone</Button>
        </DialogTrigger>
        <DialogContent className="bg-black border-gray-800 text-gray-100 max-w-sm sm:max-w-md">
            <ScrollArea className="h-[800px] w-[400px] ">
            <CreatePhoneForm/>
            </ScrollArea>
        </DialogContent>
      </form>
    </Dialog>
        </main>
    );
}