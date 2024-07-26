import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';


export const verifyToken = async(req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies["auth_cookie"];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string);
        req.userInfo = (decoded as JwtPayload).userInfo;
        next();       
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized"});
    }
}
