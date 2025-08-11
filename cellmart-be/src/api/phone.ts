import express from "express";
import {
    createPhone,
    getPhoneById,
    getAllPhone,
    deletePhone,
    updatePhone
} from "../application/phone";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const phoneRouter = express.Router();

phoneRouter.route("/").get(getAllPhone).post(createPhone, isAuthenticated, isAdmin);
phoneRouter
    .route("/:id")
    .get(getPhoneById)
    .put(updatePhone, isAuthenticated, isAdmin)
    .delete(deletePhone, isAuthenticated, isAdmin);

export default phoneRouter;