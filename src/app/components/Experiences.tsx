import { useState, useEffect, useRef, useMemo } from "react";
import { 
  MapPin, 
  Clock, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ExternalLink, 
  Sparkles, 
  LayoutGrid, 
  SlidersHorizontal 
} from "lucide-react";

import hortonPlains from "./Experienceplace/hortanplace.jpg";
import gregoryLake from "./Experienceplace/Gregorylake.jpg";
import pedroTeaEstate from "./Experienceplace/pedroteastate.jpg";
import victoriaPark from "./Experienceplace/victoriapark.jpg";
import bomburuElla from "./Experienceplace/bomburuella.jpg";
import pidurutalagala from "./Experienceplace/piduruthalagala.jpg";
import shanthipura from "./Experienceplace/Shanthipura.jpg";
import kandeEla from "./Experienceplace/kandeela.jpg";
import seethaAmman from "./Experienceplace/seethakovila.jpg";

export interface HighlandPlace {
  id: string;
  title: string;
  tag: string;
  category: "all" | "lakes" | "hikes" | "views" | "culture";
  time: string;
  distance: string;
  image: string;
  desc: string;
  tip: string;
  link: string;
}

const allHighlandPlaces: HighlandPlace[] = [
  {
    id: "horton-plains",
    title: "Horton Plains National Park",
    tag: "UNESCO Cloud Forest & Trekking",
    category: "hikes",
    time: "~50 min drive",
    distance: "approx. 28 km",
    image: hortonPlains,
    desc: "Vast windswept highland plateau home to the famous 870m World's End drop, Baker's Falls, wild sambar deer herds, and crisp mountain hiking trails surrounded by ancient dwarf cloud forests.",
    tip: "Suggested 5:30 AM departure from the house to experience panoramic views before the morning valley mist rolls in.",
    link: "https://en.wikipedia.org/wiki/Horton_Plains_National_Park"
  },
  {
    id: "gregory-lake",
    title: "Gregory Lake & Promenade",
    tag: "Waterside Leisure & Boating",
    category: "lakes",
    time: "~10 min drive",
    distance: "approx. 3.5 km",
    image: gregoryLake,
    desc: "Nuwara Eliya's iconic centerpiece lake framed by misty hill peaks. Enjoy peaceful waterfront paths, pedal boats, pony rides, jet skis, and warm Ceylon coffee stalls along the walking promenade.",
    tip: "Ideal for a relaxing late afternoon stroll or watching the sunset glow reflect over the highland water surface.",
    link: "https://en.wikipedia.org/wiki/Lake_Gregory_(Nuwara_Eliya)"
  },
  {
    id: "pedro-estate",
    title: "Pedro Tea Estate & Factory",
    tag: "Historic Ceylon Tea Heritage",
    category: "culture",
    time: "~15 min drive",
    distance: "approx. 5.5 km",
    image: pedroTeaEstate,
    desc: "A working 19th-century Ceylon tea plantation and factory established in 1885. Walk through lush emerald-green tea terraces and observe traditional artisanal tea processing methods firsthand.",
    tip: "Enjoy a freshly brewed cup of pure single-origin highland black tea on the factory's open veranda overlooking the tea bushes.",
    link: "https://en.wikipedia.org/wiki/Pedro_Tea_Estate"
  },
  {
    id: "victoria-park",
    title: "Victoria Park Botanical Gardens",
    tag: "Historic British Floral Gardens",
    category: "culture",
    time: "~8 min drive",
    distance: "approx. 3 km",
    image: victoriaPark,
    desc: "A beautifully landscaped 27-acre municipal park famous for century-old oak trees, colorful highland flowerbeds, children's play areas, and quiet manicured pathways by the Nanu Oya river.",
    tip: "One of the premier highland birdwatching spots in South Asia — look for rare migratory birds like the Indian Blue Robin and Kashmir Flycatcher.",
    link: "https://en.wikipedia.org/wiki/Victoria_Park,_Nuwara_Eliya"
  },
  {
    id: "bomburu-ella",
    title: "Bomburu Ella Waterfalls",
    tag: "Sri Lanka's Widest Waterfall",
    category: "hikes",
    time: "~35 min drive",
    distance: "approx. 19 km",
    image: bomburuElla,
    desc: "A majestic multi-tiered cascade recognized as the widest waterfall on the island, fed by mountain jungle streams and hidden at the end of a breathtaking riverside hiking path.",
    tip: "Wear comfortable walking shoes for the gentle 1.5 km scenic hillside trail that winds past mountain vegetable step terraces.",
    link: "https://en.wikipedia.org/wiki/Bomburu_Ella"
  },
  {
    id: "pidurutalagala",
    title: "Pidurutalagala (Mount Pedro)",
    tag: "Sri Lanka's Highest Peak (2,524m)",
    category: "views",
    time: "~20 min drive",
    distance: "approx. 8 km",
    image: pidurutalagala,
    desc: "Sri Lanka's highest geographical summit rising 2,524 meters above sea level, offering sweeping panoramic vistas across the Central Highlands, forested ridges, and emerald tea valleys.",
    tip: "Scenic driving route up through misty cloud forest canopies — best visited during clear daylight hours for maximum visibility.",
    link: "https://en.wikipedia.org/wiki/Pidurutalagala"
  },
  {
    id: "shanthipura",
    title: "Shanthipura View Point",
    tag: "Sri Lanka's Highest Village (2,250m)",
    category: "views",
    time: "~15 min drive",
    distance: "approx. 5 km",
    image: shanthipura,
    desc: "Perched dramatically high above Nuwara Eliya town, Shanthipura offers breathtaking 360-degree views of the Kikiliyamana mountain range, tiered farm terraces, and vivid misty mountain sunsets.",
    tip: "Visit around 5:15 PM at golden hour to see evening clouds glowing amber and violet across the valley below.",
    link: "https://www.google.com/search?q=Shanthipura+View+Point+Nuwara+Eliya"
  },
  {
    id: "kande-ela",
    title: "Kande Ela Forest Reservoir",
    tag: "Tranquil Forest Water Sanctuary",
    category: "lakes",
    time: "~25 min drive",
    distance: "approx. 12 km",
    image: kandeEla,
    desc: "A serene highland reservoir surrounded by dense pine and eucalyptus forests, offering peaceful picnic clearings, picturesque wooden bridges, and quiet forest walking trails.",
    tip: "A great combined stop when visiting the nearby Meepilimana educational nature reserve and farm pastures.",
    link: "https://www.google.com/search?q=Kande+Ela+Reservoir+Nuwara+Eliya"
  },
  {
    id: "seetha-amman",
    title: "Seetha Amman Temple & Gorge",
    tag: "Historic Ramayana Heritage Site",
    category: "culture",
    time: "~18 min drive",
    distance: "approx. 8 km",
    image: seethaAmman,
    desc: "A sacred mountain shrine nestled beside a cold mountain stream, revered as the legendary Ashok Vatika where Sita was held in the ancient epic of the Ramayana.",
    tip: "Notice the historic giant rock impressions by the mountain stream flowing directly behind the colorful temple pavilions.",
    link: "https://en.wikipedia.org/wiki/Seetha_Amman_Temple"
  }
];

const CATEGORIES = [
  { id: "all", label: "All 9 Places" },
  { id: "lakes", label: "Lakes & Water" },
  { id: "hikes", label: "Cloud Forests & Trails" },
  { id: "views", label: "Mountain Peaks & Views" },
  { id: "culture", label: "Tea & Heritage" },
];

export function Experiences() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [progress, setProgress] = useState(0);

  const autoPlayIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Filter items based on selected category
  const filteredPlaces = useMemo(() => {
    if (activeCategory === "all") return allHighlandPlaces;
    return allHighlandPlaces.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const maxIndex = Math.max(0, filteredPlaces.length - 1);

  // Keep index in bounds when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [activeCategory]);

  // Automatic slide advancement timer
  useEffect(() => {
    if (!isAutoPlaying || isHovered || viewMode === "grid" || filteredPlaces.length <= 1) {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgress(0);
      return;
    }

    const DURATION = 4800; // 4.8 seconds per slide
    const INTERVAL_TICK = 50;
    let elapsed = 0;

    progressIntervalRef.current = window.setInterval(() => {
      elapsed += INTERVAL_TICK;
      setProgress(Math.min(100, (elapsed / DURATION) * 100));
    }, INTERVAL_TICK);

    autoPlayIntervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev >= filteredPlaces.length - 1 ? 0 : prev + 1));
      elapsed = 0;
      setProgress(0);
    }, DURATION);

    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlaying, isHovered, viewMode, filteredPlaces.length, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setProgress(0);
  };

  // Determine 3 visible items for desktop sliding carousel
  const visiblePlaces = useMemo(() => {
    if (filteredPlaces.length === 0) return [];
    if (filteredPlaces.length <= 3) return filteredPlaces;

    const items: HighlandPlace[] = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % filteredPlaces.length;
      items.push(filteredPlaces[idx]);
    }
    return items;
  }, [filteredPlaces, currentIndex]);

  return (
    <section 
      className="py-16 md:py-24 bg-[#F4F8F5] text-[#132E20] border-b border-[#1A432E]/10 relative overflow-hidden" 
      id="nearby"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header with Live Auto-Showcase Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#1A432E] font-bold">
                Around Nalaka Rest · Highland Guide
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#1A432E]/10 text-[#1A432E] px-2.5 py-0.5 rounded-full">
                <Sparkles size={11} className="text-[#1A432E]" />
                <span>9 Curated Highland Attractions</span>
              </span>
            </div>
            <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              Iconic Highland Places Nearby.
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#4B6354] mt-2 leading-relaxed">
              Quiet mountain seclusion at the villa, with Nuwara Eliya’s most iconic cloud forests, waterfalls, tea factories, and mirror lakes right at your doorstep.
            </p>
          </div>

          {/* Carousel Mode & Auto-Play Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Switcher: Auto Carousel vs Grid */}
            <div className="inline-flex items-center bg-white p-1 rounded-full border border-[#1A432E]/15 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("carousel")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "carousel"
                    ? "bg-[#1A432E] text-white shadow-xs"
                    : "text-[#4B6354] hover:text-[#132E20]"
                }`}
                title="Continuous auto-advancing showcase"
              >
                <SlidersHorizontal size={13} />
                <span>Auto Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-[#1A432E] text-white shadow-xs"
                    : "text-[#4B6354] hover:text-[#132E20]"
                }`}
                title="View all 9 places in full grid"
              >
                <LayoutGrid size={13} />
                <span>View All 9</span>
              </button>
            </div>

            {/* Play / Pause Toggle when in Carousel Mode */}
            {viewMode === "carousel" && (
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`w-9 h-9 rounded-full bg-white border border-[#1A432E]/15 flex items-center justify-center text-[#1A432E] hover:bg-[#EBF3ED] transition-colors shadow-xs ${
                  isHovered && isAutoPlaying ? "ring-2 ring-[#1A432E]/20" : ""
                }`}
                title={isAutoPlaying ? "Pause auto-advancing" : "Resume auto-advancing"}
                aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
              >
                {isAutoPlaying && !isHovered ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
            )}

            {/* Navigation Arrows for Carousel */}
            {viewMode === "carousel" && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-white border border-[#1A432E]/15 flex items-center justify-center text-[#132E20] hover:bg-[#1A432E] hover:text-white transition-all shadow-xs active:scale-95"
                  aria-label="Previous attraction"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-white border border-[#1A432E]/15 flex items-center justify-center text-[#132E20] hover:bg-[#1A432E] hover:text-white transition-all shadow-xs active:scale-95"
                  aria-label="Next attraction"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#1A432E] text-white shadow-xs"
                    : "bg-white text-[#4B6354] hover:text-[#132E20] border border-[#1A432E]/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Auto-Slide Progress Bar Indicator */}
          {viewMode === "carousel" && isAutoPlaying && (
            <div className="hidden sm:flex items-center gap-2.5 text-xs text-[#4B6354]">
              <span className="text-[11px] font-medium">
                {isHovered ? "Paused on hover" : `Auto-advancing (${currentIndex + 1} of ${filteredPlaces.length})`}
              </span>
              <div className="w-24 h-1.5 bg-[#1A432E]/15 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1A432E] transition-all ease-linear"
                  style={{ width: `${isHovered ? 100 : progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* CAROUSEL VIEW: 3-Card Smooth Auto-Showcase               */}
        {/* ======================================================== */}
        {viewMode === "carousel" ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch transition-all duration-500">
              {visiblePlaces.map((place, idx) => (
                <div
                  key={`${place.id}-${idx}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#1A432E]/12 flex flex-col justify-between shadow-sm hover:border-[#1A432E]/35 hover:shadow-lg transition-all duration-300 group animate-in fade-in zoom-in-95"
                >
                  <div>
                    {/* Photo with Overlay Drive-Time & Distance */}
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#EBF3ED]">
                      <img
                        src={place.image}
                        alt={place.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out block"
                      />
                      
                      {/* Dark Gradient Overlay for Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Drive Time Pill Badge */}
                      <div className="absolute top-3 right-3 bg-[#0D1F16]/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Clock size={13} className="text-[#A7F3D0]" />
                        <span>{place.time}</span>
                      </div>

                      {/* Distance Pill Badge */}
                      <div className="absolute bottom-3 left-3 bg-[#0D1F16]/75 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                        <MapPin size={11} className="text-[#A7F3D0]" />
                        <span>{place.distance}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <span className="text-[11px] uppercase tracking-wider text-[#1A432E] font-bold block mb-1.5">
                        {place.tag}
                      </span>
                      <h3 className="font-['Newsreader'] text-2xl font-medium text-[#132E20] mb-2 leading-snug group-hover:text-[#1A432E] transition-colors">
                        {place.title}
                      </h3>
                      <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4B6354] leading-relaxed line-clamp-3">
                        {place.desc}
                      </p>
                    </div>
                  </div>

                  {/* Helpful Tip Footer & External Guide Link */}
                  <div className="px-6 pb-6 pt-0">
                    <div className="pt-3.5 border-t border-[#1A432E]/10 flex flex-col gap-2.5">
                      <div className="flex items-start gap-2">
                        <Compass size={14} className="text-[#1A432E] shrink-0 mt-0.5" />
                        <p className="text-xs text-[#4B6354] font-['Newsreader'] italic leading-relaxed">
                          Tip: {place.tip}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <a
                          href={place.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1A432E] hover:underline"
                        >
                          <span>Explore Guide</span>
                          <ExternalLink size={11} />
                        </a>
                        <span className="text-[10px] text-[#4B6354]/60 font-semibold tracking-wider uppercase">
                          Nuwara Eliya
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {filteredPlaces.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(dotIdx);
                    setProgress(0);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx
                      ? "w-7 bg-[#1A432E]"
                      : "w-2 bg-[#1A432E]/25 hover:bg-[#1A432E]/50"
                  }`}
                  aria-label={`Jump to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* GRID VIEW: All 9 Places in Full Responsive Grid          */
          /* ======================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#1A432E]/12 flex flex-col justify-between shadow-sm hover:border-[#1A432E]/35 hover:shadow-lg transition-all duration-300 group animate-in fade-in"
              >
                <div>
                  {/* Photo with Overlay Drive-Time & Distance */}
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#EBF3ED]">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 right-3 bg-[#0D1F16]/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Clock size={13} className="text-[#A7F3D0]" />
                      <span>{place.time}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-[#0D1F16]/75 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                      <MapPin size={11} className="text-[#A7F3D0]" />
                      <span>{place.distance}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <span className="text-[11px] uppercase tracking-wider text-[#1A432E] font-bold block mb-1.5">
                      {place.tag}
                    </span>
                    <h3 className="font-['Newsreader'] text-2xl font-medium text-[#132E20] mb-2 leading-snug group-hover:text-[#1A432E] transition-colors">
                      {place.title}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                      {place.desc}
                    </p>
                  </div>
                </div>

                {/* Helpful Tip Footer & External Guide Link */}
                <div className="px-6 pb-6 pt-0">
                  <div className="pt-3.5 border-t border-[#1A432E]/10 flex flex-col gap-2.5">
                    <div className="flex items-start gap-2">
                      <Compass size={14} className="text-[#1A432E] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#4B6354] font-['Newsreader'] italic leading-relaxed">
                        Tip: {place.tip}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={place.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1A432E] hover:underline"
                      >
                        <span>Explore Guide</span>
                        <ExternalLink size={11} />
                      </a>
                      <span className="text-[10px] text-[#4B6354]/60 font-semibold tracking-wider uppercase">
                        Nuwara Eliya
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
