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

AccessoriesRouter.route("/").get(getAllAccessories).post(createAccessories, isAuthenticated, isAdmin);
AccessoriesRouter
    .route("/:id")
    .get(getAccessoriesById)
    .put(updateAccessories, isAuthenticated, isAdmin)
    .delete(deleteAccessories, isAuthenticated, isAdmin);

export default AccessoriesRouter;