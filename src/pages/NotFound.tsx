import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => (
  <>
    <Helmet>
      <title>404 — Page Not Found — Shipper</title>
    </Helmet>
    <section className="min-h-screen flex items-center justify-center">
      <div className="site-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-accent mb-4">404</h1>
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/"
            className="inline-flex group bg-[#052424] relative overflow-hidden text-white px-8 py-3 rounded-lg text-xs font-sans font-bold tracking-widest uppercase z-10"
          >
            <span className="relative z-10 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
              GO HOME
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  </>
);

export default NotFound;
