import { configureStore } from "@reduxjs/toolkit";
import auth from './auth/authSlice.js'
import admin from './admin/adminSlice.js'
import seller from './seller/SellerSlice.js'
import customer from './customer/CustomerSlice.js'
const store = configureStore({
    reducer:{auth,admin,seller,customer}
})

export default store