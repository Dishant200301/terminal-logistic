import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const PremiumFooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="premium-footer-link font-inter text-[20px] font-normal tracking-[-0.2px] leading-[29px] transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

interface BackgroundLinesProps {
  baseColor?: string;
  glowColor?: string;
  coreColor?: string;
  animated?: boolean;
}

export const BackgroundLines = ({ 
  baseColor = "#A2A2A2", 
  glowColor = "white", 
  coreColor = "white",
  animated = true
}: BackgroundLinesProps = {}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1210.23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMin slice"
      >
        <g transform="translate(89.375, 0)">

        </g>
        <path
          d="M768.375 0V131.5C768.375 144.761 763.107 157.479 753.73 166.855C744.354 176.232 731.636 181.5 718.375 181.5H530.375H242.375C229.114 181.5 216.396 186.768 207.02 196.145C197.643 205.521 192.375 218.239 192.375 231.5V590.5C192.375 596.257 190.622 601.878 187.348 606.614C184.075 611.35 179.437 614.977 174.051 617.011C168.666 619.046 162.788 619.393 157.201 618.004C151.614 616.616 146.582 613.559 142.775 609.24L0.375 447.7"
          stroke={baseColor}
          strokeOpacity="0.15"
        />

        <g transform="translate(89.375, 0)">
          <path
            d="M1063 0.5V228.8C1063 242.061 1068.27 254.779 1077.64 264.155C1087.02 273.532 1099.74 278.8 1113 278.8H1589C1602.26 278.8 1614.98 284.068 1624.36 293.445C1633.73 302.821 1639 315.539 1639 328.8V495C1639 508.261 1644.27 520.979 1653.64 530.355C1663.02 539.732 1675.74 545 1689 545H1831"
            stroke={baseColor}
            strokeOpacity="0.15"
          />
          <path
            d="M1831 968.5L1653.53 800.74C1644.2 791.917 1631.84 787.001 1619 787H1209C1195.74 787 1183.02 792.268 1173.64 801.645C1164.27 811.021 1159 823.739 1159 837V1210.5"
            stroke={baseColor}
            strokeOpacity="0.15"
          />
          <path
            d="M-89 787H367C377.296 787.002 387.37 789.992 395.999 795.608C404.629 801.224 411.442 809.224 415.613 818.637C419.784 828.05 421.133 838.472 419.495 848.637C417.858 858.801 413.306 868.272 406.39 875.9L103 1210.5"
            stroke={baseColor}
            strokeOpacity="0.15"
          />
        </g>
        {/* Path 1 Animated Line */}
        {animated && (
          <g>
            <motion.path
              d="M768.375 0V131.5C768.375 144.761 763.107 157.479 753.73 166.855C744.354 176.232 731.636 181.5 718.375 181.5H530.375H242.375C229.114 181.5 216.396 186.768 207.02 196.145C197.643 205.521 192.375 218.239 192.375 231.5V590.5C192.375 596.257 190.622 601.878 187.348 606.614C184.075 611.35 179.437 614.977 174.051 617.011C168.666 619.046 162.788 619.393 157.201 618.004C151.614 616.616 146.582 613.559 142.775 609.24L0.375 447.7"
              stroke={glowColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0.02, pathOffset: -0.02 }}
              animate={{ pathOffset: 1.02 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ filter: "blur(3px)", opacity: 0.4 }}
            />
            <motion.path
              d="M768.375 0V131.5C768.375 144.761 763.107 157.479 753.73 166.855C744.354 176.232 731.636 181.5 718.375 181.5H530.375H242.375C229.114 181.5 216.396 186.768 207.02 196.145C197.643 205.521 192.375 218.239 192.375 231.5V590.5C192.375 596.257 190.622 601.878 187.348 606.614C184.075 611.35 179.437 614.977 174.051 617.011C168.666 619.046 162.788 619.393 157.201 618.004C151.614 616.616 146.582 613.559 142.775 609.24L0.375 447.7"
              stroke={coreColor}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0.02, pathOffset: -0.02 }}
              animate={{ pathOffset: 1.02 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </g>
        )}

        <g transform="translate(89.375, 0)">
          <path
            d="M1063 0.5V228.8C1063 242.061 1068.27 254.779 1077.64 264.155C1087.02 273.532 1099.74 278.8 1113 278.8H1589C1602.26 278.8 1614.98 284.068 1624.36 293.445C1633.73 302.821 1639 315.539 1639 328.8V495C1639 508.261 1644.27 520.979 1653.64 530.355C1663.02 539.732 1675.74 545 1689 545H1831"
            stroke="#A2A2A2"
            strokeOpacity="0.15"
          />
          {/* Path 2 Animated Line */}
          {animated && (
            <g>
              <motion.path
                d="M1063 0.5V228.8C1063 242.061 1068.27 254.779 1077.64 264.155C1087.02 273.532 1099.74 278.8 1113 278.8H1589C1602.26 278.8 1614.98 284.068 1624.36 293.445C1633.73 302.821 1639 315.539 1639 328.8V495C1639 508.261 1644.27 520.979 1653.64 530.355C1663.02 539.732 1675.74 545 1689 545H1831"
                stroke={glowColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0.02, pathOffset: -0.02 }}
                animate={{ pathOffset: 1.02 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                style={{ filter: "blur(3px)", opacity: 0.4 }}
              />
              <motion.path
                d="M1063 0.5V228.8C1063 242.061 1068.27 254.779 1077.64 264.155C1087.02 273.532 1099.74 278.8 1113 278.8H1589C1602.26 278.8 1614.98 284.068 1624.36 293.445C1633.73 302.821 1639 315.539 1639 328.8V495C1639 508.261 1644.27 520.979 1653.64 530.355C1663.02 539.732 1675.74 545 1689 545H1831"
                stroke={coreColor}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0.02, pathOffset: -0.02 }}
                animate={{ pathOffset: 1.02 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </g>
          )}

          <path
            d="M1831 968.5L1653.53 800.74C1644.2 791.917 1631.84 787.001 1619 787H1209C1195.74 787 1183.02 792.268 1173.64 801.645C1164.27 811.021 1159 823.739 1159 837V1210.5"
            stroke={baseColor}
            strokeOpacity="0.15"
          />
          {/* Path 3 Animated Line */}
          {animated && (
            <g>
              <motion.path
                d="M1831 968.5L1653.53 800.74C1644.2 791.917 1631.84 787.001 1619 787H1209C1195.74 787 1183.02 792.268 1173.64 801.645C1164.27 811.021 1159 823.739 1159 837V1210.5"
                stroke={glowColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0.02, pathOffset: -0.02 }}
                animate={{ pathOffset: 1.02 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                style={{ filter: "blur(3px)", opacity: 0.4 }}
              />
              <motion.path
                d="M1831 968.5L1653.53 800.74C1644.2 791.917 1631.84 787.001 1619 787H1209C1195.74 787 1183.02 792.268 1173.64 801.645C1164.27 811.021 1159 823.739 1159 837V1210.5"
                stroke={coreColor}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0.02, pathOffset: -0.02 }}
                animate={{ pathOffset: 1.02 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
              />
            </g>
          )}

          <path
            d="M-89 787H367C377.296 787.002 387.37 789.992 395.999 795.608C404.629 801.224 411.442 809.224 415.613 818.637C419.784 828.05 421.133 838.472 419.495 848.637C417.858 858.801 413.306 868.272 406.39 875.9L103 1210.5"
            stroke={baseColor}
            strokeOpacity="0.15"
          />
          {/* Path 4 Animated Line */}
          {animated && (
            <g>
              <motion.path
                d="M-89 787H367C377.296 787.002 387.37 789.992 395.999 795.608C404.629 801.224 411.442 809.224 415.613 818.637C419.784 828.05 421.133 838.472 419.495 848.637C417.858 858.801 413.306 868.272 406.39 875.9L103 1210.5"
                stroke={glowColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0.02, pathOffset: -0.02 }}
                animate={{ pathOffset: 1.02 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                style={{ filter: "blur(3px)", opacity: 0.4 }}
              />
              <motion.path
                d="M-89 787H367C377.296 787.002 387.37 789.992 395.999 795.608C404.629 801.224 411.442 809.224 415.613 818.637C419.784 828.05 421.133 838.472 419.495 848.637C417.858 858.801 413.306 868.272 406.39 875.9L103 1210.5"
                stroke={coreColor}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0.02, pathOffset: -0.02 }}
                animate={{ pathOffset: 1.02 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
              />
            </g>
          )}
        </g>

      </svg>
    </div>
  );
};

const GartnerBadge = () => (
  <div className="mt-8 mb-4 space-y-6">
    <div className="flex items-baseline gap-0.5">
      <span className="text-[36px] md:text-[40px] font-bold text-white tracking-tighter leading-none">Gartner
        <span className="text-[10px] font-bold text-white/80 tracking-tighter ml-1">®</span>
      </span>
    </div>
    <div className="text-[14px] md:text-[15px] text-white/40 font-medium leading-[1.6] tracking-normal max-w-[280px]">
      2026 Market Guide<br />
      Yard Management<br />
      Featured Vendor
    </div>
  </div>
);

const MotionLink = motion(Link);

const TakeChargeButton = () => {
  const text = "TAKE CHARGE OF YOUR YARD";
  const highlightIndices = [2, 5, 7, 9, 13, 15, 17, 20, 22];
  
  return (
    <MotionLink 
      to="/contact" 
      className="cta-button-premium group relative !px-5 !py-4 md:!px-8 md:!py-5"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div 
        className="relative z-10 flex items-center font-mono text-[11px] font-semibold tracking-[1.98px] uppercase whitespace-pre"
      >
        <span className="relative flex items-center">
          {text.split("").map((char, i) => {
            const isHighlighted = highlightIndices.includes(i);
            const hIndex = isHighlighted ? highlightIndices.indexOf(i) : -1;
            const exitIndex = isHighlighted ? highlightIndices.length - 1 - hIndex : -1;
            
            return (
              <span key={i} className="relative inline-flex items-center justify-center w-[10px] h-[12px]">
                {isHighlighted && (
                  <motion.span
                    variants={{
                      rest: { 
                        opacity: 0, 
                        scale: 0,
                        transition: { delay: exitIndex * 0.04, duration: 0.1, ease: "easeOut" }
                      },
                      hover: { 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: hIndex * 0.04, duration: 0.1, ease: "easeIn" }
                      }
                    }}
                    className="absolute inset-[1px] bg-[#a8fa04]"
                  />
                )}
                <motion.span
                  variants={{
                    rest: { opacity: 1 },
                    hover: { opacity: isHighlighted ? 0 : 1 }
                  }}
                  transition={{
                    duration: 0.05,
                    delay: isHighlighted ? hIndex * 0.04 : 0
                  }}
                  className="relative z-10"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            );
          })}
          
          {/* Underline exactly below "TAKE CHARGE OF" (14 chars) */}
          <motion.span
            className="absolute -bottom-[6px] left-0 h-[1.5px] bg-white pointer-events-none"
            variants={{
              rest: { scaleX: 0, originX: 0 },
              hover: { scaleX: 1, originX: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "calc(14 * 10px)" }}
          />
        </span>
      </div>
    </MotionLink>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#052424] text-white relative overflow-hidden">
      {/* Top Scooped Edge Overlay */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none leading-none">
        <svg 
          viewBox="0 0 1440 60" 
          preserveAspectRatio="none" 
          className="w-full h-[25px] md:h-[60px]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 H1440 V20 H1240 C1160 20 1160 60 1080 60 H360 C280 60 280 20 200 20 H0 V0 Z" fill="white"/>
        </svg>
      </div>

      {/* Background Animated Lines */}
      <BackgroundLines />

      {/* CTA Section */}
      <div className="relative z-20 pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="site-container">
          <AnimatedSection className="text-center">
            <h2 className="text-[36px] min-[400px]:text-[40px] md:text-[72px] font-normal tracking-[-2px] md:tracking-[-3.6px] leading-[1.1] mb-12 md:mb-16 max-w-[1026px] mx-auto font-sans px-4">
              The yard of the future starts today.
            </h2>

            <TakeChargeButton />
          </AnimatedSection>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="relative z-20 py-0 md:py-20 lg:py-12">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-x-8 md:gap-y-16 xl:gap-2">
            {/* Logo & Info */}
            <div className="flex flex-col items-start mb-8 md:mb-0">
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img src="/logo.png" alt="Shipper" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-[32px] tracking-tighter text-white font-sans">Shipper</span>
              </Link>

              <GartnerBadge />
            </div>

            {/* Link Columns */}
            <div className="mb-0">
              <h4 className="text-[11px] font-geist tracking-[1.98px] uppercase mb-8 md:mb-10 text-white font-semibold leading-[9px]">TECHNOLOGY</h4>
              <ul className="flex flex-col gap-[9.6px]">
                <PremiumFooterLink to="/">Homepage</PremiumFooterLink>
                <PremiumFooterLink to="/services/gate-automation">Automated Shipper Entry</PremiumFooterLink>
                <PremiumFooterLink to="/services/yard-visibility">Real-time Yard Visibility</PremiumFooterLink>
                <PremiumFooterLink to="/services/smart-docking">Intelligent Dock Management</PremiumFooterLink>
              </ul>
            </div>

            <div className="mb-0">
              <h4 className="text-[11px] font-geist tracking-[1.98px] uppercase mb-8 md:mb-10 text-white font-semibold leading-[9px]">COMPANY</h4>
              <ul className="flex flex-col gap-[9.6px]">
                <PremiumFooterLink to="/about">About</PremiumFooterLink>
                <PremiumFooterLink to="/blog">Blog</PremiumFooterLink>
                <PremiumFooterLink to="/contact">Contact</PremiumFooterLink>
              </ul>
            </div>

            {/* Reach Us */}
            <div className="xl:-ml-[60px] flex flex-col pt-8 lg:pt-0">
              <h4 className="text-[11px] font-geist tracking-[1.98px] uppercase mb-8 md:mb-10 text-white font-semibold leading-[9px]">REACH US</h4>
              <p className="text-[18.8px] font-inter text-white font-normal mb-[8px] tracking-[-0.2px] leading-[29px]">Ready for your yard of the future?</p>
              <p className="text-[18.9px] font-inter text-[#586A6A] font-normal mb-8 md:mb-10 tracking-[-0.2px] leading-[29px]">Connect with our experts today.</p>

              <div className="flex gap-[35px] mb-auto">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group" 
                  aria-label="LinkedIn"
                >
                  <img 
                    src="/images/common/icon/linkedin.png" 
                    alt="LinkedIn"
                    className="w-6 h-6 object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group" 
                  aria-label="X"
                >
                  <img 
                    src="/images/common/icon/x.png" 
                    alt="X"
                    className="w-6 h-6 object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group" 
                  aria-label="YouTube"
                >
                  <img 
                    src="/images/common/icon/youtube.png" 
                    alt="YouTube"
                    className="w-6 h-6 object-contain transition-all duration-300 group-hover:scale-110"
                   />
                </a>
              </div>

              <div className="mt-12">
                {/* Space for bottom bar alignment */}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative pb-8 md:pb-0">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] text-white/30 font-medium tracking-tight">
                Copyright Shipper Industries © {new Date().getFullYear()} All Rights Reserved
              </p>
              <Link to="/technical-index" className="text-[11px] text-white/30 hover:text-white transition-colors font-medium">
                Technical Index
              </Link>
            </div>
            
            <div className="flex items-center">
              <span className="text-[11px] text-white/30 font-medium">
                Made by 
                <a 
                  href="https://tryzeniq.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-underline-animation font-bold text-white ml-1 tracking-tighter text-[12px]"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  TryzenIQ 
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
