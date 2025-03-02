// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "sweetalert2/dist/sweetalert2.js";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favourates from "./pages/Favourates";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 md:px-10 py-6">
        <Toaster position="top-right" />
        <Router>
          <header>
            <Navbar />
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favourates" element={<Favourates />} />

            <Route
              path="/checkout"
              element={<ProtectedRoute element={CheckoutPage} />}
            />
            <Route
              path="/dashboard"
              element={<AdminRoute element={Dashboard} />}
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <footer>
          <Footer />
        </footer>
      </main>
    </AuthProvider>
  );
}

export default App;
