import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";
import { SkeletonDashboard } from "../components/ui/Skeleton";

import HeroGreeting from "../components/dashboard/HeroGreeting";
import TravelStats from "../components/dashboard/TravelStats";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTrips from "../components/dashboard/RecentTrips";
import FavoritesSection from "../components/dashboard/FavoritesSection";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import AchievementBadges from "../components/dashboard/AchievementBadges";
import RecommendedDestinations from "../components/dashboard/RecommendedDestinations";

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
    localStorage.removeItem("favorites_cache");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

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
        console.error("Profile fetch error:", error);
      } finally {
        setTimeout(() => setLoading(false), 250);
      }
    };

    fetchProfile();
  }, []);

  const scrollToFavorites = () => {
    const el = document.getElementById("saved-stays-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTrips = () => {
    const el = document.getElementById("recent-trips-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Animated Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[35rem] h-[35rem] bg-teal-500/10 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10"
          >
            {/* 1. Personalized Hero Greeting */}
            <HeroGreeting user={user} handleLogout={handleLogout} />

            {/* 2. Travel Statistics */}
            <TravelStats
              savedCount={favorites.length}
              scrollToFavorites={scrollToFavorites}
            />

            {/* 3. Quick Actions */}
            <QuickActions
              scrollToFavorites={scrollToFavorites}
              scrollToTrips={scrollToTrips}
            />

            {/* 4. Recent AI Trips */}
            <RecentTrips />

            {/* 5. Favorites Section */}
            <FavoritesSection
              savedHomestayObjects={savedHomestayObjects}
              favoritesCount={favorites.length}
            />

            {/* 6. Recent Activity Timeline */}
            <ActivityTimeline savedCount={favorites.length} />

            {/* 7. Travel Achievement Badges */}
            <AchievementBadges />

            {/* 8. Recommended Destinations */}
            <RecommendedDestinations />

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
