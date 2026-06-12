import { motion } from "motion/react";
import { Calendar, Users, ChevronRight, CloudSun } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20" id="home">
      {/* Background Image/Video with Parallax feel */}
      <motion.div 
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1762117360871-f11fbad00ee1?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Villa"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]/90" />
      </motion.div>

      {/* Floating Weather Widget */}
      <div className="absolute top-32 right-6 z-20 bg-black/30 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-3">
        <CloudSun className="text-[#D4AF37]" size={24} />
        <div>
          <p className="text-white text-sm font-bold font-['Montserrat']">28°C</p>
          <p className="text-white/60 text-xs font-['Montserrat']">Sunny, Galle</p>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#D4AF37] font-['Montserrat'] uppercase tracking-[0.3em] text-sm md:text-base mb-6"
        >
          Escape to Paradise in Sri Lanka
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-['Playfair_Display'] text-[#F9F6F0] mb-8 leading-tight drop-shadow-lg"
        >
          Luxury Villa Stay <br className="hidden md:block"/>
          <span className="italic font-light">with Ocean Breeze</span>
        </motion.h1>

        {/* Floating Booking Card (Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 mx-auto max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex-1 flex flex-col w-full md:border-r border-white/20 px-4">
            <label className="text-xs text-white/70 uppercase tracking-wider mb-2 font-['Montserrat']">Check-in</label>
            <div className="flex items-center text-[#F9F6F0] gap-2">
              <Calendar size={18} className="text-[#D4AF37]" />
              <span className="font-['Montserrat'] font-medium">Add Date</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col w-full md:border-r border-white/20 px-4">
            <label className="text-xs text-white/70 uppercase tracking-wider mb-2 font-['Montserrat']">Check-out</label>
            <div className="flex items-center text-[#F9F6F0] gap-2">
              <Calendar size={18} className="text-[#D4AF37]" />
              <span className="font-['Montserrat'] font-medium">Add Date</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col w-full px-4">
            <label className="text-xs text-white/70 uppercase tracking-wider mb-2 font-['Montserrat']">Guests</label>
            <div className="flex items-center text-[#F9F6F0] gap-2">
              <Users size={18} className="text-[#D4AF37]" />
              <span className="font-['Montserrat'] font-medium">2 Guests</span>
            </div>
          </div>

          <button className="w-full md:w-auto mt-4 md:mt-0 bg-[#D4AF37] text-[#0a0a0a] px-8 py-4 rounded-xl font-['Montserrat'] font-bold tracking-wide hover:bg-[#F9F6F0] transition-colors flex items-center justify-center gap-2 group shrink-0">
            Book Now
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
