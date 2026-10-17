import { useState, useEffect } from "react";
import { Phone, Menu, X, Calendar } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "The House", href: "#house" },
    { label: "Gallery", href: "#gallery" },
    { label: "Kitchen & Comfort", href: "#comfort" },
    { label: "Nearby", href: "#nearby" },
    { label: "Guest Notes", href: "#notes" },
    { label: "Inquire", href: "#inquire" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/20 text-white" 
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <a href="#home" className="flex flex-col group">
          <span className="font-['Newsreader'] text-2xl font-medium tracking-tight text-white group-hover:text-[#D4AF37] transition-colors duration-250">
            Nalaka Rest
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
            Nuwara Eliya • 1,860m
          </span>
        </a>

        {/* Desktop Navigation Links with Calm 0.25s Hover Underline */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-['Plus_Jakarta_Sans']">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-calm text-white/80 hover:text-[#D4AF37] font-medium tracking-wide py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Direct Action */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+94775099361"
            className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white font-medium transition-colors duration-250"
            title="Call host directly"
          >
            <Phone size={13} className="text-[#D4AF37]" />
            <span>+94 77 509 9361</span>
          </a>

          <a
            href="#inquire"
            className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#0a0a0a] hover:bg-white hover:text-black px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-250 shadow-sm"
          >
            <Calendar size={13} />
            <span>Check Dates</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-sm font-medium text-white shadow-2xl">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/90 hover:text-[#D4AF37] py-1 border-b border-white/05 transition-colors duration-250"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:+94775099361"
              className="flex items-center gap-2 text-xs text-white/80 py-1"
            >
              <Phone size={14} className="text-[#D4AF37]" />
              <span>+94 77 509 9361</span>
            </a>

            <a
              href="#inquire"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#D4AF37] text-[#0a0a0a] text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              Check Availability
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
