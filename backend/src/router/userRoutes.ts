import express from "express";
import { check } from "express-validator";
import { userRegister } from "../controller/userControllers";

const router = express.Router();

router.post(
  "/",
  [
    check("username", "Username is required").isString(),
    check("password", "Password needs to be at least 6 characters").isLength({
      min: 6,
    }),
    check("roles","Roles are required").isArray(),
  ],
  userRegister
);


export default router;
