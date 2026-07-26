import { motion } from "framer-motion";
import { Heart, Sparkles, Home, Star, Clock, CheckCircle2 } from "lucide-react";

function ActivityTimeline({ savedCount }) {
  const activities = [
    {
      id: 1,
      title: "Saved Mountain View Homestay",
      actionText: "Added Manali Alpine Haven & Chalet to your saved stays",
      time: "2 hours ago",
      icon: Heart,
      iconColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      tag: "Favorites",
    },
    {
      id: 2,
      title: "Generated Nainital Itinerary",
      actionText: "5-day AI personalized lake escape created with budget estimate",
      time: "Yesterday, 4:15 PM",
      icon: Sparkles,
      iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      tag: "AI Planner",
    },
    {
      id: 3,
      title: "Viewed Goa Heritage Cottage",
      actionText: "Explored 5-star beachfront Portuguese villa details & guest reviews",
      time: "3 days ago",
      icon: Home,
      iconColor: "text-teal-500 bg-teal-500/10 border-teal-500/30",
      tag: "Explored Stay",
    },
    {
      id: 4,
      title: "Rated Ubud Eco Villa 5 Stars",
      actionText: "Shared verified feedback on luxury rainforest retreat",
      time: "1 week ago",
      icon: Star,
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      tag: "Review",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Recent Activity Timeline</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time track of your travel workspace interactions
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Live Sync Active
        </span>
      </div>

      {/* Clean Vertical Timeline Structure with safe padding to prevent left overflow */}
      <div className="relative pl-7 sm:pl-9 space-y-6 sm:space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500 before:to-transparent">
        {activities.map((act, index) => {
          const Icon = act.icon;
          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Connector Dot / Icon Badge */}
              <div className={`absolute -left-[27px] sm:-left-[35px] top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${act.iconColor} backdrop-blur-md flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 shrink-0`}>
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>

              {/* Activity Details Card */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {act.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-slate-200/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                      {act.tag}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    {act.actionText}
                  </p>
                </div>

                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{act.time}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ActivityTimeline;
