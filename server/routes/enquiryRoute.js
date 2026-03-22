import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiry,
  getMyEnquiries,
} from "../controller/enquiryController.js";
import { authUser, adminUser } from "../middleware/authMIddleWare.js";

const router = express.Router();

// Get enquiries for the currently logged-in buyer
router.get("/my", authUser, getMyEnquiries);

// Create a new enquiry (requires authentication)
router.post("/create", authUser, createEnquiry);

// Get all enquiries (requires admin authentication)
router.get("/all", authUser, getAllEnquiries);

// Update enquiry status (requires admin authentication)
router.put("/update/:id", authUser, updateEnquiry);

export default router;
