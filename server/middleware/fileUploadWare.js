import express from "express";
import multer, { diskStorage } from "multer";
import path from 'path'
import crypto from "crypto";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const fn = crypto.randomUUID()+path.extname(file.originalname)
        cb(null,fn)
    }
})

const upload = multer({storage:storage})

export default upload