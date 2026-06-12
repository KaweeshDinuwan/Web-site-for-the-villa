import { motion } from "motion/react";
import { Users, BedDouble, Bath, Wifi, Car, Hotel } from "lucide-react";
import room1 from "./Sources/room1.jpg";
import living from "./Sources/living.jpg";

export function About() {
  const stats = [
    { icon: Users, label: "Guests", value: "8" },
    { icon: Hotel, label: "Bedrooms", value: "3" },
    { icon: BedDouble, label: "Beds", value: "4" },
    { icon: Bath, label: "Bathrooms", value: "2" },
    { icon: Wifi, label: "High-Speed", value: "WiFi" },
    { icon: Car, label: "Parking", value: "2" },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-[#F9F6F0]" id="the-villa">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-[#D4AF37] font-['Montserrat'] tracking-widest uppercase text-sm mb-4">Discover The Villa</h4>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] leading-tight mb-6">
                A Sanctuary of <br />
                <span className="italic text-white/80">Misty Elegance</span>
              </h2>
              <p className="font-['Montserrat'] text-white/60 leading-relaxed font-light mb-8">
              Welcome to Nalaka Rest — a luxury mountain escape hidden within the breathtaking misty hills of Nuwara Eliya. Surrounded by rolling tea plantations, cool mountain air, and picturesque waterfalls, our villa offers a peaceful blend of comfort, privacy, and authentic Sri Lankan hospitality. Designed as your perfect “home away from home,” Nalaka Rest is ideal for family holidays, group retreats, and relaxing getaways with friends. Experience cozy interiors, scenic landscapes, and unforgettable moments in one of Sri Lanka’s most beautiful hill country destinations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center bg-[#151515] p-4 rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-colors">
                    <stat.icon className="text-[#D4AF37] mb-2" size={24} />
                    <span className="font-['Playfair_Display'] text-xl mb-1">{stat.value}</span>
                    <span className="font-['Montserrat'] text-xs text-white/50 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image Collage */}
          <div className="w-full lg:w-1/2 relative h-[600px]">
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src={room1}
              alt="Villa Bedroom"
              className="absolute top-0 right-0 w-3/4 h-[400px] object-cover rounded-2xl shadow-2xl"
            />
            <motion.img 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              src={living}
              alt="Villa Living Room"
              className="absolute bottom-0 left-0 w-2/3 h-[350px] object-cover rounded-2xl shadow-2xl border-4 border-[#0a0a0a]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
