import mongoose from "mongoose"

const priceChangeSchema = mongoose.Schema({
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        index:true
    }
},{timestamps:true})

const PriceChange = mongoose.model('PriceChange',priceChangeSchema)

export default PriceChange