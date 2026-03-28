import axios from "axios";

const getAllUser = async (token) => {
  let option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin", option);
  return response.data;
};

const getAllProperties = async () => {
  const response = await axios.get("/api/property");
  return response.data;
};

const updateUser = async (token, data) => {
  let option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(data.id);
  const response = await axios.put(`/api/admin/${data.id}`, data, option);
  console.log(response.data);
  return response.data;
};

const adminService = {
  getAllUser,
  getAllProperties,
  updateUser,
};

export default adminService;
