interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  stayDate: string;
}

const quotes: Testimonial[] = [
  {
    id: 1,
    quote: "The cool air in the morning and the view across the tea bushes with a hot mug of coffee was the highlight of our trip. The house is warm, the blankets are thick, and the geyser hot water shower actually works 24/7.",
    author: "Kavinda & Dilani M.",
    location: "Colombo, Sri Lanka",
    stayDate: "October 2026",
  },
  {
    id: 2,
    quote: "We spent five nights here with our two kids. Having a proper four-burner stove and a full fridge meant we could cook dinner ourselves after spending cold rainy afternoons walking around Nuwara Eliya town.",
    author: "Sarah & David Jenkins",
    location: "Melbourne, Australia",
    stayDate: "September 2026",
  },
  {
    id: 3,
    quote: "Clean bathrooms, comfortable solid wood beds, and complete privacy behind our own gate. The host was always quick on WhatsApp when we had questions about local dairy and grocery shops.",
    author: "Rohan & Family",
    location: "Bangalore, India",
    stayDate: "August 2026",
  },
];

export function Reviews() {
  return (
    <section className="py-20 md:py-24 bg-[#ECE7DC] text-[#1A221E] border-b border-[#1A221E]/10" id="notes">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-xl mb-14">
          <span className="text-xs uppercase tracking-widest text-[#8A5229] font-bold block mb-2">
            Guest Words
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Notes from past visitors.
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#515B54] mt-2">
            No star widgets or marketing badges. Direct feedback from travelers who stayed at the house.
          </p>
        </div>

        {/* 3 Editorial Pull-Quotes Grid (Static, readable, zero carousel dots/arrows) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {quotes.map((item, idx) => (
            <div 
              key={item.id}
              className={`bg-[#F5F2EB] p-7 sm:p-8 rounded-2xl border border-[#1A221E]/10 flex flex-col justify-between min-h-[260px] ${
                idx === 1 ? "md:translate-y-4" : ""
              }`}
            >
              <div>
                <span className="font-['Newsreader'] text-4xl text-[#8A5229] font-serif leading-none block mb-2">
                  &ldquo;
                </span>
                <p className="font-['Newsreader'] italic text-base sm:text-lg text-[#1A221E] leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1A221E]/10">
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#1A221E]">
                  {item.author}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#515B54] mt-0.5">
                  <span>{item.location}</span>
                  <span className="text-[#8A5229] font-medium">{item.stayDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}