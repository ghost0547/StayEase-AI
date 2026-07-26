import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SkeletonHero } from "./components/ui/Skeleton";

// Code-split pages for production bundle optimization
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Showcase = lazy(() => import("./pages/Showcase"));
const Register = lazy(() => import("./pages/Register"));
const AIPlanner = lazy(() => import("./pages/AIPlanner"));
const HomestayDetails = lazy(() => import("./pages/HomestayDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <SkeletonHero />
    </div>
  );
}

function App() {
  const [darkMode] = useState(
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

        <Suspense fallback={<LoadingFallback />}>
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
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/homestay/:id" element={<HomestayDetails />} />
            <Route path="/homestay" element={<HomestayDetails />} />
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
