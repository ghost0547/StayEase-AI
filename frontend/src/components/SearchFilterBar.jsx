import { motion, AnimatePresence } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiXMark,
  HiChevronDown,
  HiFunnel,
  HiArrowsUpDown,
} from "react-icons/hi2";
import {
  LuLayoutGrid,
  LuMountain,
  LuWaves,
  LuCrown,
  LuWallet,
  LuUsers,
  LuCompass,
} from "react-icons/lu";

const CATEGORY_CHIPS = [
  { label: "All", icon: LuLayoutGrid },
  { label: "Mountain", icon: LuMountain },
  { label: "Beach", icon: LuWaves },
  { label: "Luxury", icon: LuCrown },
  { label: "Budget", icon: LuWallet },
  { label: "Family", icon: LuUsers },
  { label: "Adventure", icon: LuCompass },
];

function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy,
  totalCount,
  filteredCount,
  onClearFilters,
}) {
  const isFiltered =
    searchQuery.trim() !== "" ||
    activeCategory !== "All" ||
    priceFilter !== "all" ||
    sortBy !== "recommended";

  return (
    <div className="w-full bg-white/75 dark:bg-slate-900/75 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl shadow-cyan-500/5 hover:border-cyan-500/30 mb-8 sm:mb-10 space-y-4 sm:space-y-6 transition-all duration-300">
      {/* Top Controls Row: Dominant Search Bar (6 cols) + Price Dropdown (3 cols) + Sort Dropdown (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* 1. Search Bar - Dominant Control (6/12 cols on desktop) */}
        <div className="md:col-span-12 lg:col-span-6 relative">
          <div className="relative flex items-center">
            <HiMagnifyingGlass className="w-5 h-5 text-slate-400 dark:text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search homestays, cities or locations..."
              aria-label="Search homestays, cities or locations"
              className="w-full pl-11 pr-10 py-3 sm:py-3.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 rounded-2xl text-xs sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
                className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              >
                <HiXMark className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Price Filter Dropdown (3/12 cols on desktop) */}
        <div className="md:col-span-6 lg:col-span-3 relative">
          <div className="relative flex items-center">
            <HiFunnel className="w-4 h-4 text-cyan-600 dark:text-cyan-400 absolute left-3.5 pointer-events-none shrink-0" />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              aria-label="Filter homestays by price range"
              className="w-full pl-10 pr-9 py-3 sm:py-3.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 appearance-none cursor-pointer transition-all duration-200"
            >
              <option value="all">All Prices</option>
              <option value="under-2000">Under ₹2000</option>
              <option value="2000-5000">₹2000–₹5000</option>
              <option value="above-5000">Above ₹5000</option>
            </select>
            <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none shrink-0" />
          </div>
        </div>

        {/* 3. Sort Dropdown (3/12 cols on desktop) */}
        <div className="md:col-span-6 lg:col-span-3 relative">
          <div className="relative flex items-center">
            <HiArrowsUpDown className="w-4 h-4 text-teal-600 dark:text-teal-400 absolute left-3.5 pointer-events-none shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort homestays"
              className="w-full pl-10 pr-9 py-3 sm:py-3.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 appearance-none cursor-pointer transition-all duration-200"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="highest-rating">Highest Rating</option>
            </select>
            <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none shrink-0" />
          </div>
        </div>
      </div>

      {/* Filter Chips Scrollable Row with Icons */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1.5 pt-1 scrollbar-none">
        {CATEGORY_CHIPS.map((chip) => {
          const Icon = chip.icon;
          const isActive = activeCategory === chip.label;
          return (
            <motion.button
              key={chip.label}
              onClick={() => setActiveCategory(chip.label)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`Filter by ${chip.label}`}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/25 border border-cyan-400/50"
                  : "bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 backdrop-blur-md"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? "text-slate-950" : "text-cyan-500 dark:text-cyan-400"}`} />
              <span>{chip.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Results Counter & Animated Reset Filter Button */}
      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <span className="text-cyan-600 dark:text-cyan-400 font-extrabold text-sm sm:text-lg">
            {filteredCount}
          </span>
          <span>Properties Found</span>
        </div>

        <AnimatePresence>
          {isFiltered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 8 }}
              transition={{ duration: 0.2 }}
              onClick={onClearFilters}
              aria-label="Reset all active search and filter options"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            >
              <HiXMark className="w-3.5 h-3.5 shrink-0" />
              <span>Reset Filters</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchFilterBar;
