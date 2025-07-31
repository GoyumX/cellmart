import "dotenv/config";
import express from "express";
import connectDB from "./infastructure/db";

import cors from "cors";

import PhoneRouter from "./api/phone";
import AccessoriesRouter from "./api/accessories";
import ReservationRouter from "./api/reservation";

import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware());
app.use(express.json());

connectDB();

app.use(cors());

app.use("/api/phones", PhoneRouter);
app.use("/api/accessories", AccessoriesRouter);
app.use("/api/reservation", ReservationRouter);

const PORT = 8000;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}...`));