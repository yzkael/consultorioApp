import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import medicoRoutes from "./routes/medicoRoutes";
import authRoutes from "./routes/authRoutes";
const app = express();
dotenv.config();

//middlewares
app.use(express.json());

//Routes

app.use('/api/medicos', medicoRoutes); //TODO
app.use('/api/auth',authRoutes)


//DB connection
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => {
    console.log("Working on port: ", 3000);
  });
});
