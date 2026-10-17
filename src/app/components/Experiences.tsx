import { MapPin, Clock, Compass } from "lucide-react";
import hortonPlains from "./Experienceplace/hortanplace.jpg";
import gregoryLake from "./Experienceplace/Gregorylake.jpg";
import pedroTeaEstate from "./Experienceplace/pedroteastate.jpg";

const nearbyPlaces = [
  {
    title: "Horton Plains National Park",
    tag: "UNESCO Cloud Forest & Trekking",
    time: "~50 min drive",
    distance: "approx. 28 km",
    image: hortonPlains,
    desc: "Vast windswept highland plateau home to the famous 870m World's End drop, Baker's Falls, sambar deer herds, and crisp mountain hiking trails.",
    tip: "Suggested 5:30 AM departure to experience panoramic views before the morning valley mist rolls in."
  },
  {
    title: "Gregory Lake & Promenade",
    tag: "Waterside Leisure & Boating",
    time: "~10 min drive",
    distance: "approx. 3.5 km",
    image: gregoryLake,
    desc: "Nuwara Eliya's iconic centerpiece lake surrounded by misty hill peaks. Enjoy peaceful waterfront paths, pedal boats, pony rides, and warm coffee stalls.",
    tip: "Ideal for a relaxing late afternoon stroll or watching the sunset over the highland waters."
  },
  {
    title: "Pedro Tea Estate & Factory",
    tag: "Historic Ceylon Tea Heritage",
    time: "~15 min drive",
    distance: "approx. 5.5 km",
    image: pedroTeaEstate,
    desc: "A working 19th-century Ceylon tea plantation and factory. Walk through lush emerald-green tea terraces and see traditional tea production firsthand.",
    tip: "Enjoy a fresh cup of pure single-origin highland black tea on the factory's open veranda."
  }
];

export function Experiences() {
  return (
    <section className="py-16 md:py-24 bg-[#ECE7DC] text-[#1A221E] border-b border-[#1A221E]/10" id="nearby">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8A5229] font-bold block mb-2">
            Around Nalaka Rest · Nearby Attractions
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            3 Iconic Highland Places Nearby.
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#515B54] mt-2 leading-relaxed">
            Nalaka Rest provides quiet mountain seclusion while keeping Nuwara Eliya’s most famous sights within easy reach by car, van, or local tuk-tuk.
          </p>
        </div>

        {/* 3 Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {nearbyPlaces.map((place) => (
            <div
              key={place.title}
              className="bg-[#F5F2EB] rounded-2xl overflow-hidden border border-[#1A221E]/12 flex flex-col justify-between shadow-sm hover:border-[#1A221E]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Photo with Overlay Badge */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#E6E0D4]">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                  />
                  {/* Drive Time Pill Badge */}
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Clock size={13} className="text-[#D4AF37]" />
                    <span>{place.time}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#8A5229] font-bold block mb-1.5">
                    {place.tag}
                  </span>
                  <h3 className="font-['Newsreader'] text-2xl font-medium text-[#1A221E] mb-2 leading-snug">
                    {place.title}
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#515B54] leading-relaxed">
                    {place.desc}
                  </p>
                </div>
              </div>

              {/* Helpful Tip Footer */}
              <div className="px-6 pb-6 pt-0">
                <div className="pt-3.5 border-t border-[#1A221E]/10 flex items-start gap-2">
                  <MapPin size={14} className="text-[#1E3A2B] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#515B54] font-['Newsreader'] italic leading-relaxed">
                    Tip: {place.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
