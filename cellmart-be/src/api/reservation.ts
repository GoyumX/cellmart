import express from "express";
import {
    createReservation,
    getReservationById,
    getAllReservations,
    deleteReservation,
} from "../application/reservation";

const reservationRouter = express.Router();

reservationRouter.route("/").get(getAllReservations).post(createReservation);
reservationRouter
    .route("/:id")
    .get(getReservationById)
    .delete(deleteReservation);

export default reservationRouter;