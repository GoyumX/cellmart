import "dotenv/config";
import express from "express";
import connectDB from "./infastructure/db.js";

import PhoneRouter from "./api/phone.js";
import AccessoriesRouter from "./api/accessories.js";


const app = express();

app.use(express.json());

connectDB();

app.use("/api/phones", PhoneRouter);
app.use("/api/accessories", AccessoriesRouter);

const PORT = 8000;
app.listen(PORT, console.log(`Server is running on port ${PORT}...`));