import AnimatedSection from "@/components/AnimatedSection";

const teamMembers = [
  { name: "Alex Chen", role: "CEO & Co-Founder", img: "/images/about/about-hero.jpg" },
  { name: "Sarah Mitchell", role: "CTO", img: "/images/about/about-hero.jpg" },
  { name: "James Rodriguez", role: "VP Operations", img: "/images/about/about-hero.jpg" },
  { name: "Emily Watson", role: "Head of Product", img: "/images/about/about-hero.jpg" },
  { name: "Michael Park", role: "VP Engineering", img: "/images/about/about-hero.jpg" },
  { name: "Lisa Chen", role: "VP Sales", img: "/images/about/about-hero.jpg" },
];

const AboutTeam = () => {
  return (
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
  );
};

export default AboutTeam;
