import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Amenities } from "./components/Amenities";
import { Experiences } from "./components/Experiences";
import { Reviews } from "./components/Reviews";
import { BookingCalendar } from "./components/Calendar";
import { Location } from "./components/Location";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWidgets } from "./components/FloatingWidgets";

export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#F9F6F0] font-sans selection:bg-[#D4AF37] selection:text-[#0a0a0a]">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Amenities />
      <Experiences />
      <Reviews />
      <BookingCalendar />
      <Location />
      <Contact />
      <Footer />
      <FloatingWidgets />
    </div>
  );
}
