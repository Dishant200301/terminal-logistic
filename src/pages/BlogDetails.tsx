import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { blogDetails } from "@/data/blogDetails";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronRight } from "lucide-react";

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogDetails[slug || ""] || blogDetails["sustainability-starts-at-the-gate"];
  
  const [activeId, setActiveId] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for TOC active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, [post]);

  return (
    <div className="bg-white">
      <Helmet>
        <title>{post.title} — Terminal</title>
        <meta name="description" content={post.tagline} />
      </Helmet>

      {/* Hero Section - High Fidelity Fixes */}
      <section className="relative w-full h-auto lg:h-[1435px] overflow-hidden bg-white">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/common/bg.png" 
            alt="" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>

        {/* Animations Layer (Mirrored from Blog) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[500px] left-1/2 -translate-x-1/2 w-[800px] h-[800px]">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center opacity-10"
            >
              <div className="w-[1px] h-[500px] bg-gradient-to-t from-[#ABFF02] to-transparent" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ABFF02] rounded-full shadow-[0_0_15px_#ABFF02] opacity-40" />
            </motion.div>
          </div>
        </div>

        <div className="site-container relative z-10 h-full">
          <div className="pt-40 lg:pt-[254px] text-center px-4">
            <AnimatedSection>
              <div className="flex items-center justify-center gap-2 mb-12">
                <span className="text-[11px] font-geist font-bold tracking-[1.98px] uppercase text-[#052424]">
                  {post.category} • {post.date}
                </span>
              </div>
              
              <h1 className="text-[42px] md:text-[68px] lg:text-[105.3px] font-normal text-[#052424] tracking-[-1.467px] leading-[1.0] lg:leading-[104px] max-w-[1532px] mx-auto mb-[42px] font-sans">
                {post.title}
              </h1>
              
              <p className="text-[18px] lg:text-[19.2px] text-[#7F7F7F] leading-[29px] tracking-[-0.2px] max-w-[696px] mx-auto mb-20">
                {post.tagline}
              </p>

              {/* Featured Image Layer */}
              <div className="relative w-full max-w-[924px] lg:max-w-[1100px] xl:max-w-[1300px] mx-auto lg:mt-[100px] aspect-[16/9] lg:h-[617px]">
                <div className="w-full h-full bg-[#E5E7EB] rounded-[8px] overflow-hidden shadow-2xl overflow-hidden">
                   <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Article Body Section with Sticky sidebars */}
      <section className="relative bg-white pb-32 lg:pt-20">
        <div className="site-container">
          <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr_280px] gap-12 xl:gap-24 relative">
            
            {/* Column 1: Sticky Author Profile */}
            <aside className="order-2 lg:order-1 lg:block">
              <div className="lg:sticky lg:top-32 space-y-12">
                <div className="space-y-6">
                  <span className="text-[10.7px] font-semibold text-[#9CA3AF] uppercase tracking-[1.2px]">About the Author</span>
                  <div className="flex flex-col gap-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-16 h-16 rounded-full object-cover bg-gray-100"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${post.author.name}&background=f3f4f6&color=111827`;
                      }}
                    />
                    <div>
                      <h4 className="text-[14.6px] font-medium text-[#111827] leading-[21px] tracking-[-0.15px]">{post.author.name}</h4>
                      <p className="text-[12.6px] text-[#6B7280] leading-[18px] tracking-[-0.13px]">{post.author.role}</p>
                    </div>
                    <p className="text-[12.4px] leading-[21px] text-[#6B7280] tracking-[-0.13px] max-w-[257px]">
                      {post.author.bio}
                    </p>
                  </div>
                </div>

                <Link 
                  to="/contact" 
                  className="flex items-center justify-center gap-2 h-10 px-4 bg-[#052424]/5 hover:bg-[#052424]/10 transition-colors rounded-lg group"
                >
                  <span className="text-[10.8px] font-bold text-[#052424] uppercase tracking-[1.98px]">Talk to an expert</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform text-[#052424]" />
                </Link>
              </div>
            </aside>

            {/* Column 2: Content Body */}
            <main className="order-1 lg:order-2 max-w-[650px] mx-auto lg:mx-0">
               <div ref={contentRef} className="prose-custom">
                  {post.content.map((item, index) => {
                    const id = item.type === 'heading' ? item.text?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : undefined;
                    
                    switch (item.type) {
                      case 'paragraph':
                        return <p key={index} className="text-[17.4px] leading-[32px] text-[#4B5563] mb-8">{item.text}</p>;
                      case 'strong':
                        return <p key={index} className="text-[17.4px] leading-[32px] font-semibold text-[#111827] mb-8">{item.text}</p>;
                      case 'heading':
                        const Tag = item.level === 3 ? 'h3' : 'h2';
                        const size = item.level === 3 ? 'text-[23.4px]' : 'text-[29.2px]';
                        return (
                          <Tag 
                            key={index} 
                            id={id}
                            className={`${size} font-medium tracking-tight text-[#111827] mt-16 mb-8 scroll-mt-32`}
                          >
                            {item.text}
                          </Tag>
                        );
                      case 'list':
                        return (
                          <ul key={index} className="list-outside pl-6 space-y-4 mb-10">
                            {item.items?.map((li, i) => (
                              <li key={i} className="text-[17.4px] leading-[32px] text-[#4B5563] relative pl-2 before:content-['•'] before:absolute before:-left-4 before:text-[#4B5563]">
                                {li}
                              </li>
                            ))}
                          </ul>
                        );
                      default:
                        return null;
                    }
                  })}
               </div>

               {/* Post Navigation / Actions */}
               <div className="flex gap-4 mt-20 pt-10 border-t border-gray-100">
                  <button className="flex-1 h-14 bg-[#052424]/5 hover:bg-[#052424]/10 rounded-lg text-[11px] font-bold tracking-[1.98px] uppercase transition-colors">Share</button>
                  <button className="flex-1 h-14 bg-[#052424]/5 hover:bg-[#052424]/10 rounded-lg text-[11px] font-bold tracking-[1.98px] uppercase transition-colors">Request a Demo</button>
               </div>
            </main>

            {/* Column 3: Sticky Table of Contents */}
            <aside className="hidden lg:block lg:order-3">
              <div className="lg:sticky lg:top-32 h-[410px] overflow-y-auto pr-4 scrollbar-hide space-y-8">
                <span className="text-[10.8px] font-semibold text-[#9CA3AF] uppercase tracking-[1.2px]">Table of Contents</span>
                <nav className="relative pl-[2px] space-y-0 text-left">
                   {post.tableOfContents.map((item) => {
                     const isActive = activeId === item.id;
                     return (
                       <div key={item.id} className="relative group">
                         {isActive && (
                           <motion.div 
                            layoutId="toc-marker"
                            className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-[#059669]" 
                           />
                         )}
                         <a 
                          href={`#${item.id}`}
                          className={`block py-2.5 pl-5 text-[13.6px] leading-[21px] transition-colors border-l-[2px] ${isActive ? "text-[#059669] border-[#059669] font-medium" : "text-[#6B7280] border-transparent hover:text-gray-900"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                         >
                           {item.title}
                         </a>
                       </div>
                     );
                   })}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* "From the Yard to Your Inbox" Newsletter Section */}
      <section className="bg-[#f9f9f9] py-24 border-t border-gray-100">
        <div className="site-container text-center">
           <AnimatedSection>
             <h2 className="text-[42px] md:text-[60px] font-normal text-[#052424] tracking-tight mb-4">
              From the Yard to Your Inbox
             </h2>
             <p className="text-[16px] text-gray-400 mb-12">
               Insights, strategies, and innovation in logistics yard management.
             </p>
             <div className="relative max-w-2xl mx-auto opacity-[0.05] pointer-events-none mb-12">
               {/* Ambient Layout Grid visible in reference */}
                <div
                  className="w-full h-[200px]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #052424 1px, transparent 1px),
                      linear-gradient(to bottom, #052424 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}
                />
             </div>
             
             <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
               <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 h-14 px-6 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#ABFF02] transition-colors"
               />
               <button className="h-14 px-10 bg-[#052424] text-[#ABFF02] font-bold text-[12px] tracking-widest uppercase rounded-lg hover:bg-black transition-colors">
                 Subscribe
               </button>
             </div>
           </AnimatedSection>
        </div>
      </section>

      {/* Massive Dark CTA */}
      <section className="bg-[#052424] pt-32 pb-24 overflow-hidden relative">
        <div className="site-container relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-[40px] md:text-[68px] font-normal text-white tracking-tight leading-[1.1] mb-12 max-w-[800px] mx-auto">
              The yard of the future starts <span className="text-[#ABFF02]">today.</span>
            </h2>
            <Link 
              to="/contact" 
              className="cta-button-premium h-[60px] md:h-[70px] min-w-[240px]"
            >
              <div className="square-scanner" />
              <span className="relative z-10">BOOK A DEMO</span>
              <div className="btn-underline-premium" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
