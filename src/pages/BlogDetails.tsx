import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { blogDetails } from "@/data/blogDetails";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronRight } from "lucide-react";
import TeamCTA from "@/components/about/TeamCTA";

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogDetails[slug || ""] || blogDetails["sustainability-starts-at-the-gate"];

  const [activeId, setActiveId] = useState(post.tableOfContents[0]?.id || "");
  const contentRef = useRef<HTMLDivElement>(null);

  // Improved grouping logic matching TOC IDs precisely
  const sections: { [key: string]: any[] } = {};
  let currentSecId = 'opening';

  post.content.forEach((item) => {
    if (item.type === 'heading') {
      // Find matching TOC item to get the ID
      const matchingToc = post.tableOfContents.find(t =>
        t.title.toLowerCase().includes(item.text?.toLowerCase() || "") ||
        (item.text?.toLowerCase().includes(t.title.toLowerCase()))
      );

      if (matchingToc) {
        currentSecId = matchingToc.id;
        sections[currentSecId] = [item];
      } else {
        // Fallback to slugification if no match in TOC list
        currentSecId = item.text?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || 'unknown';
        sections[currentSecId] = [item];
      }
    } else {
      if (!sections[currentSecId]) sections[currentSecId] = [];
      sections[currentSecId].push(item);
    }
  });

  // Ensure opening content is visible (merged into first known section or displayed separately)
  const firstSectionId = post.tableOfContents[0]?.id;
  if (sections.opening && firstSectionId) {
    sections[firstSectionId] = [...sections.opening, ...(sections[firstSectionId] || [])];
  }


  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0.1
      }
    );

    const sectionElements = document.querySelectorAll("[data-content-section]");
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [post]);

  const isSubHeading = (id: string) => {
    const section = sections[id];
    if (!section) return false;
    const heading = section.find(item => item.type === 'heading');
    return heading?.level === 3;
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>{post.title} — Termihub</title>
        <meta name="description" content={post.tagline} />
      </Helmet>

      {/* Hero Section - High Fidelity Fixes */}
      <section className="relative w-full h-auto lg:min-h-[800px] pb-24 overflow-hidden bg-white">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/common/bg.png"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        </div>



        <div className="site-container relative z-10 h-full">
          <div className="pt-40 lg:pt-[254px] text-center px-0">
            <AnimatedSection>
              <div className="flex items-center justify-center gap-2 mb-12">
                <span className="text-[11px] font-geist font-normal tracking-[1.98px] uppercase text-[#052424]">
                  {post.category} • {post.date}
                </span>
              </div>

              <h1 className="text-[28px] md:text-[48px] lg:text-[56px] font-normal text-[#052424] tracking-tight leading-[1.1] max-w-[1200px] mx-auto mb-[32px] font-sans">
                {post.title}
              </h1>

              <p className="text-[16px] lg:text-[19.2px] text-[#7F7F7F] leading-[24px] md:leading-[29px] tracking-[-0.2px] max-w-[696px] mx-auto mb-10 md:mb-20">
                {post.tagline}
              </p>

              {/* Featured Image Layer */}
              <div className="relative w-full max-w-[924px] lg:max-w-[1000px] mx-auto lg:mt-[60px] aspect-[16/9] lg:h-[500px]">
                <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Article Body Section with Sticky sidebars */}
      <section className="relative bg-white pb-12 lg:pt-10">
        <div className="site-container">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] xl:grid-cols-[280px_1fr_260px] gap-12 xl:gap-16 relative">

            {/* Column 1: Sticky Author Profile (1st on mobile/tablet/laptop) */}
            <aside className="order-1 lg:col-span-2 xl:col-span-1 xl:order-1 xl:block">
              <div className="lg:max-w-2xl xl:sticky xl:top-32 space-y-6">
                <div className="space-y-6">
                  <span className="text-[10.7px] font-semibold text-[#9CA3AF] uppercase tracking-[1.2px]">About the Author</span>
                  <div className="flex flex-col gap-6">
                    {/* Avatar - Circle on smaller screens, Rounded-lg on Large Desktop */}
                    <div className="w-16 h-16 xl:w-12 xl:h-12 rounded-full xl:rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img 
                        src="/images/blog/avatar.png" 
                        alt={post.author.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[20px] xl:text-[16px] font-normal text-[#052424] xl:text-[#abff02] leading-tight tracking-tight uppercase mb-1">{post.author.name}</h4>
                      <p className="text-[14px] xl:text-[11px] font-normal xl:font-semibold text-[#8a8a8a] xl:uppercase tracking-normal xl:tracking-wider">{post.author.role}</p>
                    </div>
                    <p className="text-[15px] xl:text-[12px] leading-relaxed text-[#525252] max-w-full xl:max-w-[240px]">
                      {post.author.bio}
                    </p>
                  </div>
                </div>

                {/* Mobile/Tablet/Laptop Button */}
                <Link 
                  to="/contact" 
                  className="xl:hidden btn-contact relative overflow-hidden flex w-full bg-[#F3F4F6] text-[#052424] py-4 rounded-lg text-[12px] font-normal tracking-[2.4px] uppercase justify-center items-center z-10"
                >
                  <span className="relative z-10">TALK TO AN EXPERT</span>
                </Link>

                
              </div>
            </aside>

            {/* Column 2: Content Body (2nd on mobile/tablet/laptop) */}
            <main className="order-2 lg:order-2 lg:col-span-1 xl:order-2 xl:col-span-1 max-w-[650px] mx-auto md:mx-0 xl:mx-0">
              <div className="prose-custom">
                {post.tableOfContents.map((tocItem) => (
                  <div
                    key={tocItem.id}
                    id={tocItem.id}
                    data-content-section
                    className="scroll-mt-40"
                  >
                    {(sections[tocItem.id] || []).map((item: any, index: number) => {
                      switch (item.type) {
                        case 'paragraph':
                          return <p key={index} className="text-[14px] xl:text-[17.4px] leading-[1.6] xl:leading-[32px] text-[#4B5563] mb-4">{item.text}</p>;
                        case 'strong':
                          return <p key={index} className="text-[14px] xl:text-[17.4px] leading-[1.6] xl:leading-[34px] font-semibold text-[#111827] mb-6 border-l-4 border-accent pl-6 bg-accent/5 py-4">{item.text}</p>;
                        case 'heading':
                          const Tag = item.level === 3 ? 'h3' : 'h2';
                          const desktopSize = item.level === 3 ? 'xl:text-[24px]' : 'xl:text-[32px]';
                          return (
                            <Tag 
                              key={index} 
                              className={`text-[20px] ${desktopSize} font-normal tracking-tight text-[#052424] mt-6 mb-2`}
                            >
                              {item.text}
                            </Tag>
                          );



                        case 'list':
                          return (
                            <ul key={index} className="list-outside pl-6 space-y-4 xl:space-y-0 mb-10">
                              {item.items?.map((li: string, i: number) => (
                                <li key={i} className="text-[16px] md:text-[17.4px] leading-[20px] xl:leading-[32px] text-[#4B5563] relative pl-2 before:content-['•'] before:absolute before:-left-4 before:text-accent font-medium">
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
                ))}
              </div>


            </main>

             {/* Column 3: Table of Contents matching Reference height and style */}
            <aside className="hidden lg:block lg:order-3 lg:col-span-1 xl:col-span-1 ml-4">
              <div className="lg:sticky lg:top-32 border-l-[1.5px] border-[#EEEEEE] py-1">
                <span className="text-[12px] font-normal text-[#A5A5A5] uppercase tracking-[1.5px] pl-8 block mb-10">Table of Contents</span>
                <nav className="space-y-4 gap-6 text-left">
                   {post.tableOfContents.map((item) => {
                     const isActive = activeId === item.id;
                     const isSub = isSubHeading(item.id);
                     return (
                       <div key={item.id} className={`${isSub ? 'pl-20' : 'pl-8'}`}>
                         <button 
                          onClick={() => {
                            setActiveId(item.id);
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className={`text-[17px] leading-tight transition-all duration-300 text-left ${isActive ? "text-[#059669] font-normal" : "text-[#7F7F7F] hover:text-[#052424] font-normal"}`}
                         >
                           {item.title}
                         </button>
                       </div>
                     );
                   })}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>


      <TeamCTA />

    </div>
  );
};

export default BlogDetails;
