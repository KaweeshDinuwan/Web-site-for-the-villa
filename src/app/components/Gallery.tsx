import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

import room1 from "./Sources/room1.jpg";
import living from "./Sources/living.jpg";
import living1 from "./Sources/living1.jpg";
import living2 from "./Sources/living2.jpg";
import living3 from "./Sources/living3.jpg";
import view from "./Sources/view.jpg";
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

interface Photo {
  src: string;
  title: string;
  caption: string;
}

const photos: Photo[] = [
  {
    src: room1,
    title: "Master Bedroom",
    caption: "The largest bedroom with a solid timber bed frame and morning sun.",
  },
  {
    src: living,
    title: "The Living Hall",
    caption: "Main gathering room with wide bay windows looking out to the hills.",
  },
  {
    src: bed,
    title: "Second Bedroom",
    caption: "Warm mountain blankets and bedside reading lamps for quiet nights.",
  },
  {
    src: dining_table,
    title: "Family Dining Space",
    caption: "Seats up to 6 people right next to the kitchen prep area.",
  },
  {
    src: kitchen,
    title: "Equipped Kitchen",
    caption: "Four-burner gas stove, microwave, rice cooker, and full-size fridge.",
  },
  {
    src: bed1,
    title: "Third Bedroom",
    caption: "Cozy third room with fresh linen and wardrobe storage.",
  },
  {
    src: bath,
    title: "Bathroom & Shower",
    caption: "Tiled bathroom with continuous 24/7 geyser hot water.",
  },
  {
    src: living1,
    title: "Lounge Seating",
    caption: "Comfortable sofas for evening family card games or reading.",
  },
  {
    src: kitchen1,
    title: "Pantry & Breakfast Bar",
    caption: "Electric kettle, tea set, glassware, and cookware essentials.",
  },
  {
    src: living2,
    title: "Fireside Sitting Area",
    caption: "Traditional hearth corner for cool highland evenings.",
  },
  {
    src: outdoor,
    title: "Front Lawn & Gate",
    caption: "The private lawn where guests sit outside with morning tea.",
  },
  {
    src: outdoor1,
    title: "Gated Driveway",
    caption: "Secure parking for two full-sized vehicles inside the property.",
  },
  {
    src: living3,
    title: "Upper Corridor",
    caption: "Sunlit hallway with polished timber floors and vintage prints.",
  },
  {
    src: outdoor2,
    title: "Stone Garden Pathway",
    caption: "Bordered by highland flora and fresh mountain greenery.",
  },
  {
    src: outdoor3,
    title: "Villa Evening Veranda",
    caption: "Warm porch lanterns and peaceful mountain nights.",
  },
  {
    src: view,
    title: "Mountain Overlook",
    caption: "Fresh breezes and scenic misty views across the villa boundary.",
  },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, [lightboxIndex]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  // Dynamically calculate span classes so no empty cells exist
  const getCardClasses = (idx: number, total: number) => {
    const isLast = idx === total - 1;
    if (!isLast) {
      return "col-span-1 aspect-[4/3]";
    }

    const rem3 = total % 3;
    const rem2 = total % 2;

    let lgClass = "lg:col-span-1 lg:aspect-[4/3]";
    if (rem3 === 2) {
      // 2 items in 3-column row: span remaining 2 columns matching row height
      lgClass = "lg:col-span-2 lg:h-[270px] lg:aspect-auto";
    } else if (rem3 === 1) {
      // 1 item in 3-column row: span all 3 columns matching row height (~270px)
      lgClass = "lg:col-span-3 lg:h-[270px] lg:aspect-auto";
    }

    let smClass = "sm:col-span-1 sm:aspect-[4/3]";
    if (rem2 === 1) {
      // 1 item in 2-column row: span 2 columns
      smClass = "sm:col-span-2 sm:aspect-[16/7]";
    }

    return `col-span-1 aspect-[4/3] ${smClass} ${lgClass}`;
  };

  return (
    <section className="py-16 md:py-20 bg-[#F5F2EB] text-[#1A221E] border-b border-[#1A221E]/10" id="gallery">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <span className="text-xs uppercase tracking-widest text-[#8A5229] font-bold block mb-1.5">
            Inside the House &amp; Around
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Real photos of our rooms, kitchen, and grounds.
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#515B54] mt-2">
            All 16 authentic photographs of Nalaka Rest. Click any photo to see it full-screen.
          </p>
        </div>

        {/* Uniform CSS Grid: 3 cols desktop, 2 cols tablet, 1 col mobile with 16px (gap-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((item, idx) => {
            const spanClass = getCardClasses(idx, photos.length);
            return (
              <div
                key={item.title}
                onClick={() => openLightbox(idx)}
                className={`gallery-card group relative cursor-pointer overflow-hidden rounded-xl bg-[#1A221E] border border-[#1A221E]/10 shadow-xs hover:border-[#1E3A2B] hover:shadow-lg transition-all duration-300 ${spanClass}`}
              >
                {/* Fixed aspect-ratio image with object-fit: cover */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="gallery-card-img w-full h-full object-cover transition-transform duration-600 block"
                />

                {/* Subtle dark gradient scrim for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Overlay Caption: keeps card heights 100% equal with zero dead space */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-['Newsreader'] text-base sm:text-lg md:text-xl font-medium tracking-tight text-white drop-shadow-xs">
                      {item.title}
                    </h3>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 border border-white/25 shadow-xs">
                      <Eye size={12} />
                      View
                    </span>
                  </div>
                  <p className="text-white/80 text-xs sm:text-[13px] mt-1 leading-snug line-clamp-2 drop-shadow-xs font-['Plus_Jakarta_Sans']">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Accessible Fullscreen Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo view: ${photos[lightboxIndex].title}`}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#1A221E]/95 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          {/* Top Bar */}
          <div 
            className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-[#F5F2EB]/80 font-medium bg-[#1A221E] px-3.5 py-1.5 rounded-full border border-white/10">
              {photos[lightboxIndex].title} ({lightboxIndex + 1} of {photos.length})
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-[#1A221E] border border-white/20 text-[#F5F2EB] hover:bg-[#F5F2EB] hover:text-[#1A221E] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close photo view (Esc)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#1A221E] border border-white/20 text-[#F5F2EB] hover:bg-[#F5F2EB] hover:text-[#1A221E] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous photo (Left arrow)"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#1A221E] border border-white/20 text-[#F5F2EB] hover:bg-[#F5F2EB] hover:text-[#1A221E] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next photo (Right arrow)"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Container */}
          <div 
            className="max-w-4xl max-h-[85vh] flex flex-col items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].caption}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <p className="text-center text-xs text-[#F5F2EB]/90 mt-3 font-['Newsreader'] italic max-w-lg">
              {photos[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
