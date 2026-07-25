import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiBuildingStorefront,
  HiGlobeAlt,
  HiArrowLeftOnRectangle,
  HiHeart,
  HiUser,
  HiClock,
} from "react-icons/hi2";
import { useFavorites } from "../context/FavoritesContext";
import Card from "../components/Card";
import { SkeletonDashboard } from "../components/ui/Skeleton";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { favorites } = useFavorites();

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
      description: "Nestled amidst lush tropical rice terraces and pristine rainforest, Ubud Rainforest Eco-Villa combines authentic Balinese architecture with modern luxury."
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
      description: "A cozy wooden alpine cabin surrounded by snow-capped Himalayan peaks and pine forests."
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
      description: "Charming Portuguese-style beach cottage situated right on the golden sands of Anjuna."
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
      description: "Immerse yourself in a 50-acre fragrant coffee and spice plantation."
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
      description: "Step into royal Rajasthani heritage with hand-carved stone arches and courtyard fountains."
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
      description: "Perched high above rolling tea gardens and mist-covered hills in Munnar."
    },
  ];

  const savedHomestayObjects = defaultHomestays.filter((h) =>
    favorites.includes(String(h.id))
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setLoading(false), 250);
      }
    };

    fetchProfile();
  }, []);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  // Mock activity feed data
  const recentActivities = [
    {
      id: 1,
      title: "Generated 5-Day Bali Eco-Itinerary",
      time: "2 hours ago",
      tag: "AI Planner",
      iconColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      id: 2,
      title: `Saved ${savedHomestayObjects.length} properties to collection`,
      time: "Recently",
      tag: "Favorites",
      iconColor: "text-teal-500 bg-teal-500/10",
    },
    {
      id: 3,
      title: "Explored Manali Alpine Retreats",
      time: "3 days ago",
      tag: "Recommendations",
      iconColor: "text-sky-500 bg-sky-500/10",
    },
  ];

  const username = user && user.email ? user.email.split("@")[0] : "Traveler";

  const scrollToSaved = () => {
    const element = document.getElementById("saved-stays-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden">
      {/* Background Animated Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30rem] h-[30rem] bg-teal-500/10 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="dashboard-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SkeletonDashboard />
          </motion.div>
        ) : (
          <motion.main
            key="dashboard-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-8 sm:space-y-12"
          >
            {/* 1. Hero Header Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-10 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                    <HiSparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your AI travel workspace</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Hello, <span className="capitalize">{username}</span> 👋
                  </h1>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-normal">
                    Welcome back to StayEase AI. Manage your custom travel plans and homestay collections.
                  </p>
                </div>

                {/* Logout Action */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleLogout}
                    aria-label="Logout account"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-sm font-semibold transition-all duration-200 cursor-pointer"
                  >
                    <HiArrowLeftOnRectangle className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* 2. Statistics Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {/* Card 1: AI Trips Generated */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <HiSparkles className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    AI Trips Generated
                  </p>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                    12
                  </h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    +3 generated this week
                  </span>
                </div>
              </motion.div>

              {/* Card 2: Saved Homestays */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={scrollToSaved}
                className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 flex items-center gap-5 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <HiBuildingStorefront className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Saved Homestays
                  </p>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {favorites.length}
                  </h3>
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                    {favorites.length > 0 ? "Saved to collection" : "No stays saved yet"}
                  </span>
                </div>
              </motion.div>

              {/* Card 3: Recommended Places */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <HiGlobeAlt className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Recommended Places
                  </p>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                    24
                  </h3>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                    98% AI match score
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* 3. Quick Actions Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Action 1: Open AI Planner */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/ai-planner"
                    className="group flex flex-col p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-200 h-full justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                      <HiSparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">🤖 Open AI Planner</h3>
                      <p className="text-xs text-emerald-100 mt-1">Create instant itineraries</p>
                    </div>
                  </Link>
                </motion.div>

                {/* Action 2: Browse Homestays */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/"
                    className="group flex flex-col p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all duration-200 h-full justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                      <HiBuildingStorefront className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">🏡 Browse Homestays</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Explore verified properties</p>
                    </div>
                  </Link>
                </motion.div>

                {/* Action 3: Saved Stays */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <button
                    onClick={scrollToSaved}
                    aria-label="View saved homestays section"
                    className="group w-full text-left flex flex-col p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white shadow-sm hover:shadow-md hover:border-rose-500/50 transition-all duration-200 h-full justify-between cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
                      <HiHeart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">❤️ Saved Stays</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {favorites.length} saved property{favorites.length === 1 ? "" : "ies"}
                      </p>
                    </div>
                  </button>
                </motion.div>

                {/* Action 4: Profile */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <button
                    onClick={() => alert(`Logged in as ${user ? user.email : "Guest"}`)}
                    aria-label="Account info settings"
                    className="group w-full text-left flex flex-col p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all duration-200 h-full justify-between cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4">
                      <HiUser className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">👤 Profile</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user ? user.email : "Account Settings"}</p>
                    </div>
                  </button>
                </motion.div>

              </div>
            </div>

            {/* 4. Real Saved Stays Section */}
            <motion.div
              id="saved-stays-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                <div className="flex items-center gap-2">
                  <HiHeart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Saved Homestays ({savedHomestayObjects.length})
                  </h2>
                </div>
                <Link
                  to="/"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Browse All Stays →
                </Link>
              </div>

              {savedHomestayObjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {savedHomestayObjects.map((home) => (
                    <Card
                      key={home.id}
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
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    You haven't saved any homestays yet. Click the heart icon on any stay to add it to your collection!
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>Browse Homestays</span>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* 4. Recent Activity Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                <div className="flex items-center gap-2">
                  <HiClock className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    Recent Activity
                  </h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Real-time Sync
                </span>
              </div>

              <div className="space-y-4">
                {recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-500/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${act.iconColor}`}>
                        <HiSparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {act.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {act.time}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {act.tag}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
