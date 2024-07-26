import express,{Request,Response} from "express";
import { check } from "express-validator";
import { signOut, signUp } from "../controller/authControllers";
import { verifyToken } from "../middleware/verifyJWT";

const router = express.Router();

router.post("/login", [
  check("username", "Username is required").isString(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }), signUp
]);

router.post('/logout', signOut);


router.get("/check-user", verifyToken, async (req: Request, res: Response) => {
    res.status(200).json({ userInfo: req.userInfo });
  });



export default router;