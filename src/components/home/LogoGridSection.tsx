import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useState } from "react";

const logos = [
  { name: "Ryder", initials: "R" },
  { name: "PepsiCo", initials: "P" },
  { name: "Maersk", initials: "M" },
  { name: "XPO", initials: "X" },
  { name: "FedEx", initials: "F" },
];

const LogoGridSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-background relative">
      {/* Grid lines bg */}
      <div className="absolute inset-0 opacity-[0.04] hidden md:block">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="logoGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#logoGrid)" />
        </svg>
      </div>

      <div className="site-container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4">Trusted by leading operators</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight max-w-3xl mx-auto">
            Trusted by leading operators looking for real yard innovation
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative aspect-square bg-card border border-border rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300"
              animate={{
                borderColor: hovered === i ? "hsl(78, 96%, 50%)" : undefined,
                scale: hovered === i ? 1.03 : 1,
              }}
            >
              {/* Glow */}
              {hovered === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-lg bg-accent/10 blur-xl"
                />
              )}
              <span
                className={`relative z-10 text-xl font-bold transition-all duration-300 ${
                  hovered === i ? "text-foreground opacity-100" : "text-muted-foreground opacity-40"
                }`}
              >
                {logo.name}
              </span>
              {/* + nodes at corners */}
              <span className={`absolute -top-1.5 -right-1.5 text-xs transition-all duration-300 ${hovered === i ? "text-accent opacity-100 scale-125" : "text-muted-foreground/20 opacity-100"}`}>+</span>
              <span className={`absolute -bottom-1.5 -left-1.5 text-xs transition-all duration-300 ${hovered === i ? "text-accent opacity-100 scale-125" : "text-muted-foreground/20 opacity-100"}`}>+</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoGridSection;
