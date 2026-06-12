import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import room1 from "./Sources/room1.jpg";
import living from "./Sources/living.jpg";
import living1 from "./Sources/living1.jpg";
import living2 from "./Sources/living2.jpg";
import living3 from "./Sources/living3.jpg";
import bath from "./Sources/bath.jpg";
import bed from "./Sources/bed.jpg";
import bed1 from "./Sources/bed1.jpg";
import dining_table from "./Sources/dining table.jpg";
import kitchen from "./Sources/kitchen.jpg";
import kitchen1 from "./Sources/kitchen1.jpg";
import outdoor from "./Sources/outdoor.jpg";
import outdoor1 from "./Sources/outdoor1.jpg";
import outdoor2 from "./Sources/outdoor2.jpg";
import outdoor3 from "./Sources/outdoor3.jpg";
import view from "./Sources/view.jpg";

const images = [
  //beds
  { src: bed, category: "Beds" },
  { src: bed1, category: "Beds" },
  //living areas
  { src: living, category: "Living Areas" },
  { src: living1, category: "Living Areas" },
  { src: living2, category: "Living Areas" },
  { src: living3, category: "Living Areas" },
  {src: dining_table, category: "Living Areas" },
  //bathrooms
  { src: bath, category: "Bathrooms" },
  //kitchen
  { src: kitchen, category: "Kitchen" },
  { src: kitchen1, category: "Kitchen" },
  //outdoor
  { src: outdoor, category: "Outdoor" },
  { src: outdoor1, category: "Outdoor" },
  { src: outdoor2, category: "Outdoor" },
  { src: outdoor3, category: "Outdoor" },
  //views
  { src: view, category: "Views" },
  //Bedrooms (main image)
  { src: room1, category: "Bedrooms" },
];

const categories = ["All", "Bedrooms", "Living Areas", "Beds", "Kitchen", "Outdoor", "Views"];

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);

  return (
    <section className="py-24 bg-[#121212] text-[#F9F6F0]" id="gallery">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h4 className="text-[#D4AF37] font-['Montserrat'] tracking-widest uppercase text-sm mb-4">Visual Journey</h4>
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display']">The Gallery</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-['Montserrat'] text-sm tracking-wide transition-all ${
                filter === cat 
                  ? "bg-[#D4AF37] text-[#0a0a0a] font-medium" 
                  : "bg-transparent border border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="24px">
              {filteredImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="text-white font-['Montserrat'] tracking-wider uppercase text-sm border border-white px-4 py-2 rounded-full">View</span>
                  </div>
                  <img
                    src={img.src}
                    style={{ width: "100%", display: "block" }}
                    alt={img.category}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
