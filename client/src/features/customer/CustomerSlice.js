import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customerService from './customerService'

const initialState = {
    allPropertyCustomer: null,
    singleProperty: null,
    aiResponse: null,
    roi: null,
    aiLoading: false,
    customerLoading: false,
    customerError: false,
    customerMessage:''
}

const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    resetAiResponse: (state) => {
      state.aiResponse = null;
      state.aiLoading = false;
      state.customerError = false;
      state.customerMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertiesCustomer.pending, (state) => {
        state.customerLoading = true
        state.customerError = false
        state.customerMessage = ''
      })
      .addCase(getPropertiesCustomer.fulfilled, (state, action) => {
        state.customerLoading = false
        state.allPropertyCustomer = action.payload
      })
      .addCase(getPropertiesCustomer.rejected, (state, action) => {
        state.customerLoading = false
        state.customerError = true
        state.customerMessage = action.payload
      })
      .addCase(getSingleProperty.pending, (state) => {
        state.customerLoading = true
        state.customerError = false
        state.customerMessage = ''
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.customerLoading = false
        state.singleProperty = action.payload
      })
      .addCase(getSingleProperty.rejected, (state, action) => {
        state.customerLoading = false
        state.customerError = true
        state.customerMessage = action.payload
      })
      .addCase(aiResponse.pending, (state) => {
        state.aiLoading = true
        state.customerError = false
        state.customerMessage = ''
      })
      .addCase(aiResponse.fulfilled, (state, action) => {
        state.aiLoading = false
        state.aiResponse = action.payload
      })
      .addCase(aiResponse.rejected, (state, action) => {
        state.aiLoading = false
        state.customerError = true
        state.customerMessage = action.payload
      })
      .addCase(calculateRoi.pending, (state) => {
        state.customerLoading = true
        state.customerError = false
        state.customerMessage = ''
      })
      .addCase(calculateRoi.fulfilled, (state, action) => {
        state.customerLoading = false
        state.roi = action.payload
      })
      .addCase(calculateRoi.rejected, (state, action) => {
        state.customerLoading = false
        state.customerError = true
        state.customerMessage = action.payload
      })
  }
});

export const { resetAiResponse } = CustomerSlice.actions

export default CustomerSlice.reducer

export const getPropertiesCustomer = createAsyncThunk('customer/getPropertiesCustomer', async (_,thunkAPI) => {
    try {
        return await customerService.getPropertiesCustomer()
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getSingleProperty = createAsyncThunk('customer/getSingleProperty', async (pid,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    try {
        return await customerService.getSingleProperty(token,pid)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const aiResponse = createAsyncThunk('customer/aiResponse', async (pid,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    try {
        return await customerService.aiResponse(token,pid)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const calculateRoi = createAsyncThunk('customer/calculateRoi', async (data,thunkAPI) => {
  console.log(data)
    const token = thunkAPI.getState().auth.user.token
    try {
        return await customerService.calculateRoi(token,data)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})