import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  X,
  MapPin,
  Trash2,
} from "lucide-react";
import AIItineraryViewer from "../AIItineraryViewer";
import { useFavorites } from "../../context/FavoritesContext";

function RecentTrips() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { showToast } = useFavorites();

  const fetchItineraries = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/itineraries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItineraries(data.itineraries || []);
      }
    } catch (err) {
      console.error("Failed to fetch saved itineraries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleDelete = async (id, destination) => {
    if (!window.confirm(`Are you sure you want to delete the itinerary for "${destination}"?`)) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    setDeletingId(id);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/itineraries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setItineraries((prev) => prev.filter((item) => item.id !== id));
        showToast(`Itinerary for "${destination}" deleted`, "success");
      } else {
        showToast("Failed to delete itinerary", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error deleting itinerary", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "Recently";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  // Fallback images pool for visual card backgrounds
  const fallbackImages = [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div id="recent-trips-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span>Recent AI Generated Trips</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access and manage your saved AI itineraries
          </p>
        </div>

        <Link
          to="/ai-planner"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <span>Create New Itinerary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800/60 animate-shimmer-glow" />
          ))}
        </div>
      ) : itineraries.length === 0 ? (
        /* Empty State Illustration */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 text-center space-y-4 shadow-xl"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Saved AI Itineraries Yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate custom day-by-day itineraries with the AI Planner. Your saved itineraries will automatically sync here.
            </p>
          </div>

          <Link
            to="/ai-planner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Your First AI Trip</span>
          </Link>
        </motion.div>
      ) : (
        /* Live Saved Itineraries Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {itineraries.map((trip, idx) => {
            const cardImg = fallbackImages[idx % fallbackImages.length];
            const isDeleting = deletingId === trip.id;

            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Card Image & Delete Button */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={cardImg}
                    alt={trip.destination}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-slate-700">
                    Saved Itinerary
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(trip.id, trip.destination)}
                    disabled={isDeleting}
                    aria-label={`Delete itinerary for ${trip.destination}`}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700 hover:border-rose-500 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{trip.destination}</span>
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {trip.destination}
                    </h3>

                    {/* Metadata Pill Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{formatDate(trip.created_at)}</span>
                      </div>

                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-medium">
                        <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span className="truncate">{trip.days} Days</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Budget & View CTA */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Estimated Budget</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                        ₹{Number(trip.budget || 0).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedTrip(trip)}
                      aria-label="View saved itinerary details"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Itinerary</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Itinerary Viewer Modal */}
      <AnimatePresence>
        {selectedTrip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 max-w-3xl w-full text-left space-y-6 shadow-2xl relative my-8 max-h-[85vh] overflow-y-auto"
            >
              {/* Fully visible, glassmorphism close button positioned safely inside the modal card */}
              <button
                onClick={() => setSelectedTrip(null)}
                aria-label="Close itinerary modal"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="pt-2">
                <AIItineraryViewer
                  rawItinerary={selectedTrip.itinerary || ""}
                  destination={selectedTrip.destination}
                  daysCount={selectedTrip.days}
                  budgetAmount={selectedTrip.budget}
                  onReset={() => setSelectedTrip(null)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RecentTrips;
