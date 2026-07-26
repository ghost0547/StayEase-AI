import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites_cache");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loadingIds, setLoadingIds] = useState(new Set());
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Fetch favorites from backend on mount or when token changes
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://127.0.0.1:8000/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const favList = (data.favorites || []).map(String);
          setFavorites(favList);
          localStorage.setItem("favorites_cache", JSON.stringify(favList));
        }
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  const isFavorite = (id) => {
    return favorites.includes(String(id));
  };

  const toggleFavorite = async (id, title = "Homestay") => {
    const stringId = String(id);
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please log in to save homestays", "error");
      return false;
    }

    setLoadingIds((prev) => new Set(prev).add(stringId));

    const currentlyFav = isFavorite(stringId);
    const method = currentlyFav ? "DELETE" : "POST";
    const endpoint = `http://127.0.0.1:8000/api/favorites/${stringId}`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let updated;
        if (currentlyFav) {
          updated = favorites.filter((favId) => favId !== stringId);
          showToast(`Removed "${title}" from saved stays`, "success");
        } else {
          updated = [...favorites, stringId];
          showToast(`Saved "${title}" to favorites!`, "success");
        }

        setFavorites(updated);
        localStorage.setItem("favorites_cache", JSON.stringify(updated));
        setLoadingIds((prev) => {
          const next = new Set(prev);
          next.delete(stringId);
          return next;
        });
        return true;
      } else {
        const errorData = await response.json().catch(() => ({}));
        showToast(errorData.detail || "Failed to update favorite status", "error");
        setLoadingIds((prev) => {
          const next = new Set(prev);
          next.delete(stringId);
          return next;
        });
        return false;
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Could not update favorite.", "error");
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(stringId);
        return next;
      });
      return false;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        loadingIds,
        toast,
        showToast,
      }}
    >
      {children}

      {/* Floating Toast Notification with Framer Motion */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-none"
          >
            <div
              className={`px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 ${
                toast.type === "error"
                  ? "bg-rose-500/90 border-rose-400 text-white shadow-rose-500/30"
                  : "bg-slate-900/90 dark:bg-emerald-950/90 border-emerald-500/40 text-emerald-300 shadow-emerald-500/20"
              }`}
            >
              <span>{toast.type === "error" ? "⚠️" : "❤️"}</span>
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
