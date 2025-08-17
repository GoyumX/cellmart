import express from "express";
import {
    createReservation,
    getReservationById,
    getAllReservations,
    deleteReservation,
} from "../application/reservation";
import { isAuthenticated } from "./middleware/authentication-middleware";

const reservationRouter = express.Router();

reservationRouter.route("/").get(isAuthenticated, getAllReservations).post(isAuthenticated, createReservation);
reservationRouter
    .route("/:id")
    .get( isAuthenticated, getReservationById)
    .delete( isAuthenticated, deleteReservation);

export default reservationRouter;