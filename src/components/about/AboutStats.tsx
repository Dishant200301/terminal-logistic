import AnimatedSection from "@/components/AnimatedSection";

const stats = [
  { num: "85%", label: "Reduction in yard dwell time" },
  { num: "3x", label: "Faster gate throughput" },
  { num: "50+", label: "Enterprise deployments" },
  { num: "99.9%", label: "System uptime" },
];

const AboutStats = () => {
  return (
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
  );
};

export default AboutStats;
