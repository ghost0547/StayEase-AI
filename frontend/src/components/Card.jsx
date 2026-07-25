import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMapPin, HiStar, HiHeart, HiArrowUpRight } from "react-icons/hi2";
import { useFavorites } from "../context/FavoritesContext";

function Card({ id, title, location, price, category, rating, image, description, homestay }) {
  const { isFavorite, toggleFavorite, loadingIds } = useFavorites();

  // Default travel images from Unsplash if image prop is omitted
  const fallbackImages = [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  ];

  const displayImage = image || fallbackImages[(title ? title.length : 0) % fallbackImages.length];

  const homestayData = homestay || {
    id: id || 1,
    title,
    name: title,
    location,
    price,
    category,
    rating,
    image: displayImage,
    description,
  };

  const cardId = homestayData.id || 1;
  const isFav = isFavorite(cardId);
  const isLoading = loadingIds.has(String(cardId));

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col h-full rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top Image / Visual Area */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-3xl bg-slate-900">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          {/* Category Badge */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-emerald-700 dark:text-emerald-300 border border-white/50 dark:border-slate-700 shadow-xs">
            {category || "Featured Stay"}
          </span>

          {/* Floating Rating Badge */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white border border-white/50 dark:border-slate-700 shadow-xs">
            <HiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{rating || "4.9"}</span>
          </div>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(cardId, title || homestayData.name);
          }}
          disabled={isLoading}
          aria-label="Add to favorites"
          className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/60 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <HiHeart
              className={`w-5 h-5 transition-colors duration-200 ${
                isFav ? "text-rose-500 fill-rose-500" : "text-slate-400 group-hover:text-rose-400"
              }`}
            />
          )}
        </button>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-1">
          {title}
        </h3>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
            <HiMapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Description fallback if location is missing */}
        {description && !location && (
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {description}
          </p>
        )}

        {/* Card Footer (Price + CTA Button) */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {price ? `₹${price}` : "₹2,499"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / night</span>
          </div>

          <Link
            to={`/homestay/${homestayData.id || 1}`}
            state={{ homestay: homestayData }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 group-hover:bg-emerald-600 text-white font-semibold text-sm shadow-md group-hover:shadow-emerald-600/30 transition-all duration-300 cursor-pointer"
          >
            <span>View Details</span>
            <HiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;