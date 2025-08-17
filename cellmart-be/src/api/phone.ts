import express from "express";
import {
    createPhone,
    getPhoneById,
    getAllPhone,
    deletePhone,
    updatePhone,
} from "../application/phone";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const phoneRouter = express.Router();

phoneRouter.route("/").get(getAllPhone).post(isAuthenticated, isAdmin ,createPhone);
phoneRouter
    .route("/:id")
    .get(getPhoneById)
    .put(isAuthenticated, isAdmin, updatePhone)
    .delete(isAuthenticated, isAdmin,deletePhone);

export default phoneRouter;