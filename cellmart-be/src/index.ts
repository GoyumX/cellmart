import "dotenv/config";
import express from "express";
import connectDB from "./infastructure/db";

import cors from "cors";

import PhoneRouter from "./api/phone";
import AccessoriesRouter from "./api/accessories";

const app = express();

app.use(express.json());

connectDB();

app.use(cors());

app.use("/api/phones", PhoneRouter);
app.use("/api/accessories", AccessoriesRouter);

const PORT = 8000;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}...`));