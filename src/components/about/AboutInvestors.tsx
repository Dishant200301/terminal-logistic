import { useState, useRef, useEffect, useCallback } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { investors } from "@/data/investors";

const InvestorCard = ({ investor, index, total }: { investor: typeof investors[0]; index: number; total: number }) => {
  const [isClicked, setIsClicked] = useState(false);

  const isLeftLg = index % 2 === 0;
  const isRightLg = index % 2 === 1;
  const isLeftMd = index % 2 === 0;

  return (
    <div
      className="leader-card relative bg-white flex flex-col cursor-pointer"
      onMouseLeave={() => setIsClicked(false)}
    >
      {/* Card Border - radial gradient border glow following mouse */}
      <div className="card-border" />

      {/* Card Content */}
      <div className="card-content relative bg-white flex flex-col">
        {/* Background glow */}
        <div className="card-bg-glow rounded-[10px]" />

        {/* Top Section with Image */}
        <div className="relative w-full p-6 pb-0 md:p-8 md:pb-0 z-10">
          {/* Image Container */}
          <div className="relative w-full aspect-square overflow-hidden">
            {/* Details Scroll Area (Behind the image) */}
            <div
              onClick={() => setIsClicked(false)}
              className="absolute inset-0 p-0 pb-2 text-[#7F7F7F] text-[14px] leading-[1.6] z-0 overflow-y-auto cursor-pointer leader-scroll"
              title="Click to close details"
            >
              {Array.isArray(investor.details) ? (
                investor.details.map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{investor.details}</p>
              )}
            </div>

            {/* The moving Image Plane */}
            <div
              className={`absolute inset-0 z-10 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white ${isClicked ? 'translate-y-[101%]' : 'translate-y-0'}`}
            >
              <img src={investor.img} alt={investor.name} className="w-[101%] h-[101%] max-w-none -ml-[0.5%] -mt-[0.5%] object-cover pointer-events-none" />

              {/* Always visible LEARN MORE overlay (matching Navbar effects) */}
              <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none">
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[200px] pointer-events-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsClicked(true); }}
                    className="w-full flex items-center justify-center btn-contact relative overflow-hidden bg-white text-black hover:text-[#abff02] px-4 py-[14px] rounded-[4px] text-[12px] font-sans font-bold tracking-[0.2em] uppercase transition-all outline-none shadow-md"
                  >
                    <span className="relative z-10 transition-colors duration-300 pointer-events-none">LEARN MORE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text Section */}
        <div className="relative w-full py-[24px] mt-6 flex flex-col items-center justify-center border-t border-[#EAEAEA] bg-white z-20">
          {/* Fading Extended Grid Lines */}
          {isLeftLg && (
            <div className="absolute -top-[1px] -left-[150px] w-[150px] h-[1px] bg-gradient-to-l from-[#EAEAEA] to-transparent pointer-events-none hidden lg:block" />
          )}
          {isRightLg && (
            <div className="absolute -top-[1px] -right-[150px] w-[150px] h-[1px] bg-gradient-to-r from-[#EAEAEA] to-transparent pointer-events-none hidden lg:block" />
          )}
          {isLeftMd && (
            <div className="absolute -top-[1px] -left-[100px] w-[100px] h-[1px] bg-gradient-to-l from-[#EAEAEA] to-transparent pointer-events-none hidden md:block lg:hidden" />
          )}

          {/* Intersection Joint + (Animated on hover) */}
          <svg className="crosshair-icon absolute -top-[5px] -left-[5px] w-[9px] h-[9px] text-[#C0C0C0] pointer-events-none z-40 origin-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2v20M2 12h20" />
          </svg>

          <h3 className="text-[#052424] text-[22px] font-sans font-medium mb-[2px] tracking-tight">{investor.name}</h3>
          <p className="text-[#A0A0A0] text-[15px] font-sans font-normal">{investor.role}</p>
        </div>
      </div>
    </div>
  );
};

const AboutInvestors = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cards = gridRef.current?.getElementsByClassName('leader-card');
    if (!cards) return;

    for (const card of Array.from(cards)) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.addEventListener('mousemove', handleMouseMove);
    return () => grid.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top Part with Background */}
      <div className="relative pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Background Dots & Grid — same as AboutHero */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.45]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #A2A2A2 1.5px, transparent 0)`,
              backgroundSize: '80px 80px',
              backgroundPosition: '-1px -1px'
            }}
          />
          <div
            className="absolute inset-0 border-l border-[#F0F0F0]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #F1F1F1 1px, transparent 1px),
                linear-gradient(to bottom, #F1F1F1 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        <div className="site-container max-w-[1250px] relative z-10">
          <AnimatedSection className="text-center px-6 md:px-0 flex flex-col items-center">
            <p className="text-[20px] text-[#C2C2C2] font-normal leading-[19px] mb-4 md:mb-8 font-sans">Our Investors and Advisors</p>
            <h2 className="text-[36px] md:text-[72px] font-normal text-[#052424] tracking-[-1px] md:tracking-[-3px] leading-[1.1] md:leading-[72px] font-sans mb-6 md:mb-10">
              Backed by decades <br className="hidden md:block" />
              of logistics expertise
            </h2>
            <div className="font-sans flex flex-col items-center text-center">
              <p className="text-[18px] text-[#7F7F7F] font-normal leading-[25px]">
                Our founders, investors, and advisors are driven by the critical need to <br className="hidden md:inline" />
                create an industry standard in the yard. They see us challenging <br className="hidden md:inline" />
                conventions, solving problems that matter, and delivering products <br className="hidden md:inline" />
                that revolutionize the way logistics works.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="site-container max-w-[1250px] relative z-10 pb-24 md:pb-32">
        {/* Grid Container — Constrained to 2/3 width on lg to center 2 cards while keeping "small card" size */}
        <div className="lg:max-w-[834px] lg:mx-auto relative">
          <div
            ref={gridRef}
            id="investor-cards"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 border border-[#EAEAEA]"
            style={{ gap: '1px', background: '#EAEAEA' }}
          >
            {investors.map((investor, index) => (
              <InvestorCard key={investor.name} investor={investor} index={index} total={investors.length} />
            ))}
            {/* Fill empty cells on md (2 cols, 2 investors = 0 empty) */}
            {Array.from({ length: investors.length % 2 === 0 ? 0 : 2 - (investors.length % 2) }).map((_, i) => (
              <div key={`empty-md-${i}`} className="hidden md:block lg:hidden relative bg-white w-full h-full pointer-events-none z-20">
                <div className="absolute -top-[1px] -right-[2px] w-[3px] h-[calc(100%+2px)] bg-white" />
                <div className="absolute -bottom-[2px] -left-[1px] w-[calc(100%+3px)] h-[3px] bg-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInvestors;
