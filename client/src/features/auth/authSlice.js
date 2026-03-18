import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authServices from './authServices';
const userExist = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user:userExist || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
    })
    .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
    })
  }
});

export const {} = authSlice.actions

export default authSlice.reducer

export const loginUser = createAsyncThunk("auth/login", async (user,thunkAPI) => {
    try {
        return await authServices.loginUser(user)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const registerUser = createAsyncThunk("auth/register", async (user,thunkAPI) => {
    try {
        return await authServices.registerUser(user)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const logoutUser = createAsyncThunk("auth/logout", async () => {
        localStorage.removeItem('user')
})
    