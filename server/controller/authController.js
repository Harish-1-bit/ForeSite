import jwt from "jsonwebtoken"
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { OpenRouter } from '@openrouter/sdk';

const registerUser = async (req,res) => {
    const {name,email,phone,password}=req.body
    if(!name || !email || !phone || !password){
        res.status(400)
        throw new Error('please Enter all details')
    }
    if(phone.length !==10){
        res.status(400)
        throw new Error('Enter 10 Digit Phone Number')
    }

    const emailExist = await User.findOne({email})
    const phoneExist = await User.findOne({phone})
    if(emailExist || phoneExist){
        res.status(409)
        throw new Error(emailExist ? "Email Already Exist":"Phone Number Already exist")
    }

    const hashedPassword = bcrypt.hashSync(password,10)
    const user = await User.create({
        name,email,phone,password:hashedPassword
    })
    if(!user){
        res.status(409)
        throw new Error('User is counld not be created')
    }
    let token = jwt.sign({id:user._id},process.env.JWT_SECERT)
    res.cookie('token',token)


    res.status(201).json({
        name:user.name,
        email:user.email,
        phone:user.phone,
        token
    })
    
}

const loginUser = async (req,res) => {
    const {email,password}=req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Please Enter all details")
    }
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("Invalid Credentails")
    }
    let token = jwt.sign({id:user._id},process.env.JWT_SECERT,{expiresIn:'10d'})
    res.cookie('token',token)
    if(user &&  bcrypt.compare(password,user.password)){
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role,
            token
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentails")
    }
}

const updateUser = async (req,res) => {
    const {uid} = req.params
    if(req.body.role || req.body.isActive){
        res.status(400)
        throw new Error("This can not be updated")
    }
    const updatedUser = await User.findByIdAndUpdate(uid,req.body,{new:true})
    if(!updatedUser){
        res.status(409)
        throw new Error("User could not be updated")
    }
    res.status(200).json(updatedUser)
}

const authController = {registerUser,loginUser,updateUser}

export default authController