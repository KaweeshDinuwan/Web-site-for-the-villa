import { motion } from "motion/react";
import { Menu, X, Calendar, User, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "The Villa", "Gallery", "Amenities", "Experiences", "Reviews", "Location", "Contact"
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-[#0a0a0a]/90 backdrop-blur-md py-4 shadow-lg shadow-black/20" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-['Playfair_Display'] font-bold tracking-widest text-[#F9F6F0]">
          VILLA<span className="text-[#D4AF37]">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-['Montserrat'] tracking-wider text-[#F9F6F0]/80 hover:text-[#D4AF37] transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button className="bg-[#D4AF37] text-[#0a0a0a] px-6 py-2 rounded-full font-['Montserrat'] text-sm font-semibold tracking-wide hover:bg-[#F9F6F0] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
            BOOK NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-[#F9F6F0]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#F9F6F0]/10 py-6 px-6 flex flex-col space-y-4 shadow-2xl"
        >
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-lg font-['Playfair_Display'] text-[#F9F6F0]/90 hover:text-[#D4AF37]"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mt-4 w-full bg-[#D4AF37] text-[#0a0a0a] py-3 rounded-md font-['Montserrat'] font-semibold tracking-wider">
            BOOK NOW
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
