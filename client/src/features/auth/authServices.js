import axios from "axios"

const loginUser = async (user) => {
    console.log(user)
    const response = await axios.post("/api/auth/login", user) 
    localStorage.setItem('user',JSON.stringify(response.data))  
    console.log(response.data)   
    return response.data
}

const registerUser = async (user) => {
    console.log(user)
    const response = await axios.post("/api/auth/register", user) 
    localStorage.setItem('user',JSON.stringify(response.data))  
    console.log(response.data)   
    return response.data
}



const authServices={
    loginUser,
    registerUser,
}
export default authServices