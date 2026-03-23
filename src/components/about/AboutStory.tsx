import AnimatedSection from "@/components/AnimatedSection";

const AboutStory = () => {
  return (
    <section className="relative py-12 md:py-32 overflow-hidden bg-white mt-0 md:mt-0">
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

      {/* Subtle Glows */}
      <div className="absolute top-[50%] left-[20%] w-[150px] h-[150px] bg-[#ABFF02]/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="site-container relative z-10">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-[32px] md:text-[60px] lg:text-[72px] font-normal text-[#052424] tracking-tight leading-[1.2] md:leading-[72px] font-sans">
            Our story, our values
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-[1050px] mx-auto text-[18px] text-[#7F7F7F] leading-[25px] font-sans font-normal">
          <AnimatedSection delay={0.1}>
            <p className="mb-6">
              Every day, over <strong className="font-bold text-[#7F7F7F]">$50 billion of goods move through 50,000+ U.S. warehouses</strong> — yet 35% of that supply chain stalls in the yard. While transportation and warehouse systems have modernized, the yard remains the industry's blind spot, still run on clipboards, spreadsheets, and outdated IoT. The result? Bottlenecks, wasted labor, and millions lost in inefficiency.
            </p>
            <p className="mb-6 font-bold text-[#7F7F7F]">
              Shipper is reinventing the yard.
            </p>
            <p>
              We are building the industry's first <strong className="font-bold text-[#7F7F7F]">AI-native, Computer Vision-powered Yard Operating System (YOS)</strong> — designed to digitize, automate, and optimize yard operations end to end.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mb-6">
              Our platform connects cameras, data, and workflows into one seamless layer of visibility and control. From <strong className="font-bold text-[#7F7F7F]">gate acceleration</strong> to <strong className="font-bold text-[#7F7F7F]">asset inventory, compliance, orchestration, analytics, YMS-reimagined</strong>, Shipper delivers rapid ROI: reducing costs, accelerating throughput, and unlocking new revenue opportunities for the world's largest logistics operators.
            </p>
            <p>
              With backing from leading investors and partnerships with several of the top 10 logistics companies, Shipper is <strong className="font-bold text-[#7F7F7F]">building with the industry, for the industry</strong> — setting the new standard for yard technology.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
