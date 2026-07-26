import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  Calendar,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Info,
} from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

function StickyBookingCard({ propertyId, price, rating, reviewsCount, title }) {
  const { isFavorite, toggleFavorite, loadingIds } = useFavorites();
  
  // Date State with realistic defaults
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 3);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 5);

  const formatDateForInput = (d) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDateForInput(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDateForInput(defaultCheckOut));
  
  // Guests State
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  
  // Reservation Modal / Toast state
  const [isReserved, setIsReserved] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  const isFav = isFavorite(propertyId);
  const isLoadingFav = loadingIds.has(String(propertyId));

  // Compute total nights and calculations
  const dateIn = new Date(checkIn);
  const dateOut = new Date(checkOut);
  const diffTime = Math.max(0, dateOut - dateIn);
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 2;

  const basePrice = Number(price) || 2999;
  const subtotal = basePrice * nights;
  const cleaningFee = Math.round(basePrice * 0.08);
  const serviceFee = Math.round(basePrice * 0.05);
  const discount = Math.round(subtotal * 0.05); // 5% Special AI StayEase Discount
  const totalPrice = subtotal + cleaningFee + serviceFee - discount;

  const handleReserve = () => {
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      setIsReserved(true);
    }, 900);
  };

  return (
    <div className="lg:sticky lg:top-28 space-y-6">
      <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-7 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/80 space-y-5 sm:space-y-6 relative overflow-hidden">
        
        {/* Decorative Top Accent Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        {/* Top Header: Price & Rating */}
        <div className="flex items-start justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ₹{basePrice.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">/ night</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
              <span>Free cancellation up to 48 hours</span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-xs font-bold shrink-0">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 shrink-0" />
            <span>{rating}</span>
            <span className="text-slate-400 font-normal">({reviewsCount})</span>
          </div>
        </div>

        {/* Check-In / Check-Out & Guests Selection Grid */}
        <div className="space-y-3">
          {/* Dates Input Container */}
          <div className="grid grid-cols-2 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 overflow-hidden divide-x divide-slate-200 dark:divide-slate-700/80">
            <div className="p-2.5 sm:p-3 space-y-1">
              <label className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-500 shrink-0" /> Check-In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
              />
            </div>

            <div className="p-2.5 sm:p-3 space-y-1">
              <label className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-500 shrink-0" /> Check-Out
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="relative">
            <div
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors"
            >
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-500 shrink-0" /> Guests
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {adults + children} Guest{adults + children > 1 ? "s" : ""} ({adults} Adult{adults > 1 ? "s" : ""}
                  {children > 0 ? `, ${children} Child` : ""})
                </p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${showGuestDropdown ? "rotate-180" : ""}`} />
            </div>

            {/* Guests Dropdown Popover */}
            <AnimatePresence>
              {showGuestDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 top-full mt-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl z-30 space-y-4"
                >
                  {/* Adults Counter */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Adults</p>
                      <p className="text-[10px] text-slate-400">Age 13+</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(Math.min(10, adults + 1))}
                        className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Children</p>
                      <p className="text-[10px] text-slate-400">Ages 2-12</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(Math.min(6, children + 1))}
                        className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowGuestDropdown(false)}
                    className="w-full py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pricing Calculation Summary */}
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex justify-between">
            <span>₹{basePrice.toLocaleString()} x {nights} night{nights > 1 ? "s" : ""}</span>
            <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Cleaning & Sanitation Fee</span>
            <span className="font-semibold text-slate-900 dark:text-white">₹{cleaningFee.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>StayEase Concierge Fee</span>
            <span className="font-semibold text-slate-900 dark:text-white">₹{serviceFee.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 shrink-0" /> Special AI Member Discount</span>
            <span>-₹{discount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-800">
            <span>Total Before Taxes</span>
            <span className="text-emerald-600 dark:text-emerald-400">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons: Reserve & Favorite */}
        <div className="space-y-3 pt-2">
          {/* Primary Reserve Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReserve}
            disabled={isReserving}
            aria-label="Reserve homestay"
            className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all duration-300 cursor-pointer disabled:opacity-75"
          >
            {isReserving ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Reserve Stay</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </>
            )}
          </motion.button>

          {/* Secondary Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleFavorite(propertyId, title)}
            disabled={isLoadingFav}
            aria-label="Add to favorites"
            className="w-full py-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoadingFav ? (
              <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Heart className={`w-4 h-4 shrink-0 ${isFav ? "text-rose-500 fill-rose-500" : "text-slate-400"}`} />
                <span>{isFav ? "Saved to Favorites" : "Add to Favorites"}</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Small Guarantee Notice */}
        <p className="text-[10px] sm:text-[11px] text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
          <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>You won't be charged yet until confirmation</span>
        </p>

      </div>

      {/* Confirmation Modal UI */}
      <AnimatePresence>
        {isReserved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Reservation Request Sent!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your reservation for <strong className="text-emerald-500">{title}</strong> ({nights} night{nights > 1 ? "s" : ""}) has been held successfully.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-left space-y-1 font-mono">
                <p><strong>Check-In:</strong> {checkIn}</p>
                <p><strong>Check-Out:</strong> {checkOut}</p>
                <p><strong>Estimated Total:</strong> ₹{totalPrice.toLocaleString()}</p>
              </div>

              <button
                onClick={() => setIsReserved(false)}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Close & View Itinerary
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default StickyBookingCard;
