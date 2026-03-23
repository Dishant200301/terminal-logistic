import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import ContactFormSection from "@/components/home/ContactFormSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact — Termihub</title>
        <meta name="description" content="Get in touch with Termihub. Schedule a demo, arrange a consultation, or learn more about our yard management platform." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-4 md:pt-48 md:pb-44 bg-white">
        <div className="site-container text-center px-6 md:px-0">
            <AnimatedSection>
              <p className="text-[16px] md:text-[20px] leading-[19px] text-[#C2C2C2] mb-6 md:mb-4 font-normal font-sans">Get in touch</p>
              <h1 className="text-[32px] md:text-[60px] md:leading-[60px] lg:text-[60px] font-normal text-[#052424] tracking-tight leading-[1.1] lg:leading-[60px] mb-8 md:mb-16 font-sans">
                  Your yard transformation<br className="hidden md:block" /> starts today.
                </h1>
            </AnimatedSection>
          </div>
      </section>

      {/* Form Section */}
      <ContactFormSection />
    </>
  );
};

export default Contact;


