import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkeletonAIPlanner } from "../components/ui/Skeleton";
import AIItineraryViewer from "../components/AIItineraryViewer";
import {
  HiSparkles,
  HiMapPin,
  HiCalendar,
  HiCurrencyRupee,
  HiArrowRight,
  HiExclamationTriangle,
} from "react-icons/hi2";

function AIPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setItinerary("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ai/itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            days: Number(days),
            budget: Number(budget),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      setItinerary(data.itinerary);
    } catch (err) {
      setError("Failed to generate itinerary");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setItinerary("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Animated Glow Orbs */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 dark:bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [15, -15, 15],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-teal-500/15 dark:bg-teal-600/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        
        {/* 1. Hero Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs sm:text-sm font-semibold">
            <HiSparkles className="w-4 h-4 text-emerald-600" />
            <span>✨ AI Travel Planner</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Design Your <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 bg-clip-text text-transparent">Dream Trip</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-normal leading-relaxed">
            Generate personalized travel itineraries powered by AI tailored to your duration and budget.
          </p>
        </div>

        {/* 2. Planner Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-10 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/80 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Input 1: Destination */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
                <HiMapPin className="w-4 h-4 text-emerald-500" />
                <span>Destination</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Bali, Indonesia"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  aria-label="Destination location"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Input 2: Days */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
                <HiCalendar className="w-4 h-4 text-teal-500" />
                <span>Number of Days</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  aria-label="Number of trip days"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Input 3: Budget */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
                <HiCurrencyRupee className="w-4 h-4 text-sky-500" />
                <span>Budget (₹)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 25000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  aria-label="Total trip budget in Rupees"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading || !destination || !days || !budget}
            aria-label="Generate AI Itinerary"
            className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-600/25 disabled:opacity-60 transition-all duration-200 cursor-pointer"
          >
            <HiSparkles className="w-5 h-5" />
            <span>{loading ? "Generating your AI itinerary..." : "Generate Itinerary"}</span>
            {!loading && <HiArrowRight className="w-5 h-5" />}
          </motion.button>
        </motion.div>

        {/* 3. Error Card */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center gap-3 font-medium text-sm shadow-sm"
            >
              <HiExclamationTriangle className="w-6 h-6 shrink-0 text-rose-500" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Skeleton AI Planner Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-2 text-center text-sm font-bold text-cyan-600 dark:text-cyan-400 py-2">
                <HiSparkles className="w-5 h-5 animate-pulse text-cyan-400" />
                <span>Generating your AI itinerary...</span>
              </div>
              <SkeletonAIPlanner />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Redesigned Premium AI Itinerary Result Dashboard */}
        <AnimatePresence>
          {itinerary && !loading && (
            <AIItineraryViewer
              rawItinerary={itinerary}
              destination={destination || "Selected Destination"}
              daysCount={days || "5"}
              budgetAmount={budget || "25000"}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default AIPlanner;