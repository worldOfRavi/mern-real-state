import express from "express";
import { createListing, deleteListing } from "../controllers/listing.controller.js";
const router = express.Router();
import {verifyUser} from "../utils/verifyUser.js"

router.route("/create").post( verifyUser,createListing);
router.route("/delete/:id").delete( verifyUser,deleteListing);

export default router;
