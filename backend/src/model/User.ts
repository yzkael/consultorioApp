import mongoose from "mongoose";

export interface UserType {
  username: string;
  password: string;
  salary: number;
  roles: string[];
  email: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;  // Add createdAt
  updatedAt: Date;  // Add updatedAt
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    salary: {type: Number, required: true},
    roles: { type: [String], required: true, default: ["client"] },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true },
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType & mongoose.Document>("user", userSchema);

export default User;
