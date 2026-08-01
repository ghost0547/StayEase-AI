import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API_URL from "../config/api";
import {
  HiSparkles,
  HiEnvelope,
  HiLockClosed,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi2";

import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        window.dispatchEvent(new Event("auth-change"));
        notifySuccess("Welcome back!", "Login successful.");
        navigate("/dashboard");
      } else {
        notifyError(data.detail || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      notifyError("Server Error", "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background Animated Orbs */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/15 dark:bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [15, -15, 15],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/15 dark:bg-teal-600/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Grid Container */}
      <div className="relative max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Side: Premium Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden lg:flex flex-col space-y-6 text-left pr-4"
        >
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <HiSparkles className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              StayEase <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">AI</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Welcome Back
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Continue your AI-powered travel journey and access your saved homestays & custom itineraries.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <HiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Tailored AI Travel Recommendations</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <HiCheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
              <span>Instant Itinerary Sync Across Devices</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <HiCheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
              <span>Exclusive Verified Homestay Deals</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Glassmorphism Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-10 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/80">
            
            {/* Card Header */}
            <div className="text-center sm:text-left mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Sign In
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Enter your credentials to access your StayEase AI account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiEnvelope className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email Address"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => notifyWarning("Password Reset", "Password reset feature coming soon.")}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiLockClosed className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Sign in button"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-base shadow-lg shadow-emerald-600/25 active:shadow-none transition-all duration-200 cursor-pointer disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                {!isLoading && <HiArrowRight className="w-4 h-4" />}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold bg-white/80 dark:bg-slate-900/80 px-3">
                Account Access
              </div>
            </div>

            {/* Footer Register Link */}
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                aria-label="Go to registration page"
                className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
