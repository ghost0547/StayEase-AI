import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Home as HomeIcon, Award, Shield } from "lucide-react";

function AboutProperty({ title, location, description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extended description text generator to provide rich Airbnb-style narrative if main description is short
  const fullText = description || 
    `Welcome to ${title}, an exquisite retreat nestled in ${location}. Built with sustainable local craftsmanship and modern aesthetic elegance, this homestay offers an unmatchable blend of serenity and luxury. Enjoy floor-to-ceiling panoramic views, artisan breakfasts served daily, handcrafted teakwood furnishings, and high-speed fiber internet for seamless remote work. Whether you're unwinding by the evening bonfire under starlit skies or setting off on morning nature walks, every detail of your stay is curated for comfort and tranquility.`;

  const paragraphCutoff = 220;
  const needsCutoff = fullText.length > paragraphCutoff;
  const displayedText = isExpanded || !needsCutoff ? fullText : `${fullText.slice(0, paragraphCutoff)}...`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 space-y-6"
    >
      {/* Superhost / Key Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Superhost Verified</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Top-rated host with 99% 5-star ratings</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <HomeIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Entire Homestay</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">You'll have the complete villa to yourself</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Enhanced Cleanliness</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Sanitized per 5-step StayEase protocol</p>
          </div>
        </div>
      </div>

      {/* Description Section with Read More / Read Less Toggle */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          About this Homestay
        </h3>

        <div className="relative">
          <motion.div
            layout
            className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal space-y-3"
          >
            <p>{displayedText}</p>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-2 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">The Space & Ambience</h4>
                <p>
                  Designed with large floor-to-ceiling glass windows and open verandas, this property maximizes natural light and valley breeze. Bedrooms feature plush pillow-top mattresses, organic cotton linens, and private ensuite bathrooms with rain showers.
                </p>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">Guest Access & Special Perks</h4>
                <p>
                  Guests have full unrestricted access to the private garden, outdoor dining patio, bonfire pit, and infinity deck. Complimentary morning tea/coffee and evening bonfire setups are included with your reservation.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Toggle Button */}
        {needsCutoff && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors pt-1 cursor-pointer focus:outline-none"
          >
            <span>{isExpanded ? "Show Less" : "Read More"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default AboutProperty;
