import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const teamMembers = [
  { name: "Alex Chen", role: "CEO & Co-Founder", img: "/images/about/about-hero.jpg" },
  { name: "Sarah Mitchell", role: "CTO", img: "/images/about/about-hero.jpg" },
  { name: "James Rodriguez", role: "VP Operations", img: "/images/about/about-hero.jpg" },
  { name: "Emily Watson", role: "Head of Product", img: "/images/about/about-hero.jpg" },
  { name: "Michael Park", role: "VP Engineering", img: "/images/about/about-hero.jpg" },
  { name: "Lisa Chen", role: "VP Sales", img: "/images/about/about-hero.jpg" },
];

const stats = [
  { num: "85%", label: "Reduction in yard dwell time" },
  { num: "3x", label: "Faster gate throughput" },
  { num: "50+", label: "Enterprise deployments" },
  { num: "99.9%", label: "System uptime" },
];

const CharacterScrollReveal = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.4"],
  });

  const chars = text.split("");

  return (
    <div ref={containerRef} className="flex flex-wrap max-w-[720px]">
      {chars.map((char, index) => {
        // Precise progress for each character
        const start = index / chars.length;
        const end = (index + 1) / chars.length;
        
        // Appear in #a9fc02 (lime green), then smoothly transition to #052424 (dark/black)
        // Init color: #DDDDDD (faded)
        const color = useTransform(
          scrollYProgress,
          [start, start + (end - start) * 0.1, start + (end - start) * 0.5, end],
          ["#DDDDDD", "#abff02", "#052424", "#052424"]
        );

        return (
          <motion.span 
            key={index} 
            style={{ color }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
};

const FeatureSection = ({ number, title, description, image, imageSide }: { 
  number: string; 
  title: string; 
  description: string; 
  image: string;
  imageSide: 'left' | 'right' 
}) => {
  // Use a simple rectangular shape (no notches) so the
  // feature images match the clean rectangular style.
  return (
    <section className="py-0 overflow-hidden bg-white">
      <div className="px-4 md:pr-0 md:pl-16 xl:pl-16">
        <div className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-0 items-center`}>
          {/* Text Content */}
          <div className={`${imageSide === 'right' ? 'lg:order-1' : 'lg:order-2 lg:pl-16 xl:pl-32'} py-12 md:py-24 relative`}>
            {/* Number */}
            <span className="absolute -left-10 top-24 font-geist text-[13px] tracking-[2.342px] text-[#C2C2C2] hidden xl:block">
              {number}
            </span>

            <h2 className="text-[32px] md:text-[42.9px] font-normal leading-[1.1] text-[#052424] tracking-[-0.613px] mb-12 font-inter max-w-[550px]">
              {title}
            </h2>

            <div className="text-[18px] md:text-[21.9px] font-medium leading-[1.32] tracking-[-0.307px] font-inter">
              <CharacterScrollReveal text={description} />
            </div>
          </div>

          {/* Figure / Image Layered Design */}
          <div className={`${imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'} relative w-full aspect-[4/3] lg:aspect-square`}>
            {/* Vector Layer (Bottom/Backing) */}
            <div 
              className="absolute inset-0 bg-[#000000] z-0"
            />

            {/* Image Layer (Top) */}
            <div 
              className="absolute inset-0 z-10 overflow-hidden group translate-x-[2px] translate-y-[2px]"
            >
              <motion.img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <>
      <Helmet>
        <title>About — Terminal</title>
        <meta name="description" content="Built by logistics leaders who want a new industry standard in the yard. Learn about Terminal's mission and team." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-white">
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
            <div className="relative w-8 h-[2px] bg-[#052424] rounded-full" />
          </div>
        </div>

        <div className="site-container relative z-10 text-center">
          <AnimatedSection>
            <p className="text-[14px] md:text-[18px] text-[#A2A2A2] font-normal font-sans tracking-tight mb-8">
              About Terminal
            </p>
            <div className="max-w-[1026px] mx-auto">
              <h1 className="text-[48px] md:text-[88px] font-normal text-[#052424] tracking-tight leading-[1] md:leading-[1] mb-12 font-sans px-4">
                A new industry<br className="hidden md:block" /> standard in the yard
              </h1>
            </div>
            <p className="mt-12 text-[#A2A2A2] text-[18px] md:text-[20px] max-w-[700px] mx-auto leading-[1.6] text-center font-sans font-normal px-6">
              Terminal is a different kind of logistics technology company. We exist to create a new industry standard in yard operations by completely rethinking what that yard of future will be - from fragmented bottleneck into a scalable, strategic advantage.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Sections */}
      <FeatureSection 
        number="01"
        title="Built by the industry, for the industry"
        description="Terminal is a strategic joint venture, not a typical startup. Backed by leading logistics operators such as Prologis, Ryder, Lineage, and NFI, and supported by venture capital firm 8VC, we were designed to solve major industry pain points and establish the category standard. Our strategic investors contributed critical insights and became anchor product design partners, ensuring we’re rapidly solving the industries biggest challenges in yard logistics."
        image="/images/about/feature-1.png"
        imageSide="right"
      />

      <FeatureSection 
        number="02"
        title="Based on a proven category creation playbook"
        description="Our model follows the playbook of successful category creators like Orbitz and Rivian. By co-creating with industry leaders, we are able to build a platform that is deeply integrated and ready for market adoption from day one."
        image="/images/about/feature-2.png"
        imageSide="left"
      />

      <FeatureSection 
        number="03"
        title="Positioned as the standard"
        description="Well capitalized, supported by leading operators, and backed by a VC-firm driven by a 'build' investment philosophy, Terminal is uniquely de-risked. Our foundational partnerships and funding position is not as a startup, but as the emerging standard for modern yard operations."
        image="/images/about/feature-3.png"
        imageSide="right"
      />

      {/* Stats */}
      <section className="py-24 md:py-32 bg-[#052424] text-white">
        <div className="site-container">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-[32px] md:text-[56px] font-normal tracking-tight">Backing is believing</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
                <p className="text-[48px] md:text-[64px] font-bold text-[#abff02] tracking-tighter">{s.num}</p>
                <p className="text-white/60 text-[14px] md:text-[16px] mt-4 font-geist tracking-widest uppercase">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-white">
        <div className="site-container">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-[32px] md:text-[56px] font-normal text-[#052424] tracking-tight leading-[1.1]">
              Powered by innovators in tech<br className="hidden md:block" /> & experts in logistics
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-20 max-w-5xl mx-auto">
            {teamMembers.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 0.1} className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden bg-muted mb-6">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[20px] font-semibold text-[#052424]">{m.name}</h3>
                <p className="text-[14px] text-[#A2A2A2] mt-1 uppercase font-geist tracking-wider">{m.role}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
