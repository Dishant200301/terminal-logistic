export interface Investor {
  name: string;
  role: string;
  img: string;
  details: string | string[];
}

export const investors: Investor[] = [
  {
    name: "Joe Lonsdale",
    role: "Lead Investor",
    img: "/images/about/investors/investors-1.png",
    details: [
      "Joe Lonsdale is a renowned technology entrepreneur, investor, and co-founder of Palantir Technologies, Addepar, and 8VC. With a remarkable track record of building transformative companies at the intersection of technology and critical industries, Joe brings unmatched strategic insight into Terminal's vision. His deep conviction in leveraging advanced technology to solve complex infrastructure challenges drives his leadership role in Terminal's investment thesis. Joe's expansive network across defense, finance, healthcare, and logistics provides Terminal with invaluable connections and accelerated market access.",
      "As a founding partner of 8VC, Joe champions a distinctive build-oriented investment philosophy focused on creating enduring category-defining platforms. His involvement with Terminal reflects his belief that yard operations represent one of the last major untapped opportunities in logistics technology."
    ]
  },
  {
    name: "Jake Medwell",
    role: "Lead Investor",
    img: "/images/about/investors/investors-2.png",
    details: [
      "Jake Medwell is a founding partner at 8VC and one of the most active logistics technology investors in the venture capital industry. With deep expertise spanning freight technology, supply chain automation, and enterprise infrastructure platforms, Jake identified Terminal's transformative potential from the earliest stages. His comprehensive understanding of logistics industry pain points and market dynamics ensures that Terminal's product strategy aligns precisely with the most pressing needs of major operators and warehouse facilities worldwide.",
      "Jake actively mentors Terminal's leadership team, providing critical guidance on go-to-market execution, strategic partnerships, and capital-efficient scaling. His hands-on approach and relentless commitment to operational excellence make him an instrumental force behind Terminal's rapid growth trajectory."
    ]
  },
];
