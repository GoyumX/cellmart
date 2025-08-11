import express from "express";
import {
    createReservation,
    getReservationById,
    getAllReservations,
    deleteReservation,
} from "../application/reservation";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const reservationRouter = express.Router();

reservationRouter.route("/").get(getAllReservations, isAuthenticated).post(createReservation, isAuthenticated);
reservationRouter
    .route("/:id")
    .get(getReservationById, isAuthenticated)
    .delete(deleteReservation, isAuthenticated, isAdmin);

export default reservationRouter;