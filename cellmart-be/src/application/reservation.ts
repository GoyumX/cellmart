import { Request, Response, NextFunction } from "express";
import Reservation from "../infastructure/schemas/Reservation";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { ReservationDTO } from "../domain/dtos/reservation";


// Extend Express Request interface to include auth property
declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: string;
                sessionClaims?: {
                    metadata: {
                        role?: "admin";
                    };
                };
            };
        }
    }
}

export const getAllReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};

export const getReservationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservationid = req.params.id;
        const reservation = await Reservation.findById(reservationid).populate('productId');
        if (!reservation) {
            throw new NotFoundError("Reservation not found");
        }
        res.status(200).json(reservation);
        return;
    } catch (error) {
        next(error);
    }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservationid = req.params.id;
        const deleted = await Reservation.findByIdAndDelete(reservationid);
        res.status(200).json({ message: "Reservation deleted" });
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