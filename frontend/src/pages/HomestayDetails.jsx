import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiMapPin,
  HiStar,
  HiHeart,
  HiShare,
  HiArrowLeft,
  HiCheckBadge,
  HiShieldCheck,
  HiArrowRight,
} from "react-icons/hi2";
import { useFavorites } from "../context/FavoritesContext";
import { SkeletonDetail } from "../components/ui/Skeleton";

function HomestayDetails() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const routerLocation = useLocation();
  const { isFavorite, toggleFavorite, loadingIds } = useFavorites();

  useEffect(() => {
    // Short smooth skeleton loading window while homestay details parse/fetch
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const passedHomestay = routerLocation.state?.homestay;

  const fallbackImages = [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
  ];

  const homestayId = Number(passedHomestay?.id) || 1;
  const selectedFallback = fallbackImages[(Math.abs(homestayId) - 1) % fallbackImages.length];

  // Dynamic property object constructed from selected homestay
  const title = passedHomestay?.name || passedHomestay?.title || "Serene Escape Homestay";
  const location = passedHomestay?.location || "Scenic Location";
  const price = passedHomestay?.price || 2999;
  const rating = passedHomestay?.rating || "4.92";
  const reviewsCount = passedHomestay?.reviewsCount || Math.floor(65 + (homestayId * 19) % 70);
  const category = passedHomestay?.category || "Featured Stay";
  const image = passedHomestay?.image || selectedFallback;
  const description =
    passedHomestay?.description ||
    `Experience an unforgettable retreat at ${title} situated in ${location}. Designed with modern amenities, tranquil views, and personalized hospitality tailored for relaxed vacations.`;

  const amenities = passedHomestay?.amenities || [
    { name: "High-Speed WiFi", icon: "📶" },
    { name: "Free Parking", icon: "🅿️" },
    { name: "Complimentary Breakfast", icon: "🍳" },
    { name: "Scenic View Deck", icon: "⛰️" },
    { name: "Pet Friendly", icon: "🐾" },
    { name: "Bonfire & Grill", icon: "🔥" },
    { name: "Spacious Lounge", icon: "🛋️" },
    { name: "24/7 Concierge", icon: "🛎️" },
  ];

  const aiInsights = passedHomestay?.aiInsights || {
    bestFor: category.includes("Mountain") || category.includes("Hill")
      ? "Nature Lovers & Trekking Enthusiasts"
      : category.includes("Beach")
      ? "Beach Lovers & Sunset Seekers"
      : category.includes("Heritage")
      ? "Culture & History Buffs"
      : "Couples & Relaxation Seekers",
    idealSeason: category.includes("Mountain")
      ? "September to March (Pleasant Weather & Clear Skies)"
      : category.includes("Beach")
      ? "October to May (Sunny Beach Days)"
      : "October to April (Ideal Climate)",
    nearbyAttractions: [
      `Popular Viewpoints near ${location.split(",")[0]} (10 mins)`,
      `Local Cultural Markets & Craft Shops (15 mins)`,
      `Scenic Trails & Nature Walks (12 mins)`,
    ],
    matchScore: `${95 + ((passedHomestay?.id || 1) % 4)}%`,
  };

  const property = {
    title,
    location,
    price,
    rating,
    reviewsCount,
    category,
    image,
    description,
    amenities,
    aiInsights,
  };

  const propertyId = passedHomestay?.id || 1;
  const isFav = isFavorite(propertyId);
  const isLoadingFav = loadingIds.has(String(propertyId));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glow orbs */}
      <div className="absolute top-10 left-10 w-[30rem] h-[30rem] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[30rem] h-[30rem] bg-teal-500/10 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="details-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SkeletonDetail />
          </motion.div>
        ) : (
          <motion.main
            key="details-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto space-y-8 relative z-10"
          >
            {/* Navigation Top Bar */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <HiArrowLeft className="w-4 h-4" />
                <span>Back to Homestays</span>
              </Link>

              <div className="flex items-center gap-3">
                {/* Share Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  aria-label="Share property link"
                  className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-sm transition-all cursor-pointer"
                  title="Share property"
                >
                  <HiShare className="w-5 h-5" />
                </motion.button>

                {/* Favorite Heart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(propertyId, property.title)}
                  disabled={isLoadingFav}
                  aria-label="Add property to favorites"
                  className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  title="Favorite property"
                >
                  {isLoadingFav ? (
                    <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <HiHeart
                      className={`w-5 h-5 transition-colors ${
                        isFav ? "text-rose-500 fill-rose-500" : "text-slate-400"
                      }`}
                    />
                  )}
                </motion.button>
              </div>
            </div>

            {/* 1. Large Hero Image Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-72 sm:h-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group"
            >
              {/* Dynamic homestay photo */}
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Top Overlay Badges */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 shadow-xs flex items-center gap-1.5">
                  <HiCheckBadge className="w-4 h-4 text-emerald-400" />
                  <span>Verified Stay</span>
                </span>
              </div>

              {/* Bottom Floating Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
                  <HiMapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <HiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-sm">{property.rating}</span>
                  <span className="text-xs text-slate-300">({property.reviewsCount} reviews)</span>
                </div>
              </div>
            </motion.div>

            {/* Main Grid Layout (Left Content vs Right Booking Card) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Content Area (2 Cols on Desktop) */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 2. Property Overview Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {property.title}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                        <HiMapPin className="w-4 h-4 text-emerald-500" />
                        <span>{property.location}</span>
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        ₹{property.price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">per night</span>
                    </div>
                  </div>
                </motion.div>

                {/* 3. About Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-4"
                >
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    About this Homestay
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {property.description}
                  </p>
                </motion.div>

                {/* 4. Amenities Chips Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-6"
                >
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Featured Amenities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {property.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-xs"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* 5. AI Recommendation Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-slate-900/60 backdrop-blur-xl border border-emerald-500/30 p-6 sm:p-8 shadow-xl shadow-emerald-500/10 space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <HiSparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          AI Recommendation Insights
                        </h3>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                          Smart match score: {property.aiInsights.matchScore}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-slate-700 dark:text-slate-200">
                    <div className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold shrink-0">✨</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Best For: </strong>
                        {property.aiInsights.bestFor}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-teal-500 font-bold shrink-0">✨</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Ideal Visiting Season: </strong>
                        {property.aiInsights.idealSeason}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-sky-500 font-bold shrink-0">✨</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Nearby Attractions: </strong>
                        <ul className="mt-1 list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                          {property.aiInsights.nearbyAttractions.map((spot, i) => (
                            <li key={i}>{spot}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Right Side: Sticky Action / Booking Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-28 space-y-6"
              >
                <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/80 space-y-6">
                  
                  <div className="border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        ₹{property.price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">per night</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      <HiShieldCheck className="w-4 h-4" />
                      <span>Free cancellation up to 48 hours</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {/* Book Now Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => alert("Booking functionality coming soon!")}
                      aria-label="Book homestay now"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                    >
                      <span>Book Now</span>
                      <HiArrowRight className="w-5 h-5" />
                    </motion.button>

                    {/* Save & Share Secondary Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => toggleFavorite(propertyId, property.title)}
                        disabled={isLoadingFav}
                        aria-label="Save homestay to collection"
                        className="w-full py-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isLoadingFav ? (
                          <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <HiHeart className={`w-4 h-4 ${isFav ? "text-rose-500 fill-rose-500" : ""}`} />
                            <span>{isFav ? "Saved" : "Save"}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleShare}
                        aria-label="Share property link"
                        className="w-full py-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <HiShare className="w-4 h-4 text-emerald-500" />
                        <span>{copied ? "Copied" : "Share"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Instant AI Planner Link */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      Planning a trip around this stay?
                    </p>
                    <Link
                      to="/ai-planner"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>Build AI Itinerary</span>
                      <HiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </motion.div>

            </div>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomestayDetails;
