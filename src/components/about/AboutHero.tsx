import AnimatedSection from "@/components/AnimatedSection";

const AboutHero = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Background Dots & Grid */}
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
          className="absolute inset-0 border-t border-l border-[#F0F0F0]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #F1F1F1 1px, transparent 1px),
              linear-gradient(to bottom, #F1F1F1 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Subtle Glows */}
      <div className="absolute top-[40%] right-[10%] w-[120px] h-[120px] bg-[#ABFF02]/15 blur-[70px] rounded-full pointer-events-none" />
      
      {/* Right side accent element */}
      <div className="absolute right-[5%] md:right-[8%] top-[55%] -translate-y-1/2 z-20 pointer-events-none hidden md:block">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#ABFF02] blur-[15px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        </div>
      </div>

      <div className="site-container relative z-10 text-center">
        <AnimatedSection>
          <p className="text-[13px] md:text-[18px] text-[#A2A2A2] font-normal font-sans tracking-tight mb-0 md:mb-0">
            About Shipper
          </p>
          <div className="max-w-[1026px] mx-auto">
            <h1 className="text-[36px] sm:text-[48px] md:text-[88px] font-normal text-[#052424] tracking-tight leading-[1.05] md:leading-[1] mb-8 md:mb-12 font-sans px-4">
              A new industry<br className="hidden md:block" /> standard in the yard
            </h1>
          </div>
          <p className="mt-6 md:mt-12 text-[#A2A2A2] text-[16px] md:text-[20px] max-w-[700px] mx-auto leading-[1.6] text-center font-sans font-normal px-0">
            Shipper is a different kind of logistics technology company. We exist to create a new industry standard in yard operations by completely rethinking what that yard of future will be - from fragmented bottleneck into a scalable, strategic advantage.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutHero;
