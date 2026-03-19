import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { posts } from "@/data/blog";

const BlogCard = ({ post }: { post: typeof posts[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for the interaction (kept from previous for consistency)
  const mouseY = useMotionValue(50);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[400px] md:h-[450px] min-[1100px]:h-[480px] xl:h-[494.11px] rounded-[20px]  min-[1100px]:rounded-none xl:rounded-[20px] min-[1440px]:w-[450px] min-[1440px]:rounded-[20px] overflow-hidden cursor-pointer bg-[#ABFF02] mx-auto"
      animate={{ scale: isHovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full w-full">
        {/* Content Layer (z-30) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <motion.span
            className="absolute left-[18px] top-[16px] w-auto md:w-[86.33px] h-[8.91px] font-geist font-semibold text-[10px] md:text-[11px] leading-[9px] tracking-[2px] uppercase flex items-center"
            animate={{ color: isHovered ? "#FFFFFF" : "#052424" }}
          >
            {post.category || "CASE-STUDY"}
          </motion.span>

          <motion.span
            className="absolute right-[18px] top-[16px] w-auto h-[11px] font-geist font-semibold text-[10px] md:text-[11px] leading-[11px] tracking-[2px] uppercase flex items-center"
            animate={{ color: isHovered ? "#FFFFFF" : "#052424" }}
          >
            {post.date}
          </motion.span>

          <motion.h2
            className="absolute left-[18.04px] top-[30px] md:top-[40px] lg:top-[0px] w-[calc(100%-40px)] lg:w-[282.48px] h-auto lg:h-[221.13px] font-inter font-normal text-[20px] md:text-[24px] lg:text-[27.8px] leading-[1.2] lg:leading-[27px] tracking-[-0.28px] flex items-center"
            animate={{ color: isHovered ? "#FFFFFF" : "#052424" }}
          >
            {post.title}
          </motion.h2>
        </div>

        {/* Hover Overlay Layer (z-20) */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Picture Layer */}
          <div className="absolute inset-x-[0px] inset-y-[0px] z-0 overflow-hidden rounded-[20px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.img})` }}
            />
            {/* Radial Gradient for depth while keeping image visible */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(100% 100% at 50% 100%, rgba(5, 36, 36, 0.4) 0%, rgba(5, 36, 36, 0.7) 60%, rgba(5, 36, 36, 0.9) 100%)'
              }}
            />
          </div>

        </motion.div>

        {/* Link - "More" Button (Match Navbar Contact UI) */}
        <motion.div
          className="absolute right-[18px] bottom-[18px] w-[140px] md:w-[192px] h-[40px] md:h-[50px] bg-white text-black rounded-[8px] flex items-center justify-center z-40 btn-contact overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-geist font-semibold text-[10px] md:text-[11px] leading-[9px] tracking-[1.98px] uppercase relative z-10 transition-colors duration-300">
            More
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const Blog = () => (
  <>
    <Helmet>
      <title>Blog — Terminal</title>
      <meta name="description" content="Insights, strategies, and innovation in logistics yard management from the Terminal team." />
    </Helmet>

    {/* Hero */}
    <section className="relative pt-32 pb-12 md:pt-48 md:pb-20 overflow-hidden bg-white">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #052424 1px, transparent 1px),
            linear-gradient(to bottom, #052424 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-[40%] left-[5%] md:left-[10%] w-[120px] h-[120px] bg-[#ABFF02]/20 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] md:right-[20%] w-[150px] h-[150px] bg-[#ABFF02]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[100px] h-[100px] bg-[#ABFF02]/15 blur-[40px] rounded-full pointer-events-none" />

      <div className="site-container relative z-10 text-center">
        <AnimatedSection>
          <p className="text-[14px] md:text-[18px] text-[#C2C2C2] mb-6 font-normal font-sans tracking-tight">
            Viewpoints for a smarter yard
          </p>
          <div className="flex flex-col items-center">
            <h1 className="text-[60px] md:text-[88px] font-normal text-[#052424] tracking-tight leading-none mb-6 font-sans">
              Blogs
            </h1>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Posts Grid */}
    <section className="pb-20 md:pb-28 bg-white">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Blog;
