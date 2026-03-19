import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const serviceData: Record<string, { title: string; desc: string; features: string[]; img: string }> = {
  "gate-management": {
    title: "Intelligent Gate Management",
    desc: "Our AI-powered gate management system automates the entire check-in process, from driver identification to trailer verification. Real-time appointment matching ensures that every arrival is expected, documented, and routed efficiently.",
    features: ["AI-powered driver identification", "Real-time appointment verification", "Automated documentation", "Smart routing from gate to dock", "Integration with existing WMS/TMS"],
    img: "/images/home/feature-1.avif",
  },
  "yard-visibility": {
    title: "Real-Time Yard Visibility",
    desc: "Get a complete digital twin of your yard with real-time tracking of every trailer, container, and asset. Our computer vision and IoT integration provides accurate positioning without expensive hardware installations.",
    features: ["Live yard digital twin", "Computer vision tracking", "Asset status monitoring", "Historical movement analytics", "Mobile yard checks"],
    img: "/images/home/feature-2.avif",
  },
  "dock-scheduling": {
    title: "Dock Scheduling & Optimization",
    desc: "Maximize your dock utilization with intelligent scheduling that considers real-time yard conditions, carrier priorities, and operational constraints to create the optimal loading sequence.",
    features: ["AI-optimized scheduling", "Dynamic priority management", "Real-time dock status", "Carrier performance tracking", "Automated notifications"],
    img: "/images/home/feature-3.avif",
  },
  "automated-moves": {
    title: "Automated Yard Moves",
    desc: "Transform your yard operations with intelligent task orchestration that automatically assigns and routes trailer moves for maximum efficiency and minimum dwell time.",
    features: ["Smart task assignment", "Optimized route planning", "Real-time spotter tracking", "Move verification", "Performance analytics"],
    img: "/images/home/feature-4.avif",
  },
};

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceData[slug || ""] || serviceData["gate-management"];

  return (
    <>
      <Helmet>
        <title>{service.title} — Terminal</title>
        <meta name="description" content={service.desc.slice(0, 155)} />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40">
        <div className="site-container">
          <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight max-w-4xl">
              {service.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="pb-16">
        <div className="site-container">
          <AnimatedSection>
            <div className="rounded-xl overflow-hidden aspect-video">
              <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{service.desc}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Key Features</h2>
              <ul className="space-y-4">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="site-container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to transform your yard?</h2>
            <Link
              to="/contact"
              className="btn-underline inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-mono text-xs tracking-widest uppercase font-bold"
            >
              GET IN TOUCH
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default ServiceDetails;
