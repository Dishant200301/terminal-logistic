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
import NetworkSection from "@/components/home/NetworkSection";
import ContactFormSection from "@/components/home/ContactFormSection";

const Index = () => (
  <>
    <Helmet>
      <title>Terminal — The Yard of the Future</title>
      <meta name="description" content="Terminal is reinventing the future of logistics through the yard with AI-native technology that turns manual tasks into connected missions." />
    </Helmet>
    <HeroSection />
    <FeaturesSection />
    <YOSSection />
    <TestimonialsSection/>
    <LogoGridSection />
    <NetworkSection />
    <ContactFormSection />
  </>
);

export default Index;
