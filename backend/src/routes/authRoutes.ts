import express from "express";
import * as authController from "../controllers/authControllers";
import { check } from "express-validator";

const authRoutes = express.Router();

//Login
authRoutes.post(
  "/",
  [
    check("username", "username is required").isString(),
    check("Password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],    
  authController.login
);


export default authRoutes;