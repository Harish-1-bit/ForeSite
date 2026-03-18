
import Enquiry from "../model/enquiryModel.js";
import Property from "../model/propertiesModel.js"; // Import Property model to validate property existence

// Create a new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { property, message } = req.body;
    const buyer = req.user.id; // Assuming user ID is available in req.user from auth middleware

    // Validate input
    if (!property || !message) {
      return res.status(400).json({ success: false, message: "Property ID and message are required." });
    }

    // Check if property exists
    const propertyExists = await Property.findById(property);
    if (!propertyExists) {
        return res.status(404).json({ success: false, message: "Property not found." });
    }
    
    // Check if enquiry already exists
    const existingEnquiry = await Enquiry.findOne({ property, buyer });
    if (existingEnquiry) {
        return res.status(400).json({ success: false, message: "You have already enquired about this property." });
    }

    const newEnquiry = new Enquiry({
      property,
      buyer,
      message
    });
    await newEnquiry.populate("property");
    await newEnquiry.populate("property.owner");
    await newEnquiry.populate("buyer");
    await newEnquiry.save();

    res.status(201).json(newEnquiry);
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(400)
    throw new Error("Failed to create enquiry");
  }
};

// Get all enquiries (for admin or seeing all enquiries)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate({
        path: "property",
        populate: {
          path: "owner",
        },
      }) // Populate property details and its owner
      .populate("buyer") // Populate buyer details
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Update enquiry status
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ success: false, message: "Status is required." });
    }

    // specific check for allowed status values based on schema enum, although mongoose validation handles it too
    const allowedStatuses = ["pending", "responded", "closed"];
    if (!allowedStatuses.includes(status)) {
         return res.status(400).json({ success: false, message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}` });
    }


    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }
    await enquiry.populate("property");
    await enquiry.populate("buyer");

    res.status(200).json(enquiry);
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500)
    throw new Error("Failed to update enquiry");
}
}
