import { Helmet } from "react-helmet-async";
import AboutHero from "@/components/about/AboutHero";
import FeatureSection from "@/components/about/FeatureSection";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutLeaders from "@/components/about/AboutLeaders";
import AboutBacking from "@/components/about/AboutBacking";
import AboutInvestors from "@/components/about/AboutInvestors";
import AboutAdvisory from "@/components/about/AboutAdvisory";
import TeamCTA from "@/components/about/TeamCTA";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About — Termihub</title>
        <meta name="description" content="Built by logistics leaders who want a new industry standard in the yard. Learn about Termihub's mission and team." />
      </Helmet>
<main className="overflow-hidden">
      <AboutHero />

      <FeatureSection 
        number="01"
        title="Built by the industry, for the industry"
        description="Termihub is a strategic joint venture, not a typical startup. Backed by leading logistics operators such as Prologis, Ryder, Lineage, and NFI, and supported by venture capital firm 8VC, we were designed to solve major industry pain points and establish the category standard. Our strategic investors contributed critical insights and became anchor product design partners, ensuring we're rapidly solving the industries biggest challenges in yard logistics."
        image="/images/about/feature-1.png"
        imageSide="right"
      />

      <FeatureSection 
        number="02"
        title="Based on a proven category creation playbook"
        description="Our model follows the playbook of successful category creators like Orbitz and Rivian. By co-creating with industry leaders, we are able to build a platform that is deeply integrated and ready for market adoption from day one."
        image="/images/about/feature-2.png"
        imageSide="left"
      />

      <FeatureSection 
        number="03"
        title="Positioned as the standard"
        description="Well capitalized, supported by leading operators, and backed by a VC-firm driven by a 'build' investment philosophy, Termihub is uniquely de-risked. Our foundational partnerships and funding position is not as a startup, but as the emerging standard for modern yard operations."
        image="/images/about/feature-3.png"
        imageSide="right"
      />

      <AboutStory />
      <AboutLeaders />
      <AboutInvestors />
      <AboutBacking />
      <AboutAdvisory />
      <TeamCTA />
      </main>
    </>
  );
};

export default About;
