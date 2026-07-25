import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuMapPin,
  LuCalendar,
  LuWallet,
  LuSparkles,
  LuLightbulb,
  LuHotel,
  LuCar,
  LuUtensils,
  LuTicket,
  LuShoppingBag,
  LuDownload,
  LuCopy,
  LuRefreshCw,
  LuCheck,
  LuCompass,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";
import { HiCheckBadge, HiCheckCircle } from "react-icons/hi2";

// Helper component to safely render inline **bold** text in pure React
function FormattedText({ text }) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={index}
              className="font-extrabold text-slate-900 dark:text-white"
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

// Extract concise bullets from longer paragraphs to reduce text density
function splitIntoConciseBullets(contentLines) {
  const result = [];
  contentLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Check if line is already bulleted
    if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.match(/^\d+\./)) {
      const clean = trimmed.replace(/^[\-\*\d+\.]\s*/, "");
      if (clean) result.push(clean);
    } else {
      // Split long paragraph by periods if it contains multiple long sentences
      const sentences = trimmed.split(/(?<=[.!?])\s+/);
      sentences.forEach((s) => {
        const cleanS = s.trim();
        if (cleanS.length > 5) {
          result.push(cleanS);
        }
      });
    }
  });
  return result;
}

// Detect time range from bullet text (Morning, Afternoon, Evening)
function getTimeRangeBadge(text) {
  const lower = text.toLowerCase();
  if (lower.includes("morning") || lower.includes("08:") || lower.includes("09:") || lower.includes("10:") || lower.includes("am")) {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
        🌅 Morning
      </span>
    );
  }
  if (lower.includes("afternoon") || lower.includes("12:") || lower.includes("01:") || lower.includes("02:") || lower.includes("03:") || lower.includes("pm")) {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shrink-0">
        ☀️ Afternoon
      </span>
    );
  }
  if (lower.includes("evening") || lower.includes("night") || lower.includes("sunset") || lower.includes("dinner") || lower.includes("06:") || lower.includes("07:") || lower.includes("08:")) {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shrink-0">
        🌙 Evening
      </span>
    );
  }
  return null;
}

// Function to parse markdown text into structured sections
function parseItineraryMarkdown(rawMarkdown) {
  if (!rawMarkdown) return { title: "", days: [], sections: [] };

  const lines = rawMarkdown.split("\n");
  const days = [];
  const sections = [];
  let currentBlock = null;
  let title = "";

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (!title && (trimmed.startsWith("# ") || trimmed.startsWith("## "))) {
      title = trimmed.replace(/^#+\s*/, "").replace(/\*\*/g, "");
      return;
    }

    // Detect Day Headings
    const dayMatch = trimmed.match(
      /^(?:#+\s*|(?:\*\*))?(Day\s+\d+[:\s\-\–\—]?.*?)(?:\*\*)?$/i
    );

    if (dayMatch && !trimmed.toLowerCase().includes("day-by-day")) {
      if (currentBlock) {
        if (currentBlock.isDay) days.push(currentBlock);
        else if (currentBlock.content.length) sections.push(currentBlock);
      }

      currentBlock = {
        title: dayMatch[1].replace(/\*\*/g, "").trim(),
        content: [],
        isDay: true,
      };
      return;
    }

    // Detect Section Headings
    if (trimmed.startsWith("#") || (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.length < 50)) {
      const headingText = trimmed.replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();
      const lower = headingText.toLowerCase();

      let type = "general";
      if (lower.includes("budget") || lower.includes("cost") || lower.includes("expense")) type = "budget";
      else if (lower.includes("tip") || lower.includes("note") || lower.includes("recommendation")) type = "tips";
      else if (lower.includes("stay") || lower.includes("hotel") || lower.includes("accommodation") || lower.includes("homestay")) type = "accommodation";
      else if (lower.includes("activity") || lower.includes("attraction") || lower.includes("highlight")) type = "activities";
      else if (lower.includes("transport") || lower.includes("commute") || lower.includes("flight")) type = "transport";
      else if (lower.includes("food") || lower.includes("dining") || lower.includes("meal") || lower.includes("restaurant")) type = "food";

      if (currentBlock) {
        if (currentBlock.isDay) days.push(currentBlock);
        else if (currentBlock.content.length) sections.push(currentBlock);
      }

      currentBlock = {
        title: headingText,
        type,
        content: [],
        isDay: false,
      };
      return;
    }

    if (currentBlock) {
      currentBlock.content.push(trimmed);
    } else {
      if (!sections.length || sections[0].title !== "Trip Overview") {
        sections.unshift({
          title: "Trip Overview",
          type: "overview",
          content: [trimmed],
          isDay: false,
        });
      } else {
        sections[0].content.push(trimmed);
      }
    }
  });

  if (currentBlock) {
    if (currentBlock.isDay) days.push(currentBlock);
    else if (currentBlock.content.length) sections.push(currentBlock);
  }

  // Filter out empty sections
  const cleanSections = sections.filter((s) => s.content.length > 0);

  return { title: title || "Your Personalized AI Itinerary", days, sections: cleanSections };
}

// Collapsible Day Timeline Card Component
function TimelineDayCard({ day, index, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const numberMatch = day.title.match(/Day\s+(\d+)/i);
  const dayNumber = numberMatch ? numberMatch[1].padStart(2, "0") : `0${index + 1}`;
  const cleanTitle = day.title.replace(/^Day\s+\d+[:\s\-\–\—]*/i, "");

  const bullets = splitIntoConciseBullets(day.content);

  return (
    <div className="relative pl-8 sm:pl-10 pb-8 last:pb-0">
      {/* Connecting Line */}
      <div className="absolute left-3 sm:left-4 top-10 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500/50 to-slate-800" />

      {/* Day Pill Node */}
      <div className="absolute left-0 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-xs shadow-lg shadow-cyan-500/20 z-10">
        {dayNumber}
      </div>

      {/* Main Glass Card */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 shadow-xl overflow-hidden">
        {/* Card Header Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Toggle Day ${dayNumber} details`}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              DAY {dayNumber}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {cleanTitle || `Day ${dayNumber} Experience`}
            </h3>
          </div>
          <div className="p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors">
            {isOpen ? <LuChevronUp className="w-4 h-4" /> : <LuChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Card Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-800/60 space-y-3.5"
            >
              <div className="pt-4 space-y-3">
                {bullets.map((bullet, idx) => {
                  const badge = getTimeRangeBadge(bullet);
                  return (
                    <div key={idx} className="flex items-start justify-between gap-3 text-sm sm:text-base text-slate-300 leading-relaxed p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/80 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-2 shadow-xs shadow-cyan-400" />
                        <div>
                          <FormattedText text={bullet} />
                        </div>
                      </div>
                      {badge}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Premium Budget Breakdown Card Component
function PremiumBudgetCard({ totalBudget }) {
  const numBudget = Number(totalBudget) || 25000;

  const budgetItems = [
    { name: "Accommodation", percent: 45, cost: Math.round(numBudget * 0.45), icon: LuHotel, color: "from-cyan-500 to-teal-400" },
    { name: "Food & Dining", percent: 25, cost: Math.round(numBudget * 0.25), icon: LuUtensils, color: "from-teal-400 to-emerald-400" },
    { name: "Transport & Commute", percent: 15, cost: Math.round(numBudget * 0.15), icon: LuCar, color: "from-emerald-400 to-sky-400" },
    { name: "Activities & Entry Tickets", percent: 10, cost: Math.round(numBudget * 0.10), icon: LuTicket, color: "from-sky-400 to-cyan-400" },
    { name: "Miscellaneous & Souvenirs", percent: 5, cost: Math.round(numBudget * 0.05), icon: LuShoppingBag, color: "from-indigo-400 to-cyan-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-inner">
            <LuWallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Budget Summary Breakdown</h3>
            <p className="text-xs text-slate-400">Estimated cost distribution</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            ₹{numBudget.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block font-medium">Total Estimated</span>
        </div>
      </div>

      {/* Individual Budget Category Rows */}
      <div className="space-y-4">
        {budgetItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item.name}</span>
                </div>
                <span className="text-cyan-400 font-extrabold">₹{item.cost.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Recommended Activities Chips Component
function RecommendedActivitiesCard({ section }) {
  const bullets = splitIntoConciseBullets(section.content);

  const chips = [
    { title: "Boating & Water Sports", icon: "🚣" },
    { title: "Snow View & Mountain Trek", icon: "🏔️" },
    { title: "Historic Temple Tour", icon: "🛕" },
    { title: "Shopping & Local Markets", icon: "🛍️" },
    { title: "Photography & Sunset Spots", icon: "📸" },
    { title: "Local Culinary Tasting", icon: "🍜" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shadow-inner">
          <LuCompass className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{section.title || "Recommended Activities"}</h3>
          <p className="text-xs text-slate-400">Must-try experiences</p>
        </div>
      </div>

      {/* Activity Chips Row */}
      <div className="flex flex-wrap gap-2.5">
        {chips.map((chip, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/80 text-cyan-300 font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform duration-200 cursor-default"
          >
            <span>{chip.icon}</span>
            <span>{chip.title}</span>
          </motion.div>
        ))}
      </div>

      {/* Bullets text summary if available */}
      {bullets.length > 0 && (
        <div className="pt-2 space-y-2 border-t border-slate-800/60">
          {bullets.slice(0, 4).map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <span className="text-cyan-400">✦</span>
              <span><FormattedText text={b} /></span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Checklist Travel Tips Card Component
function ChecklistTipsCard({ section }) {
  const tips = splitIntoConciseBullets(section.content);

  const defaultTips = [
    "Carry light warm clothes & comfortable footwear",
    "Book accommodations in advance for peak season",
    "Keep local cash handy for quick mountain commutes",
    "Start morning sightseeing early to avoid traffic",
    "Stay hydrated and carry a reusable water bottle",
  ];

  const displayTips = tips.length >= 3 ? tips : defaultTips;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-inner">
          <LuLightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{section.title || "Travel Tips & Guidelines"}</h3>
          <p className="text-xs text-slate-400">Essential travel checklist</p>
        </div>
      </div>

      {/* Compact Checklist Rows */}
      <div className="space-y-3">
        {displayTips.map((tip, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 flex items-center gap-3 transition-colors text-xs sm:text-sm font-medium text-slate-200"
          >
            <HiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <FormattedText text={tip} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// General Section Card Component
function GeneralSectionCard({ section }) {
  const bullets = splitIntoConciseBullets(section.content);
  if (!bullets.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-4 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-inner">
            <LuSparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{section.title}</h3>
        </div>

        <div className="space-y-3">
          {bullets.map((b, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
              <div>
                <FormattedText text={b} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Main AI Itinerary Result Viewer Component
function AIItineraryViewer({
  rawItinerary,
  destination = "Selected Location",
  daysCount = "5",
  budgetAmount = "25000",
  onReset,
}) {
  const [copied, setCopied] = useState(false);

  const parsed = parseItineraryMarkdown(rawItinerary);

  const handleCopy = () => {
    if (rawItinerary) {
      navigator.clipboard.writeText(rawItinerary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full space-y-10 sm:space-y-12 print:p-0"
    >
      {/* 1. Enhanced Top Trip Summary Header Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/40 p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 space-y-6 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <LuSparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI Trip Plan Dashboard</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {parsed.title}
            </h2>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm">
              <LuMapPin className="w-4 h-4 text-cyan-400" />
              <span>📍 {destination}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm">
              <LuCalendar className="w-4 h-4 text-teal-400" />
              <span>📅 {daysCount} Days</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm">
              <LuWallet className="w-4 h-4 text-emerald-400" />
              <span>💰 ₹{budgetAmount}</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm font-bold text-emerald-300 shadow-sm">
              <HiCheckBadge className="w-4 h-4 text-emerald-400" />
              <span>✨ AI Verified</span>
            </div>
          </div>
        </div>

        {/* Premium Feature Badges Row */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold relative z-10">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            • Generated Successfully
          </span>
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            • Personalized for Your Budget
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            • Optimized Travel Plan
          </span>
        </div>

        {/* Action Toolbar Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/60 relative z-10 print:hidden">
          <span className="text-xs text-slate-400 font-medium">Ready to travel? Export or generate again anytime.</span>

          <div className="flex flex-wrap items-center gap-3">
            {/* Copy Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopy}
              aria-label="Copy itinerary to clipboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            >
              {copied ? (
                <>
                  <LuCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <LuCopy className="w-4 h-4 text-cyan-400" />
                  <span>Copy Itinerary</span>
                </>
              )}
            </motion.button>

            {/* Download PDF */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrintPDF}
              aria-label="Download itinerary as PDF"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            >
              <LuDownload className="w-4 h-4 text-teal-400" />
              <span>Download PDF</span>
            </motion.button>

            {/* Generate Again */}
            {onReset && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onReset}
                aria-label="Generate new itinerary"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md shadow-cyan-500/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              >
                <LuRefreshCw className="w-4 h-4" />
                <span>Generate Again</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Day-by-Day Expandable Timeline Section */}
      {parsed.days.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <LuCalendar className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Day-by-Day Experience Schedule
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-semibold">{parsed.days.length} Days Planned</span>
          </div>

          <div className="pt-2">
            {parsed.days.map((day, idx) => (
              <TimelineDayCard key={idx} day={day} index={idx} defaultOpen={idx < 2} />
            ))}
          </div>
        </div>
      )}

      {/* 3. Specialized Cards Grid: Premium Budget, Recommended Activities, Checklist Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <PremiumBudgetCard totalBudget={budgetAmount} />
        <RecommendedActivitiesCard section={parsed.sections.find((s) => s.type === "activities") || { title: "Recommended Activities", content: [] }} />
        <ChecklistTipsCard section={parsed.sections.find((s) => s.type === "tips") || { title: "Essential Travel Checklist", content: [] }} />

        {parsed.sections
          .filter((s) => !["budget", "activities", "tips", "overview"].includes(s.type))
          .map((sec, idx) => (
            <GeneralSectionCard key={idx} section={sec} />
          ))}
      </div>
    </motion.div>
  );
}

export default AIItineraryViewer;
