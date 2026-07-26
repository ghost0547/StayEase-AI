import { motion } from "framer-motion";
import { Star, ThumbsUp, CheckCircle, MessageSquare } from "lucide-react";

function GuestReviews({ rating, reviewsCount }) {
  const reviews = [
    {
      id: 1,
      name: "Aarav Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5.0,
      date: "October 2024",
      stayDuration: "Stayed 3 nights",
      text: "An absolute dream stay! The views from the morning balcony were unbelievable and the high-speed wifi allowed me to work remotely without a single hitch. The host was exceptionally warm and helped arrange local transportation effortlessly.",
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      date: "December 2024",
      stayDuration: "Stayed 4 nights",
      text: "The property was sparkling clean, even better than the photos! The bonfire evening organized by the host was the highlight of our vacation. Delicious breakfast and super comfortable beds. Would 100% come back!",
    },
    {
      id: 3,
      name: "Rohan Mehta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5.0,
      date: "January 2025",
      stayDuration: "Stayed 2 nights",
      text: "Peaceful location away from city noise yet very close to all key attractions. The amenities were top-notch and the heated pool made the cold evening so cozy. Highly recommended for couples and families alike!",
    },
  ];

  const ratingCategories = [
    { name: "Cleanliness", score: "4.9" },
    { name: "Accuracy", score: "5.0" },
    { name: "Communication", score: "5.0" },
    { name: "Location", score: "4.9" },
    { name: "Value for Money", score: "4.8" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-8"
    >
      {/* Reviews Header with Summary Score */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-500" />
            <span>Guest Reviews</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real feedback from verified StayEase guests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-xl font-black">{rating || "4.96"}</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              out of 5.0
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            ({reviewsCount || "128"} reviews)
          </span>
        </div>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
        {ratingCategories.map((cat, i) => (
          <div key={i} className="space-y-1">
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{cat.name}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(parseFloat(cat.score) / 5) * 100}%` }} />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{cat.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Premium Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <motion.div
            key={rev.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* User Avatar & Info */}
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  loading="lazy"
                  decoding="async"
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {rev.date} • {rev.stayDuration}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(rev.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300 dark:text-slate-700"
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                  {rev.rating.toFixed(1)}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal italic">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3 text-emerald-500" /> Helpful review
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Verified Booking</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default GuestReviews;
