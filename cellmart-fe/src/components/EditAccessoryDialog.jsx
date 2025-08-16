import { useEffect } from "react";
import { useUpdateAccessoryMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
    type: z.string().min(1, { message: "Type is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    price: z.number().min(1, { message: "Price must be greater than 0" }),
    pointdesc: z.string().min(1, { message: "Point description is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    warranty: z.string().min(1, { message: "Warranty information is required" }),
    image: z.string().url({ message: "Please enter a valid image URL" }),
});

const accessoryTypes = [
    { value: "Earbuds", label: "Earbuds" },
    { value: "Bluetooth Speakers", label: "Bluetooth Speakers" },
    { value: "Cables", label: "Cables" },
    { value: "Chargers", label: "Chargers" },
    { value: "Powerbanks", label: "Powerbanks" },
];

export default function EditAccessoryDialog({ accessory, open, onOpenChange, onSuccess }) {
    const [updateAccessory, { isLoading }] = useUpdateAccessoryMutation();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            brand: "",
            model: "",
            price: "",
            pointdesc: "",
            description: "",
            warranty: "",
            image: "",
        }
    });

    // Reset form when accessory data changes
    useEffect(() => {
        if (accessory) {
            form.reset({
                type: accessory.type || "",
                brand: accessory.brand || "",
                model: accessory.model || "",
                price: accessory.price || "",
                pointdesc: accessory.pointdesc || "",
                description: accessory.description || "",
                warranty: accessory.warranty || "",
                image: accessory.image || "",
            });
        }
    }, [accessory, form]);

    const handleSubmit = async (values) => {
        try {
            await updateAccessory({ 
                id: accessory._id, 
                data: values 
            }).unwrap();
            onSuccess();
        } catch (error) {
            toast.error("Failed to update accessory");
            console.error("Error updating accessory:", error);
        }
    };

    if (!accessory) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-950 border-0 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[95vh] p-0">
                <ScrollArea className="max-h-[95vh] w-full">
                    <div className="p-6">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-2xl font-bold text-white">
                                Edit Accessory - {accessory.brand} {accessory.model}
                            </DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                <div className="grid gap-6">
                                    {/* Type */}
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Accessory Type</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white/5 border-gray-600 text-gray-100 focus:border-green-500">
                                                            <SelectValue placeholder="Select accessory type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-gray-900 border-gray-700">
                                                        {accessoryTypes.map((type) => (
                                                            <SelectItem 
                                                                key={type.value} 
                                                                value={type.value}
                                                                className="text-gray-100 focus:bg-gray-800"
                                                            >
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Brand */}
                                    <FormField
                                        control={form.control}
                                        name="brand"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Brand</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="e.g., Apple, Sony, JBL" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Model */}
                                    <FormField
                                        control={form.control}
                                        name="model"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Model</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="e.g., AirPods Pro, WH-1000XM4" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Price */}
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Price (LKR)</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number"
                                                        placeholder="e.g., 15999" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500"
                                                        onChange={(e) => {
                                                            field.onChange(parseFloat(e.target.value) || 0);
                                                        }}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Point Description */}
                                    <FormField
                                        control={form.control}
                                        name="pointdesc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Key Features (Point Description)</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        placeholder="Highlight key features separated by commas"
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500 min-h-[100px]"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Detailed Description</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        placeholder="Provide detailed product description"
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500 min-h-[120px]"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Warranty */}
                                    <FormField
                                        control={form.control}
                                        name="warranty"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Warranty Information</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="e.g., 1 year international warranty" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Image URL */}
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Image URL</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="https://example.com/image.jpg" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button 
                                        type="button" 
                                        variant="default" 
                                        onClick={() => onOpenChange(false)}
                                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                        {isLoading ? "Updating..." : "Update Accessory"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
