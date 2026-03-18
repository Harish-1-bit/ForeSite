import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import { Toaster } from "sonner";
import AdminDashboard from "./page/Admin/Admindashboard";
import PropertyManagement from "./page/Admin/PropertyManagement";
import UserManagement from "./page/Admin/UserManagement";
import PrivateComponent from "./components/PrivateComponent";
import SellerDashboard from "./page/seller/sellerDashboard";
import SellerListing from "./page/seller/SellerListing";
import SellerInquiry from "./page/seller/SellerInquiry";
import { AllProperties } from "./page/AllProperties";
import SingleProperty from "./page/SingleProperty";
import { ROICalculator } from "./page/RoiCalculator";
import About from "./page/About";
import Contact from "./page/Contact";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        {/* Admin Routes */}
        <Routes>
          <Route path="/admin" element={<PrivateComponent />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="property-management"
              element={<PropertyManagement />}
            />
            <Route path="user-management" element={<UserManagement />} />
          </Route>

          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/listings" element={<SellerListing />} />
          <Route path="/seller/inquiries" element={<SellerInquiry />} />
          <Route path="/all-properties" element={<AllProperties />} />
          <Route path="/property/:id" element={<SingleProperty />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
