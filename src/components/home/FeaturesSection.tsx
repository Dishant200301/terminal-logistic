import { useRef, useId, useMemo, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  {
    num: "01",
    title: "Autonomous, agentic AI-driven workflows from gate to dock",
    src: "/images/home/feacture/Features-1.mp4",
    img: "/images/services/service-1.png",
  },
  {
    num: "02",
    title: "Real-time vision-based visibility for every asset",
    src: "/images/home/feacture/Features-2.mp4",
    img: "/images/services/service-2.png",
  },
  {
    num: "03",
    title: "Intelligent harbor for seamless load coordination",
    src: "/images/home/feacture/Features-3.mp4",
    img: "/images/services/service-3.png",
  },
  {
    num: "04",
    title: "Adaptive dock scheduling and live optimization",
    src: "/images/home/feacture/Features-4.mp4",
    img: "/images/services/service-4.png",
  },
  {
    num: "05",
    title: "Proactive spotter dispatch and movement tracking",
    src: "/images/home/feacture/Features-5.mp4",
    img: "/images/services/service-5.png",
  },
  {
    num: "06",
    title: "Centralized yard command for total operational control",
    src: "/images/home/feacture/Features-6.mp4",
    img: "/images/services/service-6.png",
  },
];

const MobileFeaturesCarousel = () => {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const next = () => {
    if (mobileActiveIndex < features.length - 1) setMobileActiveIndex(mobileActiveIndex + 1);
  };
  const prev = () => {
    if (mobileActiveIndex > 0) setMobileActiveIndex(mobileActiveIndex - 1);
  };

  return (
    <div className="w-full bg-white relative pb-16">
      {/* Media Container */}
      <div className="relative w-full aspect-square bg-[#052424] overflow-hidden">
        <motion.div 
           className="flex h-full w-full"
           animate={{ x: `calc(-${mobileActiveIndex} * 100%)` }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
           {features.map((f, i) => (
              <div key={i} className="w-full h-full shrink-0 relative">
                 <video
                    src={f.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                 />
              </div>
           ))}
        </motion.div>

        {/* Notch overlay matching HeroSection shape and progressively sliding */}
        <motion.div 
           className="absolute bottom-[-1px] left-0 w-[200vw] h-[20px] md:h-[40px] z-10 pointer-events-none"
           initial={false}
           animate={{ x: `calc(-25vw + ${mobileActiveIndex * 15}vw)` }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              d="M -5000 80 H 5000 V 0 H 1150 C 1110 0, 1090 80, 1050 80 H 390 C 350 80, 330 0, 290 0 H -5000 V 80 Z"
              fill="white"
            />
          </svg>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-12 md:bottom-16 right-4 flex gap-2 z-20">
          <button 
             onClick={prev} 
             disabled={mobileActiveIndex === 0}
             className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black disabled:opacity-50 transition-opacity shadow-sm"
          >
             <ChevronLeft size={20} />
          </button>
          <button 
             onClick={next} 
             disabled={mobileActiveIndex === features.length - 1}
             className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black disabled:opacity-50 transition-opacity shadow-sm"
          >
             <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white pt-8 overflow-hidden">
        {/* Numbers */}
        <div className="flex gap-4 px-6 font-mono text-[12px] md:text-[14px] font-bold">
          {features.map((f, i) => (
            <span 
              key={i} 
              className={`tracking-[2px] transition-colors duration-300 ${i === mobileActiveIndex ? "text-[#052424]" : "text-[#E5E5E5]"}`}
            >
              {f.num}
            </span>
          ))}
        </div>

        {/* Titles Slider */}
        <div className="mt-4 relative">
           <motion.div 
              className="flex pl-6"
              animate={{ x: `calc(-${mobileActiveIndex} * 85vw)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
           >
              {features.map((f, i) => {
                 const chars = f.title.split("");
                 return (
                 <div key={i} className="w-[85vw] shrink-0 pr-[24px]">
                    <h3 className="text-[18px] md:text-[22px] font-normal leading-[1.3] tracking-[-0.5px] font-['SuisseIntl',_sans-serif] min-h-[56px]">
                       {chars.map((char: string, charIdx: number) => (
                          <motion.span
                             key={charIdx}
                             custom={charIdx}
                             initial="inactive"
                             animate={i === mobileActiveIndex ? "active" : "inactive"}
                             variants={{
                               active: (idx) => ({
                                 color: ["#E5E5E5", "#a9fc02", "#052424"],
                                 transition: { 
                                   duration: 0.6, 
                                   delay: idx * 0.015,
                                   times: [0, 0.4, 1],
                                   ease: "linear"
                                 }
                               }),
                               inactive: {
                                 color: "#E5E5E5",
                                 transition: { duration: 0.3 }
                               }
                             }}
                             style={{ display: "inline" }}
                          >
                             {char}
                          </motion.span>
                       ))}
                    </h3>
                 </div>
              )})}
           </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 px-6 pb-2">
           <div className="w-full h-[2px] bg-[#F0F0F0] flex">
              {features.map((_, i) => (
                 <div 
                    key={i} 
                    className={`h-full flex-1 transition-colors duration-300 ${i === mobileActiveIndex ? "bg-[#052424]" : "bg-transparent"}`} 
                 />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ 
  feature, 
  index, 
  activeIndex,
  setActiveIndex,
  isMobile 
}: { 
  feature: any; 
  index: number; 
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  isMobile: boolean;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  const characters = useMemo(() => feature.title.split(""), [feature.title]);
  const charStep = 1 / characters.length;

  // Track when this item crosses the vertical center of the viewport
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest > 0 means the top of the item has passed the center
    // latest <= 1 means the bottom of the item hasn't passed the center yet
    if (latest > 0 && latest <= 1) {
      if (activeIndex !== index) {
        setActiveIndex(index);
      }
    }
  });

  // For the color transition effect (gray -> lime -> black)
  // We start the effect when it enters from the bottom
  // and finish when it reaches the center.
  const { scrollYProgress: approachProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "start center"]
  });

  return (
    <div 
      ref={itemRef} 
      className="py-12 lg:py-28 relative"
    >
      <div className="flex items-start gap-6 lg:gap-2 w-full lg:-translate-y-[26px]">
        {/* Left padding for sticky count */}
        <div className="hidden lg:block w-[40px] xl:w-[50px] shrink-0" />

        {/* Heading that moves with scroll */}
        <div className="text-[24px] md:text-[36px] xl:text-[40px] font-normal leading-[1.1] tracking-[-1.5px] md:tracking-[-2px] text-[#052424] font-['SuisseIntl',_sans-serif] max-w-[500px] xl:max-w-[500px]">
           {feature.title.split(" ").map((word: string, wordIdx: number, wordsArr: string[]) => {
             // Calculate the global starting index for characters in this word to maintain animation timing
             const precedingText = wordsArr.slice(0, wordIdx).join(" ") + (wordIdx > 0 ? " " : "");
             const startIdx = precedingText.length;

             return (
               <span key={wordIdx} className="inline-block">
                 {word.split("").map((char: string, charIdx: number) => {
                   const i = startIdx + charIdx;
                   const charStart = i * charStep;
                   
                   const startFade = charStart * 0.5;
                   const limeTime = startFade + 0.1;
                   const blackTime = limeTime + 0.3;

                   // Like the hero section: sequence Transparent -> Lime -> Black
                   // eslint-disable-next-line react-hooks/rules-of-hooks
                   const color = useTransform(
                     approachProgress,
                     [
                       0, 
                       startFade, 
                       limeTime, 
                       blackTime, 
                       1
                     ],
                     ["rgba(169, 252, 2, 0)", "rgba(169, 252, 2, 0)", "#a9fc02", "#052424", "#052424"]
                   );

                   return (
                     <motion.span 
                       key={i} 
                       style={{ color }} 
                       className="inline"
                     >
                       {char}
                     </motion.span>
                   );
                 })}
                 {/* Add a space after the word if it's not the last word */}
                 {wordIdx < wordsArr.length - 1 && <span className="inline">&nbsp;</span>}
               </span>
             );
           })}
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipId = useId().replace(/:/g, "");
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const clipPathD = useTransform(smoothProgress, (val) => {
    // Total half height = 0.15 (0.08 flat + 0.07 curve)
    const flatHalf = 0.08;
    const curveY = 0.07;
    const depth = 0.04;
    const totalHalf = flatHalf + curveY;
    
    // Map scroll progress to the center Y of the notch
    // When val = 0, center = totalHalf (notch is at top, topY = 0)
    // When val = 1, center = 1 - totalHalf (notch is at bottom, bottomY = 1)
    const cy = totalHalf + val * (1 - 2 * totalHalf);
    
    const bottomY = cy + totalHalf; 
    const bottomFlatY = cy + flatHalf; 
    const topFlatY = cy - flatHalf; 
    const topY = cy - totalHalf; 

    return `M 0,0 L 1,0 L 1,1 L 0,1 L 0,${bottomY.toFixed(4)} C 0,${(bottomY - 0.04).toFixed(4)} ${depth},${(bottomY - 0.04).toFixed(4)} ${depth},${bottomFlatY.toFixed(4)} L ${depth},${topFlatY.toFixed(4)} C ${depth},${(topY + 0.04).toFixed(4)} 0,${(topY + 0.04).toFixed(4)} 0,${topY.toFixed(4)} Z`;
  });

  // Active Index state for the sticky number and video
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white"
    >
      
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id={`clip-feature-${clipId}`} clipPathUnits="objectBoundingBox">
            <motion.path d={clipPathD} />
          </clipPath>
        </defs>
      </svg>

      <div className="block lg:hidden w-full">
         <MobileFeaturesCarousel />
      </div>

      <div className="hidden lg:flex pl-16 pr-0 relative flex-col lg:flex-row items-start min-h-screen overflow-visible">
        
        {/* ── Left Side / Main Content ── */}
        <div className="w-full lg:w-[50%] z-10 relative pt-[50vh] pb-[10vh]">
          <div className="relative">
            {/* Sticky Number Indicator (Desktop) */}
            <div 
              className="hidden lg:flex absolute left-0 top-0 w-[50px] z-30 pointer-events-none"
              style={{ bottom: '-154px' }}
            >
               <div className="sticky top-[50vh] h-[42px] w-[50px] flex justify-start lg:-translate-y-[26px]">
                  <div className="h-[42px] overflow-hidden relative w-full flex justify-start">
                      <motion.div
                        animate={{ y: `-${activeIndex * 42}px` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-start absolute top-0 left-0 w-full"
                      >
                        {features.map((f, i) => (
                          <span 
                            key={i} 
                            className={`h-[42px] flex items-center justify-start font-mono text-[13px] xl:text-[14px] tracking-[2px] font-bold transition-opacity duration-300 ${
                               activeIndex === i ? "text-[#9A9A9A]" : "text-[#9A9A9A] opacity-0"
                            }`}
                          >
                            {f.num}
                          </span>
                        ))}
                      </motion.div>
                  </div>
               </div>
            </div>

            {features.slice(0, features.length - 1).map((f, i) => (
              <div key={i} className="relative">
                <FeatureItem 
                  feature={f} 
                  index={i} 
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  isMobile={isMobile} 
                />
              </div>
            ))}
          </div>

          <div className="relative">
            {features.slice(features.length - 1).map((f, i) => {
              const actualIndex = features.length - 1 + i;
              return (
                <div key={actualIndex} className="relative">
                  <FeatureItem 
                    feature={f} 
                    index={actualIndex} 
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    isMobile={isMobile} 
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Side: Sticky Media (Desktop Only) ── */}
        <div className="hidden lg:flex w-[50%] h-screen sticky top-0 right-0 ml-auto items-center justify-end z-20 py-[40px] pr-[40px] pointer-events-none">
          <div className="relative w-full h-full max-h-[85vh]">
            <div 
              className="absolute -inset-[2px] bg-[#052424] opacity-10" 
              style={{ clipPath: `url(#clip-feature-${clipId})` }}
            />
            
            <div 
              className="relative w-full h-full overflow-hidden  rounded-md"              style={{ clipPath: `url(#clip-feature-${clipId})` }}
            >
               <AnimatePresence>
                 <motion.div
                   key={`media-${activeIndex}`}
                   className="absolute inset-0"
                   initial={{ opacity: 0, scale: 1.05 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.5, ease: "easeInOut" }}
                 >
                   <video
                     src={features[activeIndex]?.src}
                     autoPlay
                     loop
                     muted
                     playsInline
                     className="w-full h-full object-cover"
                   />
                   {/* <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" /> */}
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .feature-clip-${clipId} {
          clip-path: url(#clip-feature-${clipId});
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
