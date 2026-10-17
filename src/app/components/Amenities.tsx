export function Amenities() {
  const groups = [
    {
      category: "1. The Kitchen & Cooking",
      subtitle: "Full self-catering setup so you can prepare your own meals",
      items: [
        "Four-burner gas cooking stove",
        "Full-size refrigerator with freezer",
        "Microwave oven & electric kettle",
        "Rice cooker, pans, pots, and frying cookware",
        "Full set of plates, bowls, cups, and cutlery for 6",
        "Dining table adjoining the kitchen space"
      ],
      note: "Tea, sugar, and basic cooking salt provided. Fresh vegetables and hill-country produce can be picked up at the Nuwara Eliya market 10 minutes away."
    },
    {
      category: "2. Highland Warmth & Bedrooms",
      subtitle: "Equipped for cold mountain nights that drop to 12°C",
      items: [
        "3 private bedrooms with wooden bed frames",
        "4 comfortable beds with thick wool blankets and duvets",
        "2 bathrooms with reliable 24/7 geyser hot water showers",
        "Electric room heaters available for chilly evenings",
        "Spacious clothes wardrobes in each bedroom",
        "Single-level layout with easy access throughout"
      ],
      note: "Clean towels, fresh bed linens, and extra quilts are prepared before every arrival."
    },
    {
      category: "3. Work & Media",
      subtitle: "Quiet spaces for remote work or relaxing after walks",
      items: [
        "Reliable high-speed fibre Wi-Fi across all indoor rooms",
        "Large wooden dining table and desk space for laptops",
        "Living room Smart TV for streaming entertainment",
        "Ample electrical sockets near seating areas"
      ],
      note: "Cellular reception (Dialog and Mobitel) is strong throughout the property grounds."
    },
    {
      category: "4. Grounds, Access & Parking",
      subtitle: "Private, enclosed residential property",
      items: [
        "Secure gated driveway with parking for 2 private vehicles",
        "Outdoor grass lawn and garden area overlooking the hills",
        "Designated outdoor smoking area (house interior is non-smoking)",
        "Separate washing machine and clothes drying space",
        "CCTV covering property exterior and entrance gate"
      ],
      note: "The road leading up to the house is paved and easily accessible by standard cars, vans, and tuk-tuks."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#ECE7DC] text-[#1A221E] border-b border-[#1A221E]/10" id="comfort">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header (Two-column layout with underline, no small label) */}
        <div className="reveal grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12 pb-8 border-b border-[#1A221E]/15">
          <div className="md:col-span-7">
            <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              Practical essentials for living in the hills.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-6 md:border-l border-[#1A221E]/15">
            <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#515B54]">
              Everything listed here is tested and maintained for self-catering comfort. No gimmicks.
            </p>
          </div>
        </div>

        {/* 4 Typographic Category Columns (Staggered scroll reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 stagger-group">
          {groups.map((group, idx) => (
            <div
              key={group.category}
              style={{ "--stagger-i": idx } as React.CSSProperties}
              className="reveal-item bg-[#F5F2EB] p-7 sm:p-8 rounded-2xl border border-[#1A221E]/10 flex flex-col justify-between shadow-xs hover:border-[#1A221E]/25 transition-colors"
            >
              <div>
                <h3 className="font-['Newsreader'] text-2xl font-medium text-[#1A221E] mb-1">
                  {group.category}
                </h3>
                <p className="text-xs text-[#8A5229] font-medium mb-5">
                  {group.subtitle}
                </p>

                {/* Clean Typographic Bullet List */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#515B54]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-[#1E3A2B] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specific Host Practical Note */}
              <div className="mt-6 pt-4 border-t border-[#1A221E]/10">
                <p className="text-xs text-[#515B54] italic font-['Newsreader']">
                  Tip: {group.note}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
