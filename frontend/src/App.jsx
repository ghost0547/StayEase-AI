import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Showcase from "./pages/Showcase";
import ProtectedRoute from "./components/ProtectedRoute";


import Register from "./pages/Register";
import AIPlanner from "./pages/AIPlanner";
import HomestayDetails from "./pages/HomestayDetails";
import { FavoritesProvider } from "./context/FavoritesContext";


function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#111827";
      document.body.style.color = "white";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.style.backgroundColor = "#f3f4f6";
      document.body.style.color = "black";
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ai-planner" element={<AIPlanner />} />
          <Route path="/homestay/:id" element={<HomestayDetails />} />
          <Route path="/homestay" element={<HomestayDetails />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
