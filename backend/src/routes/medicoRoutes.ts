import express from "express";
import { createMedico } from "../controllers/medicoControllers";
import { check, validationResult } from "express-validator";

const medicoRoutes = express.Router();

medicoRoutes.post(
  "/register",
  [
    check("username", "Username is required").isString(),
    check("password", "Password must have at least 6 characters").isLength({ min: 6 }),
    check("email", "Email is required").isEmail(),
    check("nombre", "A Nombre is required").isString(),
    check("apellido", "An Apellido is required").isString(),
    check("especialidad", "At least one especialidad is required").isArray()
  ],
  createMedico
);

export default medicoRoutes;
