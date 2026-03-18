import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from 'node:fs'
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECERT
})


const uploadToCloundinary = async (filelink) => {
    try {
        let response = await cloudinary.uploader.upload(filelink,{resource_type:'auto'})
        return response
    } catch (error) {
        console.log(error.message)
        fs.unlinkSync(filelink)
    }
}

export default uploadToCloundinary