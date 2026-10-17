import { Phone, MessageCircle, MapPin, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0c0c0c] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Purpose (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <h3 className="font-['Newsreader'] text-2xl font-medium tracking-tight text-white">
                Nalaka Rest
              </h3>
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mt-1">
                Nuwara Eliya • 1,860m
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/70 leading-relaxed max-w-sm">
              A private 3-bedroom hillside house in Nuwara Eliya, Sri Lanka. Built for families, small groups, and quiet mountain stays with a full self-catering kitchen.
            </p>
            <div className="text-xs text-white/60 space-y-1 font-['Plus_Jakarta_Sans']">
              <p>Altitude: 1,860m above sea level</p>
              <p>Capacity: Up to 6 registered guests</p>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider text-white">
              The Property
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-['Plus_Jakarta_Sans']">
              <li><a href="#house" className="hover:text-[#D4AF37] transition-colors">About the House</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Rooms &amp; Grounds Gallery</a></li>
              <li><a href="#comfort" className="hover:text-[#D4AF37] transition-colors">Kitchen &amp; Heating Details</a></li>
              <li><a href="#nearby" className="hover:text-[#D4AF37] transition-colors">Nearby Places</a></li>
              <li><a href="#notes" className="hover:text-[#D4AF37] transition-colors">Guest Notes</a></li>
              <li><a href="#inquire" className="hover:text-[#D4AF37] transition-colors">Check Availability</a></li>
            </ul>
          </div>

          {/* Direct Host Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-white/70 font-['Plus_Jakarta_Sans']">
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-[#D4AF37]" />
                <a href="tel:+94775099361" className="hover:text-[#D4AF37] transition-colors">+94 77 509 9361</a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={13} className="text-[#D4AF37]" />
                <a href="https://wa.me/94775099361" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">WhatsApp Host</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={13} className="text-[#D4AF37]" />
                <span>Nuwara Eliya, Central Highlands, Sri Lanka</span>
              </p>
            </div>
            
            <div className="pt-2 text-[11px] text-white/50 font-['Plus_Jakarta_Sans']">
              <p>Smoking is strictly prohibited inside bedrooms and living areas.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-['Plus_Jakarta_Sans']">
          <p>
            &copy; {new Date().getFullYear()} Nalaka Rest, Nuwara Eliya. Direct reservations with the property host.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
