import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const YOSSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, 80]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const textColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#ffffff", "#a8fa04", "#052424"]);
  const bgColor = useTransform(scrollYProgress, [0, 0.5, 1], ["hsl(170,80%,8%)", "hsl(170,60%,12%)", "hsl(150,10%,96%)"]);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ backgroundColor: bgColor }}>
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10 hidden md:block">
            <svg width="100%" height="100%" className="opacity-30">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          {/* Floating circles */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-accent/5 blur-3xl hidden md:block"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl hidden md:block"
            animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="relative z-10 text-center site-container">
          <motion.p
            style={{ color: textColor }}
            className="text-lg md:text-xl mb-4 font-medium opacity-70"
          >
            That's the
          </motion.p>
          <motion.h2
            style={{ color: textColor, letterSpacing }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight"
          >
            Y O S
          </motion.h2>
          <motion.p
            style={{ color: textColor }}
            className="text-sm md:text-base mt-4 opacity-50 font-mono tracking-widest uppercase"
          >
            Yard Operating System
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default YOSSection;
