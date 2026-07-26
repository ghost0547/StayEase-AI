import { motion } from "framer-motion";
import {
  Wifi,
  Car,
  Coffee,
  Mountain,
  Dog,
  Waves,
  Briefcase,
  Wind,
  Sparkles,
} from "lucide-react";

function PropertyHighlights() {
  const highlights = [
    { name: "Free WiFi", icon: Wifi, desc: "High-speed 300Mbps fiber internet" },
    { name: "Parking", icon: Car, desc: "Free on-site private parking" },
    { name: "Breakfast", icon: Coffee, desc: "Fresh organic local breakfast" },
    { name: "Mountain View", icon: Mountain, desc: "Unobstructed scenic panoramas" },
    { name: "Pet Friendly", icon: Dog, desc: "Pets welcome with garden area" },
    { name: "Swimming Pool", icon: Waves, desc: "Temperature-controlled infinity pool" },
    { name: "Workspace", icon: Briefcase, desc: "Ergonomic desk & study area" },
    { name: "Air Conditioning", icon: Wind, desc: "Climate control in all rooms" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Property Highlights</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Top-rated features verified by recent guests
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>8 Premium Perks</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col space-y-2 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default PropertyHighlights;
