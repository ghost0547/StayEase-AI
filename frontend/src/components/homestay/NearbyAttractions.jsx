import { motion } from "framer-motion";
import {
  Waves,
  ShoppingBag,
  Mountain,
  Landmark,
  MapPin,
  Compass,
  Car,
  Footprints,
} from "lucide-react";

function NearbyAttractions({ location }) {
  // Preset list of attractions as specified in requirements
  const defaultAttractions = [
    {
      name: "Naini Lake",
      distance: "1.2 km",
      time: "5 mins drive",
      travelType: "car",
      icon: Waves,
      desc: "Iconic emerald lake famous for boating & sunset walks",
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    },
    {
      name: "Mall Road",
      distance: "800 m",
      time: "10 mins walk",
      travelType: "walk",
      icon: ShoppingBag,
      desc: "Vibrant promenade with artisanal cafes & local crafts",
      color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    {
      name: "Snow View Point",
      distance: "3.5 km",
      time: "15 mins drive",
      travelType: "car",
      icon: Mountain,
      desc: "Cable car viewpoint offering panoramic Himalayan peak views",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    {
      name: "Naina Devi Temple",
      distance: "1.5 km",
      time: "6 mins drive",
      travelType: "car",
      icon: Landmark,
      desc: "Sacred lakeside shrine with rich cultural history",
      color: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30",
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-500" />
            <span>Nearby Attractions</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Top landmark destinations around {location || "this property"}
          </p>
        </div>
      </div>

      {/* Grid of Attraction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {defaultAttractions.map((spot, idx) => {
          const Icon = spot.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${spot.color} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Travel type badge */}
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1 shadow-xs">
                    {spot.travelType === "walk" ? (
                      <Footprints className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Car className="w-3 h-3 text-emerald-500" />
                    )}
                    <span>{spot.time}</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {spot.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    {spot.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{spot.distance} away</span>
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold group-hover:underline">
                  Directions &rarr;
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default NearbyAttractions;
