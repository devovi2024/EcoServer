import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductByBrand from "./pages/product-by-brand";
import ProductByCategory from "./pages/product-by-category";
import ProductByKeyword from "./pages/product-by-keyword";
import ProductDetails from "./pages/product-details";
import LoginPage from "./pages/login-page";
import OTPPage from "./pages/otp-page";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl font-semibold">
    404 - Page Not Found
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/by-brand/:id" element={<ProductByBrand />} />
        <Route path="/by-category/:id" element={<ProductByCategory />} />
        <Route path="/by-keyword/:keyword" element={<ProductByKeyword />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
