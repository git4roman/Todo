import express from "express";
const router = express.Router();

import {
  loginUser,
  logOut,
  registerUser,
} from "../controllers/authController.js";

router.route("/register").post(registerUser);
router.route("/login").all(loginUser);
router.route("/logOut").post(logOut);

export default router;
