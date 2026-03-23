import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageLoaderProps {
  isLoading: boolean;
  onComplete: () => void;
  onReadyToReveal?: () => void;
}

const PageLoader = ({ isLoading, onComplete, onReadyToReveal }: PageLoaderProps) => {
  const [phase, setPhase] = useState<"logo" | "expand" | "done">("logo");

  useEffect(() => {
    if (!isLoading) {
      setPhase("logo");
      return;
    }

    setPhase("logo");
    
    // Switch the route safely underneath the loader before we unmask it
    const t0 = setTimeout(() => {
      onReadyToReveal?.();
    }, 500);

    // Start expanding after logo finishes its entrance/display
    const t1 = setTimeout(() => setPhase("expand"), 1000);
    // Give enough time for the slit to open fully
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoading, onComplete, onReadyToReveal]);

  // CSS Clip-Path polygons for the outer mask with a dynamic inner hole
  // Structure: outer box -> seam -> inner hole (counter-clockwise) -> seam -> outer box close
  // Inner points: Left Tip, Bottom Left, Bottom Right, Right Tip, Top Right, Top Left
  const clipPaths = {
    // Hidden hole (all points centered at 50,50)
    logo: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 0% 50%, 0% 0%)",
    // Expanding Slit Stages:
    // 1: Center dot
    // 2: Thin horizontal line
    // 3: Polygon Slit (Match Reference Image 2)
    // 4: Screen fully exposed
    expand: [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 0% 50%, 0% 0%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, -10% 50%, 20% 50.2%, 80% 50.2%, 110% 50%, 80% 49.8%, 20% 49.8%, -10% 50%, 0% 50%, 0% 0%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, -10% 50%, 20% 70%, 80% 70%, 110% 50%, 80% 30%, 20% 30%, -10% 50%, 0% 50%, 0% 0%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, -10% 50%, 0% 120%, 100% 120%, 110% 50%, 100% -20%, 0% -20%, -10% 50%, 0% 50%, 0% 0%)",
    ]
  };

  return (
    <AnimatePresence>
      {isLoading && phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f4f4f4]"
          initial={{ opacity: 1, clipPath: clipPaths.logo }}
          animate={{
            opacity: 1,
            clipPath: phase === "expand" ? clipPaths.expand : clipPaths.logo
          }}
          exit={{ opacity: 0 }}
          // Custom transition for the array of points: snap quickly to thin line, then smoothly ease open
          transition={{ 
            duration: phase === "expand" ? 1.0 : 0.4, 
            ease: "easeInOut",
            times: phase === "expand" ? [0, 0.2, 0.6, 1] : undefined
          }}
        >
          {/* Background corner lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
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

          {/* Center logo (Match Reference Image 1) */}
          <motion.div
            className="relative z-10 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === "expand" ? 0 : 1,
              scale: phase === "expand" ? 0.95 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Dark actual Termihub icon via brightness filter */}
            <img 
               src="/logo.png" 
               alt="Termihub Logo" 
               className="w-6 h-6 md:w-8 md:h-8 object-contain"
               style={{ filter: "brightness(0) opacity(0.9)" }} 
            />
            {/* Termihub Text */}
            <span className="text-[#052424] font-semibold text-[22px] md:text-2xl tracking-tight">
              Termihub
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
