import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminService from './adminServices'
const initialState = {
    allUser: [],
    allProperties: [],
    adminLoading: false,
    adminError: false,
    adminSuccess: false,
    adminMessage: ""
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.adminLoading = true
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.adminLoading = false
        state.adminSuccess = true
        state.allUser = action.payload
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.adminLoading = false
        state.adminError = true
        state.adminMessage = action.payload
      })
      .addCase(getAllProperties.pending, (state) => {
        state.adminLoading = true
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.adminLoading = false
        state.adminSuccess = true
        state.allProperties = action.payload
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.adminLoading = false
        state.adminError = true
        state.adminMessage = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.adminLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.adminLoading = false
        state.adminSuccess = true
        state.allUser = state.allUser.map((user)=>user._id===action.payload._id?action.payload:user)
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.adminLoading = false
        state.adminError = true
        state.adminMessage = action.payload
      })
      
  }
});

export const {} = adminSlice.actions

export default adminSlice.reducer


export const getAllUser = createAsyncThunk("admin/getAllUser", async (_,thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.getAllUser(token);

    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllProperties = createAsyncThunk("admin/getAllProperties", async (_,thunkAPI) => {
    try {
        return await adminService.getAllProperties();
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk("admin/updateUser", async (data,thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.updateUser(token,data);
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})
