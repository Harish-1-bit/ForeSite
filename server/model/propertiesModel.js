import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    propertyType:{
        type:String,
        required:true
    },
    configuration:{
        type:String,
        required:true
    },
    sqFeet:{
        type:Number,
        required:true
    },
    yearBuilt:{
        type:Number,
        required:true
    },
    amenities:[String],
    propertyImage:[{
        type:String,
        required:true
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isActive:{
        type:Boolean,
        default:true
    }


},{timestamps:true})

const Property = mongoose.model('Property',propertySchema)


export default Property