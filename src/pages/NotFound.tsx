import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => (
  <>
    <Helmet>
      <title>404 — Page Not Found — Terminal</title>
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
            className="btn-underline inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-mono text-xs tracking-widest uppercase font-bold"
          >
            GO HOME
          </Link>
        </motion.div>
      </div>
    </section>
  </>
);

export default NotFound;
