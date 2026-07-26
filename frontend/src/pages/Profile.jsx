import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  UserCircle,
  Camera,
  Lock,
  Sparkles,
  Calendar,
  Heart,
  Bell,
  Compass,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://127.0.0.1:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user) setUser(data.user);
        })
        .catch((err) => console.error("Profile load error:", err));
    }
  }, []);

  const rawName = user?.name || (user?.email ? user.email.split("@")[0] : "Pulkit");
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const userEmail = user?.email || "pulkit@stayease.ai";

  const plannedFeatures = [
    {
      title: "Edit Personal Information",
      description: "Update your name, primary email address, phone number, and emergency contact details.",
      icon: User,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Upload Profile Picture",
      description: "Upload custom avatar photos or sync with gravatar & social media accounts.",
      icon: Camera,
      color: "from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30",
    },
    {
      title: "Change Password & Security",
      description: "Manage credentials, enable multi-factor authentication (2FA), and review login sessions.",
      icon: Lock,
      color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30",
    },
    {
      title: "Saved AI Trips & Itineraries",
      description: "Access, re-organize, and export all generated AI travel plans into PDF format.",
      icon: Sparkles,
      color: "from-emerald-500/20 to-cyan-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      title: "Booking & Reservation History",
      description: "Review past stay reservations, payment receipts, host messages, and check-in guides.",
      icon: Calendar,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    },
    {
      title: "Favorite Homestays & Wishlists",
      description: "Create custom collections for weekend getaways, beach trips, and mountain retreats.",
      icon: Heart,
      color: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30",
    },
    {
      title: "Notification Preferences",
      description: "Customize email alerts, price drop notifications, and AI trip reminder schedules.",
      icon: Bell,
      color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
    },
    {
      title: "Travel Preferences",
      description: "Set default travel pace, budget brackets, dietary requirements, and favorite stay styles.",
      icon: Compass,
      color: "from-teal-500/20 to-sky-500/20 text-teal-300 border-teal-500/30",
    },
    {
      title: "Privacy & Data Settings",
      description: "Control data sharing preferences, request account exports, or manage privacy settings.",
      icon: ShieldCheck,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
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

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Navigation Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            aria-label="Return to Dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg p-1"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* 1. Profile Hero Section (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-emerald-950/80 backdrop-blur-2xl border border-emerald-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden text-center space-y-6"
        >
          {/* Accent Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            {/* Glowing Illustration Avatar Ring */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-1 shadow-xl shadow-emerald-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-white">
                  <UserCircle className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400" />
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500 text-slate-950 shadow-md border border-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active User
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>🚀 Coming Soon</span>
              </span>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                StayEase AI Workspace
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Profile Management
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Manage your StayEase AI account and personalize your travel experience.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed italic shadow-inner">
              "We're developing an integrated travel control center. Full profile customization, booking history management, and personalized AI preferences will be unlocked in the upcoming platform release."
            </div>

            {/* User Details Badge */}
            <div className="pt-2 flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Signed in as: <strong className="text-emerald-300">{userName}</strong> ({userEmail})</span>
            </div>
          </div>
        </motion.div>

        {/* 2. Refined Roadmap Feature Cards Grid */}
        <div className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Upcoming Profile Features
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Preview planned features under active development for your StayEase AI profile
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {plannedFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal mt-1.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Clean Single Centered Status Badge (Roadmap Pill) */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-xs group-hover:border-amber-500/50 group-hover:shadow-amber-500/20 transition-all duration-200">
                      <span>🚧</span>
                      <span>Coming Soon</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* 3. Action Navigation CTA Row (Unchanged) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <Link
              to="/dashboard"
              aria-label="Return to Dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <ArrowLeft className="w-5 h-5 shrink-0" />
              <span>Back to Dashboard</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <Link
              to="/"
              aria-label="Browse all homestays"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base backdrop-blur-md shadow-md transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <Compass className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Browse Homestays</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
