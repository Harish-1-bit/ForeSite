import uploadToCloundinary from "../middleware/cloudinaryMiddleware.js";
import Property from "../model/propertiesModel.js";
import fs from "node:fs";
import PriceChange from "../model/priceChangeModel.js";
import { aiResponse, roiCalculation } from "../middleware/aiOpenSource.js";

const getAllProperty = async (req, res) => {
  const property = await Property.find().populate("owner");
  if (!property) {
    res.status(404);
    throw new Error("No Property found");
  }
  res.status(200).json(property);
};

const getSingleProperty = async (req, res) => {
  const pid = req.params.pid;
  const property = await Property.findById(pid).populate("owner");
  if (!property) {
    res.status(404);
    throw new Error("No Property found");
  }
  let priceChange = await PriceChange.find({ property: pid });
  if (priceChange.length === 0) {
    priceChange = 0;
  }

  res.status(200).json({
    property,
    priceChange,
  });
};

const getSellerProperties = async (req, res) => {
  const userId = req.user._id;
  const property = await Property.find({ owner: userId }).populate("owner");
  if (!property || property.length === 0) {
    res.status(404);
    throw new Error("No Property found");
  }
  res.status(200).json(property);
};

const aiResponseSingleProperty = async (req, res) => {
  const pid = req.params.pid;
  const property = await Property.findById(pid).populate("owner");
  const priceChange = await PriceChange.findById(property._id);
  console.log(priceChange);
  const result = await aiResponse({ property, priceChange });
  if (!result) {
    res.status(404);
    throw new Error("No Response from AI");
  }
  res.status(200).json(result);
};

const addProperty = async (req, res) => {
  const {
    title,
    address,
    city,
    state,
    zipcode,
    description,
    price,
    propertyType,
    configuration,
    sqFeet,
    yearBuilt,
    amenities,
    propertyImage,
  } = req.body;
  if (
    !title ||
    !address ||
    !city ||
    !state ||
    !zipcode ||
    !description ||
    !price ||
    !propertyType ||
    !configuration ||
    !sqFeet ||
    !yearBuilt ||
    !amenities
  ) {
    res.status(400);
    throw new Error("Please Enter All Details");
  }

  // Fix: If amenities is a string (from FormData), split it into an array
  let processedAmenities = amenities;
  if (typeof amenities === "string") {
    processedAmenities = amenities.split(",");
  }

  let imageUrls = [];
  console.log(req);
  for (const file of req.files) {
    const result = await uploadToCloundinary(file.path);
    imageUrls.push(result.secure_url);
    fs.unlinkSync(file.path);
  }
  const userId = req.user._id;
  const property = new Property({
    title,
    address,
    city,
    state,
    zipcode,
    description,
    price,
    propertyType,
    configuration,
    sqFeet,
    yearBuilt,
    yearBuilt,
    amenities: processedAmenities,
    propertyImage: imageUrls,
    owner: userId,
  });
  await property.save();
  await property.populate("owner");
  if (!property) {
    res.status(409);
    throw new Error("Property Could not be created");
  }
  res.status(201).json(property);
};

const updateProperty = async (req, res) => {
  const pid = req.params.pid;

  // Fix: Handle amenities splitting for update as well
  if (req.body.amenities && typeof req.body.amenities === "string") {
    req.body.amenities = req.body.amenities.split(",");
  }

  let imageUrls = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadToCloundinary(file.path);
      imageUrls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }
  }

  // Prevent mass-assignment vulnerability
  const safeBody = { ...req.body };
  delete safeBody.owner;
  delete safeBody._id;

  if (imageUrls.length > 0) {
    safeBody.propertyImage = imageUrls;
  } else {
    // Do not overwrite images if none are uploaded
    delete safeBody.propertyImage;
  }

  const property = await Property.findByIdAndUpdate(pid, safeBody, {
    new: true,
  }).populate("owner");
  if (req.body.price) {
    const priceChange = await PriceChange.create({
      property: property._id,
      price: req.body.price,
    });
  }
  res.status(200).json(property);
};

const getPriceHistory = async (req, res) => {
  const { pid } = req.params;
  const priceChange = await PriceChange.find({ property: pid }).populate(
    "property",
  ).populate;
  if (priceChange.length === 0) {
    res.status(404);
    throw new Error("Property not found");
  }
  res.json(priceChange);
};

const calculateRoi = async (req, res) => {
  const { propertyPrice, location, holdingYears, maintainCost } = req.body;
  if (!propertyPrice || isNaN(propertyPrice) || !holdingYears || isNaN(holdingYears) || !location) {
    res.status(400);
    throw new Error(
      "Please Enter valid required details (Number for Property Price and Holding Years, String for Location)",
    );
  }

  // Clean empty strings so that ?? falls back to "Not provided" in aiOpenSource
  const cleanBody = {};
  for (const key in req.body) {
    if (req.body[key] !== "") {
      cleanBody[key] = req.body[key];
    }
  }

  const roi = await roiCalculation({
    propertyPrice,
    location,
    maintainCost,
    holdingYears,
    ...cleanBody,
  });
  if (roi.error) {
    res.status(429);
    throw new Error(roi.message);
  }
  res.status(200).json(roi);
};

const propertyController = {
  getAllProperty,
  getSingleProperty,
  addProperty,
  updateProperty,
  getPriceHistory,
  calculateRoi,
  aiResponseSingleProperty,
  getSellerProperties,
};

export default propertyController;
