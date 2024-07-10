import express from "express";
import { createListing } from "../controllers/listing.controller.js";
const router = express.Router();
import {verifyUser} from "../utils/verifyUser.js"

router.route("/create").post( verifyUser,createListing);

export default router;
