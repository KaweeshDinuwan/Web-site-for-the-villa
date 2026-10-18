import { useState, useEffect, useRef } from "react";
import { Phone, Bed, Bath, Users, Home } from "lucide-react";
import gsap from "gsap";
import heroImage from "./Sources/hero.jpg";

const PHONE = "+94 77 509 9361";
const HEADLINE_TEXT = "Cool nights. Warm lamps. Nuwara Eliya.";

export function Hero() {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const headlineWords = HEADLINE_TEXT.split(" ");

  // Existing villa stats with count-up animation
  const [counts, setCounts] = useState({
    bedrooms: 3,
    beds: 4,
    guests: 6,
    bathrooms: 2,
  });

  // GSAP Headline Word-by-Word Reveal, Image Zoom-Out, and Elements Fade-Up
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // 1. Hero Image subtle slow zoom-out effect
    if (heroImageRef.current) {
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 2.8, ease: "power2.out" }
      );
    }

    // 2. Headline word-by-word reveal & smooth fade-ups timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }
      );

      // Headline reveals word-by-word with soft upward fade
      tl.fromTo(
        ".hero-headline-word",
        { opacity: 0, y: 35, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.08,
        },
        "-=0.3"
      );

      // Subtitle
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
        "-=0.35"
      );

      // Existing buttons fade up smoothly after the headline
      tl.fromTo(
        ".hero-cta-buttons",
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
        "-=0.35"
      );

      // Existing cards fade up smoothly after the buttons
      tl.fromTo(
        ".hero-stat-card",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.09,
        },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  // Numbers count-up animation
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setCounts({ bedrooms: 0, beds: 0, guests: 0, bathrooms: 0 });

    const startTime = performance.now();
    const duration = 1200;

    let rafId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        bedrooms: Math.round(3 * easeOut),
        beds: Math.round(4 * easeOut),
        guests: Math.round(6 * easeOut),
        bathrooms: Math.round(2 * easeOut),
      });

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const stats = [
    {
      value: `${counts.bedrooms}`,
      label: "Bedrooms",
      icon: Bed,
    },
    {
      value: `${counts.beds}`,
      label: "Beds",
      icon: Home,
    },
    {
      value: `${counts.guests} Max`,
      label: "Guests Capacity",
      icon: Users,
    },
    {
      value: `${counts.bathrooms}`,
      label: "Bathrooms",
      icon: Bath,
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[680px] h-screen w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-[90px] sm:pt-[100px] pb-3 sm:pb-4 overflow-hidden z-10"
    >
      {/* BACKGROUND: Full-bleed photo with subtle slow zoom-out effect & gradient overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <img
          ref={heroImageRef}
          src={heroImage}
          alt="Nalaka Rest villa in Nuwara Eliya at sunset"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center scale-100 will-change-transform"
          style={{
            imageRendering: "-webkit-optimize-contrast",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
        {/* Exact linear gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* HERO CONTENT: Centered horizontally, upper-middle (~25% to 45% from top) */}
      <div className="relative z-10 my-auto max-w-[1200px] mx-auto w-full px-4 flex flex-col items-center pt-4 sm:pt-6">
        {/* 1. Eyebrow */}
        <p className="hero-eyebrow text-[10px] sm:text-[11px] text-[#E2EFE7] tracking-[0.25em] uppercase font-semibold mb-3 sm:mb-3.5 select-none font-['Plus_Jakarta_Sans']">
          NALAKA REST · NUWARA ELIYA
        </p>

        {/* 2. Headline: Word-by-word reveal with soft upward fade */}
        <h1 className="text-white font-medium sm:font-semibold text-[34px] sm:text-[46px] md:text-[54px] lg:text-[62px] leading-[1.1] tracking-[-0.01em] [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] max-w-4xl font-['Newsreader'] sm:font-sans">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
              <span className="hero-headline-word inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* 3. Subtitle */}
        <p className="hero-subtitle text-white/95 text-base sm:text-lg md:text-xl font-normal mt-3 sm:mt-3.5 max-w-[600px] mx-auto leading-relaxed font-['Newsreader'] italic sm:not-italic sm:font-['Plus_Jakarta_Sans']">
          Looking for a quiet place to rest?
        </p>

        {/* 4. CTA buttons: Fade up smoothly after the headline with hover scale & shadow */}
        <div className="hero-cta-buttons mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          {/* Primary Button */}
          <a
            href="#inquire"
            className="btn-hover-effect w-full max-w-[280px] sm:w-auto sm:max-w-none bg-[#1A432E] text-white text-[14px] font-medium py-3 px-[22px] rounded-[4px] hover:bg-[#122F20] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white inline-flex items-center justify-center cursor-pointer"
          >
            Check Availability
          </a>

          {/* Secondary Button */}
          <a
            href={`tel:${PHONE.replace(/\s+/g, "")}`}
            className="btn-hover-effect w-full max-w-[280px] sm:w-auto sm:max-w-none bg-white text-[#1A432E] text-[14px] font-medium py-3 px-[22px] rounded-[4px] hover:bg-[#F4F8F5] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone size={16} className="text-[#1A432E] shrink-0 stroke-[2]" aria-hidden="true" />
            <span>Call Us Now</span>
          </a>
        </div>
      </div>

      {/* 5. STATS STRIP: Glassmorphism cards fade up smoothly with gentle hover lift */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-2 sm:px-4 mt-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="hero-stat-card card-hover-lift rounded-[12px] p-4 sm:p-5 lg:p-6 min-h-[96px] sm:min-h-[110px] shadow-sm flex flex-col justify-between text-left cursor-default"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderColor: "rgba(255, 255, 255, 0.18)",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {/* Top-left: big number, white, ~32px, weight 500 */}
              <div className="text-white text-2xl sm:text-[32px] font-medium leading-none tracking-tight">
                {stat.value}
              </div>

              {/* Bottom row: label on left, icon on right */}
              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <span className="text-white/85 text-[11px] sm:text-[12px] font-normal leading-tight">
                  {stat.label}
                </span>
                <stat.icon
                  size={16}
                  className="text-white shrink-0 stroke-[1.8]"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
