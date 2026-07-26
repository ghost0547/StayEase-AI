import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuCompass,
  LuMapPin,
  LuSparkles,
  LuArrowLeft,
} from "react-icons/lu";
import { HiCheckCircle } from "react-icons/hi2";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const featureChips = [
    "AI Itineraries",
    "Verified Homestays",
    "Secure Login",
    "Favorites",
  ];

  return (
    <div className="min-h-[85vh] w-full bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 text-slate-900 dark:text-white relative overflow-hidden flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glow orbs */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [15, -15, 15],
          scale: [1.05, 1, 1.05],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-2xl w-full mx-auto relative z-10 text-center space-y-8">
        {/* Main Glassmorphism Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl shadow-cyan-500/10 space-y-8 hover:border-cyan-500/30 transition-all duration-300"
        >
          {/* AI / Travel Themed Lucide Graphic Illustration */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-teal-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-3xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/20">
              <LuCompass className="w-12 h-12 text-cyan-400 animate-[spin_10s_linear_infinite]" />
              <LuMapPin className="w-5 h-5 text-emerald-400 absolute top-2.5 right-2.5" />
              <LuSparkles className="w-4 h-4 text-amber-400 absolute bottom-2.5 left-2.5" />
            </div>
          </div>

          {/* 404 Large Gradient Heading */}
          <div className="space-y-2">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent tracking-tighter leading-none">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Oops! Looks like you've wandered off the map.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-lg mx-auto leading-relaxed">
              The page you're looking for doesn't exist or may have been moved. Let's help you get back to your next adventure.
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Primary Action Button: Back Home */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
              <Link
                to="/"
                aria-label="Navigate to Home Page"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-lg shadow-cyan-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              >
                <span>🏠 Back Home</span>
              </Link>
            </motion.div>

            {/* Secondary Action Button: AI Planner */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
              <Link
                to="/ai-planner"
                aria-label="Navigate to AI Planner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-cyan-300 font-bold text-base backdrop-blur-md shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              >
                <span>🤖 AI Planner</span>
              </Link>
            </motion.div>
          </div>

          {/* Tertiary Text Link: Go Back */}
          <div className="pt-1">
            <button
              onClick={handleGoBack}
              aria-label="Go back to previous page"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30 rounded-md"
            >
              <LuArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Extra Feature Chips */}
          <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-3">
            {featureChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
              >
                <HiCheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{chip}</span>
              </span>
            ))}
          </div>

          {/* Tiny Footer Note */}
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Error Code: 404 • StayEase AI couldn't find your destination.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
