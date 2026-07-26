import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, ArrowRight, Eye } from "lucide-react";

function RecommendedDestinations() {
  const recommendations = [
    {
      id: "dest-manali",
      name: "Manali",
      region: "Himachal Pradesh",
      matchScore: "98% Match",
      tag: "Alpine Retreats",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      description: "Snow-capped Himalayan peaks, cozy wooden chalets & serene pine forest trails.",
      homestayId: 2,
    },
    {
      id: "dest-goa",
      name: "Goa",
      region: "Western Coast",
      matchScore: "96% Match",
      tag: "Beachfront Havens",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      description: "Golden sand beaches, Portuguese heritage architecture & ocean sunset villas.",
      homestayId: 3,
    },
    {
      id: "dest-nainital",
      name: "Nainital",
      region: "Uttarakhand",
      matchScore: "95% Match",
      tag: "Lakeside Sanctuaries",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      description: "Emerald lake boating, scenic cable car viewpoints & peaceful valley stays.",
      homestayId: 1,
    },
    {
      id: "dest-coorg",
      name: "Coorg",
      region: "Karnataka",
      matchScore: "94% Match",
      tag: "Coffee Plantations",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
      description: "50-acre fragrant coffee estates, private veranda swings & mist-covered green hills.",
      homestayId: 4,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Recommendations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recommended Destinations
          </h2>
        </div>

        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <span>Explore All Locations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((dest, idx) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Image & Match Score Badge */}
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

              {/* Match Score Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>{dest.matchScore}</span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  {dest.tag}
                </span>
                <h3 className="text-xl font-extrabold text-white">{dest.name}</h3>
              </div>
            </div>

            {/* Content & Action */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{dest.region}</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {dest.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <Link
                  to={`/homestay/${dest.homestayId}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </Link>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default RecommendedDestinations;
