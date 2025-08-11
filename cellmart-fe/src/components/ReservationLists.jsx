import { useState, useEffect } from "react";
import AdminReservationCard from "./AdminReservationCard";

// Component to handle phone reservations
export function PhoneReservationsList({ reservations, onDelete }) {
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhoneData = async () => {
            if (reservations.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const data = {};
            
            for (const reservation of reservations) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/phones/${reservation.productId}`);
                    if (response.ok) {
                        const phoneData = await response.json();
                        data[reservation.productId] = phoneData;
                    }
                } catch (error) {
                    console.error(`Error fetching phone ${reservation.productId}:`, error);
                }
            }
            
            setProductData(data);
            setLoading(false);
        };

        fetchPhoneData();
    }, [reservations]);

    return (
        <div className="space-y-6">
            {reservations.map((reservation) => (
                <AdminReservationCard
                    key={reservation._id}
                    reservation={reservation}
                    productData={productData[reservation.productId]}
                    onDelete={onDelete}
                    isLoading={loading}
                />
            ))}
        </div>
    );
}

// Component to handle accessory reservations
export function AccessoryReservationsList({ reservations, onDelete }) {
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccessoryData = async () => {
            if (reservations.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const data = {};
            
            for (const reservation of reservations) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/accessories/${reservation.productId}`);
                    if (response.ok) {
                        const accessoryData = await response.json();
                        data[reservation.productId] = accessoryData;
                    }
                } catch (error) {
                    console.error(`Error fetching accessory ${reservation.productId}:`, error);
                }
            }
            
            setProductData(data);
            setLoading(false);
        };

        fetchAccessoryData();
    }, [reservations]);

    return (
        <div className="space-y-6">
            {reservations.map((reservation) => (
                <AdminReservationCard
                    key={reservation._id}
                    reservation={reservation}
                    productData={productData[reservation.productId]}
                    onDelete={onDelete}
                    isLoading={loading}
                />
            ))}
        </div>
    );
}