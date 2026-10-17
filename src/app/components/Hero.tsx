import { useState, useEffect, useCallback, useRef } from "react";
import { Calendar, MessageCircle, CloudSun } from "lucide-react";
import heroImage from "./Sources/hero.jpg";

export function Hero() {
  // Real numbers in initial HTML state so they show even if JavaScript fails
  const [bedroomsCount, setBedroomsCount] = useState(3);
  const [guestsCount, setGuestsCount] = useState(6);
  const [bedsCount, setBedsCount] = useState(4);
  const [nextFreeDates, setNextFreeDates] = useState<string | null>(null);
  const isFirstMount = useRef(true);

  // 1. Calculate next free dates from window.BOOKED_RANGES
  useEffect(() => {
    const bookedRanges = (window as unknown as { BOOKED_RANGES?: [string, string][] }).BOOKED_RANGES;
    if (Array.isArray(bookedRanges) && bookedRanges.length > 0) {
      const validBookings = bookedRanges
        .map(([s, e]) => ({ start: new Date(s), end: new Date(e) }))
        .filter((b) => !isNaN(b.start.getTime()) && !isNaN(b.end.getTime()))
        .sort((a, b) => a.start.getTime() - b.start.getTime());

      if (validBookings.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let candidate = new Date(today);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formatRange = (start: Date, end: Date) => {
          return `${start.getDate()} ${months[start.getMonth()]} – ${end.getDate()} ${months[end.getMonth()]}`;
        };

        let foundRange: string | null = null;
        for (const b of validBookings) {
          if (b.end <= candidate) continue;
          if (b.start > candidate) {
            const nights = Math.round((b.start.getTime() - candidate.getTime()) / (1000 * 60 * 60 * 24));
            if (nights >= 2) {
              foundRange = formatRange(candidate, b.start);
              break;
            }
          }
          if (b.end > candidate) {
            candidate = new Date(b.end);
          }
        }

        if (!foundRange) {
          const freeEnd = new Date(candidate);
          freeEnd.setDate(freeEnd.getDate() + 6);
          foundRange = formatRange(candidate, freeEnd);
        }
        setNextFreeDates(foundRange);
      }
    }
  }, []);

  // 2. Count-up animation function (always counts up when hero is viewed)
  const runCountUp = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setBedroomsCount(3);
      setGuestsCount(6);
      setBedsCount(4);
      return;
    }

    setBedroomsCount(0);
    setBedsCount(0);
    setGuestsCount(0);

    const startTime = performance.now();
    const duration = 1200; // 1.2s ease out
    const gap = 150; // 0.15s gap between items

    const targets = [
      { target: 3, delay: 0, set: setBedroomsCount },
      { target: 4, delay: gap, set: setBedsCount },
      { target: 6, delay: gap * 2, set: setGuestsCount },
    ];

    let rafId: number;

    const animate = (now: number) => {
      let allDone = true;

      targets.forEach(({ target, delay, set }) => {
        const elapsed = now - startTime - delay;
        if (elapsed <= 0) {
          allDone = false;
          return;
        }
        if (elapsed >= duration) {
          set(target); // Stops EXACTLY on target (3, 4, 6)
        } else {
          allDone = false;
          const progress = elapsed / duration;
          // Cubic ease-out
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.min(target, Math.round(target * easeOut));
          set(current);
        }
      });

      if (!allDone) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Re-run count-up animation whenever hero comes into view
  useEffect(() => {
    const heroEl = document.getElementById("home");
    if (!heroEl || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      runCountUp();
      return;
    }

    let hasRun = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasRun || !isFirstMount.current) {
              runCountUp();
              hasRun = true;
            }
          } else {
            hasRun = false;
            isFirstMount.current = false;
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [runCountUp]);

  return (
    <section 
      className="relative min-h-[85vh] h-[92vh] sm:h-screen w-full overflow-hidden flex flex-col justify-end sm:justify-center pt-24 pb-12 sm:pb-0" 
      id="home"
    >
      {/* Background Photo with 20s Calm Slow Zoom (100% to 106% forwards) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          src={heroImage}
          alt="Nalaka Rest bungalow at twilight in Nuwara Eliya"
          className="w-full h-full object-cover object-[75%_center] sm:object-[80%_center] md:object-[right_center] hero-photo-animate"
        />

        {/* Soft Dark Gradient on Left for Text Readability (Desktop), Bottom Gradient (Mobile) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent w-full md:w-3/5 lg:w-1/2 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent sm:hidden pointer-events-none z-[1]" />

        {/* 2 Soft White Mist Layers (60s and 90s slow drift, away from text) */}
        <div className="absolute inset-0 hero-mist-1 z-[2]" />
        <div className="absolute inset-0 hero-mist-2 z-[2]" />

        {/* Gentle 4s Warm Lamp Glow Pulse */}
        <div className="hero-lamp-glow z-[2]" />
      </div>

      {/* Floating Weather Widget */}
      <div className="hidden sm:flex absolute top-24 right-6 z-20 bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-2xl items-center gap-2.5 shadow-xl text-white hero-float-always">
        <CloudSun className="text-[#D4AF37]" size={20} />
        <div>
          <p className="text-xs font-bold font-['Plus_Jakarta_Sans'] leading-none">18°C</p>
          <p className="text-[10px] text-white/75 font-['Plus_Jakarta_Sans'] leading-tight mt-0.5">Nuwara Eliya</p>
        </div>
      </div>

      {/* Hero Content (Left-aligned, clean plain English) */}
      <div className="max-w-6xl mx-auto px-6 w-full text-left relative z-10">
        
        {/* 1. Small line: uppercase, small size, wide letter spacing, light cream color */}
        <div className="hero-text-1 mb-4">
          <span className="text-[#ECE7DC] font-['Plus_Jakarta_Sans'] uppercase tracking-[0.25em] text-xs font-semibold block">
            NALAKA REST · NUWARA ELIYA
          </span>
        </div>

        {/* 2. Main heading: keep current style & size, fits 3 lines or less on mobile */}
        <div className="hero-text-2 mb-5">
          <h1 className="font-['Newsreader'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight max-w-2xl drop-shadow-md">
            Cool nights. Warm lamps. Nuwara Eliya.
          </h1>
        </div>

        {/* 3. Question line: lighter weight, ~40% of heading size, same Newsreader font family */}
        <div className="hero-text-3 mb-6">
          <p className="font-['Newsreader'] font-light text-lg sm:text-xl md:text-2xl lg:text-[28px] text-white/90 italic tracking-normal max-w-xl leading-snug">
            Looking for a quiet place to rest?
          </p>
        </div>

        {/* 4. Villa Details Highlight (3 Bedrooms, 4 Beds, Up to 6 Guests Capacity) */}
        <div className="hero-text-4 mb-8">
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center bg-black/55 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:px-6 sm:py-3.5 shadow-2xl hero-float-always">
            {/* Item 1: Bedrooms */}
            <div className="flex items-center gap-2.5 sm:gap-3 pr-4 sm:pr-6">
              <span className="font-['Newsreader'] text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {bedroomsCount}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#ECE7DC]/85 font-medium leading-tight">
                Bedrooms
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-px h-8 bg-white/20" />

            {/* Item 2: Beds */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 border-l sm:border-l-0 border-white/15">
              <span className="font-['Newsreader'] text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {bedsCount}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#ECE7DC]/85 font-medium leading-tight">
                Beds
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-px h-8 bg-white/20" />

            {/* Item 3: Up to 6 Guests (Capacity) */}
            <div className="flex items-center gap-2 sm:gap-2.5 pl-4 sm:pl-6 border-l sm:border-l-0 border-white/15">
              <div className="flex items-baseline gap-1">
                <span className="text-xs sm:text-sm text-[#ECE7DC]/85 font-normal font-['Plus_Jakarta_Sans']">
                  Up to
                </span>
                <span className="font-['Newsreader'] text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {guestsCount}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#ECE7DC]/90 font-medium leading-tight">
                  Guests
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold leading-tight">
                  Capacity
                </span>
              </div>
            </div>
          </div>

          {/* Honest Next Free Dates (Only shown if data file has booked ranges) */}
          {nextFreeDates && (
            <p className="text-xs sm:text-[13px] text-white/85 mt-2.5 font-['Plus_Jakarta_Sans'] pl-1">
              Next free dates: <strong className="text-white font-semibold">{nextFreeDates}</strong>
            </p>
          )}
        </div>

        {/* 5. Buttons: placed right under the info line */}
        <div className="hero-text-5 flex flex-wrap items-center gap-3.5 sm:gap-4">
          <a
            href="#inquire"
            className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0a0a0a] hover:bg-[#F9F6F0] px-7 py-3.5 rounded-full font-['Plus_Jakarta_Sans'] font-bold text-xs tracking-wider uppercase transition-colors duration-250 shadow-md"
          >
            <Calendar size={15} />
            <span>Check Availability</span>
          </a>

          <a
            href="https://wa.me/94775099361"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#25D366]/50 text-[#25D366] bg-[#25D366]/15 hover:bg-[#25D366] hover:text-[#0a0a0a] backdrop-blur-md px-6 py-3.5 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-xs tracking-wide transition-colors duration-250"
          >
            <MessageCircle size={15} />
            <span>WhatsApp Host</span>
          </a>
        </div>

      </div>
    </section>
  );
}
