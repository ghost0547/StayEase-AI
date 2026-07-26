import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Sparkles, ArrowRight, Building2, Search } from "lucide-react";
import Card from "../Card";

function FavoritesSection({ savedHomestayObjects, favoritesCount }) {
  return (
    <div id="saved-stays-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Saved Homestays</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                {favoritesCount} Saved
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Your handpicked collection of luxury homestays & retreats
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
        >
          <span>Explore All Homestays</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Saved Homestays / Empty State */}
      <AnimatePresence mode="popLayout">
        {savedHomestayObjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            {savedHomestayObjects.map((home) => (
              <motion.div
                key={home.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card
                  id={home.id}
                  title={home.name || home.title}
                  location={home.location}
                  price={home.price}
                  category={home.category}
                  rating={home.rating}
                  image={home.image}
                  description={home.description}
                  homestay={home}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="p-10 sm:p-14 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-5 shadow-xl"
          >
            {/* Empty State Illustration Icon */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500/10 via-pink-500/10 to-emerald-500/10 border border-rose-500/20 text-rose-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/10 animate-bounce">
              <Heart className="w-10 h-10" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                No Saved Homestays Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Click the heart icon on any homestay card while browsing to save your dream retreats right here for easy access!
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Explore Verified Homestays</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FavoritesSection;
