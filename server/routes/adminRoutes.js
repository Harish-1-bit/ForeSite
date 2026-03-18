import express from "express";
import { adminUser, authUser } from "../middleware/authMIddleWare.js";
import adminController from "../controller/adminController.js";

const router = express.Router()

// Get All Users
router.get('/',authUser,adminController.getAllUsers)

// Update User
router.put('/:uid',authUser,adminController.updateUser)


export default router