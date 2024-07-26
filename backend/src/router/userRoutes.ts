import express from "express";
import { check } from "express-validator";
import { userDelete, userRegister, userUpdate,getUsers,userSoftDelete } from "../controller/userControllers";
import { verifyToken } from "../middleware/verifyJWT";


const router = express.Router();

router.get('/get-all',verifyToken,getUsers);

router.post(
  "/",
  [
    check("username", "Username is required").isString(),
    check('password',"Password must be at least 6 characters").isLength({min: 6}),
     check("roles", "Roles are required").isArray(),
     check("email","Email is required").isEmail(),
     check("salary","Salary is required").isString()
  ],verifyToken,
  userRegister
);

router.put("/:id", verifyToken, userUpdate);

router.delete('/:id',verifyToken,userSoftDelete);

export default router;
