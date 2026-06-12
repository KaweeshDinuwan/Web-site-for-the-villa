import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] text-[#F9F6F0] py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-['Playfair_Display'] font-bold tracking-widest text-[#F9F6F0] mb-6">
              VILLA<span className="text-[#D4AF37]">.</span>
            </div>
            <p className="font-['Montserrat'] text-white/50 text-sm leading-relaxed mb-6">
              Experience the pinnacle of luxury living on the southern coast of Sri Lanka.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-['Playfair_Display'] text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 font-['Montserrat'] text-sm text-white/60">
              <li><a href="#the-villa" className="hover:text-[#D4AF37] transition-colors">The Villa</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Gallery</a></li>
              <li><a href="#amenities" className="hover:text-[#D4AF37] transition-colors">Amenities</a></li>
              <li><a href="#experiences" className="hover:text-[#D4AF37] transition-colors">Experiences</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Playfair_Display'] text-lg mb-6">Legal</h4>
            <ul className="space-y-3 font-['Montserrat'] text-sm text-white/60">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">House Rules</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Playfair_Display'] text-lg mb-6">Newsletter</h4>
            <p className="font-['Montserrat'] text-sm text-white/60 mb-4">
              Subscribe to receive special offers and updates.
            </p>
            <div className="flex border-b border-white/20 pb-2 focus-within:border-[#D4AF37] transition-colors">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent w-full text-sm font-['Montserrat'] focus:outline-none"
              />
              <button className="text-[#D4AF37] uppercase text-xs tracking-wider font-semibold ml-4">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-['Montserrat'] text-white/40">
          <p>&copy; {new Date().getFullYear()} Villa Sri Lanka. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Designed by Figma AI</span>
            <span>Made for Luxury</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
