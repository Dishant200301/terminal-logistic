import AnimatedSection from "@/components/AnimatedSection";
import { ArrowDown, ArrowDownRight, ArrowRight, ChevronDown } from "lucide-react";
import { useState, FormEvent } from "react";

const contactOptions = [
  "Schedule a 30-minute meeting with a yard expert",
  "Schedule a YOS™ Demo",
  "Arrange ROI consultation",
  "Set Up a 2-Day Proof of Value on site",
  "Something else",
];

const helpOptions = [
  "Gate Management",
  "Yard Visibility",
  "Dock Scheduling",
  "Full YOS Platform",
  "Other",
];

const ContactFormSection = ({ title = "Contact Us" }: { title?: string }) => {
  const [form, setForm] = useState({
    fullName: "",
    role: "",
    phone: "",
    email: "",
    company: "",
    help: "",
  });
  const [activeOption, setActiveOption] = useState(0);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValid = form.fullName && form.role && form.email && form.company && form.help;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitted(true);
    setTimeout(() => {
      alert("Thank you! We'll be in touch soon.");
      setIsSubmitted(false);
      setForm({ fullName: "", role: "", phone: "", email: "", company: "", help: "" });
    }, 1500);
  };

  return (
    <section className="pb-32 pt-0 md:pt-24 bg-white">
      <div className="site-container">
        <AnimatedSection>
          <h2 className="text-[40px] md:text-[68px] lg:text-[78px] leading-tight font-normal text-[#052424] tracking-tight text-center mb-6 md:mb-10 font-sans flex items-center justify-center">
            {title}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Options */}
          <AnimatedSection delay={0.1} className="relative">
            <h3 className="text-[20px] md:text-[23px] leading-[1.2] font-semibold text-[#052424] mb-8 md:mb-6 tracking-tight font-sans text-left max-w-xl">
              Reach out to learn more about Shipper, on your terms:
            </h3>
            
            <div className="relative pl-6 md:pl-8">
              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ABFF02]" />
              
              <ul className="space-y-0">
                {contactOptions.map((opt, i) => (
                  <li
                    className="flex items-start gap-2 cursor-pointer group transition-all duration-300 "
                  >
                    <span className="text-[18px] md:text-[23px] font-semibold text-[#C2C2C2] flex-shrink-0 w-[36px] font-sans">
                      0{i + 1}
                    </span>
                      <span className="text-[18px] leading-[28px] md:text-[23px] md:leading-[32px] tracking-tight transition-colors text-[#454742] duration-300 font-sans font-normal">
                        {opt}
                      </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Right - Form Card */}
          <AnimatedSection delay={0.2} className="w-full px-0 lg:px-0">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <h3 
                className="text-[24px] md:text-[37px] leading-[35px] text-[#052424] tracking-tight font-sans"
                style={{ fontWeight: 450 }}
              >
                Tell us a bit about you:
              </h3>
              <div className="flex gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#ABFF02]" />
                <span className="w-4 h-4 rounded-full bg-[#052424]/20" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {[
                  { key: "fullName", label: "Full Name", placeholder: "John Doe", required: true },
                  { key: "role", label: "Role or position", placeholder: "Project manager", required: true },
                  { key: "phone", label: "Phone number", placeholder: "(323) 555-0147", required: false },
                  { key: "email", label: "Email", placeholder: "name@email.com", required: true, type: "email" },
                  { key: "company", label: "Company name", placeholder: "Acme", required: true },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="block text-[18px] leading-[24px] font-normal text-[#052424] font-sans">
                      {field.label}{field.required && " *"}
                    </label>
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-transparent border-b border-[#052424]/20 pb-3 text-[18px] leading-[24px] text-[#052424] placeholder:text-[#052424]/50 focus:outline-none focus:border-[#ABFF02] transition-colors duration-200 font-sans"
                    />
                  </div>
                ))}

              {/* Dropdown */}
              <div className="space-y-2 relative">
                <label className="block text-[18px] leading-[24px] font-normal text-[#052424] font-sans">How Can We Help? *</label>
                <div className="relative">
                  <select
                    value={form.help}
                    onChange={(e) => setForm({ ...form, help: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-[#052424]/20 pb-3 p-2 text-[18px] leading-[24px] text-[#052424] placeholder:text-[#052424]/50 focus:outline-none focus:border-[#ABFF02] transition-colors duration-200 appearance-none cursor-pointer pr-10 font-sans"
                  >
                    <option value="" disabled>Select options</option>
                    {helpOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-white text-foreground">{opt}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 bottom-4 pointer-events-none">
                <ArrowDown className="text-[#052424]/50 size-4" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitted}
                  className={`w-full h-[60px] rounded-lg font-sans text-[13px] leading-[11px] tracking-[2.34px] uppercase font-semibold transition-all duration-300 flex items-center justify-center text-center group
                    ${isSubmitted 
                      ? "bg-[#052424] text-[#ABFF02]"
                      : !isValid
                        ? "bg-[#f0f0f0] text-[#C2C2C2] cursor-not-allowed"
                        : "bg-[#f0f0f0] text-[#C2C2C2] hover:bg-transparent hover:text-[#ABFF02]"
                    }`}
                >
                  <span className={`btn-underline-animation ${isSubmitted ? "active" : ""}`}>
                    SAVE & CONTINUE
                  </span>
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
