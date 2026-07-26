import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiBars3, HiXMark, HiArrowRightOnRectangle } from "react-icons/hi2";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();

  // Listen to auth changes and storage events so Navbar updates automatically without page refresh
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("favorites_cache");
    window.dispatchEvent(new Event("auth-change"));
    setIsAuthenticated(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: AI Style Brand Logo */}
          <Link
            to="/"
            aria-label="StayEase AI Home Page"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <HiSparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              StayEase <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Center/Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-label={link.name}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area (Buttons) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dynamic Auth Button: Login vs Logout */}
            <AnimatePresence mode="wait">
              {isAuthenticated ? (
                <motion.div
                  key="nav-logout-btn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <button
                    onClick={handleLogout}
                    aria-label="Logout of account"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 rounded-xl backdrop-blur-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  >
                    <HiArrowRightOnRectangle className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="nav-login-btn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/login"
                    aria-label="User Login"
                    className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-700 rounded-xl backdrop-blur-sm transition-all duration-200 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 inline-block"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filled Gradient Button: AI Planner */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/ai-planner"
                aria-label="Launch AI Travel Planner"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-md shadow-emerald-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <HiSparkles className="w-4 h-4" />
                <span>AI Planner</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Navigation Toggle Bar */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-emerald-600 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <HiXMark className="w-6 h-6" />
              ) : (
                <HiBars3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
          >
            <nav aria-label="Mobile Navigation" className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label={link.name}
                    className={`block px-4 py-2.5 text-base font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-2.5">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    aria-label="Logout of account"
                    className="w-full text-center px-4 py-2.5 text-base font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-xl bg-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-500/50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <HiArrowRightOnRectangle className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="User Login"
                    className="w-full text-center px-4 py-2.5 text-base font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    Login
                  </Link>
                )}

                <Link
                  to="/ai-planner"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Launch AI Travel Planner"
                  className="w-full text-center px-4 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <HiSparkles className="w-4 h-4" />
                  <span>AI Planner</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;