import { motion } from "framer-motion";
import CharacterScrollReveal from "./CharacterScrollReveal";
import { useId } from "react";

const FeatureSection = ({ number, title, description, image, imageSide, actionButton }: { 
  number: string; 
  title: string; 
  description: string; 
  image: string;
  imageSide: 'left' | 'right';
  actionButton?: { text: string; link: string; };
}) => {
  const clipId = useId().replace(/:/g, "");

  const leftNotchPathDesktop = "M 0,0 L 0.15,0 Q 0.20,0 0.22,0.01 L 0.28,0.04 Q 0.30,0.05 0.33,0.05 L 1,0.05 L 1,1 L 0,1 L 0,0.70 C 0,0.64 0.06,0.64 0.06,0.58 L 0.06,0.42 C 0.06,0.36 0,0.36 0,0.30 L 0,0 Z";
  const rightNotchPathDesktop = "M 0,0.05 L 0.67,0.05 Q 0.70,0.05 0.72,0.04 L 0.78,0.01 Q 0.80,0 0.85,0 L 1,0 L 1,0.30 C 1,0.36 0.94,0.36 0.94,0.42 L 0.94,0.58 C 0.94,0.64 1,0.64 1,0.70 L 1,1 L 0,1 Z";

  const leftNotchPathMobile = "M 0,0 L 0.15,0 Q 0.20,0 0.22,0.01 L 0.28,0.04 Q 0.30,0.05 0.33,0.05 L 1,0.05 L 1,1 L 0,1 L 0,0 Z";
  const rightNotchPathMobile = "M 0,0.05 L 0.67,0.05 Q 0.70,0.05 0.72,0.04 L 0.78,0.01 Q 0.80,0 0.85,0 L 1,0 L 1,1 L 0,1 Z";

  const desktopPathD = imageSide === 'right' ? leftNotchPathDesktop : rightNotchPathDesktop;
  const mobilePathD = imageSide === 'right' ? leftNotchPathMobile : rightNotchPathMobile;

  return (
    <section className="py-6 lg:py-8 overflow-hidden bg-white w-full">
      <style>{`
        .feature-clip-${clipId} {
          clip-path: url(#clip-mobile-${clipId});
        }
        @media (min-width: 1024px) {
          .feature-clip-${clipId} {
            clip-path: url(#clip-desktop-${clipId});
          }
        }
      `}</style>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id={`clip-desktop-${clipId}`} clipPathUnits="objectBoundingBox">
            <path d={desktopPathD} />
          </clipPath>
          <clipPath id={`clip-mobile-${clipId}`} clipPathUnits="objectBoundingBox">
            <path d={mobilePathD} />
          </clipPath>
        </defs>
      </svg>
      <div className="w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-0 items-center`}>
          {/* Text Content */}
          <div className={`order-2 ${
            imageSide === 'right' 
              ? 'lg:order-1 pl-6 pr-6 md:pl-6 xl:pl-28 lg:pr-16' 
              : 'lg:order-2 pl-6 pr-6 md:pr-12 xl:pr-28 lg:pl-16 xl:pl-20'
          } py-12 md:py-24 flex flex-col justify-center relative`}>
            
            <div className="relative max-[550px] md:max-w-[650px] lg:max-w-[550px] w-full mx-auto md:px-0 xl:mx-0">
              {/* Number */}
              <span className="block mb-2 xl:mb-0 xl:absolute xl:-left-12 xl:top-2 font-geist text-[13px] tracking-[2.342px] text-[#C2C2C2]">
                {number}
              </span>

              <h2 className="text-[24px] md:text-[42.9px] font-normal leading-[1.1] text-[#052424] tracking-[-0.613px] mb-6 md:mb-12 font-inter">
                {title}
              </h2>

              <div className="text-[20px] md:text-[21.9px] font-medium leading-[1.32] tracking-[-0.307px] font-inter">
                <CharacterScrollReveal text={description} />
              </div>

              {actionButton && (
                <div className="mt-8 md:mt-12">
                  <a
                    href={actionButton.link}
                    className="inline-flex btn-contact relative overflow-hidden bg-[#052424] text-white px-8 py-3 rounded-lg text-xs font-sans font-bold tracking-widest uppercase shadow-md transition-colors duration-300 hover:text-[#ABFF02] z-10"
                  >
                    <span className="relative z-10">{actionButton.text}</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Figure / Image Layered Design */}
          <div className={`order-1 ${imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'} w-full px-0 md:px-0 lg:px-0`}>
            <div className="relative w-full aspect-[4/3] lg:aspect-square">
              {/* Image Layer */}
              <div 
                className={`absolute inset-0 z-10 overflow-hidden rounded-xl group feature-clip-${clipId}`}
              >
                <motion.img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
