import express from "express";
import {
    createPhone,
    getPhoneById,
    getAllPhone,
    deletePhone,
    updatePhone,
    generateResponse
} from "../application/phone";
import { createEmbeddings } from "../application/embedding";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const phoneRouter = express.Router();

phoneRouter.route("/").get(getAllPhone).post(isAuthenticated, isAdmin ,createPhone);
phoneRouter
    .route("/:id")
    .get(getPhoneById)
    .put(isAuthenticated, isAdmin, updatePhone)
    .delete(isAuthenticated, isAdmin,deletePhone);
phoneRouter.route("/llm").post(generateResponse);
phoneRouter.route("/embeddings/create").post(createEmbeddings)

export default phoneRouter;