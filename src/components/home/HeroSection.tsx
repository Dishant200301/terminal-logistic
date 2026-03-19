import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -100]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img
            src="/images/home/hero-video-placeholder.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center site-container"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-[1.1] tracking-tight"
          >
            We have reinvented<br />
            the future of logistics<br />
            <span className="text-accent">through the yard.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 text-primary-foreground/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            AI-native technology that turns manual tasks into connected missions.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
