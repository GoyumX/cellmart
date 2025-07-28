import express from "express";
import {
    createPhone,
    getPhoneById,
    getAllPhone,
    deletePhone,
    updatePhone
} from "../application/phone";

const phoneRouter = express.Router();

phoneRouter.route("/").get(getAllPhone).post(createPhone);
phoneRouter
    .route("/:id")
    .get(getPhoneById)
    .put(updatePhone)
    .delete(deletePhone);

export default phoneRouter;