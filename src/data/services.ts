export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  label: string;
  price?: string;
}

export const services: Service[] = [
  {
    slug: "gate-automation",
    title: "AUTOMATED SHIPPER ENTRY",
    label: "Gate Automation",
    description: "Seamless truck entry using OCR, RFID, and smart scheduling for high-throughput environments.",
    image: "/images/services/service-1.png",
    price: "From $7,000 / integration"
  },
  {
    slug: "yard-visibility",
    title: "REAL-TIME YARD VISIBILITY",
    label: "Yard Optimization",
    description: "Monitor yard operations with live vehicle positioning, asset status, and thermal heat map analytics.",
    image: "/images/services/service-2.png",
    price: "From $12,000 / site"
  },
  {
    slug: "load-tracking",
    title: "AI-POWERED LOAD TRACKING",
    label: "Fleet Tracking",
    description: "Optimize turnaround time with intelligent dock allocation and real-time load/unload validation.",
    image: "/images/services/service-3.png",
    price: "Custom Pricing"
  },
  {
    slug: "smart-docking",
    title: "INTELLIGENT DOCK MANAGEMENT",
    label: "Smart Docking",
    description: "Coordinate arrivals with dock availability to minimize idle time and maximize warehouse efficiency.",
    image: "/images/services/service-4.png",
    price: "From $5,000 / month"
  },
  {
    slug: "shipper-operating-system",
    title: "UNIFIED SHIPPER ECOSYSTEM",
    label: "Integration",
    description: "Connect your WMS, TMS, and ERP into a single source of truth for all Shipper operations.",
    image: "/images/services/service-5.png",
    price: "Enterprise License"
  },
  {
    slug: "agentic-ai-yard",
    title: "THE AGENTIC AI YARD",
    label: "Agentic AI",
    description: "Leverage the power of autonomous AI agents to orchestrate Shipper missions, manage yard tasks, and minimize operational bottlenecks.",
    image: "/images/services/service-6.png",
    price: "From $15,000 / node"
  }
];

export const serviceHero = {
  kicker: "Service",
  title: "Premium Yard\nManagement Services",
  description: "Shipper provides a suite of advanced yard management configurations designed to streamline your operations, increase visibility, and automate the mundane so you can focus on strategic outcomes."
};

export const serviceFeatures = [
  {
    number: "01",
    title: "Automated Shipper Entry",
    description: "Seamless truck entry using OCR, RFID, and smart scheduling for high-throughput environments. Eliminate gate congestion with automated check-ins and securely validate arrivals instantly.",
    image: "/images/services/service-1.png",
    imageSide: "right" as const,
    actionButton: {
      text: "LEARN MORE",
      link: "/services/shipper-operating-system"
    }
  },
  {
    number: "02",
    title: "Real-time Yard Visibility",
    description: "Stop guessing where assets are. Get a 100% accurate, real-time map of your yard. Pinpoint trailers, view live status updates, and orchestrate complex equipment moves with unprecedented clarity.",
    image: "/images/services/service-2.png",
    imageSide: "left" as const,
    actionButton: {
      text: "LEARN MORE",
      link: "/services/yard-visibility"
    }
  },
  {
    number: "03",
    title: "Intelligent Dock Management",
    description: "Coordinate arrivals with dock availability to minimize idle time and maximize warehouse efficiency. Let Agentic AI assign the perfect bay in real time for optimal load process.",
    image: "/images/services/service-4.png",
    imageSide: "right" as const,
    actionButton: {
      text: "LEARN MORE",
      link: "/services/smart-docking"
    }
  }
];
