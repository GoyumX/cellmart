import { Request, Response, NextFunction } from "express";
import Reservation from "../infastructure/schemas/Reservation";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { ReservationDTO } from "../domain/dtos/reservation";

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
        
        const reservation = ReservationDTO.safeParse(req.body);

        if (!reservation.success) {
            throw new ValidationError(reservation.error.message)
        }
        const user = req.auth;

        await Reservation.create({
            productId: reservation.data.productId,
            productType: reservation.data.productType,
            userId: user?.userId,
            name: reservation.data.name,
            contactNumber: reservation.data.contactNumber,
            gmail: reservation.data.gmail
        });
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};