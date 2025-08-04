import express from "express";
import {
    createAccessories,
    getAccessoriesById,
    getAllAccessories,
    deleteAccessories,
    updateAccessories
} from "../application/accessories";
import { isAuthenticated } from "./middleware/authentication-middleware";

const AccessoriesRouter = express.Router();

AccessoriesRouter.route("/").get(getAllAccessories).post(createAccessories, isAuthenticated);
AccessoriesRouter
    .route("/:id")
    .get(getAccessoriesById)
    .put(updateAccessories)
    .delete(deleteAccessories);

export default AccessoriesRouter;