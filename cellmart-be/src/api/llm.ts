import express from "express";
import {
    generateResponse
} from "../application/phone";
import { createEmbeddings } from "../application/embedding";
import { retrieve } from "../application/retrieve";

const llmRouter = express.Router();

llmRouter.route("/chat").post(generateResponse);
llmRouter.route("/embeddings/create").post(createEmbeddings);
llmRouter.route("/search/retrieve").post(retrieve);

export default llmRouter;