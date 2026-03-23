import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, Search, PhoneCall, CheckCircle2, ChevronDown, Zap, Shield } from "lucide-react";
import { serviceDetailsData } from "@/data/serviceDetails";
import { useEffect, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CharacterScrollReveal from "@/components/about/CharacterScrollReveal";

const NotchedImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  const clipId = useId().replace(/:/g, "");
  // Standard right-notched path for cards/hero sections
  const pathD = "M 0,0.05 L 0.67,0.05 Q 0.70,0.05 0.72,0.04 L 0.78,0.01 Q 0.80,0 0.85,0 L 1,0 L 1,0.30 C 1,0.36 0.94,0.36 0.94,0.42 L 0.94,0.58 Q 0.94,0.64 1,0.64 L 1,0.70 Q 1,0.76 1,1 L 0,1 L 0,0.05 Z";

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <style>{`
        .clip-${clipId} {
          clip-path: url(#path-${clipId});
        }
      `}</style>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id={`path-${clipId}`} clipPathUnits="objectBoundingBox">
            <path d={pathD} />
          </clipPath>
        </defs>
      </svg>
      <div className="w-full h-full ">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>
    </div>
  );
};

const Accordion = ({ items }: { items: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 w-full">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-lg overflow-hidden border border-[#E5E5E5]">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 ${openIndex === idx ? "bg-[#052424] text-white" : "bg-[#F5F5F5] text-[#052424]"
              }`}
          >
            <span className="text-[15px] md:text-[17px] font-semibold tracking-tight font-sans uppercase">
              {item.question}
            </span>
            <ChevronDown
              className={`transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
              size={20}
            />
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-5 text-[#7F7F7F] bg-white leading-relaxed text-[14px] md:text-[15px] font-sans">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const service = serviceDetailsData[slug || ""];
  const allServicesData = Object.values(serviceDetailsData);
  const relatedServices = allServicesData.filter(s => s.slug !== slug).slice(0, 3);

  if (!service) {
    return <Navigate to="/services" />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="bg-white min-h-screen pt-28 pb-20 md:pt-44 md:pb-32 font-sans">
      <Helmet>
        <title>{service.title} — Shipper</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-24 md:mb-32">

          {/* --- LEFT CONTENT AREA (70%) --- */}
          <div className="lg:col-span-8">
            {/* Title + Description */}
            <AnimatedSection>
              <h1 className="text-[28px] sm:text-[34px] md:text-[40px] font-normal text-[#052424] mb-5 tracking-tight font-sans uppercase leading-[1.1]">
                {service.title}
              </h1>
            </AnimatedSection>
            <div className="text-[15px] md:text-[17px] leading-[1.75] mb-10 md:mb-10 font-sans max-w-[750px] text-[#3a3a3a]">
              <CharacterScrollReveal text={service.overviewText} />
            </div>

            
            {/* Top Notched Image */}
            <AnimatedSection>
              <div className="aspect-video mb-10 rounded-lg">
                <NotchedImage
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full shadow-sm rounded-lg"
                />
              </div>
            </AnimatedSection>



            {/* Why Choose Us Section */}
            <section className="mb-16">
              <AnimatedSection>
                <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-normal text-[#052424] mb-8 tracking-tight font-sans uppercase">
                  Why Choose Shipper?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {(service.whyChooseUs || [
                    { title: "Efficiency First", desc: "Automate manual tasks and eliminate gate bottlenecks." },
                    { title: "Real-time Visibility", desc: "Get 100% accurate tracking of all yard assets." },
                    { title: "Scalable Tech", desc: "Our platform grows with your Shipper volume." }
                  ]).map((point, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center text-black">
                        {idx === 0 ? <Zap size={24} /> : idx === 1 ? <Shield size={24} /> : <CheckCircle2 size={24} />}
                      </div>
                      <div>
                        <h4 className="text-[16px] md:text-[18px] font-normal text-[#052424] mb-1.5 tracking-tight font-sans uppercase">{point.title}</h4>
                        <p className="text-[13px] md:text-[14px] text-[#7F7F7F] leading-relaxed font-sans">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </section>

            {/* Dual Notched Image Section */}
            {service.secondaryImages && (
              <AnimatedSection className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  {service.secondaryImages.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg">
                      <NotchedImage src={img} alt={`Detail ${i}`} className="w-full h-full rounded-lg" />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* FAQ Accordion */}
            <section>
              <AnimatedSection>
                <div className="mb-10">
                  <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-normal text-[#052424] mb-4 tracking-tight font-sans uppercase">
                    Frequently Asked Questions
                  </h2>
                </div>
                <Accordion
                  items={service.faqs || [
                    { question: "How long does implementation take?", answer: "Typical deployment takes between 4 to 8 weeks." },
                    { question: "Is it compatible with legacy systems?", answer: "Yes, our API-first model integrates with all major WMS providers." },
                    { question: "Do you provide on-site training?", answer: "Comprehensive on-site training is part of every deployment package." }
                  ]}
                />
              </AnimatedSection>
            </section>
          </div>

          {/* --- RIGHT SIDEBAR (30%) --- */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-36 space-y-8">

              {/* Search Box */}
              <div className="bg-[#F5F5F5] p-2 rounded-[10px] flex items-center border border-transparent focus-within:border-[#ABFF02] transition-colors">
                <form onSubmit={handleSearch} className="flex w-full">
                  <input
                    type="text"
                    placeholder="Search solution..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-[#052424] placeholder-[#A0A0A0] text-[14px] md:text-[15px] px-4 flex-1 outline-none font-sans"
                  />
                  <button type="submit" className="w-12 h-12 rounded-lg bg-[#052424] flex items-center justify-center text-[#ABFF02] hover:bg-black transition-colors">
                    <Search size={20} />
                  </button>
                </form>
              </div>

              {/* Our Services Quick List */}
              <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#E5E5E5]">
                  <h3 className="text-[18px] md:text-[20px] font-normal text-[#052424] tracking-tight font-sans uppercase">Solutions</h3>
                </div>
                <div className="flex flex-col">
                  {allServicesData.map((s) => {
                    const isActive = s.slug === slug;
                    return (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className={`flex items-center justify-between px-6 py-4 transition-all duration-150 group ${isActive
                          ? "bg-[#ABFF02] text-[#052424]"
                          : "bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#052424]"
                          } border-b border-white last:border-b-0`}
                      >
                        <span className="text-[12px] md:text-[13px] font-normal tracking-tight font-sans uppercase line-clamp-1">{s.title}</span>
                        <ArrowRight size={18} className={`transition-transform duration-300 ${isActive ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Contact Help Card */}
              <div className="bg-[#ABFF02] p-6 md:p-8 rounded-[10px] text-[#052424] text-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow shadow-[#052424]/10">
                  <PhoneCall size={24} />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-normal mb-2 tracking-tight font-sans uppercase">Mission Support</h3>
                <p className="text-[#052424]/70 text-[13px] md:text-[14px] leading-relaxed mb-6 font-sans">
                  Get in touch with an engineer for a custom configuration setup.
                </p>
                <Link
                  to="/contact"
                  className="flex w-full justify-center items-center btn-contact relative overflow-hidden bg-white text-black py-4 rounded-lg text-xs font-sans font-bold tracking-widest uppercase z-10"
                >
                  <span className="relative z-10">Get In Touch</span>
                </Link>
              </div>

            </div>
          </aside>
        </div>

        {/* --- Related Service Cards Section --- */}
        <section className="pt-24 md:pt-32 border-t border-[#E5E5E5]">
          <AnimatedSection className="mb-16">
            <h2 className="text-[26px] sm:text-[34px] md:text-[48px] font-normal text-[#052424] tracking-tight font-sans uppercase leading-[1.1]">
              Discover More Solutions
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {relatedServices.map((s, idx) => (
              <AnimatedSection key={s.slug} delay={idx * 0.1}>
                <Link to={`/services/${s.slug}`} className="group block h-full">
                  <div className="aspect-[4/3] mb-8 rounded-lg overflow-hidden">
                    <NotchedImage
                      src={s.heroImage}
                      alt={s.title}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#052424] border border-[#ABFF02]/30 shadow-[0_0_10px_rgba(171,255,2,0.1)] mb-4 w-fit backdrop-blur-sm">
                      <span className="text-[10px] md:text-[11px] font-normal tracking-[3px] text-[#ABFF02] font-sans uppercase translate-y-[0.5px]">
                        {s.kicker}
                      </span>
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-normal text-[#052424] mb-3 group-hover:text-[#ABFF02] transition-colors font-sans uppercase">
                      {s.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[#7F7F7F] leading-relaxed line-clamp-3 mb-5 font-sans">
                      {s.description}
                    </p>
                    <div className="relative flex items-center gap-2 text-[11px] md:text-[12px] font-normal font-sans tracking-[3px] uppercase text-[#052424] w-fit pb-1 transition-colors">
                      LEARN MORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      {/* Static underline */}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ABFF02]" />
                      {/* Animated sliding underline */}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#052424] origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServiceDetails;
