import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, User, Compass, Calendar } from "lucide-react";

function HeroGreeting({ user }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const rawName = user?.name || (user?.email ? user.email.split("@")[0] : "Pulkit");
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const userEmail = user?.email || "pulkit@stayease.ai";

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-emerald-950/80 backdrop-blur-2xl border border-emerald-500/20 p-6 sm:p-10 shadow-2xl overflow-hidden group"
    >
      {/* Background Animated Floating Glow Orbs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* Left Column: Greeting & Name */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Personalized Travel Workspace</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentDate}</span>
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">
              {getGreeting()},
            </h2>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-0.5">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{userName}</span> 👋
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-300 font-normal flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>Ready for your next adventure?</span>
          </p>
        </div>

        {/* Right Column: User Profile Badge & Glassmorphism Profile Button */}
        <div className="flex flex-wrap items-center gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md">
              {userName.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white truncate max-w-[150px]">{userName}</p>
              <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{userEmail}</p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/profile"
              aria-label="View profile & settings"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-emerald-500/40 text-emerald-300 font-bold text-xs shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <User className="w-4 h-4 text-emerald-400" />
              <span>Profile & Settings</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}

export default HeroGreeting;
