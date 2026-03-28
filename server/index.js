import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import connectDb from "./dbconfig/dbConfig.js";
import authRouter from "./routes/authRouter.js";
import errorhandler from "../ErrorHandler/errorHandler.js";
import cookieParser from "cookie-parser";
import propertyRoute from "./routes/propertyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import enquiryRoute from "./routes/enquiryRoute.js";

dotenv.config()
const app = express()
const port = process.env.PORT

connectDb()

app.get('/',(req, res) => {
  res.status(200).json({
    message: "Welcome to Fore Site",
  });
})

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

// Auth Routes
app.use('/api/auth',authRouter)

// Property Routes
app.use('/api/property',propertyRoute)

// Admin Routes
app.use('/api/admin',adminRoutes)

// AI Routes
app.use('/api/ai',aiRoutes)

// Enquiry Routes
app.use('/api/enquiry', enquiryRoute)

app.use(errorhandler)
app.listen(port,()=>{console.log(`Server is running on ${port}`.bgBlue)})