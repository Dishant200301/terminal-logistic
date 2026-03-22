import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import YOSSection from "@/components/home/YOSSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LogoGridSection from "@/components/home/LogoGridSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import HomeCTA from "@/components/home/HomeCTA";
import BenefitVideoSection from "@/components/home/BenefitVideoSection";
import FeatureIntroHeader from "@/components/home/FeatureIntroHeader";
import AboutBuiltBy from "@/components/about/AboutBuiltBy";

const Index = () => (
  <>
    <Helmet>
      <title>Terminal — The Yard of the Future</title>
      <meta name="description" content="Terminal is reinventing the future of logistics through the yard with AI-native technology that turns manual tasks into connected missions." />
    </Helmet>
    <main className="overflow-x-clip">
      <HeroSection />
      <FeatureIntroHeader />
      <FeaturesSection />
      <YOSSection />
      <BenefitVideoSection />
      <AboutBuiltBy />
      <TestimonialsSection />
      <LogoGridSection />
      <HomeCTA />
      <ContactFormSection />
    </main>
  </>
);

export default Index;
