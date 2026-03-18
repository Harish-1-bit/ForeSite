import express from "express";
import authController from "../controller/authController.js";

const router = express.Router()

router.post('/login',authController.loginUser)
router.post('/register',authController.registerUser)
router.put('/user/:uid',authController.updateUser)


export default router