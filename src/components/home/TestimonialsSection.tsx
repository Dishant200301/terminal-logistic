import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const borderRadius = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 20, 20, 60]);

  return (
    <section ref={sectionRef} className="relative py-4">
      <motion.div
        style={{ borderRadius }}
        className="relative overflow-hidden mx-auto max-w-[1400px]"
      >
        <div className="relative h-[70vh] md:h-[80vh] flex items-center justify-center">
          <img
            src="/images/home/testimonial-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="relative z-10 text-center site-container max-w-3xl">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-snug"
            >
              "Built by logistics leaders who want a new industry standard in the yard"
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-primary-foreground/50 mt-6 text-sm font-mono tracking-wide"
            >
              — Terminal Industries Leadership
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
