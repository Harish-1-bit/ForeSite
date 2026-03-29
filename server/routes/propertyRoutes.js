import express from "express";
import propertyController from "../controller/propertyController.js";
import upload from "../middleware/fileUploadWare.js";
import { authUser } from "../middleware/authMIddleWare.js";

const router = express.Router()

// Get All Property
router.get('/',propertyController.getAllProperty)

// Get Single Property
router.get('/:pid',propertyController.getSingleProperty)

// Get Seller Properties
router.get('/seller/property',authUser,propertyController.getSellerProperties)

// Get AI Response for Single Property
router.get('/ai-response/:pid',propertyController.aiResponseSingleProperty)

// Post Property
router.post('/',authUser,upload.array('propertyImage',5),propertyController.addProperty)

// Update Property
router.put('/:pid',authUser,upload.array('propertyImage',5),propertyController.updateProperty)

// Update price
router.get('/price-history/:pid',authUser,propertyController.getPriceHistory)

// Calculate ROI
router.post('/calculate-roi',propertyController.calculateRoi)

export default router