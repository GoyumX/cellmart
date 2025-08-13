import express from "express";
import {
    createAccessories,
    getAccessoriesById,
    getAllAccessories,
    deleteAccessories,
    updateAccessories
} from "../application/accessories";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const AccessoriesRouter = express.Router();

AccessoriesRouter.route("/").get(getAllAccessories).post(isAuthenticated, isAdmin, createAccessories);
AccessoriesRouter
    .route("/:id")
    .get(getAccessoriesById)
    .put(isAuthenticated, isAdmin, updateAccessories)
    .delete(isAuthenticated, isAdmin, deleteAccessories);

export default AccessoriesRouter;