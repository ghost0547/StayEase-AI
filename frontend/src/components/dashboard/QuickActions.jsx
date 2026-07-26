import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Home, FileText, ArrowRight } from "lucide-react";

function QuickActions({ scrollToFavorites, scrollToTrips }) {
  const actions = [
    {
      id: "ai-planner",
      title: "🤖 Generate New Trip",
      desc: "Create instant personalized AI itineraries",
      link: "/ai-planner",
      bg: "bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-emerald-600/20 hover:shadow-emerald-500/40 border-emerald-500/30",
      icon: Sparkles,
      iconBg: "bg-white/20 text-white",
    },
    {
      id: "browse-favs",
      title: "❤️ Browse Favorites",
      desc: "Access your saved luxury homestays",
      onClick: scrollToFavorites,
      bg: "bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-slate-900/60 text-slate-900 dark:text-white border-rose-500/30 hover:border-rose-500/60 shadow-rose-500/10",
      icon: Heart,
      iconBg: "bg-rose-500/20 text-rose-500",
    },
    {
      id: "explore-stays",
      title: "🏡 Explore Homestays",
      desc: "Discover handpicked eco villas & retreats",
      link: "/",
      bg: "bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-slate-900/60 text-slate-900 dark:text-white border-teal-500/30 hover:border-teal-500/60 shadow-teal-500/10",
      icon: Home,
      iconBg: "bg-teal-500/20 text-teal-400",
    },
    {
      id: "view-trips",
      title: "📄 View Previous Trips",
      desc: "Review your past saved AI travel plans",
      onClick: scrollToTrips,
      bg: "bg-gradient-to-br from-cyan-500/10 via-sky-500/10 to-slate-900/60 text-slate-900 dark:text-white border-cyan-500/30 hover:border-cyan-500/60 shadow-cyan-500/10",
      icon: FileText,
      iconBg: "bg-cyan-500/20 text-cyan-400",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Quick Actions
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Shortcuts for instant planning
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, index) => {
          const Icon = act.icon;
          const content = (
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-2xl ${act.iconBg} flex items-center justify-center font-bold shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h3 className="font-bold text-base tracking-tight">{act.title}</h3>
                <p className="text-xs opacity-80 mt-1 font-normal leading-relaxed">{act.desc}</p>
              </div>
            </div>
          );

          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full"
            >
              {act.link ? (
                <Link
                  to={act.link}
                  className={`group block p-6 rounded-3xl backdrop-blur-xl border shadow-lg transition-all duration-300 h-full ${act.bg}`}
                >
                  {content}
                </Link>
              ) : (
                <button
                  onClick={act.onClick}
                  className={`group w-full text-left p-6 rounded-3xl backdrop-blur-xl border shadow-lg transition-all duration-300 h-full cursor-pointer ${act.bg}`}
                >
                  {content}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
