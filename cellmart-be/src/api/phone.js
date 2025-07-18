import express from "express";
import {
    createPhone,
    getPhoneById,
    getAllPhone,
    deletePhone,
    updatePhone
} from "../application/phone.js";

const phoneRouter = express.Router();

phoneRouter.route("/").get(getAllPhone).post(createPhone);
accessoriesRouter
    .route("/:id")
    .get(getPhoneById)
    .put(updatePhone)
    .delete(deletePhone);

export default phoneRouter;