import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

const ContactPreviewSection = () => (
  <section className="py-24 md:py-32 bg-secondary">
    <div className="site-container">
      <AnimatedSection className="text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-4">
          Contact Us
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Reach out to learn more about Shipper, on your terms.
        </p>
        <Link
          to="/contact"
          className="btn-underline inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-mono text-xs tracking-widest uppercase font-bold transition-colors duration-300 hover:bg-primary/90"
        >
          GET IN TOUCH
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default ContactPreviewSection;
