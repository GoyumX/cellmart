import express from "express";
import { retrieve } from "../application/retrieve";

const llmRouter = express.Router();

llmRouter.route("/search/retrieve").post(retrieve);

export default llmRouter;