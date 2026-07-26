import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { useFavorites } from "../context/FavoritesContext";
import { SkeletonDetail } from "../components/ui/Skeleton";

import HeroGallery from "../components/homestay/HeroGallery";
import StickyBookingCard from "../components/homestay/StickyBookingCard";
import PropertyHighlights from "../components/homestay/PropertyHighlights";
import AboutProperty from "../components/homestay/AboutProperty";
import AmenitiesGrid from "../components/homestay/AmenitiesGrid";
import NearbyAttractions from "../components/homestay/NearbyAttractions";
import GuestReviews from "../components/homestay/GuestReviews";
import SimilarHomestays from "../components/homestay/SimilarHomestays";

function HomestayDetails() {
  const [copied, setCopied] = useState(false);
  const routerLocation = useLocation();
  const passedHomestay = routerLocation.state?.homestay;

  const [loading, setLoading] = useState(!passedHomestay);
  const [fetchedHomestay, setFetchedHomestay] = useState(null);

  const { id: paramId } = useParams();
  const { isFavorite, toggleFavorite, loadingIds } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (passedHomestay) {
      return;
    }

    let isMounted = true;
    const homestayId = paramId || "1";

    fetch(`http://127.0.0.1:8000/homestays/${homestayId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && (data.id || data.name)) {
          setFetchedHomestay(data);
        }
      })
      .catch((err) => {
        console.log("Using local property fallback context", err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [paramId, passedHomestay]);

  const activeHomestayData = passedHomestay || fetchedHomestay;

  const fallbackImages = [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
  ];

  const homestayId = Number(activeHomestayData?.id || paramId) || 1;
  const mainImage = activeHomestayData?.image || fallbackImages[(Math.abs(homestayId) - 1) % fallbackImages.length];

  // Complementary high quality photo sets to ensure 5 photos in gallery
  const extraPhotos = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  ];

  const galleryImages = [
    mainImage,
    ...extraPhotos.slice((homestayId % extraPhotos.length)),
    ...extraPhotos,
  ].slice(0, 5);

  // Property Details Construction
  const title = activeHomestayData?.name || activeHomestayData?.title || "Serene Escape Homestay & Villa";
  const location = activeHomestayData?.location || "Nainital, Uttarakhand, India";
  const price = activeHomestayData?.price || 2999;
  const rating = activeHomestayData?.rating || "4.92";
  const reviewsCount = activeHomestayData?.reviewsCount || Math.floor(65 + (homestayId * 19) % 70);
  const category = activeHomestayData?.category || "Featured Stay";
  const description = activeHomestayData?.description ||
    `Experience an unforgettable luxury retreat at ${title} situated in ${location}. Designed with modern eco-friendly architecture, tranquil mountain views, and personalized hospitality tailored for relaxing vacations.`;

  const aiInsights = activeHomestayData?.aiInsights || {
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
    matchScore: `${95 + (homestayId % 4)}%`,
  };

  const propertyId = activeHomestayData?.id || homestayId;
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Orbs */}
      <div className="absolute top-10 left-10 w-[35rem] h-[35rem] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[35rem] h-[35rem] bg-teal-500/10 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto space-y-8 relative z-10"
          >
            {/* Top Navigation Bar & Action Icons */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Homestays</span>
              </Link>

              <div className="flex items-center gap-3">
                {/* Share Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  aria-label="Share property link"
                  className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Share2 className="w-4 h-4 text-emerald-500" />
                  <span>{copied ? "Link Copied!" : "Share"}</span>
                </motion.button>

                {/* Favorite Heart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(propertyId, title)}
                  disabled={isLoadingFav}
                  aria-label="Add property to favorites"
                  className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5 text-xs font-semibold"
                >
                  {isLoadingFav ? (
                    <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? "text-rose-500 fill-rose-500" : "text-slate-400"
                        }`}
                      />
                      <span>{isFav ? "Saved" : "Save"}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Title & Location Header */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  {category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Host
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{location}</span>
              </p>
            </div>

            {/* 1. Hero Image Gallery */}
            <HeroGallery images={galleryImages} title={title} location={location} />

            {/* Main Grid Layout (Left Content vs Right Sticky Booking Card) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-4">
              
              {/* Left Content Column (2 Cols on Desktop) */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 3. Property Highlights */}
                <PropertyHighlights />

                {/* 4. About Property Section */}
                <AboutProperty
                  title={title}
                  location={location}
                  description={description}
                />

                {/* 5. Amenities Grid */}
                <AmenitiesGrid />

                {/* AI Recommendation Insights Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-slate-900/80 backdrop-blur-xl border border-emerald-500/30 p-6 sm:p-8 shadow-xl shadow-emerald-500/10 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          AI Preference Insights
                        </h3>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                          Match score: <strong className="font-extrabold">{aiInsights.matchScore}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                    <div className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold shrink-0">✨</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Ideal For: </strong>
                        {aiInsights.bestFor}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-teal-500 font-bold shrink-0">✨</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Best Season to Visit: </strong>
                        {aiInsights.idealSeason}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 6. Nearby Attractions */}
                <NearbyAttractions location={location} />

                {/* 7. Guest Reviews Section */}
                <GuestReviews rating={rating} reviewsCount={reviewsCount} />

              </div>

              {/* Right Column: 2. Sticky Booking Card */}
              <div className="lg:col-span-1">
                <StickyBookingCard
                  propertyId={propertyId}
                  price={price}
                  rating={rating}
                  reviewsCount={reviewsCount}
                  title={title}
                />
              </div>

            </div>

            {/* 8. Similar Homestays */}
            <SimilarHomestays currentId={propertyId} />

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomestayDetails;
