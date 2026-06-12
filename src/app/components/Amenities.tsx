import { motion } from "motion/react";
import { CalendarClock, Microwave, Home, Sparkles, Utensils, Bath, User, Shirt, Thermometer, Wifi, Tv, Flame, CarFront,ShieldAlert, MonitorPlay, Coffee, Refrigerator, WashingMachine, BedDouble } from "lucide-react";

export function Amenities() {
  const amenities = [
    { icon: ShieldAlert, label: "Smoke alarm", desc: "Advanced smoke detection system for guest safety" },
    { icon: Thermometer, label: "Room Heater", desc: "Heating system for cold mountain climates" },
    { icon: Wifi, label: "High-Speed WiFi", desc: "Seamless connectivity everywhere" },
    { icon: Tv, label: "Smart TV", desc: "Netflix, Apple TV & more" },
    { icon: Utensils, label: "Crockery & Cutlery", desc: "Complete dining essentials including plates, bowls, cups and utensils" },
    { icon: Microwave, label: "Equipped Kitchen", desc: "Modern appliances included" },
    { icon: CarFront, label: "Free Parking", desc: "Secure on-site parking" },
    { icon: MonitorPlay, label: "Workspace", desc: "Dedicated quiet office area" },
    { icon: Coffee, label: "Coffee Maker", desc: "Premium coffee brewing station" },
    { icon: Refrigerator, label: "Mini Fridge", desc: "Convenient in-room refrigeration" },
    { icon: WashingMachine, label: "Laundry Facilities", desc: "Washer & dryer available" },
    { icon: BedDouble, label: "Luxury Bedding", desc: "High-quality linens for comfort" },
    { icon: CalendarClock, label: "Long-Term Stays", desc: "Perfectly suited for extended stays and relaxing getaways" },
    { icon: Shirt, label: "Laundry Service", desc: "Pacious storage space for clothing and travel essentials" },
    { icon: User, label: "Personalized Service", desc: "Friendly staff available 24/7 to assist guests during their stay" },
    { icon: Bath, label: "Hot water", desc: "24/7 hot water supply for a comfortable and refreshing stay" },
    { icon: Home, label: "Single-Level Home", desc: "Step-free layout designed for easy and comfortable access" },
    { icon: Sparkles, label: "Cleaning Service", desc: "Housekeeping available during your stay for added comfort" },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-[#F9F6F0]" id="amenities">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-[#D4AF37] font-['Montserrat'] tracking-widest uppercase text-sm mb-4">Premium Comforts</h4>
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display']">Villa Amenities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <item.icon className="text-[#D4AF37] mb-6 w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-['Playfair_Display'] mb-2">{item.label}</h3>
              <p className="text-white/50 font-['Montserrat'] text-sm font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
