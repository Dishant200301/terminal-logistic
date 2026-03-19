import AnimatedSection from "@/components/AnimatedSection";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Intelligent Gate Management",
    desc: "Automate check-ins, verify appointments, and streamline gate operations with AI-powered recognition.",
    img: "/images/home/feature-1.avif",
  },
  {
    num: "02",
    title: "Real-Time Yard Visibility",
    desc: "Track every trailer, container, and asset across your yard with live positioning and status updates.",
    img: "/images/home/feature-2.avif",
  },
  {
    num: "03",
    title: "Dock Scheduling & Optimization",
    desc: "Maximize dock utilization with smart scheduling that adapts to real-time conditions.",
    img: "/images/home/feature-3.avif",
  },
  {
    num: "04",
    title: "Automated Yard Moves",
    desc: "Orchestrate trailer movements with optimized routing and automated task assignment.",
    img: "/images/home/feature-4.avif",
  },
];

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  scrollYProgress.on("change", (v) => {
    const idx = Math.min(Math.floor(v * features.length), features.length - 1);
    setActiveIndex(idx);
  });

  return (
    <section ref={sectionRef} className="relative bg-card" style={{ height: `${features.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="site-container w-full">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-center max-w-4xl mx-auto leading-tight">
              Imagine the yard as an intelligent bridge seamlessly connecting highway to warehouse.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.num}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-4 cursor-pointer"
                  onClick={() => setActiveIndex(i)}
                >
                  <span className={`font-mono text-sm mt-1 transition-colors duration-300 ${activeIndex === i ? "text-accent" : "text-muted-foreground"}`}>
                    {f.num}
                  </span>
                  <div>
                    <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${activeIndex === i ? "text-foreground" : "text-muted-foreground"}`}>
                      {f.title}
                    </h3>
                    {activeIndex === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-muted-foreground text-sm mt-2 leading-relaxed"
                      >
                        {f.desc}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Media */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-muted">
              {features.map((f, i) => (
                <motion.img
                  key={f.num}
                  src={f.img}
                  alt={f.title}
                  animate={{ opacity: activeIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
