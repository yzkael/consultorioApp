import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Medico from "../models/medicoModel";
import { validationResult } from "express-validator";

export const createMedico = async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Invalid Data"});
    }
    try {
        let newMedico = await Medico.findOne({
            email: req.body.email,
            username: req.body.username
        })
        if (newMedico) {
            return res.status(400).json({message: "El correo electronico o usuario no esta disponible"});
        }
       const hashedPassword = await bcrypt.hash(req.body.password, 10);

       req.body.password = hashedPassword;

       newMedico = new Medico(req.body);
       await newMedico.save();
        res.status(200).json({message:"User Created Succesfully"})
    } catch (error) {   
        console.log(error);
        res.status(500).json({message: "Internal Error 500"});
    }
}