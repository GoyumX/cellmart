import { useCreateAccessoryMutation } from "@/lib/api";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

export default function CreateAccessoryForm() {
    const [createAccessory, { isLoading }] = useCreateAccessoryMutation();
  
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

    const handleSubmit = async (values) => {
        const { type, brand, model, price, pointdesc, description, warranty, image } = values;
        
        try {
            toast.loading("Creating accessory...");
            await createAccessory({
                type,
                brand,
                model,
                price,
                pointdesc,
                description,
                warranty,
                image,
            }).unwrap();
            toast.success("Accessory created successfully");
            form.reset(); // Reset form after successful submission
        } catch (error) {
            toast.error("Accessory creation failed");
            console.error("Error creating accessory:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Accessory</h1>
                    <p className="text-gray-400">Fill in the details to add a new accessory to CellMart inventory</p>
                </div>

                <Form {...form}>
                    <div className="w-full">
                        <div className="grid gap-6">
                            {/* Type */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white/5 border-gray-600 text-gray-100 focus:border-blue-500">
                                                    <SelectValue placeholder="Select accessory type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-gray-800 border-gray-600">
                                                {accessoryTypes.map((type) => (
                                                    <SelectItem 
                                                        key={type.value} 
                                                        value={type.value}
                                                        className="text-gray-100 focus:bg-gray-700 focus:text-gray-100"
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
                                                placeholder="e.g., Apple, Samsung, Anker, JBL" 
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
                                                placeholder="e.g., AirPods Pro 2, PowerCore 10000, USB-C Cable" 
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
                                        <FormLabel className="text-gray-300">Price (in cents)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="e.g., 24900 (for $249.00)"
                                                className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                                onChange={(e) => {
                                                    field.onChange(parseFloat(e.target.value) || 0);
                                                }}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Enter price in cents (e.g., 24900 for $249.00)
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
                                                placeholder="Active Noise Cancellation,Wireless Charging Case,Up to 6 hours listening time,Spatial Audio support"
                                                className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 min-h-[100px]"
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
                                                placeholder="Experience premium sound quality with advanced features. Perfect for music lovers and professionals..."
                                                className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 min-h-[120px]"
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

                            {/* Warranty */}
                            <FormField
                                control={form.control}
                                name="warranty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Warranty</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="1 year manufacturer warranty" 
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
                                                placeholder="https://example.com/accessory-image.jpg" 
                                                className="bg-white/5 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500">
                                            Enter a valid URL for the accessory image
                                        </FormDescription>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-800">
                            <Button 
                                type="button"
                                onClick={form.handleSubmit(handleSubmit)}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50"
                            >
                                {isLoading ? "Creating Accessory..." : "Create Accessory"}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}