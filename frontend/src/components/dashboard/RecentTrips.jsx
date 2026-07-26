import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, Clock, DollarSign, ArrowRight, Eye, X, CheckCircle2, MapPin } from "lucide-react";

function RecentTrips() {
  const [selectedTrip, setSelectedTrip] = useState(null);

  const trips = [
    {
      id: "trip-1",
      destination: "Nainital Lake & Mountain Escape",
      location: "Nainital, Uttarakhand",
      date: "24 Oct 2024",
      duration: "5 Days • 4 Nights",
      budget: "₹18,500",
      tag: "Nature & Lakes",
      highlights: ["Boating at Naini Lake", "Snow View Point Cable Car", "Sunset at Tiffin Top", "Eco Cave Gardens"],
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "trip-2",
      destination: "Goa Beachfront & Heritage Tour",
      location: "Anjuna & Panaji, Goa",
      date: "12 Nov 2024",
      duration: "4 Days • 3 Nights",
      budget: "₹24,000",
      tag: "Beach & Culture",
      highlights: ["Anjuna Beach Sunset Cruise", "Fontainhas Latin Quarter Walking Tour", "Dudhsagar Waterfalls Safari"],
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "trip-3",
      destination: "Manali Alpine Chalet & Trek",
      location: "Manali, Himachal Pradesh",
      date: "05 Jan 2025",
      duration: "6 Days • 5 Nights",
      budget: "₹32,000",
      tag: "Snow & Adventure",
      highlights: ["Solang Valley Snow Sports", "Old Manali Cafe Crawl", "Atal Tunnel & Sissu Expedition"],
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div id="recent-trips-section" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span>Recent AI Generated Trips</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access your custom AI itinerary history
          </p>
        </div>

        <Link
          to="/ai-planner"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition-all"
        >
          <span>Create New Itinerary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trips.map((trip, idx) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Card Image & Tag */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
              
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-slate-700">
                {trip.tag}
              </span>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{trip.location}</span>
                </p>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {trip.destination}
                </h3>

                {/* Metadata Pill Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{trip.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-medium">
                    <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="truncate">{trip.duration}</span>
                  </div>
                </div>
              </div>

              {/* Footer: Budget & CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Estimated Budget</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">{trip.budget}</span>
                </div>

                <button
                  onClick={() => setSelectedTrip(trip)}
                  aria-label="View generated itinerary details"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Itinerary</span>
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Itinerary Preview Modal */}
      <AnimatePresence>
        {selectedTrip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-left space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedTrip(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  AI Generated Itinerary
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white pt-2">{selectedTrip.destination}</h3>
                <p className="text-xs text-slate-500">{selectedTrip.location} • Created on {selectedTrip.date}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Trip Duration</span>
                  <span className="text-slate-900 dark:text-white font-bold text-sm">{selectedTrip.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Total Budget</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{selectedTrip.budget}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Top Highlights</h4>
                <div className="space-y-2">
                  {selectedTrip.highlights.map((spot, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{spot}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  to="/ai-planner"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs text-center shadow-lg transition-all"
                >
                  Regenerate or Edit in AI Planner
                </Link>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RecentTrips;
