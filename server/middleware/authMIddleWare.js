import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authUser =async (req,res,next)=>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            let token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECERT)
            const user = await User.findById(decoded.id).select('-password')
            if (!user) {
        res.status(400);
        throw new Error("You are not Authorised");
      }
      
      req.user = user;
      next();
        }else{
            res.status(400)
            throw new Error("You are not authorized")
        }
    } catch (error) {
    res.status(400);
    throw new Error("You are not Authorized");
    }
}

export const adminUser = async (req,res,next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            let token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECERT)
            const user = await User.findById(decoded.id).select('-password')
            if(user.role!=='admin'){
                res.status(409)
                throw new Error('You Are not a Admin')
            }
            req.user=user
            next()
        }else{
            res.status(400)
            throw new Error("You are Authorized")
        }
    } catch (error) {
        res.status(400)
        throw new Error("You are not Authorized")
    }
}