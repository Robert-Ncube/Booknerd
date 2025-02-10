import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
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
        </Routes>
      </Router>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}

export default App;
