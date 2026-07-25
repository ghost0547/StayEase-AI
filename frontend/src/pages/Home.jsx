import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import Card from "../components/Card";
import SearchFilterBar from "../components/SearchFilterBar";
import { SkeletonCard } from "../components/ui/Skeleton";
import { HiSparkles, HiMagnifyingGlass } from "react-icons/hi2";

function Home() {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Curated fallback homestays with realistic royalty-free travel images
  const defaultHomestays = [
    {
      id: 1,
      name: "Ubud Rainforest Eco-Villa",
      title: "Ubud Rainforest Eco-Villa & Spa",
      location: "Ubud, Bali, Indonesia",
      price: 3499,
      category: "Nature & Eco Villa",
      rating: "4.96",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
      description: "Nestled amidst lush tropical rice terraces and pristine rainforest, Ubud Rainforest Eco-Villa combines authentic Balinese architecture with modern luxury. Enjoy private infinity pools, open-air living spaces, organic farm-to-table dining, and serene mountain panoramas."
    },
    {
      id: 2,
      name: "Manali Alpine Haven",
      title: "Manali Alpine Haven & Chalet",
      location: "Manali, Himachal Pradesh, India",
      price: 2899,
      category: "Mountain Retreat",
      rating: "4.92",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80",
      description: "A cozy wooden alpine cabin surrounded by snow-capped Himalayan peaks and pine forests. Features a stone fireplace, stargazing deck, heated wooden floors, and panoramic mountain valley views."
    },
    {
      id: 3,
      name: "Goa Heritage Sunset Cottage",
      title: "Goa Heritage Sunset Cottage",
      location: "Anjuna, Goa, India",
      price: 4199,
      category: "Beachfront Villa",
      rating: "4.98",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      description: "Charming Portuguese-style beach cottage situated right on the golden sands of Anjuna. Includes direct beach access, private outdoor jacuzzi, tropical garden dining, and breathtaking Arabian Sea sunsets."
    },
    {
      id: 4,
      name: "Coorg Coffee Estate Stay",
      title: "Coorg Coffee Estate Stay",
      location: "Coorg, Karnataka, India",
      price: 2599,
      category: "Luxury Plantation",
      rating: "4.89",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1600&q=80",
      description: "Immerse yourself in a 50-acre fragrant coffee and spice plantation. Experience guided coffee tasting tours, private veranda swings, fresh estate brew mornings, and mist-covered green hills."
    },
    {
      id: 5,
      name: "Jaipur Royal Haveli Suite",
      title: "Jaipur Royal Haveli Suite",
      location: "Jaipur, Rajasthan, India",
      price: 4999,
      category: "Heritage Palace",
      rating: "4.95",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      description: "Step into royal Rajasthani heritage with hand-carved stone arches, courtyard fountains, traditional folk music evenings, and authentic royal thali dining under the starlit Pink City sky."
    },
    {
      id: 6,
      name: "Munnar Tea Valley Cabin",
      title: "Munnar Tea Valley Sanctuary",
      location: "Munnar, Kerala, India",
      price: 3199,
      category: "Hilltop Sanctuary",
      rating: "4.91",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
      description: "Perched high above rolling tea gardens and mist-covered hills in Munnar. Features floor-to-ceiling glass windows, private tea tasting, campfire deck, and serene nature trails."
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/homestays")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHomestays(data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // Short artificial delay to demonstrate clean smooth skeleton transition if API responds instantly
        setTimeout(() => setLoading(false), 300);
      });
  }, []);

  const displayList = homestays.length > 0 ? homestays : defaultHomestays;

  // Filter and Sort Logic using useMemo for performance
  const filteredHomestays = useMemo(() => {
    return displayList
      .filter((home) => {
        // 1. Search Bar Filter (name, city/location, description, category)
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase().trim();
          const name = (home.name || home.title || "").toLowerCase();
          const loc = (home.location || "").toLowerCase();
          const desc = (home.description || "").toLowerCase();
          const cat = (home.category || "").toLowerCase();

          const matchesSearch =
            name.includes(q) || loc.includes(q) || desc.includes(q) || cat.includes(q);

          if (!matchesSearch) return false;
        }

        // 2. Category Chips Filter
        if (activeCategory !== "All") {
          const c = activeCategory.toLowerCase();
          const cat = (home.category || "").toLowerCase();
          const name = (home.name || home.title || "").toLowerCase();
          const desc = (home.description || "").toLowerCase();
          const loc = (home.location || "").toLowerCase();
          const price = Number(home.price) || 0;

          let matchesCat = false;
          if (c === "mountain") {
            matchesCat =
              cat.includes("mountain") ||
              cat.includes("hill") ||
              name.includes("mountain") ||
              name.includes("alpine") ||
              name.includes("tea") ||
              desc.includes("mountain") ||
              desc.includes("himalayan") ||
              desc.includes("hill") ||
              loc.includes("manali") ||
              loc.includes("munnar");
          } else if (c === "beach") {
            matchesCat =
              cat.includes("beach") ||
              cat.includes("coastal") ||
              name.includes("beach") ||
              name.includes("sunset") ||
              desc.includes("beach") ||
              desc.includes("arabian") ||
              loc.includes("goa") ||
              loc.includes("anjuna");
          } else if (c === "luxury") {
            matchesCat =
              cat.includes("luxury") ||
              cat.includes("palace") ||
              cat.includes("heritage") ||
              name.includes("luxury") ||
              name.includes("spa") ||
              name.includes("palace") ||
              name.includes("haveli") ||
              desc.includes("luxury") ||
              price >= 4000;
          } else if (c === "budget") {
            matchesCat =
              price <= 3000 ||
              cat.includes("budget") ||
              cat.includes("affordable") ||
              desc.includes("cozy") ||
              desc.includes("budget");
          } else if (c === "family") {
            matchesCat =
              cat.includes("family") ||
              cat.includes("plantation") ||
              cat.includes("retreat") ||
              cat.includes("palace") ||
              name.includes("haven") ||
              name.includes("suite") ||
              name.includes("cottage") ||
              desc.includes("family") ||
              desc.includes("dining") ||
              desc.includes("living");
          } else if (c === "adventure") {
            matchesCat =
              cat.includes("nature") ||
              cat.includes("eco") ||
              cat.includes("mountain") ||
              name.includes("eco") ||
              name.includes("rainforest") ||
              desc.includes("adventure") ||
              desc.includes("trail") ||
              desc.includes("hiking") ||
              desc.includes("rainforest") ||
              desc.includes("plantation");
          } else {
            matchesCat = cat.includes(c) || name.includes(c) || desc.includes(c);
          }

          if (!matchesCat) return false;
        }

        // 3. Price Filter
        if (priceFilter !== "all") {
          const price = Number(home.price) || 0;
          if (priceFilter === "under-2000" && price >= 2000) return false;
          if (
            priceFilter === "2000-5000" &&
            (price < 2000 || price > 5000)
          )
            return false;
          if (priceFilter === "above-5000" && price <= 5000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // 4. Sort Dropdown
        if (sortBy === "price-low-high") {
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        }
        if (sortBy === "price-high-low") {
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        }
        if (sortBy === "highest-rating") {
          return (
            (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0)
          );
        }
        return 0; // "recommended"
      });
  }, [displayList, searchQuery, activeCategory, priceFilter, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setPriceFilter("all");
    setSortBy("recommended");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Hero />

      {/* Featured Homestays Section */}
      <section id="homestays" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs sm:text-sm font-semibold">
            <HiSparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>AI-Curated Selections</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Homestays
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-normal leading-relaxed">
            Discover handpicked stays recommended for your next adventure.
          </p>
        </div>

        {/* Premium Search & Filter Bar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={displayList.length}
          filteredCount={filteredHomestays.length}
          onClearFilters={handleClearFilters}
        />

        {/* Responsive Cards Grid / Skeleton / Empty State */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : filteredHomestays.length > 0 ? (
            <motion.div
              key="grid-view"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {filteredHomestays.map((home, index) => (
                <motion.div
                  key={home.id || index}
                  layout
                  variants={itemVariants}
                  className="h-full"
                >
                  <Card
                    id={home.id}
                    title={home.name || home.title}
                    location={home.location}
                    price={home.price}
                    category={
                      home.category || (index % 2 === 0 ? "Luxury Stay" : "Nature Retreat")
                    }
                    rating={home.rating || "4.92"}
                    image={home.image}
                    description={home.description}
                    homestay={home}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-2xl shadow-2xl max-w-md mx-auto my-12 space-y-5"
            >
              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-4xl shadow-xl shadow-cyan-500/10 animate-pulse">
                <HiMagnifyingGlass className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  No Homestays Found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                aria-label="Clear active filters"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

export default Home;