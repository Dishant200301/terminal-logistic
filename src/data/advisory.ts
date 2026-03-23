export interface Advisor {
  name: string;
  role: string;
  img: string;
  details: string | string[];
}

export const advisors: Advisor[] = [
  {
    name: "Shaleen Devgun",
    role: "Schneider, Diamond, Deloitte",
    img: "/images/about/advisory/advisory-1.png",
    details: [
      "Shaleen Devgun is a seasoned logistics and supply chain executive with decades of experience leading transformative initiatives at Schneider National, Diamond, and Deloitte. His deep operational expertise spans freight management, yard operations, and enterprise technology integration, making him an invaluable strategic advisor to Termihub. Shaleen's firsthand understanding of the operational challenges faced by major carriers and logistics providers ensures Termihub's platform addresses the most critical pain points in yard management.",
      "As a member of Termihub's Industry Strategic Advisory Board, Shaleen provides guidance on product-market alignment, operational workflow optimization, and enterprise adoption strategies that accelerate Termihub's path to becoming the industry standard."
    ]
  },
  {
    name: "Andy Clarke",
    role: "C.H. Robinson, Arrive, DCLI",
    img: "/images/about/advisory/advisory-2.png",
    details: [
      "Andy Clarke brings extensive leadership experience from C.H. Robinson, Arrive, and DCLI, where he drove innovation across freight brokerage, intermodal operations, and chassis management. His comprehensive understanding of the logistics ecosystem — from carrier networks to facility operations — provides Termihub with critical insights into how yard management intersects with broader supply chain workflows. Andy's strategic perspective helps Termihub design solutions that integrate seamlessly into existing operational infrastructure.",
      "Andy actively advises Termihub on go-to-market strategy, partnership development, and product evolution, ensuring the platform meets the evolving demands of the logistics industry's most sophisticated operators."
    ]
  },
  {
    name: "Alan Gershenhorn",
    role: "UPS, Coyote, Marken, Transportation Insights",
    img: "/images/about/advisory/advisory-3.png",
    details: [
      "Alan Gershenhorn is a distinguished logistics industry veteran with an illustrious career spanning senior leadership roles at UPS, Coyote Logistics, Marken, and Transportation Insights. His unparalleled expertise in global logistics operations, package delivery networks, and supply chain technology positions him as a key strategic advisor for Termihub. Alan's experience managing complex, high-volume logistics operations at scale provides Termihub with invaluable perspective on building enterprise-grade yard management solutions.",
      "Alan's advisory role focuses on strategic positioning, enterprise sales approaches, and operational scalability, helping Termihub navigate the complexities of serving the world's largest logistics operators."
    ]
  },
  {
    name: "Will Urban",
    role: "Flexport, Expeditors International",
    img: "/images/about/advisory/advisory-4.png",
    details: [
      "Will Urban is a logistics technology leader with significant experience at Flexport and Expeditors International, where he specialized in building technology platforms that modernize traditional freight forwarding and supply chain operations. His deep expertise in digital transformation within logistics gives Termihub with critical insights into how technology adoption occurs across the industry. Will understands the unique challenges of convincing established operators to embrace new platforms and workflows.",
      "As an advisor, Will helps Termihub refine its user experience, onboarding processes, and technology integration strategies to ensure rapid adoption and lasting operational impact across diverse facility environments."
    ]
  },
];
