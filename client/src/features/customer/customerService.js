import axios from "axios"

const getPropertiesCustomer = async () => {
    const response = await axios.get('/api/property')
    return response.data
}

const getSingleProperty = async (token, pid) => {
    const response = await axios.get(`/api/property/${pid}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

const aiResponse = async (token, pid) => {
    const response = await axios.get(`/api/property/ai-response/${pid}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

const calculateRoi = async (token, data) => {
    const response = await axios.post(`/api/property/calculate-roi`, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

const getMyEnquiries = async (token) => {
    const response = await axios.get('/api/enquiry/my', {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

const createEnquiry = async (token, data) => {
    const response = await axios.post('/api/enquiry/create', data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

const customerService = {
    getPropertiesCustomer,
    getSingleProperty,
    aiResponse,
    calculateRoi,
    getMyEnquiries,
    createEnquiry
}

export default customerService