import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Close menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-3 lg:top-10 left-[-0.6rem] right-[-0.6rem] md:left-[-0.6rem]  lg:right-0 z-50" style={{ padding: "0 var(--site-padding)" }}>
      <nav className="glass-nav rounded-lg h-[70px] lg:h-[80px] flex items-center justify-between px-5 md:px-6 max-w-[750px] lg:max-w-[700px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 logo-hover group" onClick={() => setMobileOpen(false)}>
          <img src="/logo.png" alt="Termihub" className="h-6 w-6 object-contain transition-all duration-300 group-hover:filter-[brightness(0)_saturate(100%)_invert(77%)_sepia(62%)_saturate(446%)_hue-rotate(25deg)_brightness(1.05)]" />
          <span className="text-white font-semibold text-2xl tracking-tight transition-colors duration-300 group-hover:text-[#abff02]">Termihub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link-hover text-md font-medium transition-colors duration-300 hover:text-[#abff02] ${location.pathname === link.href
                ? "text-[#abff02]"
                : "text-white/80"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex btn-contact relative overflow-hidden bg-white text-black px-8 py-3 rounded-lg text-xs font-sans font-bold tracking-widest uppercase z-10"
        >
          <span className="relative z-10">CONTACT</span>
        </Link>

        {/* Mobile/Tablet Toggle */}
        <button
          className="md:hidden text-white flex flex-col justify-center items-center w-10 h-10 gap-2 focus:outline-none z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 5 },
            }}
            animate={mobileOpen ? "open" : "closed"}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-6 h-0.5 bg-white rounded-full block origin-center"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -5 },
            }}
            animate={mobileOpen ? "open" : "closed"}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-6 h-0.5 bg-white rounded-full block origin-center"
          />
        </button>
      </nav>

      {/* Mobile/Tablet Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop to close menu when clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1] md:hidden"
              style={{ height: '100vh', width: '100vw', left: '50%', x: '-50%' }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="glass-nav rounded-lg mt-2 p-6 md:hidden max-w-[1400px] mx-auto relative z-10"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium py-2 transition-colors duration-300 hover:text-[#abff02] ${location.pathname === link.href
                      ? "text-[#abff02]"
                      : "text-white/80"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className=" bta-contact bg-white text-black px-5 py-3 rounded-lg text-xs font-sans font-bold tracking-widest uppercase text-center mt-2"
                >
                  <span>CONTACT</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
