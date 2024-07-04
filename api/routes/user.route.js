import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.route("/update/:id").post(verifyUser, updateUser);

export default router;