import { useRef, useEffect, useCallback } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const logos = [
  { src: "/images/about/logo/logo-1.png", alt: "8VC" },
  { src: "/images/about/logo/logo-2.png", alt: "Lineage" },
  { src: "/images/about/logo/logo-3.png", alt: "NFI" },
  { src: "/images/about/logo/logo-4.png", alt: "Prologis" },
  { src: "/images/about/logo/logo-5.png", alt: "Ryder" },
  { src: "/images/about/logo/logo-6.png", alt: "Velocity Truck Centers" },
  { src: "/images/about/logo/logo-7.png", alt: "B37" },
  { src: "/images/about/logo/logo-8.png", alt: "The Friedkin Group" },
  { src: "/images/about/logo/logo-9.png", alt: "Trimac" },
];

const COLS_LG = 5;
const COLS_MD = 3;

const LogoCard = ({ logo }: { logo: typeof logos[0] }) => {
  return (
    <div className="backing-card relative bg-white flex items-center justify-center cursor-default aspect-square">
      <div className="card-border" />
      <div className="card-content relative bg-white flex items-center justify-center w-full h-full">
        <div className="card-bg-glow" />
        <img
          src={logo.src}
          alt={logo.alt}
          className="max-h-[35px] md:max-h-[60px] lg:max-h-[50px] w-auto max-w-[150px] md:max-w-[160px] lg:max-w-[178px] object-contain select-none pointer-events-none px-4 relative z-10"
        />
      </div>
    </div>
  );
};

const AboutBacking = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cards = gridRef.current?.getElementsByClassName("backing-card");
    if (!cards) return;
    for (const card of Array.from(cards)) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.addEventListener("mousemove", handleMouseMove);
    return () => grid.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">
      {/* Background Dots & Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.45]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #A2A2A2 1.5px, transparent 0)`,
            backgroundSize: "80px 80px",
            backgroundPosition: "-1px -1px",
          }}
        />
        <div
          className="absolute inset-0 border-l border-[#F0F0F0]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #F1F1F1 1px, transparent 1px),
              linear-gradient(to bottom, #F1F1F1 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="site-container max-w-[1250px] relative z-10">
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <h2 className="font-sans font-normal text-[#052424] text-[40px] md:text-[87px] leading-[1.1] md:leading-[90px] tracking-[-1.5px] md:tracking-[-3.6px] mb-6 md:mb-10">
            Backing is believing
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#7F7F7F] font-normal font-sans leading-[22px] md:leading-[25px] tracking-[0.36px] max-w-[590px] mx-auto px-4 md:px-0">
            Backed by prominent industry leaders who saw us challenging conventions, solving problems that matter, and delivering products that truly make a difference - and decided to come along for the ride.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Fading gradient lines extending outside the grid */}
          <div className="absolute top-0 -left-[280px] w-[280px] h-[1px] hidden lg:block" style={{ background: 'linear-gradient(90deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute -top-[230px] left-0 w-[1px] h-[230px] hidden lg:block" style={{ background: 'linear-gradient(180deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute top-0 -right-[280px] w-[280px] h-[1px] hidden lg:block" style={{ background: 'linear-gradient(270deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute -top-[230px] right-0 w-[1px] h-[230px] hidden lg:block" style={{ background: 'linear-gradient(180deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute top-[50%] -left-[280px] w-[280px] h-[1px] -translate-y-[0.5px] hidden lg:block" style={{ background: 'linear-gradient(90deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute bottom-0 -left-[280px] w-[280px] h-[1px] hidden lg:block" style={{ background: 'linear-gradient(90deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute -bottom-[230px] left-0 w-[1px] h-[230px] hidden lg:block" style={{ background: 'linear-gradient(0deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute bottom-0 -right-[280px] w-[280px] h-[1px] hidden lg:block" style={{ background: 'linear-gradient(270deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute -bottom-[230px] right-0 w-[1px] h-[230px] hidden lg:block" style={{ background: 'linear-gradient(0deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />

          {[1, 2, 3, 4].map((col) => (
            <div key={`col-fade-bot-${col}`} className="absolute -bottom-[230px] w-[1px] h-[230px] hidden lg:block" style={{ left: `${(col / COLS_LG) * 100}%`, background: 'linear-gradient(0deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          ))}
          {[1, 2, 3, 4].map((col) => (
            <div key={`col-fade-top-${col}`} className="absolute -top-[230px] w-[1px] h-[230px] hidden lg:block" style={{ left: `${(col / COLS_LG) * 100}%`, background: 'linear-gradient(180deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          ))}

          {/* Crosshair (+) icons at grid intersections */}
          <svg className="crosshair-icon absolute -top-[5px] -left-[5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          <svg className="crosshair-icon absolute -top-[5px] -right-[5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          <svg className="crosshair-icon absolute -bottom-[5px] -left-[5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          <svg className="crosshair-icon absolute -bottom-[5px] -right-[5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>

          {[1, 2, 3, 4].map((col) => (
            <svg key={`ct-${col}`} className="crosshair-icon absolute -top-[5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center hidden lg:block" style={{ left: `calc(${(col / COLS_LG) * 100}% - 4.5px)` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          ))}
          <svg className="crosshair-icon absolute top-[50%] -left-[5px] -translate-y-[4.5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          {[1, 2, 3, 4].map((col) => (
            <svg key={`cm-${col}`} className="crosshair-icon absolute top-[50%] -translate-y-[4.5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center hidden lg:block" style={{ left: `calc(${(col / COLS_LG) * 100}% - 4.5px)` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          ))}
          <svg className="crosshair-icon absolute top-[50%] -right-[5px] -translate-y-[4.5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          {[1, 2, 3, 4].map((col) => (
            <svg key={`cb-${col}`} className="crosshair-icon absolute -bottom-[5px] w-[9px] h-[9px] text-[#979797] pointer-events-none z-40 origin-center hidden lg:block" style={{ left: `calc(${(col / COLS_LG) * 100}% - 4.5px)` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20" /></svg>
          ))}

          {/* The Grid */}
          <div
            ref={gridRef}
            id="backing-cards"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-[#E5E5E5]"
            style={{ gap: "1px", background: "#E5E5E5" }}
          >
            {logos.map((logo) => (
              <LogoCard key={logo.alt} logo={logo} />
            ))}

            {/* 10th card — empty, border only, no logo */}
            <div className="md:hidden lg:block backing-card relative bg-white flex items-center justify-center cursor-default aspect-square">
              <div className="card-border" />
              <div className="card-content relative bg-white flex items-center justify-center w-full h-full">
                <div className="card-bg-glow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBacking;
