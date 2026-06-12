import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Priya S.",
    location: "Lucknow, India",
    text: "The villa was absolutely breathtaking. The attention to detail was unmatched, and waking up to the peaceful surroundings was pure magic. A true slice of paradise.",
    rating: 5,
  },
  {
    name: "Ahmed R.",
    location: "Malé, Maldives",
    text: "From the private dining experiences to the stunning views, every moment felt curated for luxury. The staff was attentive and genuinely welcoming.",
    rating: 5,
  },
  {
    name: "Nadeesha P.",
    location: "Colombo, Sri Lanka",
    text: "The perfect blend of comfort, nature, and elegance. Every corner of the retreat felt thoughtfully designed and incredibly relaxing.",
    rating: 5,
  },
  {
    name: "Emily T.",
    location: "London, England",
    text: "An exceptional escape from city life. The atmosphere was tranquil, the service impeccable, and the experience unforgettable.",
    rating: 4.5,
  },
  {
    name: "Michael D.",
    location: "New York, USA",
    text: "I've stayed at many luxury properties, but this retreat stands out for its authenticity and attention to detail.",
    rating: 5,
  },
  {
    name: "Sophie H.",
    location: "Manchester, England",
    text: "Beautiful surroundings, exceptional hospitality, and complete privacy. Everything exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Ananya P.",
    location: "Mumbai, India",
    text: "The retreat offered the perfect balance between luxury and nature. Every experience felt personalized and memorable.",
    rating: 4.5,
  },
  {
    name: "Jessica L.",
    location: "California, USA",
    text: "The peaceful environment and thoughtful service made this one of the most relaxing holidays we've ever had.",
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section
      className="py-24 bg-[#0a0a0a] text-[#F9F6F0]"
      id="reviews"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-[#D4AF37] font-['Montserrat'] tracking-widest uppercase text-sm mb-4">
            Guest Book
          </h4>
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display']">
            Unforgettable Stays
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Hear from guests who have experienced the serenity, luxury, and
            hospitality of our retreat.
          </p>
        </div>

        {/* Horizontal Scroll Reviews */}
        <div className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
          <div className="flex gap-8 pb-4 min-w-max">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                }}
                className="w-[350px] bg-[#121212] p-8 rounded-2xl border border-white/5 relative flex-shrink-0 snap-start"
              >
                <Quote className="absolute top-6 right-6 text-[#D4AF37]/20 w-12 h-12" />

                <div className="flex gap-1 mb-6">
                  {Array.from({
                    length: Math.floor(review.rating),
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="text-[#D4AF37] fill-[#D4AF37]"
                      size={16}
                    />
                  ))}
                </div>

                <p className="font-['Montserrat'] text-white/70 font-light leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-['Playfair_Display'] text-lg">
                    {review.name}
                  </h4>
                  <span className="font-['Montserrat'] text-xs text-white/50">
                    {review.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          ← Swipe or use  to explore more guest reviews →
        </p>
      </div>
    </section>
  );
}