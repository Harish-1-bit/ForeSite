import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['customer','seller','admin'],
        default:'customer',
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const User = mongoose.model('User',userScheme)

export default User