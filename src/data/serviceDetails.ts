export interface ServiceFeature {
  title: string;
  description: string;
}

export interface FAQSItem {
  question: string;
  answer: string;
}

export interface WhyChoosePoint {
  title: string;
  desc: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  overviewHeading: string;
  overviewText: string;
  features: ServiceFeature[];
  heroImage: string;
  contentImage: string;
  secondaryImages?: string[];
  metrics: { value: string; label: string }[];
  faqs?: FAQSItem[];
  whyChooseUs?: WhyChoosePoint[];
}

export const serviceDetailsData: Record<string, ServiceDetail> = {
  "gate-automation": {
    slug: "gate-automation",
    title: "Automated Termihub Entry",
    kicker: "GATE AUTOMATION",
    description: "Transform your facility ingress and egress with an intelligent, self-service gate ecosystem powered by OCR and RFID.",
    overviewHeading: "Eliminate the gate bottleneck",
    overviewText: "Gate congestion eats into driver hours and facility throughput. Termihub's Automated Gate system validates identity, reads trailer numbers using advanced OCR, checks appointment status, and directs drivers to their precise drop location—all in less than 30 seconds without manual intervention.",
    features: [
      { title: "Optical Character Recognition (OCR)", description: "Instantly capture tractor, trailer, and container numbers with 99.9% accuracy, even in low light or harsh weather conditions." },
      { title: "Smart Scheduling Integration", description: "Seamlessly cross-reference arrivals with your dock scheduling system to eliminate unauthorized entries." },
      { title: "Automated Routing", description: "Drivers receive a digital ticket or SMS with exact instructions and a map overlay to their drop zone." },
      { title: "Kiosk Bypass", description: "Registered drivers can bypass kiosks entirely using our fast-pass RFID integration for frictionless entry." }
    ],
    heroImage: "/images/services/service-1.png",
    contentImage: "/images/about/feature-1.png",
    secondaryImages: ["/images/services/service-2.png", "/images/services/service-3.png"],
    metrics: [
      { value: "60%", label: "Reduction in dwell time" },
      { value: "99.9%", label: "OCR Accuracy" },
      { value: "3x", label: "Throughput Capacity" }
    ],
    whyChooseUs: [
      { title: "Expert Support", desc: "24/7 technical assistance for critical operations." },
      { title: "Seamless Integration", desc: "Works with your existing WMS and TMS systems." },
      { title: "Proven ROI", desc: "Recoup your investment within the first 12 months." }
    ],
    faqs: [
      { question: "How accurate is the OCR technology?", answer: "Our OCR system achieves 99.9% accuracy under all weather conditions." },
      { question: "Can it integrate with our existing WMS?", answer: "Yes, we support all major WMS providers through our robust API ecosystem." },
      { question: "What is the typical installation time?", answer: "A standard gate installation typically takes 2-4 weeks from start to finish." }
    ]
  },
  "yard-visibility": {
    slug: "yard-visibility",
    title: "Real-Time Yard Visibility",
    kicker: "YARD OPTIMIZATION",
    description: "Get a 100% accurate, real-time map of your yard. Pinpoint trailers, view live status updates, and orchestrate moves with unprecedented clarity.",
    overviewHeading: "Total Operational Awareness",
    overviewText: "If you don't know exactly what is in your yard, you can't optimize it. Termihub deploys a web of IoT sensors, computer vision cameras, and software integrations to create a live digital twin of your facility. Every asset, every movement, and every delay is tracked and visualized in real-time.",
    features: [
      { title: "Live Digital Twin", description: "View your entire yard in a high-fidelity 3D map that updates continuously with real-time asset positioning." },
      { title: "Computer Vision Tracking", description: "No tags required. Our AI tracks trailers and yard jockeys using existing camera infrastructure." },
      { title: "Historical Analytics", description: "Rewind time to audit past yard states, investigate bottlenecks, and optimize future layouts." },
      { title: "Mobile Spotter App", description: "Equip your hostlers with a mobile tactical map that guides them precisely to their targets." }
    ],
    heroImage: "/images/services/service-2.png",
    contentImage: "/images/about/feature-2.png",
    secondaryImages: ["/images/services/service-1.png", "/images/services/service-4.png"],
    metrics: [
      { value: "100%", label: "Inventory Accuracy" },
      { value: "0", label: "Lost Trailers" },
      { value: "45%", label: "Reduction in Spotter Miles" }
    ],
    whyChooseUs: [
      { title: "Real-time Tracking", desc: "Know where every asset is at every second." },
      { title: "Cost Efficiency", desc: "Reduce unnecessary spotter fuel and labor costs." },
      { title: "Safety First", desc: "Avoid collisions with automated proximity alerts." }
    ],
    faqs: [
      { question: "Do we need to tag all our trailers?", answer: "No, our computer vision tech works with existing trailer markings." },
      { question: "Does it work at night?", answer: "Yes, our thermal and IR-enabled cameras ensure 24/7 visibility." }
    ]
  },
  "load-tracking": {
    slug: "load-tracking",
    title: "AI-Powered Load Tracking",
    kicker: "FLEET TRACKING",
    description: "Optimize turnaround time with intelligent dock allocation and real-time load/unload validation.",
    overviewHeading: "Never lose a load again",
    overviewText: "Tracking freight from the yard gate to the dock door requires precision. Our load tracking module pairs cargo data with physical assets to ensure that every shipment is accounted for, handled efficiently, and loaded onto the correct outbound trailer.",
    features: [
      { title: "Manifest Synchronization", description: "Automatically pair incoming trailers with their BOLs and warehouse manifests." },
      { title: "Temperature Monitoring", description: "For reefer units, monitor internal temperatures and fuel levels remotely to prevent spoilage." },
      { title: "Seal Verification", description: "Use computer vision to log trailer seal conditions upon entry and exit for security compliance." },
      { title: "Dwell Time Alerts", description: "Proactive notifications when prioritized loads sit idle for too long." }
    ],
    heroImage: "/images/services/service-3.png",
    contentImage: "/images/about/feature-3.png",
    secondaryImages: ["/images/services/service-5.png", "/images/services/service-6.png"],
    metrics: [
      { value: "100%", label: "Load Visibility" },
      { value: "0", label: "Misloaded Trailers" },
      { value: "30%", label: "Faster Unloads" }
    ]
  },
  "smart-docking": {
    slug: "smart-docking",
    title: "Intelligent Dock Management",
    kicker: "SMART DOCKING",
    description: "Coordinate arrivals with dock availability to minimize idle time and maximize warehouse efficiency.",
    overviewHeading: "Master your dock scheduling",
    overviewText: "The dock is the heartbeat of your warehouse. Intelligent Dock Management eliminates manual whiteboards and chaotic radio calls by algorithmically matching arriving trailers to available dock doors based on load priority, warehouse staffing, and equipment needs.",
    features: [
      { title: "Algorithmic Door Assignment", description: "AI instantly assigns doors based on pallet count, load type, and staging limitations." },
      { title: "Real-time Status Updates", description: "Dock workers update statuses (loading, complete, locked) which immediately inform yard spotters." },
      { title: "Turn-Time Predictions", description: "Machine learning estimates how long a specific unload will take, forecasting future door availability." },
      { title: "Automated Spotter Dispatch", description: "When a door clears, the system automatically dispatches a spotter to pull the empty and stage the next load." }
    ],
    heroImage: "/images/services/service-4.png",
    contentImage: "/images/about/feature-1.png",
    metrics: [
      { value: "40%", label: "Increase in Dock Utilization" },
      { value: "25%", label: "Labor Efficiency Gain" },
      { value: "<5m", label: "Average Door Swap Time" }
    ]
  },
  "termihub-operating-system": {
    slug: "termihub-operating-system",
    title: "Unified Termihub Ecosystem",
    kicker: "INTEGRATION",
    description: "Connect your WMS, TMS, and ERP into a single source of truth for all Termihub operations.",
    overviewHeading: "One platform to rule the yard",
    overviewText: "Stop dealing with fragmented data silos. The Unified Termihub Ecosystem integrates your existing Warehouse Management System (WMS), Transportation Management System (TMS), and Enterprise Resource Planning (ERP) into a single, cohesive command center.",
    features: [
      { title: "API-First Architecture", description: "Built to seamlessly connect with BlueYonder, Manhattan, SAP, and custom legacy systems." },
      { title: "Centralized Dashboard", description: "A unified UI that brings gate, yard, and dock data into one comprehensive view." },
      { title: "Automated Syncing", description: "When a move happens in the yard, your WMS inventory is updated instantaneously." },
      { title: "Custom Role Workspaces", description: "Tailored views for Gate Guards, Yard Jockeys, Dock Supervisors, and Facility Managers." }
    ],
    heroImage: "/images/services/service-5.png",
    contentImage: "/images/about/feature-2.png",
    metrics: [
      { value: "10+", label: "Turnkey Integrations" },
      { value: "0", label: "Data Silos" },
      { value: "100%", label: "Data Synchronization" }
    ]
  },
  "agentic-ai-yard": {
    slug: "agentic-ai-yard",
    title: "The Agentic AI Yard",
    kicker: "AGENTIC AI",
    description: "Leverage autonomous AI agents to orchestrate Termihub missions, manage tasks, and minimize bottlenecks.",
    overviewHeading: "The fully autonomous orchestrator",
    overviewText: "Welcome to the future of logistics. Instead of humans dragging and dropping tasks on a screen, our Agentic AI dynamically generates 'missions'. It views the yard as a chess board, looking 10 moves ahead to optimize equipment routing, labor allocation, and throughput without human intervention.",
    features: [
      { title: "Mission Generation", description: "AI agents create multi-step missions (e.g., 'Pull empty from Door 4, stage at Zone B, bring loaded from Zone C to Door 4')." },
      { title: "Dynamic Rerouting", description: "If a spotter is delayed or a door breaks down, agents instantly recalculate the optimal paths for the entire fleet." },
      { title: "Predictive Bottleneck Resolution", description: "The system detects future pile-ups before they happen and preemptively stages equipment to smooth flow." },
      { title: "Self-Learning Optimization", description: "The AI studies your facility's unique rhythms over time, continuously optimizing its own algorithms." }
    ],
    heroImage: "/images/services/service-6.png",
    contentImage: "/images/about/feature-3.png",
    metrics: [
      { value: "24/7", label: "Autonomous Optimization" },
      { value: "85%", label: "Reduction in Manual Dispatch" },
      { value: "Peak", label: "System Efficiency" }
    ]
  }
};
