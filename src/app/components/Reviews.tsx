import { useState, useEffect, useId, useMemo, useRef } from "react";
import { 
  Star, 
  PenLine, 
  Send, 
  CheckCircle2, 
  X, 
  Quote, 
  Trash2, 
  ThumbsUp, 
  Filter, 
  Search, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Tag, 
  Check, 
  MessageSquareQuote,
  ShieldCheck
} from "lucide-react";

export interface Testimonial {
  id: string | number;
  title?: string;
  quote: string;
  author: string;
  location: string;
  stayDate: string;
  rating: number;
  tripType?: string;
  highlights?: string[];
  helpfulCount?: number;
  isUserSubmitted?: boolean;
  avatarColor?: string;
}

const defaultQuotes: Testimonial[] = [
  {
    id: 1,
    title: "Misty mornings with hot coffee & pristine tea views",
    quote: "The cool air in the morning and the view across the tea bushes with a hot mug of coffee was the highlight of our trip. The house is warm, the blankets are thick, and the geyser hot water shower actually works 24/7.",
    author: "Kavinda & Dilani M.",
    location: "Colombo, Sri Lanka",
    stayDate: "October 2026",
    rating: 5,
    tripType: "Couple Getaway",
    highlights: ["24/7 Hot Water", "Tea Estate Views", "Cozy Blankets"],
    helpfulCount: 14,
    avatarColor: "#1E3A2B",
  },
  {
    id: 2,
    title: "A true home away from home for families with kids",
    quote: "We spent five nights here with our two kids. Having a proper four-burner stove and a full fridge meant we could cook dinner ourselves after spending cold rainy afternoons walking around Nuwara Eliya town. Extremely peaceful and secure.",
    author: "Sarah & David Jenkins",
    location: "Melbourne, Australia",
    stayDate: "September 2026",
    rating: 5,
    tripType: "Family with Kids",
    highlights: ["Full Kitchen", "Gated Privacy", "Kids Friendly"],
    helpfulCount: 11,
    avatarColor: "#8A5229",
  },
  {
    id: 3,
    title: "Spotless bathrooms, solid teak beds & exceptional host care",
    quote: "Clean bathrooms, comfortable solid wood beds, and complete privacy behind our own gate. The host was always quick on WhatsApp when we had questions about local dairy and grocery shops. Will definitely be returning next season!",
    author: "Rohan & Family",
    location: "Bangalore, India",
    stayDate: "August 2026",
    rating: 5,
    tripType: "Family Vacation",
    highlights: ["Teak Wood Beds", "Responsive Host", "Spotless Clean"],
    helpfulCount: 18,
    avatarColor: "#3B5249",
  },
  {
    id: 4,
    title: "Crisp mountain breezes and restorative tranquility",
    quote: "Nalaka Rest was exactly what we needed after days of traveling around the island. Crisp mountain breezes, total silence at night, and hot showers ready whenever we returned from hiking Pedro Tea Estate.",
    author: "Elena & Thomas Weber",
    location: "Munich, Germany",
    stayDate: "July 2026",
    rating: 5,
    tripType: "Couple Getaway",
    highlights: ["Quiet & Private", "Hot Water Shower", "Hiking Base"],
    helpfulCount: 8,
    avatarColor: "#515B54",
  },
];

const LOCAL_STORAGE_KEY = "villa_guest_reviews_v1";
const HELPFUL_STORAGE_KEY = "villa_reviews_helpful_votes_v1";
const HOST_WHATSAPP = "94775099361";

const TRIP_TYPES = [
  "Family with Kids",
  "Couple Getaway",
  "Group of Friends",
  "Solo Mountain Retreat",
  "Extended Stay / Workation",
];

const AVAILABLE_HIGHLIGHTS = [
  "24/7 Hot Water",
  "Tea Estate Views",
  "Full Kitchen & Stove",
  "Cozy Thick Blankets",
  "Gated Private Compound",
  "Warm Wooden Beds",
  "Spotless Bathrooms",
  "Attentive Host on WhatsApp",
];

const AVATAR_COLORS = [
  { label: "Deep Forest", color: "#1E3A2B" },
  { label: "Ceylon Ochre", color: "#8A5229" },
  { label: "Highland Pine", color: "#3B5249" },
  { label: "Slate Granite", color: "#3D4540" },
  { label: "Amber Clay", color: "#A36034" },
];

/** Custom lightweight confetti burst animation */
function fireConfetti() {
  try {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "999999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#1E3A2B", "#8A5229", "#D4AF37", "#4A6B56", "#E3B873", "#FFFFFF"];
    const particles: Array<{
      x: number;
      y: number;
      r: number;
      color: string;
      vx: number;
      vy: number;
      tilt: number;
      tiltAngle: number;
      tiltAngleInc: number;
    }> = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height * 0.4 + (Math.random() * 100 - 50),
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 1) * 9 - 4,
        tilt: Math.random() * 10,
        tiltAngle: 0,
        tiltAngleInc: Math.random() * 0.1 + 0.05,
      });
    }

    let animationId: number;
    let startTime = Date.now();

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.vy += 0.22; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.tiltAngle += p.tiltAngleInc;
        p.tilt = Math.sin(p.tiltAngle) * 8;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      });

      if (Date.now() - startTime < 2600) {
        animationId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationId);
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  } catch {
    // Graceful fallback if DOM fails
  }
}

export function Reviews() {
  const [reviews, setReviews] = useState<Testimonial[]>(defaultQuotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newlyCreatedId, setNewlyCreatedId] = useState<string | number | null>(null);

  // Form State
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [stayDate, setStayDate] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [tripType, setTripType] = useState("Family with Kids");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([
    "24/7 Hot Water",
    "Tea Estate Views",
  ]);
  const [avatarColor, setAvatarColor] = useState("#1E3A2B");
  const [sendToWhatsApp, setSendToWhatsApp] = useState(true);

  // Validation & Feedback
  const [errors, setErrors] = useState<{ author?: string; quote?: string }>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const authorInputId = useId();
  const locationInputId = useId();
  const stayDateInputId = useId();
  const titleInputId = useId();
  const quoteInputId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  // Load reviews and upvotes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: Testimonial[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...defaultQuotes]);
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    try {
      const storedVotes = localStorage.getItem(HELPFUL_STORAGE_KEY);
      if (storedVotes) {
        setUpvotedIds(JSON.parse(storedVotes));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Overall statistics
  const stats = useMemo(() => {
    const total = reviews.length;
    const average = total > 0 ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / total).toFixed(1) : "5.0";
    const fiveStarPercent = total > 0 ? Math.round((reviews.filter((r) => (r.rating || 5) === 5).length / total) * 100) : 100;
    return { total, average, fiveStarPercent };
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      // Filter tab
      if (activeFilter === "5star" && (r.rating || 5) !== 5) return false;
      if (activeFilter === "family" && !r.tripType?.toLowerCase().includes("family")) return false;
      if (activeFilter === "couple" && !r.tripType?.toLowerCase().includes("couple")) return false;
      if (activeFilter === "my_reviews" && !r.isUserSubmitted) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesAuthor = r.author.toLowerCase().includes(q);
        const matchesLocation = r.location.toLowerCase().includes(q);
        const matchesQuote = r.quote.toLowerCase().includes(q);
        const matchesTitle = r.title?.toLowerCase().includes(q);
        const matchesHighlights = r.highlights?.some((h) => h.toLowerCase().includes(q));
        if (!matchesAuthor && !matchesLocation && !matchesQuote && !matchesTitle && !matchesHighlights) {
          return false;
        }
      }

      return true;
    });
  }, [reviews, activeFilter, searchQuery]);

  const toggleHighlight = (item: string) => {
    if (selectedHighlights.includes(item)) {
      setSelectedHighlights(selectedHighlights.filter((h) => h !== item));
    } else {
      setSelectedHighlights([...selectedHighlights, item]);
    }
  };

  const handleRatingHover = (val: number) => {
    setHoverRating(val);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const validate = () => {
    const newErrors: { author?: string; quote?: string } = {};
    if (!author.trim()) {
      newErrors.author = "Please enter your name or group name";
    }
    if (!quote.trim()) {
      newErrors.quote = "Please share a few words about your stay";
    } else if (quote.trim().length < 15) {
      newErrors.quote = "Please write at least 15 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setShowSuccessToast(false);
    if (!stayDate) {
      setStayDate(new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedDate = stayDate.trim() 
      ? stayDate.trim() 
      : new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const newId = `user-${Date.now()}`;
    const newReview: Testimonial = {
      id: newId,
      author: author.trim(),
      location: location.trim() || "Visitor",
      stayDate: formattedDate,
      rating,
      tripType,
      title: title.trim() || undefined,
      quote: quote.trim(),
      highlights: selectedHighlights.length > 0 ? selectedHighlights : undefined,
      helpfulCount: 1,
      isUserSubmitted: true,
      avatarColor,
    };

    // Update state and localStorage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existingUserReviews: Testimonial[] = stored ? JSON.parse(stored) : [];
      const updatedUserReviews = [newReview, ...existingUserReviews];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUserReviews));
      setReviews([newReview, ...reviews]);
    } catch {
      setReviews([newReview, ...reviews]);
    }

    // Trigger Festive Confetti
    fireConfetti();

    // Mark as newly created for visual highlight
    setNewlyCreatedId(newId);

    // Optional WhatsApp direct notification to host
    if (sendToWhatsApp) {
      const starsText = "★".repeat(rating) + "☆".repeat(5 - rating);
      const highlightsText = selectedHighlights.length > 0 ? `\nHighlights: ${selectedHighlights.join(", ")}` : "";
      const headlineText = title.trim() ? `\nTitle: "${title.trim()}"` : "";

      const message = `*New Guest Review for Nalaka Rest:*\n\n` +
        `Rating: ${starsText} (${rating}/5)\n` +
        `Guest: ${newReview.author}\n` +
        `Home: ${newReview.location}\n` +
        `Trip: ${tripType}\n` +
        `Stayed: ${newReview.stayDate}` +
        headlineText + `\n\n` +
        `"${newReview.quote}"` +
        highlightsText;

      const whatsappUrl = `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    // Reset Form
    setAuthor("");
    setLocation("");
    setStayDate("");
    setTitle("");
    setQuote("");
    setRating(5);
    setSelectedHighlights(["24/7 Hot Water", "Tea Estate Views"]);
    setErrors({});
    setIsModalOpen(false);
    setShowSuccessToast(true);

    // Reset filter to see all reviews including the newly published one
    setActiveFilter("all");

    // Scroll to the reviews section smoothly
    setTimeout(() => {
      const element = document.getElementById("notes");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);

    // Auto dismiss toast after 8 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 8000);
  };

  const handleHelpfulVote = (id: string | number) => {
    const stringId = String(id);
    if (upvotedIds.includes(stringId)) return; // Already voted

    const newUpvoted = [...upvotedIds, stringId];
    setUpvotedIds(newUpvoted);
    try {
      localStorage.setItem(HELPFUL_STORAGE_KEY, JSON.stringify(newUpvoted));
    } catch {
      // Ignore
    }

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, helpfulCount: (r.helpfulCount || 0) + 1 };
        }
        return r;
      })
    );
  };

  const handleDeleteUserReview = (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: Testimonial[] = JSON.parse(stored);
        const filtered = parsed.filter((r) => r.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      }
    } catch {
      // Ignore
    }
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return "Exceptional & Unforgettable (5/5)";
      case 4:
        return "Wonderful Stay (4/5)";
      case 3:
        return "Pleasant Mountain Experience (3/5)";
      case 2:
        return "Average Stay (2/5)";
      case 1:
        return "Needs Improvement (1/5)";
      default:
        return "";
    }
  };

  // Helper to generate 2-letter initials
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || "V").toUpperCase();
  };

  return (
    <section className="py-20 md:py-24 bg-[#ECE7DC] text-[#1A221E] border-b border-[#1A221E]/10 relative" id="notes">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header with Standout "Write a Review" Call to Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#8A5229] font-bold">
                Guestbook &amp; Impressions
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#1E3A2B]/10 text-[#1E3A2B] px-2.5 py-0.5 rounded-full">
                <ShieldCheck size={12} />
                <span>Verified Visitor Notes</span>
              </span>
            </div>
            <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              Stories from past visitors.
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#515B54] mt-2">
              Genuine memories from travelers who stayed at our hillside retreat. Have you stayed at Nalaka Rest? We invite you to share your experience with fellow travelers!
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              id="open-review-form-btn"
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1E3A2B] text-[#F5F2EB] text-sm font-semibold tracking-wide hover:bg-[#15291E] hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all shadow-sm group"
            >
              <PenLine size={16} className="text-[#D4AF37] group-hover:rotate-6 transition-transform" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Overview Summary Banner */}
        <div className="mb-10 bg-[#F5F2EB] rounded-2xl border border-[#1A221E]/10 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Star score & Count */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="flex flex-col items-center justify-center bg-[#1E3A2B] text-[#F5F2EB] w-20 h-20 sm:w-22 sm:h-22 rounded-2xl shrink-0 shadow-sm">
                <span className="font-['Newsreader'] text-3xl sm:text-4xl font-bold tracking-tight">
                  {stats.average}
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#D4AF37] font-semibold">
                  Out of 5.0
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#8A5229] mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} className="fill-[#8A5229] text-[#8A5229]" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-[#1A221E]">
                    Outstanding ({stats.fiveStarPercent}% 5-Star)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#515B54]">
                  Based on <strong className="text-[#1A221E]">{stats.total} verified guest reviews</strong>. All feedback is from genuine travelers.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-[#8A5229] font-medium">
                  <span className="flex items-center gap-1">✓ Full Self-Catering Kitchen</span>
                  <span className="flex items-center gap-1">✓ 24/7 Geyser Hot Water</span>
                  <span className="flex items-center gap-1">✓ Private Hillside Compound</span>
                </div>
              </div>
            </div>

            {/* Right: Quick CTA to write review */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-t lg:border-t-0 lg:border-l border-[#1A221E]/10 pt-4 lg:pt-0 lg:pl-6 shrink-0">
              <div className="text-left">
                <p className="text-xs font-bold text-[#1A221E]">
                  Were you a guest here?
                </p>
                <p className="text-[11px] text-[#515B54]">
                  Your review helps future guests plan their highland holiday.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E3A2B] text-[#1E3A2B] text-xs font-bold hover:bg-[#1E3A2B] hover:text-[#F5F2EB] active:scale-95 transition-all whitespace-nowrap"
              >
                <Sparkles size={13} className="text-[#8A5229]" />
                <span>Share Your Note</span>
              </button>
            </div>

          </div>
        </div>

        {/* Success Alert Banner */}
        {showSuccessToast && (
          <div 
            role="status"
            className="mb-8 p-5 bg-[#1E3A2B]/10 border border-[#1E3A2B]/20 rounded-2xl flex items-start justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-xs"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 size={22} className="text-[#1E3A2B] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1E3A2B]">
                  Thank you! Your review is now published.
                </h4>
                <p className="text-xs text-[#515B54] mt-0.5">
                  Your note has been added to our guestbook and will help fellow mountain travelers. We are deeply grateful for your warm feedback!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSuccessToast(false)}
              className="text-[#515B54] hover:text-[#1A221E] p-1 rounded-md hover:bg-[#1A221E]/5 transition-colors"
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
                  : "bg-[#F5F2EB] text-[#515B54] hover:text-[#1A221E] border border-[#1A221E]/10"
              }`}
            >
              All Notes ({reviews.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("5star")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                activeFilter === "5star"
                  ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
                  : "bg-[#F5F2EB] text-[#515B54] hover:text-[#1A221E] border border-[#1A221E]/10"
              }`}
            >
              <Star size={12} className="fill-current text-[#D4AF37]" />
              <span>5 Stars</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("family")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === "family"
                  ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
                  : "bg-[#F5F2EB] text-[#515B54] hover:text-[#1A221E] border border-[#1A221E]/10"
              }`}
            >
              Families
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("couple")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === "couple"
                  ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
                  : "bg-[#F5F2EB] text-[#515B54] hover:text-[#1A221E] border border-[#1A221E]/10"
              }`}
            >
              Couples
            </button>
            {reviews.some((r) => r.isUserSubmitted) && (
              <button
                type="button"
                onClick={() => setActiveFilter("my_reviews")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === "my_reviews"
                    ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
                    : "bg-[#F5F2EB] text-[#8A5229] hover:text-[#1A221E] border border-[#8A5229]/20"
                }`}
              >
                Your Notes
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#515B54]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes (e.g. kitchen, view)..."
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-full bg-[#F5F2EB] border border-[#1A221E]/15 text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none focus:ring-1 focus:ring-[#1E3A2B]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#515B54] hover:text-[#1A221E]"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div ref={reviewsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredReviews.map((item) => {
            const starCount = item.rating || 5;
            const isNewlyCreated = item.id === newlyCreatedId;
            const hasUpvoted = upvotedIds.includes(String(item.id));

            return (
              <div 
                key={item.id}
                id={`review-card-${item.id}`}
                className={`bg-[#F5F2EB] p-6 sm:p-7 rounded-2xl border flex flex-col justify-between shadow-xs transition-all duration-300 ${
                  isNewlyCreated 
                    ? "ring-2 ring-[#1E3A2B] border-[#1E3A2B] bg-[#F9F7F1]" 
                    : "border-[#1A221E]/10 hover:border-[#1A221E]/25 hover:shadow-sm"
                }`}
              >
                <div>
                  {/* Top Bar: Stars + Badge / Controls */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5 text-[#8A5229]" title={`${starCount} / 5 Stars`}>
                      {[...Array(starCount)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#8A5229] text-[#8A5229]" />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isNewlyCreated ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B] bg-[#1E3A2B]/15 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles size={10} />
                          <span>Just Published</span>
                        </span>
                      ) : item.isUserSubmitted ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A5229] bg-[#8A5229]/10 px-2 py-0.5 rounded-full">
                          Your Note
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-[#515B54] bg-[#1A221E]/5 px-2 py-0.5 rounded-full">
                          Verified Guest
                        </span>
                      )}

                      {item.isUserSubmitted && (
                        <button
                          type="button"
                          onClick={() => handleDeleteUserReview(item.id)}
                          title="Remove your note"
                          className="text-[#515B54]/60 hover:text-red-700 p-1 transition-colors"
                          aria-label="Remove review"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Optional Review Title */}
                  {item.title && (
                    <h4 className="font-['Newsreader'] text-base sm:text-lg font-medium text-[#1A221E] mb-2 leading-snug">
                      {item.title}
                    </h4>
                  )}

                  {/* Review Text */}
                  <p className="font-['Newsreader'] italic text-sm sm:text-base text-[#1A221E]/90 leading-relaxed mb-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Highlights tags if provided */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.highlights.map((h, i) => (
                        <span 
                          key={i} 
                          className="text-[10px] font-medium bg-[#1A221E]/5 text-[#515B54] px-2 py-0.5 rounded-md"
                        >
                          • {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Footer: Author Info & Helpful upvote */}
                <div className="pt-4 border-t border-[#1A221E]/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Initials Avatar */}
                    <div 
                      className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: item.avatarColor || "#1E3A2B" }}
                    >
                      {getInitials(item.author)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#1A221E] truncate">
                        {item.author}
                      </p>
                      <p className="text-[11px] text-[#515B54] truncate">
                        {item.location} • <span className="text-[#8A5229] font-medium">{item.stayDate}</span>
                      </p>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    type="button"
                    onClick={() => handleHelpfulVote(item.id)}
                    disabled={hasUpvoted}
                    title={hasUpvoted ? "You found this helpful" : "Mark as helpful"}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      hasUpvoted 
                        ? "bg-[#1E3A2B]/10 text-[#1E3A2B] cursor-default font-bold" 
                        : "text-[#515B54] hover:text-[#1A221E] hover:bg-[#1A221E]/5 active:scale-95"
                    }`}
                  >
                    <ThumbsUp size={11} className={hasUpvoted ? "fill-current" : ""} />
                    <span>{item.helpfulCount || 0}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Interactive "Write a Review" Card inside the Grid */}
          <div 
            onClick={handleOpenModal}
            className="group bg-[#F5F2EB]/50 hover:bg-[#F5F2EB] p-7 rounded-2xl border-2 border-dashed border-[#1A221E]/20 hover:border-[#1E3A2B] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-[#1E3A2B]/10 group-hover:bg-[#1E3A2B] text-[#1E3A2B] group-hover:text-[#F5F2EB] flex items-center justify-center mb-3 transition-colors duration-300">
              <PenLine size={20} />
            </div>
            <h4 className="font-['Newsreader'] text-xl font-medium text-[#1A221E] group-hover:text-[#1E3A2B] transition-colors">
              Add Your Own Experience
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#515B54] mt-1 max-w-xs">
              Did you stay at Nalaka Rest? Leave your advice and rating for the next travelers.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-[#1E3A2B] underline decoration-[#1E3A2B]/30 group-hover:decoration-[#1E3A2B]">
              <span>Write a Note Now</span>
              <span>&rarr;</span>
            </span>
          </div>

        </div>

        {/* Empty state if search has no results */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12 bg-[#F5F2EB] rounded-2xl border border-[#1A221E]/10 p-8 my-4">
            <MessageSquareQuote size={36} className="mx-auto text-[#515B54]/40 mb-3" />
            <h4 className="font-['Newsreader'] text-xl font-medium text-[#1A221E]">
              No guest notes found
            </h4>
            <p className="text-xs text-[#515B54] mt-1">
              No reviews matched your current search or filter. Try a different keyword or reset filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#1E3A2B] text-[#F5F2EB] text-xs font-semibold"
            >
              Show All Notes
            </button>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* Interactive "Write a Review" Modal Dialog                */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
        >
          {/* Modal Container */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-2xl bg-[#F5F2EB] rounded-2xl border border-[#1A221E]/15 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-[#1A221E] animate-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 mb-5 border-b border-[#1A221E]/10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A5229]">
                  Guest Book Entry
                </span>
                <h3 id="write-review-title" className="font-['Newsreader'] text-2xl sm:text-3xl font-medium text-[#1A221E] mt-0.5">
                  Share Your Stay Experience
                </h3>
                <p className="text-xs text-[#515B54] mt-1">
                  Tell future travelers about your time in the Nuwara Eliya hills.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-[#ECE7DC] hover:bg-[#1A221E]/10 flex items-center justify-center text-[#515B54] hover:text-[#1A221E] transition-colors shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Star Rating Selection */}
              <div className="mb-6 p-4 rounded-xl bg-[#ECE7DC]/80 border border-[#1A221E]/10">
                <span className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-2">
                  Overall Rating <span className="text-red-700">*</span>
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div 
                    className="flex items-center gap-1.5"
                    onMouseLeave={handleRatingLeave}
                    role="radiogroup"
                    aria-label="Star Rating"
                  >
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isActive = (hoverRating || rating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          onMouseEnter={() => handleRatingHover(starVal)}
                          className="p-1.5 text-[#8A5229] hover:scale-115 active:scale-95 transition-transform focus:outline-none"
                          aria-label={`${starVal} Star${starVal > 1 ? "s" : ""}`}
                          aria-checked={rating === starVal}
                          role="radio"
                        >
                          <Star
                            size={26}
                            className={isActive ? "fill-[#8A5229] text-[#8A5229]" : "text-[#1A221E]/20"}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs text-[#8A5229] font-bold">
                    {getRatingLabel(hoverRating || rating)}
                  </span>
                </div>
              </div>

              {/* Guest Details (Name, Location, Stay Date) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                
                {/* Author Name */}
                <div>
                  <label 
                    htmlFor={authorInputId}
                    className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5"
                  >
                    Your Name / Group <span className="text-red-700">*</span>
                  </label>
                  <input
                    id={authorInputId}
                    type="text"
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                      if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));
                    }}
                    placeholder="e.g. Kasun & Anuki M."
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#ECE7DC] border ${
                      errors.author ? "border-red-600 focus:ring-red-600" : "border-[#1A221E]/15 focus:border-[#1E3A2B]"
                    } text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none focus:ring-1 focus:ring-[#1E3A2B] transition-colors`}
                  />
                  {errors.author && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.author}</p>
                  )}
                </div>

                {/* Home Location */}
                <div>
                  <label 
                    htmlFor={locationInputId}
                    className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5"
                  >
                    Home City &amp; Country
                  </label>
                  <input
                    id={locationInputId}
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Colombo, Sri Lanka"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#ECE7DC] border border-[#1A221E]/15 focus:border-[#1E3A2B] text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none focus:ring-1 focus:ring-[#1E3A2B] transition-colors"
                  />
                </div>

                {/* Stay Date */}
                <div>
                  <label 
                    htmlFor={stayDateInputId}
                    className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5"
                  >
                    Month &amp; Year of Stay
                  </label>
                  <input
                    id={stayDateInputId}
                    type="text"
                    value={stayDate}
                    onChange={(e) => setStayDate(e.target.value)}
                    placeholder="e.g. October 2026"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#ECE7DC] border border-[#1A221E]/15 focus:border-[#1E3A2B] text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none focus:ring-1 focus:ring-[#1E3A2B] transition-colors"
                  />
                </div>

              </div>

              {/* Trip Type Selector */}
              <div className="mb-5">
                <span className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5">
                  Trip Type
                </span>
                <div className="flex flex-wrap gap-2">
                  {TRIP_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        tripType === type
                          ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
                          : "bg-[#ECE7DC] text-[#515B54] hover:text-[#1A221E] border border-[#1A221E]/10"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Headline / Title */}
              <div className="mb-4">
                <label 
                  htmlFor={titleInputId}
                  className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5"
                >
                  Review Title <span className="text-[#515B54] font-normal normal-case">(optional)</span>
                </label>
                <input
                  id={titleInputId}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Unforgettable cold mountain mornings with hot tea"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#ECE7DC] border border-[#1A221E]/15 focus:border-[#1E3A2B] text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none focus:ring-1 focus:ring-[#1E3A2B] transition-colors"
                />
              </div>

              {/* Review Quote Textarea */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor={quoteInputId}
                    className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider"
                  >
                    Your Review &amp; Memories <span className="text-red-700">*</span>
                  </label>
                  <span className="text-[11px] text-[#515B54]">
                    {quote.length} characters (min 15)
                  </span>
                </div>
                <textarea
                  id={quoteInputId}
                  rows={4}
                  value={quote}
                  onChange={(e) => {
                    setQuote(e.target.value);
                    if (errors.quote) setErrors((prev) => ({ ...prev, quote: undefined }));
                  }}
                  placeholder="How was your stay? How did you like the morning mountain air, the beds, the kitchen, hot water, privacy, or the host's hospitality?"
                  className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#ECE7DC] border ${
                    errors.quote ? "border-red-600 focus:ring-red-600" : "border-[#1A221E]/15 focus:border-[#1E3A2B]"
                  } text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none focus:ring-1 focus:ring-[#1E3A2B] transition-colors`}
                />
                {errors.quote && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.quote}</p>
                )}
              </div>

              {/* Highlights tags */}
              <div className="mb-5">
                <span className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-2">
                  What did you like most? <span className="text-[#515B54] font-normal normal-case">(tap to select)</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_HIGHLIGHTS.map((tag) => {
                    const isSelected = selectedHighlights.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleHighlight(tag)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[#1E3A2B] text-[#F5F2EB]"
                            : "bg-[#ECE7DC] text-[#515B54] hover:text-[#1A221E] border border-[#1A221E]/10"
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Avatar Color Choice */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-bold text-[#1A221E] uppercase tracking-wider">
                  Avatar Tint:
                </span>
                <div className="flex items-center gap-2">
                  {AVATAR_COLORS.map((item) => (
                    <button
                      key={item.color}
                      type="button"
                      onClick={() => setAvatarColor(item.color)}
                      style={{ backgroundColor: item.color }}
                      title={item.label}
                      className={`w-6 h-6 rounded-full transition-transform ${
                        avatarColor === item.color ? "ring-2 ring-offset-2 ring-[#1E3A2B] scale-110" : "opacity-80 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* WhatsApp direct notification checkbox */}
              <div className="mb-6 p-3.5 bg-[#ECE7DC]/60 rounded-xl border border-[#1A221E]/10 flex items-start gap-3">
                <input
                  id="send-to-whatsapp"
                  type="checkbox"
                  checked={sendToWhatsApp}
                  onChange={(e) => setSendToWhatsApp(e.target.checked)}
                  className="mt-0.5 rounded border-[#1A221E]/20 text-[#1E3A2B] focus:ring-[#1E3A2B] cursor-pointer"
                />
                <label htmlFor="send-to-whatsapp" className="text-xs text-[#515B54] cursor-pointer leading-relaxed">
                  <strong className="text-[#1A221E]">Send a copy directly to the host on WhatsApp (+94 77 509 9361)</strong>. 
                  <span className="block text-[11px] text-[#515B54] mt-0.5">
                    Pre-formats your note with your star rating so the host can thank you personally!
                  </span>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1A221E]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#515B54] hover:text-[#1A221E] hover:bg-[#1A221E]/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-review-btn"
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#1E3A2B] text-[#F5F2EB] text-xs font-bold tracking-wide hover:bg-[#15291E] hover:shadow-md active:scale-95 transition-all shadow-sm"
                >
                  <Send size={14} />
                  <span>Publish My Review</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
}