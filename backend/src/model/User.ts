import mongoose from "mongoose";

export interface UserType {
  username: string;
  password: string;
  roles: string[];
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  roles: { type: [String], required: true, default: ["client"] }
});

const User = mongoose.model<UserType & mongoose.Document>("user", userSchema);

export default User;
