import { createContext, useContext, useState, useEffect } from "react";
import API_URL from "../config/api";
import { notifySuccess, notifyError, notifyWarning, toast } from "../utils/toast";

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

  const showToast = (message, type = "success") => {
    if (type === "error") {
      notifyError(message);
    } else if (type === "warning") {
      notifyWarning(message);
    } else {
      notifySuccess(message);
    }
  };

  // Fetch favorites from backend on mount or when token changes
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/api/favorites`, {
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
    const endpoint = `${API_URL}/api/favorites/${stringId}`;

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
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
