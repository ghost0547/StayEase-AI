import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, Building2, TrendingUp } from "lucide-react";

// Count-up helper component
function AnimatedCount({ targetValue, duration = 1.2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const numericTarget = typeof targetValue === "number" ? targetValue : parseInt(targetValue, 10) || 0;
    if (numericTarget === 0) {
      setCount(0);
      return;
    }
    const stepTime = Math.max(Math.floor((duration * 1000) / numericTarget), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= numericTarget) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return <span>{count}</span>;
}

function TravelStats({ savedCount, scrollToFavorites }) {
  const stats = [
    {
      id: "saved-homestays",
      title: "Saved Homestays",
      value: savedCount,
      isNumeric: true,
      subtext: "+2 saved this week",
      icon: Heart,
      color: "from-rose-500/20 to-pink-500/20 text-rose-500 border-rose-500/30",
      glow: "hover:shadow-rose-500/10",
      onClick: scrollToFavorites,
    },
    {
      id: "ai-trips",
      title: "AI Trips Generated",
      value: 14,
      isNumeric: true,
      subtext: "+3 generated this week",
      icon: Sparkles,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/30",
      glow: "hover:shadow-emerald-500/10",
    },
    {
      id: "fav-dest",
      title: "Favorite Destination",
      value: "Nainital",
      isNumeric: false,
      subtext: "98% AI match score",
      icon: MapPin,
      color: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30",
      glow: "hover:shadow-amber-500/10",
    },
    {
      id: "explored-props",
      title: "Total Properties Explored",
      value: 48,
      isNumeric: true,
      subtext: "+14 explored recently",
      icon: Building2,
      color: "from-sky-500/20 to-blue-500/20 text-sky-500 border-sky-500/30",
      glow: "hover:shadow-sky-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={item.onClick}
            className={`p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-xl ${item.glow} transition-all duration-300 flex flex-col justify-between space-y-4 ${
              item.onClick ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} border flex items-center justify-center shadow-xs`}>
                <Icon className="w-6 h-6" />
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>Active</span>
              </span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                {item.isNumeric ? <AnimatedCount targetValue={item.value} /> : item.value}
              </h3>
            </div>

            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 border-t border-slate-100 dark:border-slate-800/80 pt-3">
              <span>{item.subtext}</span>
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default TravelStats;
