import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, CheckCircle2 } from "lucide-react";

function HeroGallery({ images, title, location }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance threshold
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation for full-screen gallery modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, images.length]);

  return (
    <div className="relative w-full space-y-4">
      {/* Desktop Airbnb-style Mosaic Gallery (hidden on small mobile, visible sm+) */}
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-4 gap-3 h-[380px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group">
        {/* Main Hero Image (Spans 2 columns on desktop) */}
        <div 
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
          aria-label="Open full screen image gallery"
          className="lg:col-span-2 relative h-full overflow-hidden cursor-pointer group/main focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIndex}
              src={images[activeImageIndex] || images[0]}
              alt={`${title} main view`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover group-hover/main:scale-105 transition-transform duration-700 ease-out"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />
          
          {/* Verified Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 sm:px-3.5 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/80 shadow-md flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Stay</span>
            </span>
          </div>

          {/* Fullscreen Expand Hint */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
            aria-label="View Fullscreen Gallery"
            className="absolute bottom-4 right-4 z-10 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-xs font-medium focus:opacity-100 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
            <span>View Fullscreen</span>
          </button>
        </div>

        {/* 2x2 Grid of 4 Thumbnails */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3 h-full">
          {images.slice(1, 5).map((img, idx) => {
            const actualIndex = idx + 1;
            const isSelected = activeImageIndex === actualIndex;
            return (
              <div
                key={actualIndex}
                onClick={() => setActiveImageIndex(actualIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveImageIndex(actualIndex)}
                aria-label={`Select photo ${actualIndex}`}
                className={`relative h-full overflow-hidden cursor-pointer rounded-xl group/thumb focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                  isSelected ? "ring-4 ring-emerald-500 ring-offset-2 ring-offset-slate-950" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${title} preview ${actualIndex}`}
                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500 ease-out"
                />
                <div className={`absolute inset-0 transition-colors duration-300 ${
                  isSelected ? "bg-emerald-500/10" : "bg-black/20 hover:bg-black/0"
                }`} />
                {actualIndex === 4 && images.length > 5 && (
                  <div 
                    onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white font-bold text-xs sm:text-sm cursor-pointer"
                  >
                    <span>+{images.length - 4} More</span>
                    <span className="text-xs text-slate-300 font-normal mt-0.5">View Gallery</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Thumbnail Selector Row */}
      <div className="hidden sm:flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            aria-label={`View photo thumbnail ${index + 1}`}
            className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              activeImageIndex === index
                ? "border-emerald-500 scale-105 shadow-md shadow-emerald-500/20"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Mobile Swipeable Gallery Slider */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="block sm:hidden relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden bg-slate-900 shadow-xl group"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImageIndex}
            src={images[activeImageIndex] || images[0]}
            alt={`${title} mobile view`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Swipe Control Arrows */}
        <button
          onClick={prevImage}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextImage}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Counter Badge */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-white">
          {activeImageIndex + 1} / {images.length}
        </div>

        {/* Mobile Carousel Indicators (Dots) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              aria-label={`Go to photo slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeImageIndex === idx ? "w-5 bg-emerald-500" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Gallery Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white z-10">
              <div>
                <h4 className="text-base sm:text-lg font-bold">{title}</h4>
                <p className="text-xs text-slate-400">{location}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close fullscreen gallery"
                className="p-2 sm:p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Main Photo */}
            <div className="relative flex-1 flex items-center justify-center my-4">
              <motion.img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt={`Gallery photo ${activeImageIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />

              <button
                onClick={prevImage}
                aria-label="Previous photo in modal"
                className="absolute left-2 sm:left-6 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextImage}
                aria-label="Next photo in modal"
                className="absolute right-2 sm:right-6 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Select photo ${idx + 1}`}
                  className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? "border-emerald-500 scale-105" : "border-transparent opacity-50"
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroGallery;
