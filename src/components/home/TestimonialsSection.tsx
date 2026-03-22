import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const TestimonialsSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full" style={{ minHeight: "clamp(500px, 60vw, 818px)" }}>
        <img
          src="/images/home/testimonial.png"
          alt="Logistics truck on highway"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Top Scooped Edge — white, same as footer */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none leading-none">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full h-[25px] md:h-[60px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0 H1440 V20 H1240 C1160 20 1160 60 1080 60 H360 C280 60 280 20 200 20 H0 V0 Z" fill="white" />
          </svg>
        </div>

        {/* Bottom Scooped Edge — white, mirrored */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none leading-none">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full h-[25px] md:h-[60px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 60 H1440 V40 H1240 C1160 40 1160 0 1080 0 H360 C280 0 280 40 200 40 H0 V60 Z" fill="white" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6" style={{ minHeight: "clamp(500px, 60vw, 818px)" }}>
          <AnimatedSection className="flex flex-col items-center">
            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-inter font-normal text-white text-center max-w-[825px]"
              style={{
                fontSize: "clamp(24px, 3.04vw, 43.8px)",
                lineHeight: "clamp(28px, 3.06vw, 44px)",
                letterSpacing: "-0.613px",
              }}
            >
              "We have not seen this kind of accuracy with computer-vision technology… this is a significant milestone in the race to modernize the yard."
            </motion.blockquote>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-10 md:mt-14 flex flex-col items-center text-center"
            >
              <span
                className="font-inter font-medium text-white block"
                style={{
                  fontSize: "clamp(16px, 1.53vw, 22.1px)",
                  lineHeight: "29px",
                  letterSpacing: "-0.307px",
                }}
              >
                Karen Jones
              </span>
              <span
                className="font-inter font-medium text-white block mt-0.5"
                style={{
                  fontSize: "clamp(16px, 1.53vw, 22.1px)",
                  lineHeight: "29px",
                  letterSpacing: "-0.307px",
                }}
              >
                Head of New Product
              </span>
              <span
                className="font-inter font-medium text-white block mt-0.5"
                style={{
                  fontSize: "clamp(16px, 1.53vw, 22.1px)",
                  lineHeight: "29px",
                  letterSpacing: "-0.307px",
                }}
              >
                Ryder System, Inc.
              </span>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
