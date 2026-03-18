import axios from "axios"

const getPropertiesCustomer = async () => {
    const response = await axios.get('/api/property')
    console.log(response.data)
    return response.data
}

const getSingleProperty=async(token,pid)=>{
    let option ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(`/api/property/${pid}`,option)
    return response.data
}

const aiResponse = async(token,pid)=>{
    let option ={
            headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(`/api/property/ai-response/${pid}`,option)
    return response.data
}

const calculateRoi = async (token,data) => {
    let option ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(`/api/property/calculate-roi`,data,option)
    return response.data
}

const coutomerService = {
    getPropertiesCustomer,
    getSingleProperty,
    aiResponse,
    calculateRoi
}

export default coutomerService