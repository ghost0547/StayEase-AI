import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiArrowRight,
  HiShieldCheck,
  HiBuildingStorefront,
  HiBookmark,
  HiCheckBadge,
  HiAcademicCap,
  HiCpuChip,
  HiMapPin,
  HiCalendar,
  HiCheck,
  HiBolt,
  HiDevicePhoneMobile,
  HiServer,
  HiLockClosed,
} from "react-icons/hi2";
import {
  SiReact,
  SiFastapi,
  SiMongodb,
  SiTailwindcss,
  SiGooglegemini,
  SiJsonwebtokens,
} from "react-icons/si";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.5)" },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 30px -10px rgba(6, 182, 212, 0.25)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Section 1: Hero Section Component
function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Text & CTAs */}
          <div className="flex flex-col items-start space-y-6 text-left">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-inner"
            >
              <HiSparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Next-Gen AI Travel Platform</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Transforming Travel Planning{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                with AI
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              StayEase AI empowers travelers to seamlessly discover verified, unique homestays and generate personalized, day-by-day AI itineraries tailored to their budget, style, and wanderlust.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/#homestays"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-cyan-500/25 transition-all duration-200"
                >
                  <span>Explore Homestays</span>
                  <HiArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/ai-planner"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 text-cyan-300 font-semibold text-base backdrop-blur-md shadow-md transition-all duration-200"
                >
                  <HiSparkles className="w-5 h-5 text-cyan-400" />
                  <span>Try AI Planner</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Badges */}
            <motion.div
              variants={fadeInUp}
              className="pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400"
            >
              <div className="flex items-center gap-2 font-medium">
                <HiCheckBadge className="w-4 h-4 text-cyan-400" />
                <span>Instant Itineraries</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <HiBuildingStorefront className="w-4 h-4 text-teal-400" />
                <span>Curated Homestays</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <HiShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>JWT Protected</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Graphic */}
          <motion.div variants={fadeInUp} className="relative flex items-center justify-center w-full">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-lg"
            >
              {/* Glowing Outer Backdrop Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 rounded-3xl blur-xl opacity-30 animate-pulse" />

              {/* Main Floating Glass Card */}
              <div className="relative rounded-3xl bg-slate-900/70 border border-slate-700/70 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
                      <HiSparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">AI Experience Engine</h3>
                      <p className="text-xs text-slate-400">Gemini 1.5 Powered Itineraries</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    99.4% Match
                  </span>
                </div>

                {/* Simulated Itinerary Steps */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold border border-cyan-500/30">
                        01
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Ubud Eco-Villa & Spa</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <HiMapPin className="w-3 h-3 text-cyan-400" /> Bali • Nature Retreat
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">★ 4.96</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs font-bold border border-teal-500/30">
                        02
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">AI Day Plan Generation</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <HiCalendar className="w-3 h-3 text-teal-400" /> Morning Trek & Spice Tour
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-300">Generated</span>
                  </div>
                </div>

                {/* Simulated AI Prompt */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center gap-2.5 text-xs text-slate-300 shadow-inner">
                  <HiCpuChip className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate italic">"Suggest top-rated peaceful homestays near mountain trails..."</span>
                </div>
              </div>

              {/* Floating Chip 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-4 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold text-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                  <HiBolt className="w-3.5 h-3.5" />
                </div>
                <span>Sub-second AI Speed</span>
              </motion.div>

              {/* Floating Chip 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-4 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-teal-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold text-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <HiBuildingStorefront className="w-3.5 h-3.5" />
                </div>
                <span>Verified Stays</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Section 2: Why StayEase AI
function WhyStayEaseSection() {
  const featureCards = [
    {
      title: "AI Itinerary Generation",
      description:
        "Leverage Google's Gemini AI to synthesize hyper-personalized, day-by-day travel itineraries aligned with your travel dates, preferences, and pace within seconds.",
      icon: HiSparkles,
      iconGradient: "from-cyan-500/20 to-teal-500/20",
      iconColor: "text-cyan-400",
      borderColor: "hover:border-cyan-500/40",
    },
    {
      title: "Smart Homestay Discovery",
      description:
        "Filter and discover handpicked homestays featuring rich imagery, comprehensive pricing breakdowns, category badges, and authentic traveler ratings.",
      icon: HiBuildingStorefront,
      iconGradient: "from-teal-500/20 to-emerald-500/20",
      iconColor: "text-teal-400",
      borderColor: "hover:border-teal-500/40",
    },
    {
      title: "Save Favorite Stays",
      description:
        "Save your preferred homestays directly into your personal favorites list with single-click bookmarking for effortless comparison and trip planning.",
      icon: HiBookmark,
      iconGradient: "from-emerald-500/20 to-cyan-500/20",
      iconColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/40",
    },
    {
      title: "Secure Authentication",
      description:
        "Enjoy reliable, industry-standard account protection backed by JSON Web Tokens (JWT) and encrypted user credentials for total data security.",
      icon: HiShieldCheck,
      iconGradient: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-300",
      borderColor: "hover:border-cyan-400/40",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-semibold">
            <HiSparkles className="w-4 h-4 text-cyan-400" />
            <span>Why Choose StayEase AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Designed for the Modern Traveler
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Combining intelligent automation with authentic local accommodations for an elevated travel experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                custom={idx}
              >
                <motion.div
                  variants={cardHover}
                  className={`h-full rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 ${card.borderColor}`}
                >
                  <div className="space-y-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconGradient} border border-slate-700/60 flex items-center justify-center ${card.iconColor} shadow-md`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span className="text-cyan-400">StayEase Core</span>
                    <HiArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Section 3: Our Mission Component
function MissionSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle Accent Glow inside Card */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs sm:text-sm font-semibold">
                <HiAcademicCap className="w-4 h-4 text-teal-400" />
                <span>Our Mission</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Crafting Meaningful Journeys Through AI Innovation
              </h2>

              {/* Mission Statement Callout Box */}
              <div className="p-6 rounded-2xl bg-slate-950/60 border-l-4 border-cyan-400 border-y border-r border-slate-800/80 text-slate-200 text-base sm:text-lg leading-relaxed font-medium italic shadow-inner">
                "Our mission is to simplify travel planning by combining Artificial Intelligence with smart homestay recommendations, helping users discover unique stays and build personalized travel experiences within seconds."
              </div>

              {/* Highlight Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                  <div className="text-cyan-400 font-extrabold text-2xl">100%</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Personalized Itineraries</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                  <div className="text-teal-400 font-extrabold text-2xl">Sub-Sec</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">AI Recommendation Time</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                  <div className="text-emerald-400 font-extrabold text-2xl">Verified</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Homestay Listings</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Graphic Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-2 border-b border-slate-800">
                    <span>AI ARCHITECTURE FLOW</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> Live Engine
                    </span>
                  </div>

                  {/* Flow Node 1 */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Traveler Input & Preferences</h4>
                      <p className="text-xs text-slate-400">Location, duration, budget & style</p>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  <div className="flex justify-center my-1 text-cyan-400">
                    <HiArrowRight className="w-5 h-5 rotate-90" />
                  </div>

                  {/* Flow Node 2 */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center gap-4 shadow-md shadow-cyan-500/10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 text-slate-950 flex items-center justify-center font-bold">
                      <HiSparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-cyan-300">Gemini AI Synthesis</h4>
                      <p className="text-xs text-slate-400">Contextual itinerary & stay matching</p>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  <div className="flex justify-center my-1 text-cyan-400">
                    <HiArrowRight className="w-5 h-5 rotate-90" />
                  </div>

                  {/* Flow Node 3 */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Perfect Travel Plan Output</h4>
                      <p className="text-xs text-slate-400">Day-by-day plan & stay reservation link</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 4: Technology Stack Component
function TechStackSection() {
  const techList = [
    {
      name: "React",
      category: "Frontend Library",
      description: "Component-driven framework powering responsive, fluid user interfaces.",
      icon: SiReact,
      iconColor: "text-cyan-400",
      glowColor: "hover:border-cyan-400/40 hover:shadow-cyan-400/10",
    },
    {
      name: "FastAPI",
      category: "Backend API Engine",
      description: "High-performance Python API framework delivering async RESTful endpoints.",
      icon: SiFastapi,
      iconColor: "text-teal-400",
      glowColor: "hover:border-teal-400/40 hover:shadow-teal-400/10",
    },
    {
      name: "MongoDB",
      category: "NoSQL Database",
      description: "Scalable document database storing homestays, user profiles, and saved trips.",
      icon: SiMongodb,
      iconColor: "text-emerald-400",
      glowColor: "hover:border-emerald-400/40 hover:shadow-emerald-400/10",
    },
    {
      name: "Tailwind CSS",
      category: "Styling System",
      description: "Utility-first design framework enabling sleek glassmorphic themes.",
      icon: SiTailwindcss,
      iconColor: "text-cyan-300",
      glowColor: "hover:border-cyan-300/40 hover:shadow-cyan-300/10",
    },
    {
      name: "Gemini AI",
      category: "Generative AI Model",
      description: "Google's LLM powering intelligent trip itineraries and context-aware suggestions.",
      icon: SiGooglegemini,
      iconColor: "text-sky-300",
      glowColor: "hover:border-sky-300/40 hover:shadow-sky-300/10",
    },
    {
      name: "JWT Authentication",
      category: "Security Protocol",
      description: "Stateless JSON Web Tokens providing encrypted user session management.",
      icon: SiJsonwebtokens,
      iconColor: "text-teal-300",
      glowColor: "hover:border-teal-300/40 hover:shadow-teal-300/10",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-semibold">
            <HiCpuChip className="w-4 h-4 text-cyan-400" />
            <span>Modern Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built with Cutting-Edge Technologies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A modern full-stack architecture engineered for speed, security, and exceptional user experience.
          </p>
        </div>

        {/* Tech Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techList.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -6, scale: 1.02 }}>
                <div
                  className={`h-full rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${tech.glowColor}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center ${tech.iconColor} text-2xl shadow-inner`}
                      >
                        <Icon />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {tech.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight">{tech.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Verified Component</span>
                    <HiCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Section 5: Project Overview Component
function ProjectOverviewSection() {
  const highlights = [
    {
      title: "Personalized Travel Planning",
      desc: "Custom day-by-day itineraries generated according to traveler budget, duration, and personal interests.",
      icon: HiCalendar,
    },
    {
      title: "Secure Authentication",
      desc: "User registration and login secured with bcrypt password hashing and JWT authorization header validation.",
      icon: HiLockClosed,
    },
    {
      title: "Intelligent Recommendations",
      desc: "Context-aware algorithm prioritizing high-rated, verified homestays across diverse travel destinations.",
      icon: HiSparkles,
    },
    {
      title: "Responsive UI",
      desc: "Pixel-perfect, fluid interface optimized for mobile phones, tablets, laptops, and wide desktop displays.",
      icon: HiDevicePhoneMobile,
    },
    {
      title: "Modern Full-Stack Architecture",
      desc: "Clean, modular separation between React components, FastAPI server controllers, and MongoDB collections.",
      icon: HiServer,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/80 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold">
              <HiAcademicCap className="w-4 h-4 text-emerald-400" />
              <span>Academic Engineering Project</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Project Overview
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
              StayEase AI is an AI-powered homestay recommendation and itinerary planning platform developed as a full-stack academic project. It showcases modern web architecture, state-of-the-art AI integration, and robust full-stack software development best practices.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 space-y-3 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 6: Call To Action Component
function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 p-10 sm:p-16 text-center space-y-8 shadow-2xl overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Experience intelligent travel planning. Discover verified homestays and let StayEase AI construct your ideal itinerary in seconds.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/#homestays"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 transition-all duration-200"
              >
                <span>Explore Homestays</span>
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ai-planner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-cyan-300 font-bold text-base backdrop-blur-md shadow-lg transition-all duration-200"
              >
                <HiSparkles className="w-5 h-5 text-cyan-400" />
                <span>AI Planner</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Container
function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0F172A] via-[#0D1527] to-[#111827] text-white font-sans relative overflow-hidden">
      {/* Background Animated Gradient Orbs */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          scale: [1.05, 1, 1.05],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-teal-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [-30, 30, -30],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-1/3 w-[28rem] h-[28rem] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Page Sections */}
      <HeroSection />
      <WhyStayEaseSection />
      <MissionSection />
      <TechStackSection />
      <ProjectOverviewSection />
      <CTASection />
    </div>
  );
}

export default About;