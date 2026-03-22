import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CharacterScrollReveal = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exactly mirrors the home FeaturesSection FeatureItem approachProgress:
  // starts when element enters from the bottom, ends when top hits center.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  const chars = text.split("");
  const charStep = 1 / chars.length;

  return (
    <div ref={containerRef} className="flex flex-wrap max-w-[720px]">
      {chars.map((char, index) => {
        // ── Exact same stagger formula as home FeaturesSection FeatureItem ──
        const charStart  = index * charStep;
        const startFade  = charStart * 0.5;
        const limeTime   = startFade + 0.1;
        const blackTime  = limeTime  + 0.3;

        // Same sequence but starts at #dddddd (grey) instead of transparent
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const color = useTransform(
          scrollYProgress,
          [0,         startFade,  limeTime,  blackTime,  1        ],
          ["#dddddd", "#dddddd",  "#a9fc02", "#052424",  "#052424"]
        );

        return (
          <motion.span
            key={index}
            style={{ color }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
};

export default CharacterScrollReveal;
