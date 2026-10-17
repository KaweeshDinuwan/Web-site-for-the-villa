import { Phone, MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";

const PHONE = "+94 77 509 9361";
const MAPS_LINK = "https://maps.google.com/?q=6.992400860067998,80.7500884392452";

export function Contact() {
  const cards = [
    {
      label: "Voice Call",
      labelColor: "text-[#8A5229]",
      title: PHONE,
      description: "Direct mobile line to the villa host. Best for urgent travel updates or same-day arrival timing.",
      actionText: "Call Host Directly",
      actionHref: `tel:${PHONE.replace(/\s+/g, "")}`,
      icon: <Phone size={13} />,
    },
    {
      label: "Fastest Response",
      labelColor: "text-[#1E3A2B]",
      title: "WhatsApp Chat",
      description: "Send a quick message anytime with your dates, guest count, or driving questions.",
      actionText: "Open WhatsApp",
      actionHref: "https://wa.me/94775099361",
      icon: <MessageCircle size={13} />,
      isExternal: true,
    },
    {
      label: "Location",
      labelColor: "text-[#8A5229]",
      title: "Nuwara Eliya",
      description: "Set in a residential tea-country hillside, approximately 8-10 minutes drive from Nuwara Eliya Post Office.",
      actionText: "Open Google Maps",
      actionHref: MAPS_LINK,
      icon: <ExternalLink size={13} />,
      isExternal: true,
    },
  ];

  return (
    <section className="py-14 md:py-18 bg-[#ECE7DC] text-[#1A221E] border-b border-[#1A221E]/10" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header (Clean statement with subtle underline, no small label) */}
        <div className="reveal max-w-2xl mb-10 pb-5 border-b border-[#1A221E]/15">
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Finding the house &amp; getting in touch.
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#515B54] mt-2">
            Reach the villa host directly by phone or WhatsApp for driving guidance and arrival questions.
          </p>
        </div>

        {/* 3 Grounded Contact Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 stagger-group">
          {cards.map((card, idx) => (
            <div 
              key={card.label}
              style={{ "--stagger-i": idx } as React.CSSProperties}
              className="reveal-item bg-[#F5F2EB] p-7 rounded-2xl border border-[#1A221E]/10 flex flex-col justify-between shadow-xs hover:border-[#1A221E]/25 transition-colors"
            >
              <div>
                <span className={`text-xs uppercase tracking-wider ${card.labelColor} font-bold block mb-2`}>
                  {card.label}
                </span>
                <h3 className="font-['Newsreader'] text-2xl font-medium text-[#1A221E] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-[#515B54] leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#1A221E]/10">
                <a
                  href={card.actionHref}
                  target={card.isExternal ? "_blank" : undefined}
                  rel={card.isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B] hover:underline"
                >
                  {card.icon}
                  <span>{card.actionText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Practical Arrival Details Card */}
        <div className="reveal bg-[#F5F2EB] p-6 sm:p-8 rounded-2xl border border-[#1A221E]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-['Newsreader'] text-lg font-medium text-[#1A221E]">
                Arrival &amp; Key Handover
              </h4>
              <p className="text-xs text-[#515B54] mt-0.5 leading-relaxed max-w-xl">
                Check-in is from <strong>2:00 PM</strong> and check-out is by <strong>11:00 AM</strong>. Because we live close by, someone will personally meet you at the property gate to hand over keys and walk you through the house.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs text-[#8A5229] font-medium bg-[#ECE7DC] px-4 py-2 rounded-xl border border-[#1A221E]/10">
            <MapPin size={14} />
            <span>Paved road access for all vehicles</span>
          </div>
        </div>

      </div>
    </section>
  );
}
