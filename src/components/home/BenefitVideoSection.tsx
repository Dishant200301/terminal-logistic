import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const videos = [
  {
    id: "01",
    src: "/images/home/benefit_video/vid_4-1_wide_prerender_1.mp4",
    title: "Benefit 01",
    subtitle: "A single solution for\nmaximum, automated throughput",
    subtitleUnderline: "throughput",
    desc: "Deep integrations anticipate incoming loads, enabling our AI computer vision technology to automate gate check-ins and all critical yard operations: from assigning locations and maintaining real-time visibility to coordinating spotters for efficient load movement. It then closes the loop by validating assets before exit, providing comprehensive performance supervision across your entire yard network",
  },
  {
    id: "02",
    src: "/images/home/benefit_video/vid_4-2_wide_prerender_1.mp4",
    title: "Benefit 02",
    subtitle: "Easy, scalable\noperation",
    subtitleUnderline: "Easy",
    desc: "Shipper was designed from the ground up for disruption-free operations. Easy to deploy and support, the system has a low IT lift with no 3rd party devices to support, and a modern UI/UX that's super-easy for operators to use from day one. Configurable to your yard, Shipper YOS integrates seamlessly with most TMS and WMS systems.",
  },
  {
    id: "03",
    src: "/images/home/benefit_video/vid_4-3_wide_v02_1.mp4",
    title: "Benefit 03",
    subtitle: "Rapid, repeatable\nROI",
    subtitleUnderline: "ROI",
    desc: "We know that yard operations run on lean budgets, which is why we price our all-inclusive solution as a service with terms that won't bust the bank. Ready to deploy right away, and rapid to scale over time.",
  },
];

const BenefitVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.0001,
  });

  // Sync active index — precise thirds
  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      if (v < 0.33) setActiveIndex(0);
      else if (v < 0.66) setActiveIndex(1);
      else setActiveIndex(2);
    });
  }, [smoothProgress]);

  // Video 2 slides up from 100% to 0%
  const mask2Y = useTransform(smoothProgress, [0.30, 0.46], ["100%", "0%"]);
  // Video 3 slides up from 100% to 0%
  const mask3Y = useTransform(smoothProgress, [0.63, 0.79], ["100%", "0%"]);

  // Left progress indicator fill — starts at 0%, map 0→1 progress to 0%→100%
  const indicatorHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Top scoop mask: fully visible at scroll=0, fades away as soon as scroll starts
  const topMaskOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0]);

  // Subtitle builder with underline on specific word
  const renderSubtitle = (subtitle: string, underlineWord: string) => {
    return subtitle.split("\n").map((line, lineIdx) => {
      const parts = line.split(underlineWord);
      return (
        <span key={lineIdx} className="block">
          {parts.map((part, pIdx) => (
            <span key={pIdx}>
              {part}
              {pIdx < parts.length - 1 && (
                <span className="underline underline-offset-4 decoration-1">{underlineWord}</span>
              )}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "var(--section-height, 300vh)" }}
    >
      {/* ── TOP CUTOUT NOTCH (Transitions from pure white end of YOSSection to black video wall) ── */}
      <div className="absolute top-[-1px] left-0 w-full z-[40] pointer-events-none leading-none">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-[20px] md:h-[40px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 H1440 V20 H1240 C1160 20 1160 60 1080 60 H360 C280 60 280 20 200 20 H0 V0 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* ── Desktop View (Sticky) ── */}
      <div className="hidden lg:block sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col">
        <style>{`
          :root { --section-height: 300vh; }
        `}</style>

        {/* ── Video Stack (72vh for better content visibility) ── */}
        <div className="relative w-full overflow-hidden bg-[#0a0a0a]" style={{ height: "72vh" }}>

          {/* -- Video 1 (base layer) -- */}
          <div className="absolute inset-0 z-10">
            <video
              src={videos[0].src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          </div>

          {/* -- Video 2 slides up cleanly -- */}
          <motion.div
            className="absolute inset-0 z-20 overflow-hidden"
            style={{ y: mask2Y }}
          >
            <video
              src={videos[1].src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          </motion.div>

          {/* -- Video 3 slides up cleanly -- */}
          <motion.div
            className="absolute inset-0 z-30 overflow-hidden"
            style={{ y: mask3Y }}
          >
            <video
              src={videos[2].src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          </motion.div>

          {/* ── Left Indicator Thread (Thinner & Compressed Vertically) ── */}
          <div className="absolute left-8 md:left-12 xl:left-24 top-[22%] bottom-[22%] z-50 flex flex-col items-start pointer-events-none">
            {/* Track line */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />
            
            {/* Lime fill progress */}
            <motion.div
              className="absolute top-0 left-0 w-[1px] bg-[#abff02] origin-top shadow-[0_0_8px_rgba(171,255,2,0.4)]"
              style={{ height: indicatorHeight }}
            />

            {/* Numbers - synchronized withNodes */}
            {videos.map((v, i) => (
              <div
                key={v.id}
                className="absolute flex items-center gap-2"
                style={{
                  top: `${(i / (videos.length - 1)) * 100}%`,
                  transform: "translateY(-50%)",
                }}
              >
                {/* Horizontal tick node */}
                <motion.div 
                  animate={{
                    width: activeIndex === i ? 8 : 4,
                    backgroundColor: activeIndex === i ? "#abff02" : "rgba(255,255,255,0.2)"
                  }}
                  className="h-[1px]" 
                />
                
                <motion.span
                  animate={{
                    opacity: activeIndex === i ? 1 : 0.25,
                    x: activeIndex === i ? 0 : -2,
                  }}
                  className="font-mono text-[10px] md:text-[12px] font-bold tracking-[1.5px] text-white"
                >
                  {v.id}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content Block (28vh) ── */}
        <div
          className="relative w-full bg-white z-50 flex items-center"
          style={{ height: "28vh", minHeight: "200px" }}
        >
          <div className="relative w-full h-full">
            {videos.map((v, i) => {
              return (
                <motion.div
                  key={v.id}
                  className="absolute inset-0 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 20,
                    pointerEvents: activeIndex === i ? "auto" : "none",
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="site-container w-full flex flex-col md:flex-row items-start gap-4 md:gap-24 py-6">
                    {/* Left: label + headline */}
                    <div className="md:w-[380px] lg:w-[460px] shrink-0">
                      <p className="text-[#A2A6B4] font-['SuisseIntl',_sans-serif] font-[450] text-[28px] md:text-[36px] leading-[36px] mb-4">
                        {v.title}
                      </p>
                      
                      <h3 className="text-[#052424] font-['SuisseIntl',_sans-serif] font-[450] text-[28px] md:text-[36px] leading-[37px] tracking-tight whitespace-pre-line">
                        {renderSubtitle(v.subtitle, v.subtitleUnderline)}
                      </h3>
                    </div>

                    {/* Right: description */}
                    <div className="md:flex-1 md:max-w-[680px] md:pt-10">
                      <p className="text-[#7F7F7F] font-['SuisseIntl',_sans-serif] font-[400] text-[18px] md:text-[22px] leading-[26px] tracking-tight">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Mobile/Tablet View (Stacking) ── */}
      <div className="block lg:hidden bg-white">
        <style>{`
          @media (max-width: 1023px) {
            :root { --section-height: auto; }
          }
        `}</style>
        
        {videos.map((v, i) => (
          <div key={`mobile-${v.id}`} className="flex flex-col pb-16">
            {/* Video Container (Taller height for cinematic feel) */}
            <div className="relative w-full h-[320px] sm:h-[500px] overflow-hidden bg-black">
              {/* Notch Overlay (Matching Desktop/Ref) */}
              <div className="absolute top-0 left-0 w-full z-20 pointer-events-none leading-none">
                <svg
                  viewBox="0 0 1440 60"
                  preserveAspectRatio="none"
                  className="w-full h-[15px] sm:h-[25px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0 H1440 V20 H1240 C1160 20 1160 60 1080 60 H360 C280 60 280 20 200 20 H0 V0 Z"
                    fill="white"
                  />
                </svg>
              </div>

              <video
                src={v.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            {/* Content Container */}
            <div className="px-6 sm:px-10 py-10 space-y-6">
              <div className="space-y-2">
                <p className="text-[#A2A6B4] font-['SuisseIntl',_sans-serif] font-[450] text-[24px] sm:text-[28px] leading-tight">
                  {v.title}
                </p>
                <h3 className="text-[#052424] font-['SuisseIntl',_sans-serif] font-[450] text-[28px] sm:text-[32px] leading-[1.15] tracking-tight whitespace-pre-line">
                  {renderSubtitle(v.subtitle, v.subtitleUnderline)}
                </h3>
              </div>
              
              <p className="text-[#7F7F7F] font-['SuisseIntl',_sans-serif] font-[400] text-[16px] sm:text-[18px] leading-[1.4] tracking-tight">
                {v.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitVideoSection;
