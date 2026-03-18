import axios from "axios"

const getAllsellerProperties = async (token) => {
    let option={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
        const response = await axios.get('/api/property/seller/property',option)
        return response.data
}

const getAllInquiry = async (token) => {
    let option={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
        const response = await axios.get('/api/enquiry/all',option)
        return response.data
}

const addProperty = async (token,propertyData) => {
    let option={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log(propertyData)
        const response = await axios.post('/api/property',propertyData,option)
        return response.data
}

const updateProperty=async(token,id,propertyData)=>{
    let option={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log(propertyData)
        const response = await axios.put(`/api/property/${id}`,propertyData,option)
        console.log(response.data)
        return response.data
}

const updateEnquiry = async (token,enquiry) => {
    let option={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log(enquiry)
    const response = await axios.put("/api/enquiry/update/" + enquiry._id, enquiry,option) 
    return response.data
}

const sellerServices = {getAllsellerProperties,getAllInquiry,addProperty,updateProperty,updateEnquiry}

export default sellerServices