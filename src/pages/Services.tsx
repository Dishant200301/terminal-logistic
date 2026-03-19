import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Service, services } from "@/data/services";

const ServiceCard = ({ service, isMerged = false, index }: { service: Service; isMerged?: boolean; index: number }) => {
  if (isMerged) {
    return (
      <AnimatedSection delay={index * 0.1} className="lg:col-span-2 h-full">
        <div className="group relative bg-white rounded-[12px] overflow-hidden flex flex-col md:flex-row h-full shadow-lg transition-all duration-500">
          <div className="md:w-1/2 relative overflow-hidden bg-white p-2">
            <div className="absolute top-6 left-6 z-20 flex gap-2">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold text-white uppercase tracking-wider border border-white/20">
                {service.label}
              </span>
            </div>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover rounded-[12px] transition-transform duration-700"
            />
          </div>
          <div className="flex-1 p-4 md:p-6 flex flex-col justify-center  md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4 tracking-wider uppercase leading-tight">
              {service.title}
            </h3>
            <p className="text-sm md:text-base text-[#4b5563] mb-8 font-inter leading-relaxed line-clamp-3">
              {service.description}
            </p>
            <div className="mb-8">
              <p className="text-2xl font-bold text-white mb-2">From {service.price?.split(' ')[1] || '7 000'} P</p>
              <p className="text-sm text-white/40 line-through">instead 17 000 P</p>
            </div>
            <p className="text-[10px] text-white/40 italic leading-relaxed">
              * The discount is valid until June 30, 2026. <br />
              The cost includes a consultation with an expert with 10+ years of experience.
            </p>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={index * 0.1} className="h-full">
      <div className="group relative flex h-full flex-col rounded-[12px] border border-transparent bg-white p-2 pb-6 shadow-[0_4px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#eff5f5] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        {/* Top Section (Image Area) */}
        <div className="relative overflow-hidden bg-[#eef5f5] rounded-[12px] aspect-[4/3] mb-6">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="px-3 py-0.5 bg-white/90 backdrop-blur-sm rounded-xl">
              <span className="text-[11px] font-bold text-[#052424] tracking-tight">
                {service.label}
              </span>
            </div>
          </div>

          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>

        {/* Content Section */}
        <div className="relative flex flex-1 flex-col px-4">
          <div className="flex flex-1 flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4 group-hover:pr-1">
            <h3 className="mb-3 text-xl font-bold leading-tight tracking-wide text-[#052424] uppercase transition-colors duration-500 group-hover:text-[#0a3a3a]">
            {service.title}
            </h3>
            <p className="mb-6 text-[13px] leading-relaxed text-[#6B7280] font-inter transition-colors duration-500 group-hover:text-[#4b5563]">
            {service.description}
            </p>
          </div>

          <div className="mt-auto hidden lg:block">
            <div className="pointer-events-none translate-y-6 opacity-0 transition-all duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <Link
                to={`/services/${service.slug}`}
                className="flex w-full items-center justify-center rounded-xl bg-[#052424] py-4 text-[11px] font-bold tracking-[2px] text-white uppercase transition-colors duration-300 hover:bg-black"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile View - Always show button */}
        <div className="mt-6 px-4 lg:hidden">
          <Link
            to={`/services/${service.slug}`}
            className="flex w-full items-center justify-center rounded-xl bg-[#052424] py-4 text-[11px] font-bold tracking-[2px] text-white uppercase"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Services = () => (
  <div className="bg-white min-h-screen">
    <Helmet>
      <title>Services — Terminal</title>
      <meta name="description" content="Explore Terminal's premium yard management services with high-fidelity 3D orchestration and AI visibility." />
    </Helmet>

    {/* Hero Section */}
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 text-gray-100" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 95% 75%, 90% 85%, 75% 95%, 60% 100%, 0 95%)' }}>
        <img src="/images/common/bg.png" alt="" className="w-full h-full object-cover opacity-50" />
      </div>

      <div className="site-container relative z-10 text-center">
        <AnimatedSection>
          <div className="inline-block px-4 py-1.5 bg-[#052424] rounded-full mb-8">
            <p className="text-[10px] font-bold tracking-[3px] uppercase text-[#ABFF02]">
              SOLUTIONS
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-[#052424] tracking-tight leading-[1] max-w-5xl mx-auto">
            Terminal Yard <br className="hidden md:block" />
            <span className="text-gray-400">Environment</span>
          </h1>
        </AnimatedSection>
      </div>
    </section>

    {/* Custom Services Grid */}
    <section className="py-24 relative z-10">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ServiceCard
              key={s.slug}
              service={s}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
