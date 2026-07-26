import { motion } from "framer-motion";
import { Award, Mountain, Sun, Sparkles, Heart, Crown, CheckCircle2, Lock } from "lucide-react";

function AchievementBadges() {
  const badges = [
    {
      id: "mountain-explorer",
      title: "Mountain Explorer",
      emoji: "🌄",
      icon: Mountain,
      desc: "Explored 5+ alpine & hill station retreats",
      unlocked: true,
      progress: "100%",
      glow: "from-amber-500/20 via-orange-500/20 to-amber-900/40 border-amber-500/40 text-amber-400 shadow-amber-500/10",
    },
    {
      id: "beach-lover",
      title: "Beach Lover",
      emoji: "🏖",
      icon: Sun,
      desc: "Saved 3+ coastal beachfront homestays",
      unlocked: true,
      progress: "100%",
      glow: "from-cyan-500/20 via-blue-500/20 to-cyan-900/40 border-cyan-500/40 text-cyan-400 shadow-cyan-500/10",
    },
    {
      id: "ai-planner-pro",
      title: "AI Planner Pro",
      emoji: "🤖",
      icon: Sparkles,
      desc: "Generated 10+ custom AI itineraries",
      unlocked: true,
      progress: "100%",
      glow: "from-emerald-500/20 via-teal-500/20 to-emerald-900/40 border-emerald-500/40 text-emerald-400 shadow-emerald-500/10",
    },
    {
      id: "homestay-collector",
      title: "Homestay Collector",
      emoji: "❤️",
      icon: Heart,
      desc: "Added 5+ luxury stays to your collection",
      unlocked: true,
      progress: "100%",
      glow: "from-rose-500/20 via-pink-500/20 to-rose-900/40 border-rose-500/40 text-rose-400 shadow-rose-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Travel Achievement Badges</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Collectible milestones earned through your exploration
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          4 Badges Unlocked
        </span>
      </div>

      {/* Grid of Glowing Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative p-5 rounded-3xl bg-gradient-to-br ${badge.glow} border backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group overflow-hidden`}
            >
              {/* Top Badge Icon & Status */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <span>{badge.emoji}</span>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Unlocked</span>
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  <span>{badge.title}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {badge.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Milestone Level 1</span>
                  <span className="text-emerald-400">100% Complete</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full w-full" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default AchievementBadges;
