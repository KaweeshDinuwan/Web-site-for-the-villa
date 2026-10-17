import { useEffect } from "react";
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

export default function App() {
  // Always scroll to hero on mount/reload
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Calm scroll reveal observer (plays once only)
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal, .stagger-group");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#F5F2EB] min-h-screen text-[#1A221E] antialiased selection:bg-[#1E3A2B] selection:text-[#F5F2EB]">
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
