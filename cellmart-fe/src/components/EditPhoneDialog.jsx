import { useEffect } from "react";
import { useUpdatePhoneMutation } from "@/lib/api";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
    brand: z.string().min(1, { message: "Brand is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    price: z.number().min(1, { message: "Price must be greater than 0" }),
    pointdesc: z.string().min(1, { message: "Point description is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    storage: z.string().min(1, { message: "Storage options are required" }),
    colors: z.string().min(1, { message: "Color options are required" }),
    warranty: z.string().min(1, { message: "Warranty information is required" }),
    image: z.string().url({ message: "Please enter a valid image URL" }),
});

export default function EditPhoneDialog({ phone, open, onOpenChange, onSuccess }) {
    const [updatePhone, { isLoading }] = useUpdatePhoneMutation();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: "",
            model: "",
            price: "",
            pointdesc: "",
            description: "",
            storage: "",
            colors: "",
            warranty: "",
            image: "",
        }
    });

    // Reset form when phone data changes
    useEffect(() => {
        if (phone) {
            form.reset({
                brand: phone.brand || "",
                model: phone.model || "",
                price: phone.price || "",
                pointdesc: phone.pointdesc || "",
                description: phone.description || "",
                storage: phone.storage || "",
                colors: phone.colors || "",
                warranty: phone.warranty || "",
                image: phone.image || "",
            });
        }
    }, [phone, form]);

    const handleSubmit = async (values) => {
        try {
            await updatePhone({ 
                id: phone._id, 
                data: values 
            }).unwrap();
            onSuccess();
        } catch (error) {
            toast.error("Failed to update phone");
            console.error("Error updating phone:", error);
        }
    };

    if (!phone) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-950 border-0 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[95vh] p-0">
                <ScrollArea className="max-h-[95vh] w-full">
                    <div className="p-6">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-2xl font-bold text-white">
                                Edit Phone - {phone.brand} {phone.model}
                            </DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                <div className="grid gap-6">
                                    {/* Brand */}
                                    <FormField
                                        control={form.control}
                                        name="brand"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Brand</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="e.g., Apple, Samsung, Google" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                                        placeholder="e.g., iPhone 15 Pro Max, Galaxy S24 Ultra" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                                        placeholder="e.g., 299900" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 min-h-[100px]"
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
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 min-h-[120px]"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Storage */}
                                    <FormField
                                        control={form.control}
                                        name="storage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Storage Options</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="e.g., 128GB,256GB,512GB,1TB" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Colors */}
                                    <FormField
                                        control={form.control}
                                        name="colors"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Available Colors</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="e.g., Space Black,Silver,Gold,Deep Purple" 
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                                        className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    >
                                        {isLoading ? "Updating..." : "Update Phone"}
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
