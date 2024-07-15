import express from 'express';
import { deleteUser, getUser, getUserListing, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.route("/update/:id").post(verifyUser, updateUser);
router.route("/delete/:id").delete(verifyUser, deleteUser);
router.route("/listing/:id").get(verifyUser,getUserListing);
router.route("/:id").get(verifyUser,getUser)

export default router;