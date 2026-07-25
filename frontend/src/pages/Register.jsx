import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiEnvelope,
  HiLockClosed,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi2";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.detail || data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
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
              Create Your Account
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Start planning smarter trips with AI. Unlock customized travel plans and handpicked homestays.
            </p>
          </div>

          {/* 3 Feature Highlights */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <HiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Unlimited AI Itinerary Generation</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <HiCheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
              <span>Save & Bookmark Handpicked Homestays</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <HiCheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
              <span>Personalized Smart Travel Preferences</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Glassmorphism Registration Card */}
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
                Get Started
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Join StayEase AI today to unlock your personal trip assistant
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-5">
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
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                  Password
                </label>
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
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-base shadow-lg shadow-emerald-600/25 active:shadow-none transition-all duration-200 cursor-pointer disabled:opacity-70"
              >
                <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
                {!isLoading && <HiArrowRight className="w-4 h-4" />}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold bg-white/80 dark:bg-slate-900/80 px-3">
                Already Registered?
              </div>
            </div>

            {/* Footer Login Link */}
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;