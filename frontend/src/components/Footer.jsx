import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import {
  LuMail,
  LuGlobe,
  LuArrowUp,
  LuHeart,
} from "react-icons/lu";
import {
  SiReact,
  SiFastapi,
  SiMongodb,
  SiGooglegemini,
  SiJsonwebtokens,
  SiTailwindcss,
  SiGithub,
} from "react-icons/si";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "AI Planner", path: "/ai-planner" },
  ];

  const techBadges = [
    { name: "React", icon: SiReact, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
    { name: "FastAPI", icon: SiFastapi, color: "text-teal-400 border-teal-500/30 bg-teal-500/10" },
    { name: "MongoDB", icon: SiMongodb, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { name: "Gemini AI", icon: SiGooglegemini, color: "text-sky-300 border-sky-500/30 bg-sky-500/10" },
    { name: "JWT Auth", icon: SiJsonwebtokens, color: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10" },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 text-slate-300 border-t border-slate-800/80 shadow-[0_-10px_30px_-5px_rgba(6,182,212,0.08)] overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start text-left">
          
          {/* Section 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <HiSparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                StayEase <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">AI</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              AI-powered travel planning platform built with React, FastAPI, MongoDB, and Gemini AI. Discover handpicked homestays and generate custom day-by-day trip itineraries within seconds.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <nav aria-label="Footer quick links" className="flex flex-col space-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 w-fit focus:outline-none focus:ring-2 focus:ring-cyan-500/30 rounded-md"
                >
                  <span className="text-cyan-500 text-xs">›</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Section 3: Technology Badges */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white border-b border-slate-800 pb-2">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((tech) => {
                const Icon = tech.icon;
                return (
                  <motion.span
                    key={tech.name}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm transition-all duration-200 ${tech.color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tech.name}</span>
                  </motion.span>
                );
              })}
            </div>
          </div>

          {/* Section 4: Connect & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white border-b border-slate-800 pb-2">
              Connect & Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href="mailto:support@stayease.ai"
                className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 rounded-md"
                aria-label="Send email to support@stayease.ai"
              >
                <LuMail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>support@stayease.ai</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 rounded-md"
                aria-label="Visit StayEase AI GitHub Repository"
              >
                <SiGithub className="w-4 h-4 text-teal-400 shrink-0" />
                <span>GitHub Repository</span>
              </a>

              {/* Developer Portfolio - Professional Non-clickable Coming Soon Placeholder */}
              <div
                className="group relative flex flex-wrap items-center justify-between gap-2 text-slate-400 opacity-70 cursor-default font-medium p-1 rounded-xl"
                title="Personal portfolio website is currently under development."
              >
                <div className="flex items-center gap-2.5">
                  <LuGlobe className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Developer Portfolio</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-xs">
                  🚀 Coming Soon
                </span>

                {/* Hover Tooltip */}
                <div className="absolute left-0 -top-8 hidden group-hover:flex items-center px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold shadow-lg whitespace-nowrap pointer-events-none z-20">
                  Personal portfolio website is currently under development.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
            <span>© 2026 StayEase AI.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Built with <LuHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> using React + FastAPI + MongoDB + Gemini AI
            </span>
          </div>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-cyan-300 text-xs font-bold shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          >
            <span>Back to Top</span>
            <LuArrowUp className="w-4 h-4 text-cyan-400" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;