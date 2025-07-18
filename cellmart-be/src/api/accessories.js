import express from "express";
import {
    createAccessories,
    getAccessoriesById,
    getAllAccessories,
    deleteAccessories,
    updateAccessories
} from "../application/accessories.js";

const accessoriesRouter = express.Router();

accessoriesRouter.route("/").get(getAllAccessories).post(createAccessories);
accessoriesRouter
    .route("/:id")
    .get(getAccessoriesById)
    .put(updateAccessories)
    .delete(deleteAccessories);

export default accessoriesRouter;