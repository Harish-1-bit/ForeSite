import API from "../../api";

const loginUser = async (user) => {
  console.log(user);
  const response = await API.post("/api/auth/login", user);
  localStorage.setItem("user", JSON.stringify(response.data));
  console.log(response.data);
  return response.data;
};

const registerUser = async (user) => {
  console.log(user);
  const response = await API.post("/api/auth/register", user);
  localStorage.setItem("user", JSON.stringify(response.data));
  console.log(response.data);
  return response.data;
};

const authServices = {
  loginUser,
  registerUser,
};
export default authServices;
