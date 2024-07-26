import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";

export const signUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "Wrong username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong username or password" });
    }
    const token = jwt.sign(
      {
        userInfo: {
          username: user.username,
          userId: user._id,
          userRoles: user.roles,
        },
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_cookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ userInfo: { userId: user._id, userRoles: user.roles } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error 500" });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.cookie("auth_cookie", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "Signed Out Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Error 500" });
  }
};


