import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateReservationMutation } from "@/lib/api";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),                               // phone numer validation
    contactNumber: z.string().min(10, "Contact number must be at least 10 digits").max(15, "Contact number must be less than 15 digits").regex(/^[0-9+\-\s()]+$/, "Invalid contact number format").transform((val) => val.replace(/[^\d]/g, '')), 
});

const ReservationForm = (props) => {
    const [createReservation, { isLoading }] = useCreateReservationMutation();
    const { phoneId, accessoryId } = props; 
    const { user } = useUser();
    const userId = user?.id; // from clerk
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const navigate = useNavigate();

    const form = useForm({ 
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            contactNumber: "",
        }
    });

    const handleSubmit = async (values) => { 
        const { name, contactNumber } = values;
        console.log("Hee")
        const productId = phoneId || accessoryId;
        const productType = phoneId ? 'Phone' : 'Accessories';
        
        const reserveData = {
            productId,
            productType,
            userId,
            name,
            contactNumber: parseInt(contactNumber),
            gmail: userEmail,
        };
        
        try {
            toast.loading("Creating Reservation...");
            await createReservation(reserveData).unwrap();
            toast.success("Reservation successful! We'll contact you within 24 hours.");
            
            setTimeout(() => {
                navigate(`/`);
            }, 2000);
        } catch (error) {
            toast.error("Reservation failed. Please try again.");
            console.error(error); 
        }

        console.log("Reservation Data:", reserveData);
    };

    return (
        <Form {...form} >
            <form className="" onSubmit={form.handleSubmit(handleSubmit)}>

            <div className="w-full" >
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Reserve Your Product</h2>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Email Address</label>
                        <div className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-300">
                            {userEmail || "No email found"}
                        </div>
                        <p className="text-xs text-gray-500">This email will be used for reservation updates</p>
                    </div>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300">Full Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300">Contact Number</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="tel"
                                        placeholder="Enter your contact number"
                                        className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 text-xs">
                                    Include country code if applicable (e.g., +94 for Sri Lanka)
                                </FormDescription>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                        <h3 className="text-sm font-medium text-gray-300 mb-2">What happens next?</h3>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• We'll contact you within 24 hours to confirm availability</li>
                            <li>• You can visit our store to complete the purchase</li>
                            <li>• No payment required for reservation</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t border-gray-700">
                    <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                        {isLoading ? "Creating Reservation..." : "Confirm Reservation"}
                    </Button>
                </div>
            </div>
            </form>
        </Form>
    );
};

export default ReservationForm;