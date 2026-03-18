import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import sellerServices from './SellerServices'
const initialState = {
    sellerLoading:false,
    sellerError:false,
    sellerMessage:'',
    allProperties:[],
    allInquiry:[],
    Edit:{
        isEdit:false,
        propertyData:null
    }
    
}

const SellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    editProperty:(state,action)=>{
       return{
        ...state,
        Edit:{
            isEdit:true,
            propertyData:action.payload
        }
       }
    },
    
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllsellerProperties.pending,(state)=>{
        state.sellerLoading = true
        state.sellerError = false

    })
    builder.addCase(getAllsellerProperties.fulfilled,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = false
        state.allProperties = action.payload
    })
    builder.addCase(getAllsellerProperties.rejected,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = true
        state.sellerMessage = action.payload
    })
    builder.addCase(getAllInquiry.pending,(state)=>{
        state.sellerLoading = true
        state.sellerError = false
    })
    builder.addCase(getAllInquiry.fulfilled,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = false
        state.allInquiry = action.payload
    })
    builder.addCase(getAllInquiry.rejected,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = true
        state.sellerMessage = action.payload
    })
    builder.addCase(addProperty.pending,(state)=>{
        state.sellerLoading = true
        state.sellerError = false
    })
    builder.addCase(addProperty.fulfilled,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = false
        state.allProperties = [action.payload,...state.allProperties]
    })
    builder.addCase(addProperty.rejected,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = true
        state.sellerMessage = action.payload
    })
    builder.addCase(updateProperty.pending,(state)=>{
        state.sellerLoading = true
        state.sellerError = false
    })
    builder.addCase(updateProperty.fulfilled,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = false
        state.allProperties = state.allProperties.map((property)=>property._id===action.payload._id?action.payload:property)
    })
    builder.addCase(updateProperty.rejected,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = true
        state.sellerMessage = action.payload
    })
    builder.addCase(updateEnquiry.pending,(state)=>{
        state.sellerLoading = true
        state.sellerError = false
    })
    builder.addCase(updateEnquiry.fulfilled,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = false
        state.allInquiry = state.allInquiry.map((inquiry)=>inquiry._id===action.payload._id?action.payload:inquiry)
    })
    builder.addCase(updateEnquiry.rejected,(state,action)=>{
        state.sellerLoading = false
        state.sellerError = true
        state.sellerMessage = action.payload
    })
  }
});

export const {editProperty} = SellerSlice.actions

export default SellerSlice.reducer  

export const getAllsellerProperties = createAsyncThunk("seller/getAllsellerProperties",async (_,thunkAPI)=>{
  let token = thunkAPI.getState().auth.user.token
    try {
        return await sellerServices.getAllsellerProperties(token)
    } catch (error) {
      let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllInquiry = createAsyncThunk("seller/getAllInquiry",async (_,thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token
      try {
          return await sellerServices.getAllInquiry(token)
      } catch (error) {
        let message = error.response.data.message
          return thunkAPI.rejectWithValue(message)
      }
  })

  export const addProperty = createAsyncThunk("seller/addProperty",async (propertyData,thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token
      try {
          return await sellerServices.addProperty(token,propertyData)
      } catch (error) {
        let message = error.response.data.message
          return thunkAPI.rejectWithValue(message)
      }
  })    

  export const updateProperty = createAsyncThunk("seller/updateProperty",async ({id,data},thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token
      try {
          return await sellerServices.updateProperty(token,id,data)
      } catch (error) {
        let message = error.response.data.message
          return thunkAPI.rejectWithValue(message)
      }
  })    

export const updateEnquiry = createAsyncThunk("seller/updateEnquiry",async (enquiry,thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token
      try {
          return await sellerServices.updateEnquiry(token,enquiry)
      } catch (error) {
        let message = error.response.data.message
          return thunkAPI.rejectWithValue(message)
      }
  })    