import API from "../../api";

const getPropertiesCustomer = async () => {
  const response = await API.get("/api/property");
  return response.data;
};

const getSingleProperty = async (token, pid) => {
  const response = await API.get(`/api/property/${pid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const aiResponse = async (token, pid) => {
  const response = await API.get(`/api/property/ai-response/${pid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const calculateRoi = async (token, data) => {
  const response = await API.post(`/api/property/calculate-roi`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getMyEnquiries = async (token) => {
  const response = await API.get("/api/enquiry/my", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createEnquiry = async (token, data) => {
  const response = await API.post("/api/enquiry/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const customerService = {
  getPropertiesCustomer,
  getSingleProperty,
  aiResponse,
  calculateRoi,
  getMyEnquiries,
  createEnquiry,
};

export default customerService;
