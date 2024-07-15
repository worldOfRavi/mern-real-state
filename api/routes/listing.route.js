import express from "express";
import { createListing, deleteListing, getListing, updateListing,getListings } from "../controllers/listing.controller.js";
const router = express.Router();
import {verifyUser} from "../utils/verifyUser.js"

router.route("/create").post( verifyUser,createListing);
router.route("/delete/:id").delete( verifyUser,deleteListing);
router.route("/update/:id").post(verifyUser, updateListing)
router.route("/get/:id").get(getListing)
router.route("/get").get(getListings)
export default router;
