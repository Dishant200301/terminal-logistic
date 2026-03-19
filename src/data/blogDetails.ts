export interface ContentItem {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'strong';
  text?: string;
  level?: number;
  items?: string[];
  author?: string;
}

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface BlogPostDetail {
  slug: string;
  title: string;
  tagline: string;
  date: string;
  category: string;
  img: string;
  author: Author;
  tableOfContents: { id: string; title: string }[];
  content: ContentItem[];
}

export const blogDetails: Record<string, BlogPostDetail> = {
  "sustainability-starts-at-the-gate": {
    slug: "sustainability-starts-at-the-gate",
    title: "Terminal Yard Achieves Sustainability Certification for Global Network",
    tagline: "What DHL’s Carbon-Neutral Facility Reveals About the Most Overlooked Lever in Green Logistics",
    date: "March 11, 2026",
    category: "blog",
    img: "/images/blog/blog-2.png",
    author: {
      name: "Livia Brannan",
      role: "Marketing at Terminal Industries",
      bio: "Livia contributes to Terminal Industries’ marketing efforts by developing content that highlights the company’s role in advancing logistics technology. She focuses on creating clear, engaging stories that connect industry innovation with Terminal’s broader vision for the future of the yard.",
      avatar: "/images/blog/livia-avatar.jpg"
    },
    tableOfContents: [
      { id: "carbon-black-hole", title: "The Carbon “Black Hole” in the Yard" },
      { id: "idling-problem", title: "The Idling Problem" },
      { id: "carbon-impact", title: "The Carbon Impact" },
      { id: "detention-crisis", title: "The Detention Crisis" },
      { id: "facility-scale", title: "What That Means at Facility Scale" },
      { id: "sustainability-concrete", title: "Sustainability Doesn’t Start with Concrete" },
      { id: "starts-at-gate", title: "Sustainability Starts at the Gate" },
      { id: "competitive-shift", title: "The Competitive Shift" },
      { id: "bottom-line", title: "The Bottom Line" }
    ],
    content: [
      { type: 'paragraph', text: "Last week, DHL Supply Chain announced a new carbon-neutral logistics center in Rheinbach, reinforcing what is quickly becoming industry consensus:" },
      { type: 'strong', text: "Sustainability is no longer fringe. It is competitive infrastructure." },
      { type: 'paragraph', text: "Solar arrays. Energy-efficient design. Net-zero certifications. These are powerful signals. But there is a structural gap in the carbon conversation. While the building may be carbon neutral, the activity around it often is not. And the single largest variable outside the walls? Trucks." },
      { type: 'heading', level: 2, text: "The Carbon “Black Hole” in the Yard" },
      { type: 'paragraph', text: "Modern facilities can dramatically reduce emissions inside the warehouse. But the yard remains one of the least measured and most emission-intensive areas of logistics operations. Consider the math." },
      { type: 'heading', level: 3, text: "The Idling Problem" },
      { type: 'paragraph', text: "A typical Class 8 truck burns 0.8 to 1.0 gallon of diesel per hour while idling." },
      { type: 'heading', level: 3, text: "The Carbon Impact" },
      { type: 'paragraph', text: "Each gallon of diesel emits approximately 10.1 kilograms (22.4 pounds) of CO₂. Now layer in the operational reality." },
      { type: 'heading', level: 3, text: "The Detention Crisis" },
      { type: 'paragraph', text: "A study by the FMCSA found that detention times exceed two hours in one-third of all carrier trips. That means trucks are routinely stuck waiting at gates or sitting in yards burning fuel without moving freight. This is not marginal waste. It is structural inefficiency." },
      { type: 'heading', level: 2, text: "What That Means at Facility Scale" },
      { type: 'paragraph', text: "Let’s translate that into a typical terminal scenario. Assume a busy facility processes 200 trucks per day. If AI-driven yard orchestration reduces just 20 minutes of idling per truck, here is what happens:" },
      { type: 'list', items: [
        "200 trucks × 20 minutes = 4,000 minutes saved daily",
        "That equals over 66 hours of avoided idling per day",
        "At roughly 0.9 gallons per hour, that’s nearly 60 gallons of diesel avoided daily",
        "Over a week, that eliminates more than 1.3 metric tons of CO₂"
      ]},
      { type: 'paragraph', text: "From saving 20 minutes. No new building. No fleet replacement. No capital-intensive retrofit. Just flow control." },
      { type: 'heading', level: 2, text: "Sustainability Doesn’t Start with Concrete" },
      { type: 'paragraph', text: "DHL’s new Rheinbach facility signals where the industry is headed. Carbon-neutral buildings will increasingly become the standard. But most operators cannot rebuild their network overnight. What they can do is eliminate the operational friction that quietly drives emissions every day:" },
      { type: 'list', items: [
        "Long gate queues",
        "Manual check-ins",
        "Incomplete trailer visibility",
        "Unnecessary shifter moves",
        "Congested yard layouts"
      ]},
      { type: 'paragraph', text: "These inefficiencies translate directly into fuel burn. And they are solvable." },
      { type: 'heading', level: 2, text: "Sustainability Starts at the Gate" },
      { type: 'paragraph', text: "Terminal Industries reduces gate transaction times by up to 85% and eliminates unnecessary shifter moves through AI-driven orchestration. With Terminal-in-a-Camera™, facilities gain 99.5% accurate, real-time visibility into:" },
      { type: 'list', items: ["Trailer location", "Dwell time", "Gate congestion", "Yard flow"] },
      { type: 'paragraph', text: "When trucks are not waiting in line at the gate, they are not burning diesel. When trailers are moved once instead of twice, emissions drop immediately. When detention is reduced, fuel consumption falls proportionally. Sustainability becomes operational, not aspirational." },
      { type: 'heading', level: 2, text: "The Competitive Shift" },
      { type: 'paragraph', text: "ESG reporting is tightening. Shippers are demanding proof. Capital markets are rewarding measurable environmental performance. Operators who treat sustainability as an architectural feature will make progress. Operators who treat it as an operational system will lead. The yard is the lowest-hanging fruit in green logistics. And it is measurable." },
      { type: 'heading', level: 2, text: "The Bottom Line" },
      { type: 'paragraph', text: "Carbon-neutral warehouses are important. But if trucks are idling outside those facilities for hours, the carbon story is incomplete. You do not need to build a new warehouse to reduce emissions. You need to fix your yard flow. Sustainability starts at the gate." }
    ]
  }
};
