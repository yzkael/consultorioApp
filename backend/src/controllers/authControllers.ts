import jwt from 'jsonwebtoken';
import Medico from '../models/medicoModel';
import bcrypt from 'bcrypt';
import { Request,Response } from 'express';


export const login = async (req: Request, res: Response) => {
    try {
      const medico = await Medico.findOne({
        username: req.body.username,
      });
  
      if (!medico) {
        return res.status(400).json({ message: "Invalid Password or Username" });
      }
  
      const isMatch = await bcrypt.compare(req.body.password, medico.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Password or Username" });
      }
  
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }
  
      const token = jwt.sign(
        {
          medicoInfo: {
            username: medico.username,
            especialidad: medico.especialidad,
          },
        },
        jwtSecret,
        {
          expiresIn: "1d",
        }
      );
      
      res.cookie("auth_cookie",token,{
        httpOnly: true,
        secure: false, //Becouse of the localhost
        maxAge: 24 * 60 * 60 * 1000
      })

      res.json({token});
      

    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Server error 500" });
    }
  };