import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const userRegister = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const {username, password, roles} = req.body;
    const isMatch = await User.findOne({
      username: username,
    });
    if (isMatch) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({username, password: hashedPassword,roles});
    await newUser.save();

    const token = jwt.sign(
      {
        userInfo: {
          userId: newUser._id,
          userRoles: newUser.roles,
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

    res.status(200).json({message: "User registered succesfully!"});

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error 500"});
  }
};
