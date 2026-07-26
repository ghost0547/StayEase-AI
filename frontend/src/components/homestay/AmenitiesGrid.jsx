import { useState } from "react";
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
  Flame,
  Tv,
  Sun,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

function AmenitiesGrid() {
  const [showAll, setShowAll] = useState(false);

  // Full default set of amenities with icons
  const defaultAmenities = [
    { name: "High-Speed WiFi (300 Mbps)", icon: Wifi, cat: "Connectivity" },
    { name: "Free Private On-Site Parking", icon: Car, cat: "Parking" },
    { name: "Complimentary Fresh Breakfast", icon: Coffee, cat: "Dining" },
    { name: "Panoromic Mountain & Valley View", icon: Mountain, cat: "Views" },
    { name: "Pet Friendly Accommodation", icon: Dog, cat: "Policies" },
    { name: "Heated Outdoor Pool & Lounge", icon: Waves, cat: "Recreation" },
    { name: "Dedicated Work Desk & Ergonomic Chair", icon: Briefcase, cat: "Workspace" },
    { name: "Full Climate Control Air Conditioning", icon: Wind, cat: "Comfort" },
    { name: "Private Bonfire Pit & BBQ Grill", icon: Flame, cat: "Outdoors" },
    { name: "65-inch Smart OLED TV with Netflix", icon: Tv, cat: "Entertainment" },
    { name: "Sun Deck & Outdoor Morning Patio", icon: Sun, cat: "Outdoors" },
    { name: "24/7 Gated Security & Concierge", icon: ShieldCheck, cat: "Safety" },
  ];

  const displayedList = showAll ? defaultAmenities : defaultAmenities.slice(0, 8);

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
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            What this place offers
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Curated modern amenities for a comfortable luxury stay
          </p>
        </div>
      </div>

      {/* Responsive Icon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex items-center gap-3.5 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {item.cat}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Show All / Show Less Toggle Button */}
      <div className="pt-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>{showAll ? "Show Less Amenities" : `Show All ${defaultAmenities.length} Amenities`}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
      </div>
    </motion.div>
  );
}

export default AmenitiesGrid;
