import express from "express";
import {
    createAccessories,
    getAccessoriesById,
    getAllAccessories,
    deleteAccessories,
    updateAccessories
} from "../application/accessories";

const AccessoriesRouter = express.Router();

AccessoriesRouter.route("/").get(getAllAccessories).post(createAccessories);
AccessoriesRouter
    .route("/:id")
    .get(getAccessoriesById)
    .put(updateAccessories)
    .delete(deleteAccessories);

export default AccessoriesRouter;