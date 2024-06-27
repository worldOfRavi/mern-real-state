import express from 'express';
const router = express.Router();
import {signUp} from "../controllers/auth.controller.js";

router.route("/").get(signUp);

export default router;