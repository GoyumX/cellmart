import { Request, Response, NextFunction } from "express";
import Reservation from "../infastructure/schemas/Reservation";

// Extend Express Request interface to include auth property
declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: string;
            };
        }
    }
}

export const getAllReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

export const getReservationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservationid = req.params.id;
        const reservation = await Reservation.findById(reservationid).populate('productId');
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.json(reservation);
    } catch (error) {
        next(error);
    }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservationid = req.params.id;
        const deleted = await Reservation.findByIdAndDelete(reservationid);
        res.json({ message: "Reservation deleted" });
    } catch (error) {
        next(error);
    }
};

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const reservation = req.body;
        const user = req.auth;

        await Reservation.create({
            productId: reservation.productId,
            productType: reservation.productType,
            userId: reservation.userId,
            name: reservation.name,
            contactNumber: reservation.contactNumber,
            gmail: reservation.gmail
        });
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

