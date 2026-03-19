import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

const NetworkSection = () => (
  <section className="py-24 md:py-32 bg-background relative overflow-hidden">
    {/* Animated SVG lines */}
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      <svg width="100%" height="100%" className="opacity-10">
        <line x1="0" y1="30%" x2="100%" y2="50%" stroke="hsl(78,96%,50%)" strokeWidth="1" strokeDasharray="8 12" className="animate-line-flow" />
        <line x1="10%" y1="0" x2="80%" y2="100%" stroke="hsl(78,96%,50%)" strokeWidth="0.5" strokeDasharray="6 14" className="animate-line-flow" style={{ animationDelay: "1s" }} />
        <line x1="100%" y1="20%" x2="0" y2="80%" stroke="hsl(78,96%,50%)" strokeWidth="0.5" strokeDasharray="10 8" className="animate-line-flow" style={{ animationDelay: "2s" }} />
        <circle cx="50%" cy="40%" r="3" fill="hsl(78,96%,50%)" className="animate-glow-pulse" />
        <circle cx="30%" cy="70%" r="2" fill="hsl(78,96%,50%)" className="animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      </svg>
    </div>

    {/* Fade masks */}
    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />

    <div className="site-container relative z-20">
      <AnimatedSection className="text-center">
        <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4">How it works</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight max-w-3xl mx-auto mb-8">
          Infrastructure that transforms your yard from gate to dock
        </h2>
        <Link
          to="/services"
          className="btn-underline inline-flex text-foreground text-sm font-medium pb-1"
        >
          Take a Closer Look →
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default NetworkSection;
