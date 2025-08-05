import { useCreatePhoneMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

export default function CreatePhoneForm() {
    const [createPhone, { isLoading }] = useCreatePhoneMutation();
  
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

    const handleSubmit = async (values) => {
        const { brand, model, price, pointdesc, description, storage, colors, warranty, image } = values;
        
        try {
            toast.loading("Creating phone...");
            await createPhone({
                brand,
                model,
                price,
                pointdesc,
                description,
                storage,
                colors,
                warranty,
                image,
            }).unwrap();
            toast.success("Phone created successfully");
            form.reset(); // Reset form after successful submission
        } catch (error) {
            toast.error("Phone creation failed");
            console.error("Error creating phone:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Phone</h1>
                    <p className="text-gray-400">Fill in the details to add a new phone to CellMart inventory</p>
                </div>

                <Form {...form}>
                    <div className="w-full">
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
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                                placeholder="e.g., iPhone 15 Pro Max, Samsung Galaxy S24 Ultra" 
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                        <FormLabel className="text-gray-300">Price (in cents)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="e.g., 419900 LKR "
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                                onChange={(e) => {
                                                    field.onChange(parseFloat(e.target.value) || 0);
                                                }}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Enter price in LKR 
                                        </FormDescription>
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
                                        <FormLabel className="text-gray-300">Key Features</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Dynamic Island stays on top of it all,8GB RAM 256GB ROM,48MP Main |Ultra Wide | Telephoto,All-day battery life"
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 min-h-[100px]"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Separate features with commas. These will appear as badges on the product page.
                                        </FormDescription>
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
                                                placeholder="Design: Aerospace-grade titanium body – strong and lightweight,Display: Large 6.7-inch Super Retina XDR OLED display..."
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 min-h-[120px]"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Detailed product description that will appear on the product page.
                                        </FormDescription>
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
                                                placeholder="256GB,512GB,1TB" 
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Separate storage options with commas (e.g., 256GB,512GB,1TB)
                                        </FormDescription>
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
                                                placeholder="Blue titanium,Natural titanium,Titanium Black,White titanium" 
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Separate color options with commas
                                        </FormDescription>
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
                                        <FormLabel className="text-gray-300">Warranty</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="1 year Apple Care warranty" 
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
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
                                                placeholder="" 
                                                className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Enter a valid URL for the phone image
                                        </FormDescription>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-800">
                            <Button 
                                type="button"
                                onClick={form.handleSubmit(handleSubmit)}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50"
                            >
                                {isLoading ? "Creating Phone..." : "Create Phone"}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}