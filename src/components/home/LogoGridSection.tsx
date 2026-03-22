import { useRef, useEffect, useCallback } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const gridCards = [
  { type: 'empty', id: 'empty-1', className: "hidden lg:flex" },
  { type: 'logo', src: '/images/home/logo/logo-1.png', alt: 'Ryder', id: 'ryder', className: "flex" },
  { type: 'logo', src: '/images/home/logo/logo-2.png', alt: 'Coca-Cola', id: 'cocacola', className: "flex" },
  { type: 'logo', src: '/images/home/logo/logo-3.png', alt: 'HP', id: 'hp', className: "flex" },
  { type: 'empty', id: 'empty-2', className: "flex md:hidden lg:flex" },
];

const COLS_LG = 5;

const LogoCard = ({ card }: { card: typeof gridCards[0] }) => {
  return (
    <div className={`backing-card relative bg-white items-center justify-center cursor-default aspect-square ${card.className || 'flex'}`}>
      <div className="card-border" />
      <div className="card-content relative bg-white flex items-center justify-center w-full h-full">
        <div className="card-bg-glow" />
        {card.type === 'logo' && (
          <img
            src={card.src}
            alt={card.alt}
            className="max-h-[35px] md:max-h-[60px] lg:max-h-[50px] w-auto max-w-[150px] md:max-w-[160px] lg:max-w-[178px] object-contain select-none pointer-events-none px-4 relative z-10"
          />
        )}
      </div>
    </div>
  );
};

const LogoGridSection = () => {
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
    <section className="relative py-10 md:py-24 overflow-hidden bg-white">
     

      <div className="site-container max-w-[1250px] relative z-10">
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-[16px] md:text-[20px] text-[#C2C2C2] leading-[19px] tracking-[-0.2px] font-normal font-['SuisseIntl',_sans-serif] mb-[10px]">
            Trusted by Operators
          </p>
          <h2 className="text-[28px] md:text-[56px] lg:text-[72px] font-normal text-[#052424] leading-[1.04] md:leading-[56px] lg:leading-[72px] tracking-[-1.5px] md:tracking-[-3.6px] mb-[10px] max-w-[1000px] mx-auto font-['SuisseIntl',_sans-serif]">
            Trusted by leading operators <br />
            looking for real yard innovation
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Fading gradient lines extending outside the grid */}
          <div className="absolute top-0 -left-[280px] w-[280px] h-[1px] hidden lg:block" style={{ background: 'linear-gradient(90deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute -top-[230px] left-0 w-[1px] h-[230px] hidden lg:block" style={{ background: 'linear-gradient(180deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute top-0 -right-[280px] w-[280px] h-[1px] hidden lg:block" style={{ background: 'linear-gradient(270deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
          <div className="absolute -top-[230px] right-0 w-[1px] h-[230px] hidden lg:block" style={{ background: 'linear-gradient(180deg, rgba(229,229,229,0) 0%, #E5E5E5 100%)' }} />
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
            {gridCards.map((card) => (
              <LogoCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoGridSection;
