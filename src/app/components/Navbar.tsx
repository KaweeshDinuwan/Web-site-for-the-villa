import { useState, useEffect } from "react";
import { Sprout, Phone, Menu, X, Calendar } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar becomes solid/blurred (rgba(0,0,0,0.5) + blur) after scrolling ~80px
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Existing website navigation links
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
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 flex items-center ${
        isScrolled
          ? "bg-[#0D1F16]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Left: Logo with Sprout icon and original 2-line brand details */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          aria-label="Nalaka Rest Nuwara Eliya home"
        >
          <Sprout
            size={28}
            className="text-white shrink-0 stroke-[1.75]"
            aria-hidden="true"
          />
          <div className="flex flex-col text-white leading-[1.1] tracking-tight">
            <span className="font-semibold text-[16px] text-white group-hover:text-white/90 transition-colors">
              Nalaka Rest
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#A7F3D0] font-medium mt-0.5">
              Nuwara Eliya • 1,860m
            </span>
          </div>
        </a>

        {/* Center: Previous navigation links in new modern typography */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13px] font-medium text-white"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/85 hover:text-white hover:opacity-100 transition-all duration-200 tracking-wide py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Existing contact phone + new sleek white CTA button */}
        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="tel:+94775099361"
            className="hidden sm:flex items-center gap-1.5 text-xs text-white/90 hover:text-white font-medium transition-colors tracking-wide py-1"
            title="Call host directly"
          >
            <Phone size={13} className="text-white shrink-0 stroke-[2]" aria-hidden="true" />
            <span>+94 77 509 9361</span>
          </a>

          <a
            href="#inquire"
            className="bg-white text-[#1A432E] text-[12px] font-semibold py-2 px-3.5 sm:py-[10px] sm:px-[18px] rounded-[4px] shadow-sm hover:bg-[#F4F8F5] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white inline-flex items-center gap-1.5"
          >
            <Calendar size={13} className="text-[#1A432E] shrink-0 stroke-[2.2]" aria-hidden="true" />
            <span>Check Dates</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-[#0D1F16]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-sm font-medium text-white shadow-2xl">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-white py-1.5 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3 border-t border-white/10 text-xs text-white/80">
            <a
              href="tel:+94775099361"
              className="flex items-center gap-2 hover:text-white py-1"
            >
              <Phone size={14} className="text-[#A7F3D0]" />
              <span>+94 77 509 9361</span>
            </a>
            <a
              href="#inquire"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-white text-[#1A432E] text-center py-2.5 rounded-[4px] font-semibold text-xs shadow-sm mt-1"
            >
              Check Availability
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
