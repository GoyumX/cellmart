import express from "express";
import {
    generateResponse
} from "../application/phone";
import { createEmbeddings } from "../application/embedding";

const llmRouter = express.Router();

llmRouter.route("/chat").post(generateResponse);
llmRouter.route("/embeddings/create").post(createEmbeddings);

export default llmRouter;