import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageLoaderProps {
  isLoading: boolean;
  onComplete: () => void;
}

const PageLoader = ({ isLoading, onComplete }: PageLoaderProps) => {
  const [phase, setPhase] = useState<"logo" | "expand" | "done">("logo");

  useEffect(() => {
    if (!isLoading) {
      setPhase("logo");
      return;
    }

    setPhase("logo");
    const t1 = setTimeout(() => setPhase("expand"), 800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#e8e8e8" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Background corner lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            {/* Top left corner path */}
            <motion.path
              d="M-50 200 Q100 200 100 100 Q100 30 170 30 L500 30 Q570 30 570 100 L570 300 Q570 370 640 370 L1250 370"
              stroke="#d0d0d0"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            {/* Top right corner path */}
            <motion.path
              d="M1250 150 Q1050 150 1050 250 Q1050 320 980 320 L700 320 Q630 320 630 250 L630 100 Q630 30 560 30 L-50 30"
              stroke="#d0d0d0"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
            />
            {/* Bottom left corner path */}
            <motion.path
              d="M-50 600 Q150 600 150 500 Q150 430 220 430 L600 430 Q670 430 670 500 L670 700 Q670 770 740 770 L1250 770"
              stroke="#d0d0d0"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.05, ease: "easeInOut", delay: 0.05 }}
            />
            {/* Bottom right corner path */}
            <motion.path
              d="M1250 550 Q1000 550 1000 650 Q1000 720 930 720 L400 720 Q330 720 330 650 L330 450 Q330 380 260 380 L-50 380"
              stroke="#d0d0d0"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.15, ease: "easeInOut", delay: 0.08 }}
            />
          </svg>

          {/* Center logo */}
          <motion.div
            className="relative z-10 flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase === "expand" ? 0 : 1,
              scale: phase === "expand" ? 0.9 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* T Logo Box */}
            <div className="w-10 h-10 bg-[#1a2a2a] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            {/* Terminal Text */}
            <span className="text-[#1a2a2a] font-semibold text-2xl tracking-tight">
              Terminal
            </span>
          </motion.div>

          {/* Horizontal expanding strip - reveals content */}
          <motion.div
            className="absolute z-20 bg-[#1a2a2a]"
            style={{
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ width: 0, height: 2, opacity: 1 }}
            animate={
              phase === "expand"
                ? { width: "150vw", height: "150vh", opacity: 1 }
                : { width: 0, height: 2, opacity: 1 }
            }
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
