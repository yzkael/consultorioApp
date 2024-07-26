import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { UserType } from "../model/User";

declare global {
  namespace Express {
    interface Request {
      userInfo: {
        userId: string;
        userRoles: string[];
        username: string;
      };
    }
  }
}

export const userRegister = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {

    const { username, password, roles, email, salary  } = req.body;
    const isMatch = await User.findOne({
      username: username,
    });
    if (isMatch) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      roles,
      email,
      salary: Number(salary),
      createdBy: req.userInfo.username,
    });
    await newUser.save();

    res.status(200).json({ message: "User registered succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

export const userUpdate = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  if (!req.userInfo.userRoles.includes("admin")) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  try {
    const userUpdate: UserType = req.body;
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      userUpdate,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Error 500" });
  }
};

export const userDelete = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Error 500" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isActive: true });

    // Manually filter out fields and format data
    const filteredUsers = users.map((user) => ({
      userId: user._id,
      username: user.username,
      salary: user.salary,
      roles: user.roles,
      email: user.email,
      createdBy: user.createdBy,
      createdAt: user.createdAt,
    }));

    if (!filteredUsers || filteredUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error 500" });
  }
};


//Soft Delete

export const userSoftDelete = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Error 500" });
  }
};