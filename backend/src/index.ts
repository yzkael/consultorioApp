import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './router/userRoutes';
import authRoutes from './router/authRoutes';




dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());


//routes

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);





//Connection

mongoose.connect(process.env.MONGODB_URI as string).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(port,()=>{
        console.log("Connected to port: ",port);
    })
})

