import { Helmet } from "react-helmet-async";
import { technicalData } from "@/data/technical";
import AnimatedSection from "@/components/AnimatedSection";

const Technical = () => {
  return (
    <>
      <Helmet>
        <title>Technical Index — Shipper</title>
        <meta name="description" content="A comprehensive guide to the Shipper Yard Operating System architecture and platform." />
      </Helmet>
      
      <div className="bg-white pt-[180px] pb-[120px]">
        <div className="site-container max-w-[1000px]">
          <AnimatedSection className="mb-24">
            <h1 className="text-[56px] md:text-[80px] font-normal text-[#052424] leading-[1.05] tracking-[-3.5px] mb-6 font-['SuisseIntl',_sans-serif]">
              Technical Index
            </h1>
            <p className="text-[18px] md:text-[20px] text-[#A2A2A2] font-normal font-['SuisseIntl',_sans-serif] leading-tight tracking-tight max-w-[600px]">
              A comprehensive guide to the Shipper Yard Operating System.
            </p>
          </AnimatedSection>

          <div className="space-y-14 md:space-y-20">
            {technicalData.map((item) => (
              <AnimatedSection key={item.id} className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex gap-4 shrink-0">
                  <span className="text-[18px] md:text-[24px] text-[#A2A2A2] font-normal font-['SuisseIntl',_sans-serif] leading-tight w-[40px]">
                    {item.id}.
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#052424] mb-4 font-['SuisseIntl',_sans-serif] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[15px] md:text-[17px] text-[#586A6A] font-normal font-['SuisseIntl',_sans-serif] leading-[1.65] tracking-normal max-w-[780px]">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Technical;
