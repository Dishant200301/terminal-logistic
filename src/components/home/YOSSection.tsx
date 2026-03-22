import {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface LetterOffset {
  dx: number;
  dy: number;
}

// ─── CONSTANTS & HELPERS ─────────────────────────────────────────────────────

const FONT = "'SuisseIntl', sans-serif";

const WORD_DATA = [
  { word: "Yard",      heroIndex: 0,  hasSpace: true  },
  { word: "Operating", heroIndex: 0,  hasSpace: true  },
  { word: "System.",   heroIndex: 0,  hasSpace: false },
] as const;

const PHASES = {
  ERASE_START  : 0.02,
  ERASE_END    : 0.35,
  SPREAD_START : 0.35,
  SPREAD_END   : 0.48,
  GATHER_START : 0.48,
  GATHER_END   : 0.66,
  COLOR_START  : 0.68,
  COLOR_END    : 0.85,
} as const;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeOutExpo(t: number): number {
  const c = clamp(t, 0, 1);
  return 1 - Math.pow(1 - c, 3.5);
}
function easeInOutQuad(t: number): number {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2;
}


// ─── SINGLE CHAR SPAN ─────────────────────────────────────────────────────────

interface CharSpanProps {
  char       : string;
  step       : number; // Stagger step (0 = last char to be erased first)
  maxSteps   : number;
  p          : MotionValue<number>;
}

function CharSpan({
  char,
  step,
  maxSteps,
  p,
}: CharSpanProps) {
  
  // Distribute maxSteps uniformly across ERASE_START -> ERASE_END
  const stepSize = (PHASES.ERASE_END - PHASES.ERASE_START) / maxSteps;
  const start = PHASES.ERASE_START + step * stepSize;
  const end = start + 0.04; // smooth slight overlap

  const opacity = useTransform(p, (raw) => {
    if (raw < start) return 1;
    if (raw > end) return 0;
    return 1 - ((raw - start) / (end - start));
  });

  const filter = useTransform(p, (raw) => {
    if (raw < start) return "blur(0px)";
    if (raw > end + 0.05) return "blur(10px)";
    return `blur(${((raw - start) / (end - start)) * 5}px)`;
  });

  return (
    <motion.span
      style={{
        display     : "inline-block",
        willChange  : "opacity, filter",
        opacity,
        filter,
      }}
    >
      {char}
    </motion.span>
  );
}

// ─── WORD WRAPPER ─────────────────────────────────────────────────────────────

interface WordWrapperProps {
  wordIndex   : number;
  word        : string;
  heroIndex   : number;
  hasSpace    : boolean;
  p           : MotionValue<number>;
  textColor   : MotionValue<string>;
  measureRef  : React.Ref<HTMLSpanElement>;
}

function WordWrapper({
  wordIndex,
  word,
  heroIndex,
  hasSpace,
  p,
  textColor,
  measureRef,
}: WordWrapperProps) {
  
  // Maximum length out of all words to define the absolute stagger scale
  const maxHeroWordLength = 8; // "Operating" has 8 non-hero chars

  return (
    <motion.span
      aria-hidden="true"
      className="heading__word-wrapper relative inline-flex"
      style={{
        color     : textColor,
        willChange: "transform, color",
      }}
    >
      {Array.from(word).map((char, ci) => {
        const isHero = ci === heroIndex;
        if (isHero) {
          // Ghost slot — forever invisible; occupied visually by anchor-letter
          return (
            <span
              key={`${wordIndex}-${ci}-hero`}
              ref={measureRef}
              className="hide"
              style={{ opacity: 0, display: "inline-block" }}
            >
              {char}
            </span>
          );
        }
        
        // Step calculation: last character in word gets step=0 (erased first)
        const charCount = word.length - 1; // Since 1 char is hero
        // Non-hero Index (0 to charCount - 1)
        const nonHeroIndex = ci > heroIndex ? ci - 1 : ci; 
        
        // Actually, back-to-front erasure means the last character disappears first.
        // So step = charCount - nonHeroIndex - 1.
        // Example "System.": Length is 7. Hero is S at 0. '.' is at 6. nonHeroIndex of '.' is 5.
        // charCount = 6. step = 6 - 5 - 1 = 0.
        const step = charCount - nonHeroIndex - 1;

        return (
          <CharSpan
            key={`${wordIndex}-${ci}`}
            char={char}
            step={step}
            maxSteps={maxHeroWordLength}
            p={p}
          />
        );
      })}
      {hasSpace && (
        <span style={{ opacity: 0, display: "inline-block" }}>&nbsp;</span>
      )}
    </motion.span>
  );
}

// ─── ANIMATED ANCHOR LETTER ───────────────────────────────────────────────────

interface AnchorLetterProps {
  letterIdx : number;
  fromOffset: LetterOffset;
  p         : MotionValue<number>;
  children  : React.ReactNode;
  textColor : MotionValue<string>;
}

function AnchorLetter({ letterIdx, fromOffset, p, children, textColor }: AnchorLetterProps) {
  
  const PUSH_OFFSETS = [
    { x: 0, y: 0 }, // Y
    { x: 0, y: 0 }, // O
    { x: 0, y: 0 }, // S
  ];

  const push = PUSH_OFFSETS[letterIdx];

  const translateX = useTransform(p, (raw) => {
    if (raw < PHASES.SPREAD_START) return fromOffset.dx;
    
    if (raw < PHASES.SPREAD_END) {
      const t = easeInOutQuad((raw - PHASES.SPREAD_START) / (PHASES.SPREAD_END - PHASES.SPREAD_START));
      return lerp(fromOffset.dx, fromOffset.dx + push.x, t);
    }
    
    if (raw < PHASES.GATHER_END) {
      const t = easeOutExpo((raw - PHASES.GATHER_START) / (PHASES.GATHER_END - PHASES.GATHER_START));
      return lerp(fromOffset.dx + push.x, 0, t);
    }
    
    return 0; // Final target
  });

  const translateY = useTransform(p, (raw) => {
    if (raw < PHASES.SPREAD_START) return fromOffset.dy;
    
    if (raw < PHASES.SPREAD_END) {
      const t = easeInOutQuad((raw - PHASES.SPREAD_START) / (PHASES.SPREAD_END - PHASES.SPREAD_START));
      return lerp(fromOffset.dy, fromOffset.dy + push.y, t);
    }
    
    if (raw < PHASES.GATHER_END) {
      const t = easeOutExpo((raw - PHASES.GATHER_START) / (PHASES.GATHER_END - PHASES.GATHER_START));
      return lerp(fromOffset.dy + push.y, 0, t);
    }
    
    return 0;
  });

  return (
    <motion.span
      className="anchor-letter font-normal tracking-[-2px] md:tracking-[-4px]"
      style={{
        display   : "inline-block",
        willChange: "transform, color",
        translateX,
        translateY,
        color     : textColor,
        // Optional slight scale-up at gather to make it look premium
        scale     : 1,
      }}
    >
      {children}
    </motion.span>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

export default function YOSSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  
  // Refs to the .hide ghost spans (Y, O, S in sentence)
  const hideRefs     = useRef<(HTMLSpanElement | null)[]>([null, null, null]);
  // Refs to anchor-to spans (the ghost target positions)
  const anchorToRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);

  // ── Measured offsets (from anchor-to center → hide span) ─────────────────
  const [offsets, setOffsets] = useState<LetterOffset[]>([
    { dx: 0, dy: 0 },
    { dx: 0, dy: 0 },
    { dx: 0, dy: 0 },
  ]);

  const measure = useCallback(() => {
    const newOffsets: LetterOffset[] = [0, 1, 2].map((i) => {
      const hideEl     = hideRefs.current[i];
      const anchorToEl = anchorToRefs.current[i];
      if (!hideEl || !anchorToEl) return { dx: 0, dy: 0 };
      const hRect = hideEl.getBoundingClientRect();
      const aRect = anchorToEl.getBoundingClientRect();
      return {
        dx: (hRect.left + hRect.width  / 2) - (aRect.left + aRect.width  / 2),
        dy: (hRect.top  + hRect.height / 2) - (aRect.top  + aRect.height / 2),
      };
    });
    setOffsets(newOffsets);
  }, []);

  useLayoutEffect(() => {
    // Slight delay to ensure fonts loaded
    setTimeout(measure, 50);
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // ── Scroll engine ─────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target : sectionRef,
    offset : ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    mass      : 0.05,
    stiffness : 170,
    damping   : 24,
    restDelta : 0.0004,
  });

  // ── Background color ──────────────────────────────────────────────────────
  const bgColor      = useTransform(p, [PHASES.COLOR_START, PHASES.COLOR_END], ["#052424", "#ffffff"]);
  const darkGridOp   = useTransform(p, [PHASES.COLOR_START, PHASES.COLOR_END], [0.35, 0]);
  const lightGridOp  = useTransform(p, [PHASES.COLOR_START, PHASES.COLOR_END], [0, 0.45]);

  // ── Text color ────────────────────────────────────────────────────────────
  const textColor    = useTransform(p, [PHASES.COLOR_START, PHASES.COLOR_END], ["#ffffff", "#000000"]);

  // ── "That's the" label ───────────────────────────────────────────────────
  const labelOpacity = 0.65;
  const labelY       = 0;

  // ── Final Details ───────────────────────────────────────────────────────
  const tmOpacity    = useTransform(p, [PHASES.COLOR_START, PHASES.COLOR_END], [0, 1]);
  // A subtle horizontal line that "appears" under the final YOS
  const lineScaleX   = 0;
  const lineOpacity  = 0;

  return (
    <section
      ref={sectionRef}
      className="sticky-holder relative w-full z-40"
      style={{ height: "calc(var(--svh, 1svh) * 200)" }}
    >
      {/* ── TOP CUTOUT NOTCH (Transition from Features to YOS) ── */}
      <div className="absolute top-[-1px] left-0 w-full z-[60] pointer-events-none leading-none">
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

      {/* ── STICKY CONTAINER ── */}
      <div
        className="sticky-container sticky top-0 w-full overflow-hidden"
        style={{ height: "calc(var(--svh, 1svh) * 100)" }}
      >
        {/* ── BACKGROUND ── */}
        <motion.div
          className="bg-canvas__wrapper absolute inset-0 z-0"
          style={{ backgroundColor: bgColor }}
        >
          {/* Dark teal grid (initial state) */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity        : darkGridOp,
              backgroundImage: "linear-gradient(to right, rgba(74,222,128,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,222,128,0.2) 1px, transparent 1px)",
              backgroundSize : "60px 60px",
            }}
          />
          {/* Light grid (final white state) - identical spacing */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity        : lightGridOp,
              backgroundImage: "linear-gradient(to right, rgba(5,36,36,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,36,36,0.12) 1px, transparent 1px)",
              backgroundSize : "60px 60px",
            }}
          />
        </motion.div>

        {/* ── HEADING WRAPPER ── */}
        <div
          className="heading__wrapper absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8"
          style={{
            fontFamily    : FONT,
            WebkitFontSmoothing: "antialiased",
            userSelect    : "none",
          }}
        >
          {/* "That's the" sub-title */}
          <motion.p
            className="sub-title text-[10px] sm:text-[12px] md:text-[0.8rem] tracking-[0.2em] md:tracking-[0.28em] uppercase font-medium mb-2 md:mb-6"
            style={{
              color      : textColor,
              opacity    : labelOpacity,
              translateY : labelY,
            }}
          >
            That's the
          </motion.p>

          <motion.h2
            className="relative flex items-center justify-center whitespace-nowrap m-0 p-0 text-center flex-wrap md:flex-nowrap"
            style={{
              fontWeight : 400,
              lineHeight : 1,
              fontSize   : "clamp(2rem, 9vw, 9rem)",
              letterSpacing: "-0.01em",
              willChange : "transform",
            }}
          >
            {/* ── WORD WRAPPERS (Yard / Operating / System.) ── */}
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-2 md:gap-x-0">
              {WORD_DATA.map(({ word, heroIndex, hasSpace }, wi) => (
                <WordWrapper
                  key={word}
                  wordIndex={wi}
                  word={word}
                  heroIndex={heroIndex}
                  hasSpace={hasSpace}
                  p={p}
                  textColor={textColor}
                  measureRef={(el) => { hideRefs.current[wi] = el; }}
                />
              ))}
            </div>

            {/* ── ANCHOR-HEADING anchor-to (ghost target — sets final YOS center) ── */}
            <div
              className="anchor-heading absolute inset-0 flex items-center justify-center pointer-events-none gap-[1px]"
              aria-hidden="true"
              style={{ visibility: "hidden" }} /* purely positional reference */
            >
              <div className="flex items-center" style={{ scale: 1.25 }}>
                {["Y", "O", "S"].map((letter, i) => (
                  <span
                    key={letter}
                    className="anchor-letter font-normal tracking-[-2px] md:tracking-[-4px]"
                    ref={(el) => { anchorToRefs.current[i] = el; }}
                    style={{ display: "inline-block" }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="superscript" style={{ fontSize: "0.3em", verticalAlign: "super", marginLeft: "2px" }}>
                  ™
                </span>
              </div>
            </div>

            {/* ── ANCHOR-HEADING live animated YOS ── */}
            <div
              className="anchor-heading absolute inset-0 flex items-center justify-center pointer-events-none gap-[1px]"
              aria-hidden="true"
            >
              <div className="flex items-center" style={{ scale: 1.25 }}>
                {(["Y", "O", "S"] as const).map((letter, i) => (
                <AnchorLetter
                  key={letter}
                  letterIdx={i}
                  fromOffset={offsets[i]}
                  p={p}
                  textColor={textColor}
                >
                  {letter}
                </AnchorLetter>
              ))}
              
              {/* TM Mark */}
              <motion.span 
                className="superscript" 
                style={{ 
                  fontSize: "0.3em", 
                  verticalAlign: "super", 
                  color: textColor,
                  opacity: tmOpacity,
                  marginLeft: "2px",
                }}
              >
                ™
              </motion.span>
              </div>
               
              {/* The "Line" below final YOS */}
              <motion.div
                className="absolute bg-black"
                style={{
                  height: 1,
                  bottom: "35%",
                  width: "120px",
                  scaleX: lineScaleX,
                  opacity: lineOpacity,
                  transformOrigin: "center"
                }}
              />
            </div>
            
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
