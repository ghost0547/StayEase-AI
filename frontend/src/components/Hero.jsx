import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiCheckBadge,
  HiBolt,
  HiMapPin,
  HiCalendar,
  HiMap,
  HiBuildingStorefront,
  HiArrowRight,
} from "react-icons/hi2";

function Hero() {
  // Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      {/* 3-4 Ambient Animated Blurred Gradient Orbs */}
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
        className="absolute -top-24 left-10 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"
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
        className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-teal-400/20 dark:bg-teal-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 left-1/3 w-96 h-96 bg-sky-400/20 dark:bg-sky-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-slate-200/30 dark:bg-slate-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col items-start text-left space-y-6">
            {/* Small Glass Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 border border-emerald-500/30 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-xs"
            >
              <HiSparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>✨ AI-Powered Travel Planning</span>
            </motion.div>

            {/* Large Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]"
            >
              Plan Smarter.{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 bg-clip-text text-transparent">
                Travel Better.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              StayEase AI generates custom day-by-day travel itineraries and connects you with handpicked, verified homestays tailored to your style and budget.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              {/* Primary Gradient Button */}
              <motion.a
                href="#homestays"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-base shadow-lg shadow-emerald-600/25 dark:shadow-emerald-900/40 transition-all duration-200 text-center"
              >
                <span>Explore Homestays</span>
                <HiArrowRight className="w-4 h-4" />
              </motion.a>

              {/* Glass Outlined Button */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/ai-planner"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 font-semibold text-base backdrop-blur-md shadow-xs hover:border-emerald-500/50 transition-all duration-200 w-full sm:w-auto text-center"
                >
                  <HiSparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Try AI Planner</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators Row */}
            <motion.div
              variants={fadeInUp}
              className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5 font-medium">
                <HiSparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>AI Recommendations</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <HiCheckBadge className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Verified Homestays</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <HiBolt className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Instant Itineraries</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract AI / Travel Illustration */}
          <motion.div
            variants={fadeInUp}
            className="relative flex items-center justify-center w-full"
          >
            {/* Gentle floating motion container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-lg"
            >
              {/* Main Background Glass Card */}
              <div className="relative rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-white/60 dark:border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/80 space-y-6">
                
                {/* Header inside Card */}
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <HiMap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        AI Trip Preview
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Bali 5-Day Retreat
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    98% Match
                  </span>
                </div>

                {/* Abstract Itinerary Timeline Blocks */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold">
                        D1
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                          Ubud Rainforest Villa
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <HiMapPin className="w-3 h-3 text-emerald-500" /> Private Pool & Breakfast
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400">★ 4.95</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold">
                        D2
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                          Tegallalang Sunrise Tour
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <HiCalendar className="w-3 h-3 text-teal-500" /> Guided AI Itinerary
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 font-semibold">Included</span>
                  </div>
                </div>

                {/* Prompt bar illustration */}
                <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <HiSparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">"Eco-friendly homestays near rice terraces with fast WiFi"</span>
                </div>
              </div>

              {/* Floating Glass Chip 1 (Top Right) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-500/10 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-100"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <HiBolt className="w-3.5 h-3.5" />
                </div>
                <span>Generated in 0.8s</span>
              </motion.div>

              {/* Floating Glass Chip 2 (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-4 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-100"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <HiBuildingStorefront className="w-3.5 h-3.5" />
                </div>
                <span>1,200+ Verified Stays</span>
              </motion.div>

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;