import express from 'express';
import { google, signIn, signUp, userSignout } from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google").post(google);
router.route("/signout").get(userSignout)

export default router;