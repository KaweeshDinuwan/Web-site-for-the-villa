import { MapPin, Navigation, Clock } from "lucide-react";

export function Location() {
  return (
    <section className="py-24 bg-[#0a0a0a] text-[#F9F6F0]" id="location">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-[#A7F3D0] font-['Montserrat'] tracking-widest uppercase text-sm mb-4">The Setting</h4>
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display']">Location & Surroundings</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[500px]">

          {/* Google Map */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-full rounded-2xl overflow-hidden relative bg-[#121212] border border-white/10">
            <iframe
              src="https://maps.google.com/maps?q=6.992400860067998,80.7500884392452&t=k&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 opacity-80"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-6 left-6 bg-[#0a0a0a]/80 backdrop-blur-md p-4 rounded-lg border border-white/10 pointer-events-none">
              <h4 className="font-['Playfair_Display'] text-xl mb-1">Nuwara Eliya, Sri Lanka</h4>
              <p className="font-['Montserrat'] text-sm text-white/60">Central Province, Sri Lanka</p>
            </div>
          </div>

          {/* Location details */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 flex-1 flex flex-col justify-center">
              <Navigation className="text-[#A7F3D0] mb-4" size={28} />
              <h3 className="font-['Playfair_Display'] text-2xl mb-2">Directions</h3>
              <p className="font-['Montserrat'] text-sm text-white/60 mb-4">
                The retreat is easily accessible by taxi or ride-hailing services from the airport. Local transport options are available on arrival.
              </p>
              <div className="flex items-center gap-2 text-sm font-['Montserrat'] text-white/80">
                <Clock size={16} className="text-[#A7F3D0]" />
                <span>3-4 hrs from Colombo Airport</span>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 flex-1">
              <h3 className="font-['Playfair_Display'] text-xl mb-4 text-[#A7F3D0]">Nearby Attractions</h3>
              <ul className="space-y-4">
                {[
                  { name: "Gregory Lake", dist: "20 mins" },
                  { name: "Horton Plains National Park", dist: "50 mins" },
                  { name: "Hakgala Botanical Garden", dist: "45 mins" },
                  { name: "Piduruthalagala", dist: "20 mins" },
                ].map((place, i) => (
                  <li key={i} className="flex justify-between items-center font-['Montserrat'] text-sm border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/80">{place.name}</span>
                    <span className="text-white/40">{place.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
