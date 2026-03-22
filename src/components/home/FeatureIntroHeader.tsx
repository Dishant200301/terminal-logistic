import AnimatedSection from "@/components/AnimatedSection";

const FeatureIntroHeader = () => {
    return (
        <section className="bg-white py-[60px] md:py-[100px] lg:py-[100px] relative overflow-hidden">
             
             <div className="site-container relative z-10">
                <AnimatedSection>
                   <h2 className="text-[32px] md:text-[56px] lg:text-[72px] font-normal text-[#052424] leading-[1.1] tracking-[-1.5px] md:tracking-[-3px] text-center max-w-[1100px] mx-auto font-['SuisseIntl',_sans-serif]">
                      Imagine the yard as an intelligent bridge seamlessly connecting highway to warehouse.
                   </h2>
                </AnimatedSection>
             </div>
        </section>
    );
};

export default FeatureIntroHeader;
