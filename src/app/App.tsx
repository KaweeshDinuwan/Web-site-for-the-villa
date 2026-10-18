import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Amenities } from "./components/Amenities";
import { Experiences } from "./components/Experiences";
import { Reviews } from "./components/Reviews";
import { BookingCalendar } from "./components/Calendar";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWidgets } from "./components/FloatingWidgets";
import { ScrollToTop } from "./components/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Always scroll to hero on mount/reload
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Premium GSAP ScrollTrigger + Lenis Smooth Scroll Setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prefers-reduced-motion check
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // In reduced motion, ensure all reveal elements are fully visible immediately
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-item").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    // 1. Initialize Lenis for buttery-smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    (window as any).lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation handling with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const target = document.querySelector<HTMLElement>(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -60 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // 2. GSAP Animations within a scoped context for clean lifecycle management
    const ctx = gsap.context(() => {
      // (a) Scroll Sections: Fade up gently with blur-to-focus effect
      const sections = document.querySelectorAll<HTMLElement>("main > section:not(#home)");
      sections.forEach((section) => {
        const leadElements = section.querySelectorAll<HTMLElement>(".reveal");
        if (leadElements.length > 0) {
          leadElements.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 32, filter: "blur(6px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.75,
                ease: "power2.out",
                clearProps: "all",
                scrollTrigger: {
                  trigger: el,
                  start: "top 95%",
                  toggleActions: "play none none none",
                  once: true,
                },
              }
            );
          });
        }
      });

      // (b) Images: Subtle Parallax Movement (move slightly slower than page scroll)
      const parallaxImages = document.querySelectorAll<HTMLImageElement>(
        "main section:not(#home) .overflow-hidden img"
      );
      parallaxImages.forEach((img) => {
        gsap.set(img, { scale: 1.08, transformOrigin: "center center" });
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement || img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // (c) Cards: Fade up one by one with a small delay (stagger)
      const cardContainers = [
        "#house .stagger-group",
        "#comfort .stagger-group",
        "#nearby .grid",
        "#notes .grid",
        "#contact .stagger-group",
        "#gallery .grid",
      ];

      cardContainers.forEach((selector) => {
        const container = document.querySelector<HTMLElement>(selector);
        if (container) {
          const cards = container.querySelectorAll<HTMLElement>(
            ":scope > div, :scope > .reveal-item"
          );
          if (cards.length > 0) {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 30, filter: "blur(5px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.75,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all",
                scrollTrigger: {
                  trigger: container,
                  start: "top 95%",
                  toggleActions: "play none none none",
                  once: true,
                },
              }
            );
          }
        }
      });
    });

    // Refresh ScrollTrigger once everything is bound
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#132E20] antialiased selection:bg-[#1A432E] selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Amenities />
        <Experiences />
        <Reviews />
        <BookingCalendar />
        <Contact />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}
