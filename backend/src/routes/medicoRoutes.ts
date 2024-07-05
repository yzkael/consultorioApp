import express from "express";
import { createMedico } from "../controllers/medicoControllers";
import { check, validationResult } from "express-validator";

const medicoRoutes = express.Router();

medicoRoutes.post(
  "/register",
  [
    check("username", "Username is required").isString(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6,
    }),
    check()
  ],
  createMedico
);

export default medicoRoutes;
