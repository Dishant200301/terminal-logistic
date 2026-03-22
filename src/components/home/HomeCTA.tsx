import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { BackgroundLines } from "@/components/Footer";

const MotionLink = motion(Link);

const HomeCTA = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[500px] md:h-[818.84px] overflow-hidden bg-white">

      {/* Background Curved Lines (Matched to Image with Mask) */}
      <BackgroundLines baseColor="#052424" glowColor="#acff04" coreColor="#acff04" />

      <div className="site-container relative z-10 text-center flex flex-col items-center">
        <AnimatedSection>
          <p className="text-[16px] md:text-[20px] text-[#C2C2C2] leading-[19px] tracking-[-0.2px] font-normal font-['SuisseIntl',_sans-serif] mb-[10px]">
            How it Works
          </p>
          <h2 className="text-[28px] md:text-[56px] lg:text-[72px] font-normal text-[#052424] leading-[1.04] md:leading-[56px] lg:leading-[72px] tracking-[-1.5px] md:tracking-[-3.6px] mb-[10px] max-w-[1000px] mx-auto font-['SuisseIntl',_sans-serif]">
            Revolutionary technology <br />
            that transforms your <br />
            yard from gate to dock
          </h2>

          <div className="flex flex-col items-center">
            <MotionLink
              to="/contact"
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative flex flex-col items-center justify-center h-[73.81px] rounded-[8px]"
            >
              <span className="text-[11px] font-['Geist_Mono',_monospace] font-semibold tracking-[1.98px] text-[#052424] uppercase mb-[8.91px] leading-[9px] transition-colors duration-300 pointer-events-none">
                TAKE A CLOSER LOOK
              </span>
              {/* Dynamic Underline */}
              <div className="relative w-[155px] h-[1px]">
                <motion.div
                  className="absolute inset-[0px] h-full bg-[#052424] pointer-events-none"
                  variants={{
                    rest: { scaleX: 0, originX: 0 },
                    hover: { scaleX: 1, originX: 0 }
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </MotionLink>
          </div>
        </AnimatedSection>
      </div>

      {/* Realistic Gradient Transition from LogoGridSection */}
      <div className="absolute top-0 left-0 w-full h-[150px] md:h-[250px] pointer-events-none bg-gradient-to-b from-white to-transparent z-10" />

      {/* Realistic Gradient Transition to ContactFormSection */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] md:h-[250px] pointer-events-none bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default HomeCTA;
