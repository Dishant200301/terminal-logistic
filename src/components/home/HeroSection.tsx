import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const TOTAL_FRAMES = 374; // Number of sequence frames
const EASING = 0.08;

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Stores the loaded images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Animation state
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const reqRef = useRef<number>();

  // Mouse Tracking for custom cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isNavHovered, setIsNavHovered] = useState(false);

  useEffect(() => {
    let lastHovered = false;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // If mouse is in the navigation bar area (top ~100px), hide the cursor
      // This prevents the 'SCROLL TO EXPLORE' from bleeding onto the navbar
      const currentlyHovered = e.clientY < 100;
      if (currentlyHovered !== lastHovered) {
        lastHovered = currentlyHovered;
        setIsNavHovered(currentlyHovered);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Use framer-motion's useScroll to cleanly get 0-1 mapped progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate exactly which frame we are on for conditional rendering
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(0);
  scrollYProgress.on("change", (latest) => {
    const frame = Math.floor(latest * (TOTAL_FRAMES - 1));
    setCurrentFrameDisplay(frame);
    targetFrame.current = frame;
  });

  // Fade out opacity as we approach frame 50
  const cursorOpacity = useTransform(scrollYProgress, [0, 45 / (TOTAL_FRAMES - 1), 50 / (TOTAL_FRAMES - 1)], [1, 1, 0]);

  // 1. Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/home/frame/hero-images-${i + 1}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      // Prevent hanging if a frame is missing
      img.onerror = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      }
      images.push(img);
    }
    // Store sequentially exactly indexed to frames
    imagesRef.current = images;
  }, []);

  // 2. Render Functions (using Cover layout logic)
  const drawImage = useCallback((img: HTMLImageElement, ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, xOffset, yOffset;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image: scale image width to canvas width
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / imgRatio;
      xOffset = 0;
      yOffset = (canvasHeight - renderHeight) / 2;
    } else {
      // Canvas is taller than image: scale image height to canvas height
      renderHeight = canvasHeight;
      renderWidth = canvasHeight * imgRatio;
      yOffset = 0;
      xOffset = (canvasWidth - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
  }, []);

  // 3. Animation Loop
  const renderLoop = useCallback(() => {
    // Lerp currentFrame towards targetFrame
    currentFrame.current += (targetFrame.current - currentFrame.current) * EASING;

    // Safety clamps
    let frameToDraw = Math.round(currentFrame.current);
    if (frameToDraw < 0) frameToDraw = 0;
    if (frameToDraw >= TOTAL_FRAMES) frameToDraw = TOTAL_FRAMES - 1;

    // Only draw if we have the image properly loaded
    const img = imagesRef.current[frameToDraw];
    const canvas = canvasRef.current;
    if (img && img.complete && img.naturalHeight !== 0 && canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawImage(img, ctx);
      }
    }

    reqRef.current = requestAnimationFrame(renderLoop);
  }, [drawImage]);

  // Handle Resize and Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      // Use devicePixelRatio for super sharp edge rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
         // Perform manual re-draw immediately on resize
         let frameToDraw = Math.round(currentFrame.current);
         if (frameToDraw >= TOTAL_FRAMES) frameToDraw = TOTAL_FRAMES - 1;
         
         const img = imagesRef.current[frameToDraw];
         if (img && img.complete && img.naturalHeight !== 0) {
           drawImage(img, ctx);
         }
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Setup initial size

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [drawImage]);

  // Start Frame Interpolation Loop
  useEffect(() => {
    reqRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [renderLoop]);

  // ── Scroll-Targeted Text Sections ──
  const Character = ({ char, index, range, totalChars }: { char: string; index: number; range: [number, number]; totalChars: number }) => {
    const delta = range[1] - range[0];
    
    // Appearance: sequences sequentially over the first 30% of the range
    const start = range[0] + (index / totalChars) * delta * 0.25;
    const end = start + delta * 0.05;
    
    // Disappearance: sequences sequentially over the last 30% of the range
    const fadeOutStart = range[1] - delta * 0.3 + (index / totalChars) * delta * 0.25;
    const fadeOutEnd = fadeOutStart + delta * 0.05;
    
    // Color transition: Transparent -> Lime (#a9fc02) -> White -> (wait) -> White -> Lime -> Transparent
    const color = useTransform(
      scrollYProgress,
      [start, (start + end) / 2, end, fadeOutStart, (fadeOutStart + fadeOutEnd) / 2, fadeOutEnd],
      ["rgba(255,255,255,0)", "#a9fc02", "#ffffff", "#ffffff", "#a9fc02", "rgba(255,255,255,0)"]
    );

    return (
      <motion.span style={{ color }} className="inline">
        {char}
      </motion.span>
    );
  };

  const isLoaded = imagesLoaded === TOTAL_FRAMES;

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-[#000]">
      
      {/* Scroll to Explore Shiny Text (Strictly bounded to frames 0-50 and the Hero section) */}
      {isLoaded && currentFrameDisplay <= 50 && (
        <motion.div 
          className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference flex items-center justify-center translate-x-[24px] translate-y-[24px]"
          style={{ x: mouseX, y: mouseY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isNavHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div style={{ opacity: cursorOpacity }} className="flex items-center">
            <span 
              className="text-[10px] md:text-[11px] tracking-[2.5px] font-semibold whitespace-nowrap uppercase inline-block text-[#b5b5b5a4] bg-clip-text bg-[linear-gradient(120deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0)_60%)] bg-[length:200%_100%]"
              style={{ 
                animation: "heroShine 3s linear infinite",
                WebkitBackgroundClip: "text",
                backgroundClip: "text"
              }}
            >
              SCROLL TO EXPLORE
            </span>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @keyframes heroShine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* The Frame Canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block object-cover"
          style={{ width: '100vw', height: '100vh' }}
        />

        {/* Hero Overlay Content - Stages of text at bottom center */}
        <div className="absolute inset-x-0 bottom-[25%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          
          {/* Section 1: We have reinvented the \n future of logistics */}
          <div className="absolute w-full">
            <h1 className="font-['SuisseIntl',_sans-serif] text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[8vw] xl:text-[6vw] font-normal leading-[1.05] tracking-[-0.03em] max-w-[95vw] md:max-w-full mx-auto">
              {"We have reinvented the ".split("").map((c, i) => (
                <Character key={`t1a-${i}`} char={c} index={i} range={[0.08, 0.42]} totalChars={43} />
              ))}
              <br className="hidden md:block" />
              {"future of logistics".split("").map((c, i) => (
                <Character key={`t1b-${i}`} char={c} index={i + 23} range={[0.08, 0.42]} totalChars={43} />
              ))}
            </h1>
          </div>

          {/* Section 2: through the yard. */}
          <div className="absolute w-full">
            <h1 className="font-['SuisseIntl',_sans-serif] text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[8vw] xl:text-[6vw] font-normal leading-[1.0] tracking-[-0.03em] max-w-[95vw] md:max-w-full mx-auto">
              {"through the yard.".split("").map((c, i) => (
                <Character key={`t2-${i}`} char={c} index={i} range={[0.48, 0.72]} totalChars={17} />
              ))}
            </h1>
          </div>

          {/* Section 3: AI-native technology \n that turns manual tasks \n into connected \n missions. */}
          <div className="bottom-[15%] absolute w-full">
            <h1 className="font-['SuisseIntl',_sans-serif] text-[9vw] sm:text-[8vw] md:text-[8vw] lg:text-[8vw] xl:text-[6vw] font-normal leading-[1.1] md:leading-[1.0] tracking-[-0.03em] max-w-[95vw] md:max-w-full mx-auto">
              {"AI-native technology ".split("").map((c, i) => (
                <Character key={`t3a-${i}`} char={c} index={i} range={[0.78, 0.98]} totalChars={74} />
              ))}
              <br className="hidden md:block" />
              {"that turns manual tasks ".split("").map((c, i) => (
                <Character key={`t3b-${i}`} char={c} index={i + 21} range={[0.78, 0.98]} totalChars={74} />
              ))}
              <br className="hidden md:block" />
              {"into connected ".split("").map((c, i) => (
                <Character key={`t3c-${i}`} char={c} index={i + 45} range={[0.78, 0.98]} totalChars={74} />
              ))}
              <br className="hidden md:block" />
              {"missions.".split("").map((c, i) => (
                <Character key={`t3d-${i}`} char={c} index={i + 60} range={[0.78, 0.98]} totalChars={74} />
              ))}
            </h1>
          </div>

        </div>

      </div>

      {/* Bottom Topographic Cutout Notch overlay - Moves up only at the final scroll */}
      <div className="absolute bottom-[-1px] left-0 w-full h-[2vw] md:h-[3vw] min-h-[20px] md:min-h-[40px] z-60 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80 H 1440 V 0 H 1150 C 1110 0, 1090 80, 1050 80 H 390 C 350 80, 330 0, 290 0 H 0 V 80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;
