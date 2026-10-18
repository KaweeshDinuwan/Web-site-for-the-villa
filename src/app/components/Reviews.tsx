import { useState, useEffect, useId, useMemo, useRef } from "react";
import { 
  Star, 
  PenLine, 
  Send, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Check, 
  MessageSquareQuote,
  ShieldCheck,
  ThumbsUp,
  AlertCircle,
  MessageCircle
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
  contact?: string;
  status?: "approved" | "pending";
  createdAt?: string;
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
    status: "approved",
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
    status: "approved",
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
    status: "approved",
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
    status: "approved",
  },
];

const LOCAL_STORAGE_PENDING_KEY = "villa_pending_reviews_v1";
const HELPFUL_STORAGE_KEY = "villa_reviews_helpful_votes_v1";
const RATE_LIMIT_KEY = "villa_review_last_submit_ts";
const HOST_WHATSAPP = "94775099361";
const SLIDE_SPEED_PX_PER_SEC = 40;
const MOBILE_SPEED_PX_PER_SEC = 30;
const AUTO_PUBLISH = false;

// Backend endpoint configuration (e.g. Web3Forms or Formspree)
// To forward submitted notes directly to your email, paste your access key here:
const WEB3FORMS_ACCESS_KEY = ""; 

const TRIP_TYPES = [
  "Family with Kids",
  "Couple Getaway",
  "Group of Friends",
  "Solo Mountain Retreat",
  "Extended Stay / Workation",
];

const AVAILABLE_TAGS = [
  "Quiet & Private",
  "Hot Water Shower",
  "Hiking Base",
  "Spotless Clean",
  "Families",
  "Couples",
];

const AVATAR_COLORS = [
  { label: "Deep Forest", color: "#1E3A2B" },
  { label: "Ceylon Ochre", color: "#8A5229" },
  { label: "Highland Pine", color: "#3B5249" },
  { label: "Slate Granite", color: "#3D4540" },
  { label: "Amber Clay", color: "#A36034" },
];

/** Helper: current YYYY-MM */
function getCurrentYearMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/** Helper: format YYYY-MM to readable string e.g. "October 2026" */
function formatYearMonthToText(ym: string): string {
  if (!ym) return "";
  const parts = ym.split("-");
  if (parts.length < 2) return ym;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const d = new Date(year, month, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Custom lightweight celebratory confetti burst */
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
    const startTime = Date.now();

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.vy += 0.22;
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
    // Fail silently if canvas unsupported
  }
}

interface ReviewCardItemProps {
  item: Testimonial;
  isClone?: boolean;
  hasUpvoted: boolean;
  onUpvote: (id: string | number) => void;
  getInitials: (name: string) => string;
}

function ReviewCardItem({
  item,
  isClone = false,
  hasUpvoted,
  onUpvote,
  getInitials,
}: ReviewCardItemProps) {
  const starCount = item.rating || 5;

  return (
    <article
      id={isClone ? undefined : `review-card-${item.id}`}
      aria-hidden={isClone ? "true" : undefined}
      className="w-[85vw] max-w-[320px] sm:w-[340px] shrink-0 bg-[#F5F2EB] p-5 rounded-2xl border border-[#1A221E]/10 hover:border-[#1A221E]/25 hover:shadow-md flex flex-col justify-between shadow-xs transition-shadow duration-200 select-none text-left"
    >
      <div>
        {/* Top Bar: Stars + Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-0.5 text-[#8A5229]" title={`${starCount} / 5 Stars`}>
            {[...Array(starCount)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#8A5229] text-[#8A5229]" />
            ))}
          </div>

          <span className="text-[10px] font-medium text-[#515B54] bg-[#1A221E]/5 px-2 py-0.5 rounded-full shrink-0">
            Verified Guest
          </span>
        </div>

        {/* Optional Review Title */}
        {item.title && (
          <h4 className="font-['Newsreader'] text-[17px] font-semibold text-[#1A221E] mb-1.5 leading-snug line-clamp-2">
            {item.title}
          </h4>
        )}

        {/* Review Text clamped to 6 lines */}
        <p className="font-['Newsreader'] italic text-[14px] sm:text-[14.5px] text-[#1A221E]/90 leading-[1.6] mb-3 line-clamp-6">
          &ldquo;{item.quote}&rdquo;
        </p>

        {/* Highlights tags if provided */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.highlights.map((h, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-[#1A221E]/5 text-[#515B54] px-2 py-0.5 rounded-md"
              >
                • {h}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pinned Bottom Footer */}
      <div className="mt-auto pt-3.5 border-t border-[#1A221E]/10 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-7 h-7 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs"
            style={{ backgroundColor: item.avatarColor || "#1E3A2B" }}
          >
            {getInitials(item.author)}
          </div>
          <div className="min-w-0">
            <p className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1A221E] truncate">
              {item.author}
            </p>
            <p className="text-xs text-[#515B54] truncate">
              {item.location} • <span className="text-[#8A5229] font-medium">{item.stayDate}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          tabIndex={isClone ? -1 : 0}
          aria-hidden={isClone ? "true" : undefined}
          onClick={(e) => {
            e.stopPropagation();
            onUpvote(item.id);
          }}
          disabled={hasUpvoted}
          title={hasUpvoted ? "You found this helpful" : "Mark as helpful"}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
            hasUpvoted
              ? "bg-[#1E3A2B]/10 text-[#1E3A2B] cursor-default font-bold"
              : "text-[#515B54] hover:text-[#1A221E] hover:bg-[#1A221E]/5 active:scale-95"
          }`}
        >
          <ThumbsUp size={11} className={hasUpvoted ? "fill-current" : ""} />
          <span>{item.helpfulCount || 0}</span>
        </button>
      </div>
    </article>
  );
}

interface AutoSlidingReviewsCarouselProps {
  items: Testimonial[];
  upvotedIds: string[];
  onUpvote: (id: string | number) => void;
  getInitials: (name: string) => string;
}

function AutoSlidingReviewsCarousel({
  items,
  upvotedIds,
  onUpvote,
  getInitials,
}: AutoSlidingReviewsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const posRef = useRef(0);
  const speedRef = useRef(SLIDE_SPEED_PX_PER_SEC);
  const targetSpeedRef = useRef(SLIDE_SPEED_PX_PER_SEC);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isTouchingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isVisibleRef = useRef(true);
  const isTabVisibleRef = useRef(true);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const touchResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const setSpanRef = useRef(0);
  const rAFIdRef = useRef<number | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const repeatCount = useMemo(() => {
    if (items.length === 0) return 1;
    return Math.max(3, Math.ceil(3600 / (items.length * 360)));
  }, [items.length]);

  const measureSetSpan = () => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;
    const firstCard = track.children[0] as HTMLElement | undefined;
    const nextSetFirstCard = track.children[items.length] as HTMLElement | undefined;
    if (firstCard && nextSetFirstCard) {
      const measured = nextSetFirstCard.offsetLeft - firstCard.offsetLeft;
      if (measured > 0) {
        setSpanRef.current = measured;
        posRef.current = posRef.current % measured;
      }
    }
  };

  useEffect(() => {
    measureSetSpan();
    const handleResize = () => {
      measureSetSpan();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [items, repeatCount]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    let isRunning = true;

    const tick = (time: number) => {
      if (!isRunning) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const dt = Math.min(0.1, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      const isMobile = window.innerWidth < 640;
      const baseSpeed = isMobile ? MOBILE_SPEED_PX_PER_SEC : SLIDE_SPEED_PX_PER_SEC;

      const shouldPause =
        isHoveredRef.current ||
        isFocusedRef.current ||
        isTouchingRef.current ||
        isDraggingRef.current ||
        !isVisibleRef.current ||
        !isTabVisibleRef.current;

      targetSpeedRef.current = shouldPause ? 0 : baseSpeed;

      // Smooth deceleration / acceleration over ~300ms
      speedRef.current += (targetSpeedRef.current - speedRef.current) * (1 - Math.exp(-dt / 0.08));

      if (!isDraggingRef.current) {
        posRef.current += speedRef.current * dt;

        const span = setSpanRef.current;
        if (span > 0) {
          posRef.current = posRef.current % span;
        }

        track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
      }

      rAFIdRef.current = requestAnimationFrame(tick);
    };

    rAFIdRef.current = requestAnimationFrame(tick);

    const handleVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden;
      lastTimeRef.current = performance.now();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
        lastTimeRef.current = performance.now();
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      isRunning = false;
      if (rAFIdRef.current !== null) {
        cancelAnimationFrame(rAFIdRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (touchResumeTimerRef.current) {
        clearTimeout(touchResumeTimerRef.current);
      }
    };
  }, [prefersReducedMotion, items]);

  const handleTouchStart = (e: React.TouchEvent) => {
    isTouchingRef.current = true;
    isDraggingRef.current = false;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPosRef.current = posRef.current;
    if (touchResumeTimerRef.current) {
      clearTimeout(touchResumeTimerRef.current);
      touchResumeTimerRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartXRef.current;
    if (Math.abs(diff) > 6) {
      isDraggingRef.current = true;
      let newPos = dragStartPosRef.current - diff;
      const span = setSpanRef.current;
      if (span > 0) {
        while (newPos < 0) newPos += span;
        newPos = newPos % span;
      }
      posRef.current = newPos;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchResumeTimerRef.current = setTimeout(() => {
      isTouchingRef.current = false;
      lastTimeRef.current = performance.now();
    }, 1500);
  };

  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label="Guest reviews"
        aria-roledescription="carousel"
        className="w-full overflow-x-auto py-3 scroll-smooth snap-x snap-mandatory flex gap-5"
      >
        {items.map((item) => (
          <div key={item.id} className="snap-center">
            <ReviewCardItem
              item={item}
              isClone={false}
              hasUpvoted={upvotedIds.includes(String(item.id))}
              onUpvote={onUpvote}
              getInitials={getInitials}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Guest reviews"
      aria-roledescription="carousel"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onFocusCapture={() => {
        isFocusedRef.current = true;
      }}
      onBlurCapture={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          isFocusedRef.current = false;
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-full overflow-hidden py-3"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-5 items-stretch will-change-transform"
        style={{ width: "max-content" }}
      >
        {Array.from({ length: repeatCount }).map((_, repeatIndex) =>
          items.map((item) => {
            const isClone = repeatIndex > 0;
            return (
              <ReviewCardItem
                key={`${repeatIndex}-${item.id}`}
                item={item}
                isClone={isClone}
                hasUpvoted={upvotedIds.includes(String(item.id))}
                onUpvote={onUpvote}
                getInitials={getInitials}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Testimonial[]>(defaultQuotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Upvotes
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);

  // Teaser hover rating
  const [teaserHoverRating, setTeaserHoverRating] = useState(0);

  // Form State (Defaults fixed: rating starts empty 0, tripType starts empty "")
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [stayDate, setStayDate] = useState(getCurrentYearMonth());
  const [tripType, setTripType] = useState("");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [contact, setContact] = useState("");
  const [avatarColor, setAvatarColor] = useState("#1E3A2B");
  const [sendToWhatsApp, setSendToWhatsApp] = useState(true);

  // Spam protection & validation
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ rating?: string; author?: string; quote?: string; summary?: string }>({});

  // Thank You confirmation states
  const [showThankYouBanner, setShowThankYouBanner] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<{
    author: string;
    rating: number;
    quote: string;
    stayDate: string;
    location: string;
    title?: string;
    whatsappUrl?: string;
  } | null>(null);

  // IDs and Refs
  const authorInputId = useId();
  const locationInputId = useId();
  const stayDateInputId = useId();
  const titleInputId = useId();
  const quoteInputId = useId();
  const contactInputId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerSourceRef = useRef<HTMLElement | null>(null);
  const ratingCardRef = useRef<HTMLDivElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const quoteInputRef = useRef<HTMLTextAreaElement>(null);

  // Load helpful upvotes from localStorage
  useEffect(() => {
    try {
      const storedVotes = localStorage.getItem(HELPFUL_STORAGE_KEY);
      if (storedVotes) {
        setUpvotedIds(JSON.parse(storedVotes));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Modal accessibility: body scroll lock, Escape key, and Focus Trap
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause Lenis smooth scrolling so modal can scroll natively
    if (typeof (window as any).lenis?.stop === "function") {
      (window as any).lenis.stop();
    }

    const modalEl = modalRef.current;
    if (modalEl) {
      // Focus first input or button in modal
      const focusable = modalEl.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }

      // Trap Tab key inside dialog
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleCloseModal();
          return;
        }

        if (e.key === "Tab") {
          const focusableElements = modalEl.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;
          const first = focusableElements[0];
          const last = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        if (typeof (window as any).lenis?.start === "function") {
          (window as any).lenis.start();
        }
      };
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (typeof (window as any).lenis?.start === "function") {
        (window as any).lenis.start();
      }
    };
  }, [isModalOpen]);

  // Overall statistics from public verified reviews
  const stats = useMemo(() => {
    const total = reviews.length;
    const average = total > 0 ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / total).toFixed(1) : "5.0";
    const fiveStarPercent = total > 0 ? Math.round((reviews.filter((r) => (r.rating || 5) === 5).length / total) * 100) : 100;
    return { total, average, fiveStarPercent };
  }, [reviews]);



  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
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

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || "V").toUpperCase();
  };

  // Open modal handler (records trigger element for focus return, accepts prefilled rating)
  const handleOpenModal = (prefilledRating = 0) => {
    triggerSourceRef.current = document.activeElement as HTMLElement;
    setRating(prefilledRating);
    setHoverRating(0);
    setAuthor("");
    setLocation("");
    setStayDate(getCurrentYearMonth());
    setTripType("");
    setTitle("");
    setQuote("");
    setSelectedTags([]);
    setContact("");
    setHoneypot("");
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrors({});
    setTimeout(() => {
      triggerSourceRef.current?.focus();
    }, 50);
  };

  const validate = () => {
    const newErrors: { rating?: string; author?: string; quote?: string; summary?: string } = {};
    let firstInvalidEl: HTMLElement | null = null;

    if (!rating || rating === 0) {
      newErrors.rating = "Please select a star rating (1 to 5 stars)";
      if (!firstInvalidEl) firstInvalidEl = ratingCardRef.current;
    }
    if (!author.trim()) {
      newErrors.author = "Please enter your name or group name";
      if (!firstInvalidEl) firstInvalidEl = authorInputRef.current;
    }
    if (!quote.trim()) {
      newErrors.quote = "Please share a few words about your stay";
      if (!firstInvalidEl) firstInvalidEl = quoteInputRef.current;
    } else if (quote.trim().length < 15) {
      newErrors.quote = `Please write at least 15 characters (currently ${quote.trim().length})`;
      if (!firstInvalidEl) firstInvalidEl = quoteInputRef.current;
    }

    if (Object.keys(newErrors).length > 0) {
      newErrors.summary = "Please complete the required fields highlighted above.";
      setErrors(newErrors);
      if (firstInvalidEl) {
        firstInvalidEl.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof firstInvalidEl.focus === "function") {
          firstInvalidEl.focus();
        }
      }
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Spam honeypot check
    if (honeypot) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowThankYouBanner(true);
      }, 300);
      return;
    }

    // Rate limiting: 30 seconds minimum between submissions
    const lastSubmitTime = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime, 10) < 30000) {
      setErrors((prev) => ({
        ...prev,
        quote: "Please wait 30 seconds before submitting another note.",
        summary: "Please wait 30 seconds before submitting another note.",
      }));
      return;
    }

    setIsSubmitting(true);

    const formattedDate = formatYearMonthToText(stayDate) || "Recent Stay";
    const pendingReview: Testimonial = {
      id: `pending-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || "Visitor",
      stayDate: formattedDate,
      rating,
      tripType: tripType || undefined,
      title: title.trim() || undefined,
      quote: quote.trim(),
      highlights: selectedTags.length > 0 ? selectedTags : undefined,
      contact: contact.trim() || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
      avatarColor,
    };

    // Save with status: "pending" (not shown publicly until approved)
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PENDING_KEY);
      const pendingList: Testimonial[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem(
        LOCAL_STORAGE_PENDING_KEY,
        JSON.stringify([pendingReview, ...pendingList])
      );
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
    } catch {
      // Storage fallback
    }

    // If AUTO_PUBLISH is enabled, immediately publish to the live slider as the first card
    if (AUTO_PUBLISH) {
      const approvedReview: Testimonial = {
        ...pendingReview,
        status: "approved",
      };
      setReviews((prev) => [approvedReview, ...prev]);
    }

    // Optional backend dispatch if Web3Forms key is configured
    if (WEB3FORMS_ACCESS_KEY) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Nalaka Rest Review (Pending Approval) - ${rating} Stars from ${pendingReview.author}`,
            rating: `${rating} / 5 Stars`,
            guest_name: pendingReview.author,
            location: pendingReview.location,
            stay_date: pendingReview.stayDate,
            trip_type: tripType || "Not specified",
            title: title.trim() || "None",
            review: pendingReview.quote,
            tags: selectedTags.join(", ") || "None",
            contact: contact.trim() || "None",
            status: "pending",
          }),
        });
      } catch {
        // Continue even if network error
      }
    }

    // Optional WhatsApp direct notification link
    let whatsappUrl: string | undefined;
    if (sendToWhatsApp) {
      const starsText = "★".repeat(rating) + "☆".repeat(5 - rating);
      const tagsText = selectedTags.length > 0 ? `\nTags: ${selectedTags.join(", ")}` : "";
      const headlineText = title.trim() ? `\nTitle: "${title.trim()}"` : "";
      const contactText = contact.trim() ? `\nContact: ${contact.trim()}` : "";
      const tripText = tripType ? `\nTrip: ${tripType}` : "";

      const message = `*New Guest Note for Nalaka Rest (Pending Approval):*\n\n` +
        `Rating: ${starsText} (${rating}/5)\n` +
        `Guest: ${pendingReview.author}\n` +
        `Home: ${pendingReview.location}` +
        tripText +
        `\nStayed: ${pendingReview.stayDate}` +
        headlineText + `\n\n` +
        `"${pendingReview.quote}"` +
        tagsText +
        contactText;

      whatsappUrl = `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(message)}`;
    }

    // Save submitted review summary for the Thank You card
    setSubmittedReview({
      author: pendingReview.author,
      rating: pendingReview.rating,
      quote: pendingReview.quote,
      stayDate: pendingReview.stayDate,
      location: pendingReview.location,
      title: pendingReview.title,
      whatsappUrl,
    });

    // Festive confetti and show success state inside modal & on page
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowThankYouBanner(true);
      fireConfetti();
    }, 450);
  };

  const handleHelpfulVote = (id: string | number) => {
    const stringId = String(id);
    if (upvotedIds.includes(stringId)) return;

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

  return (
    <section className="py-20 md:py-24 bg-[#ECE7DC] text-[#1A221E] border-b border-[#1A221E]/10 relative" id="notes">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* On-Page Persistent Thank You Confirmation Banner */}
        {showThankYouBanner && (
          <div 
            role="status"
            aria-live="polite"
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#1E3A2B] text-[#F5F2EB] border border-[#D4AF37]/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-3 duration-300"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-['Newsreader'] text-lg sm:text-xl font-semibold text-[#F5F2EB]">
                    Thank you{submittedReview?.author ? `, ${submittedReview.author}` : ""} for sharing your review!
                  </h3>
                  <span className="text-[10px] font-bold tracking-wide uppercase bg-[#D4AF37]/25 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                    Submitted
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#F5F2EB]/80 mt-1 max-w-2xl leading-relaxed">
                  We received your {submittedReview?.rating ? `${submittedReview.rating}-star ` : ""}note! It will appear with our verified guest stories after a quick review.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowThankYouBanner(false)}
              className="self-end sm:self-center px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F2EB] text-xs font-semibold tracking-wide transition-colors shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Section Header (Old top "Write a Review" button removed) */}
        <div className="max-w-2xl mb-10">
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

        {/* Rating Overview Summary Banner (Old "Share Your Note" CTA block removed; content cleanly fills space) */}
        <div className="mb-10 bg-[#F5F2EB] rounded-2xl border border-[#1A221E]/10 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            
            {/* 5.0 Rating Score Block */}
            <div className="flex flex-col items-center justify-center bg-[#1E3A2B] text-[#F5F2EB] w-20 h-20 sm:w-22 sm:h-22 rounded-2xl shrink-0 shadow-sm">
              <span className="font-['Newsreader'] text-3xl sm:text-4xl font-bold tracking-tight">
                {stats.average}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#D4AF37] font-semibold">
                Out of 5.0
              </span>
            </div>

            {/* Stars, counts and verified amenities */}
            <div className="flex-1 min-w-0">
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
        </div>

        {/* Reviews Presentation:
            - If 0 cards: empty state
            - If <= 3 cards: static and centered
            - If > 3 cards: single-row continuously auto-sliding marquee carousel */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-[#F5F2EB] rounded-2xl border border-[#1A221E]/10 p-8 my-4">
            <MessageSquareQuote size={36} className="mx-auto text-[#515B54]/40 mb-3" />
            <h4 className="font-['Newsreader'] text-xl font-medium text-[#1A221E]">
              No guest notes yet
            </h4>
            <p className="text-xs text-[#515B54] mt-1">
              Be the first to leave a verified note about your stay at Nalaka Rest.
            </p>
          </div>
        ) : reviews.length <= 3 ? (
          <div className="flex flex-wrap items-stretch justify-center gap-5 py-3">
            {reviews.map((item) => (
              <ReviewCardItem
                key={item.id}
                item={item}
                hasUpvoted={upvotedIds.includes(String(item.id))}
                onUpvote={handleHelpfulVote}
                getInitials={getInitials}
              />
            ))}
          </div>
        ) : (
          <AutoSlidingReviewsCarousel
            items={reviews}
            upvotedIds={upvotedIds}
            onUpvote={handleHelpfulVote}
            getInitials={getInitials}
          />
        )}

        {/* ================================================================= */}
        {/* Full-width "Write a Review" Teaser Section (Centered & Fitted) */}
        {/* ================================================================= */}
        <div className="mt-12 bg-[#F5F2EB] rounded-2xl border border-[#1A221E]/10 p-8 sm:p-10 shadow-xs text-center flex flex-col items-center">
          
          {/* Centered Pen Icon Badge */}
          <div className="w-12 h-12 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center mb-4 shadow-xs">
            <PenLine size={22} />
          </div>

          {/* Centered Heading & Subtitle */}
          <div className="max-w-xl mx-auto mb-4">
            <h3 className="font-['Newsreader'] text-2xl sm:text-3xl font-medium text-[#1A221E] leading-snug">
              Add Your Own Experience
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#515B54] mt-1.5 leading-relaxed">
              Did you stay at Nalaka Rest? Leave your advice and rating for the next travelers.
            </p>
          </div>

          {/* Centered 5 Interactive Outline/Filled Stars */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
            <div 
              className="flex items-center gap-1.5"
              onMouseLeave={() => setTeaserHoverRating(0)}
              aria-label="Star rating trigger"
            >
              {[1, 2, 3, 4, 5].map((starVal) => {
                const isHovered = teaserHoverRating >= starVal;
                return (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => handleOpenModal(starVal)}
                    onMouseEnter={() => setTeaserHoverRating(starVal)}
                    className="p-1 text-[#8A5229] hover:scale-125 active:scale-95 transition-transform focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1E3A2B] rounded cursor-pointer"
                    aria-label={`Rate ${starVal} star${starVal > 1 ? "s" : ""} and review`}
                  >
                    <Star
                      size={24}
                      className={`transition-colors ${
                        isHovered ? "fill-[#8A5229] text-[#8A5229]" : "text-[#1A221E]/25 hover:text-[#8A5229]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-[#515B54] font-medium select-none sm:ml-1">
              {teaserHoverRating > 0 ? getRatingLabel(teaserHoverRating) : "(tap to rate)"}
            </span>
          </div>

          {/* Centered "Write a Review" Button */}
          <div>
            <button
              type="button"
              onClick={() => handleOpenModal(0)}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-full bg-[#1E3A2B] text-[#F5F2EB] text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#15291E] hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all shadow-sm group cursor-pointer"
            >
              <PenLine size={16} className="text-[#D4AF37] group-hover:rotate-6 transition-transform" />
              <span>Write a Review &rarr;</span>
            </button>
          </div>

        </div>

      </div>

      {/* ================================================================= */}
      {/* Review Modal Dialog (Accessible Popup with Fixed Defaults)       */}
      {/* ================================================================= */}
      {isModalOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          onClick={(e) => {
            // Close on backdrop click
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          {/* Modal Container */}
          <div 
            ref={modalRef}
            data-lenis-prevent="true"
            className="relative w-full max-w-[720px] bg-[#F5F2EB] rounded-2xl border border-[#1A221E]/15 shadow-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden text-[#1A221E] animate-in zoom-in-95 duration-200"
          >
            {/* Header: Fixed top */}
            <div className="shrink-0 flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-[#1A221E]/10 bg-[#F5F2EB]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A5229]">
                  {isSubmitted ? "Submission Received" : "Guest Book Entry"}
                </span>
                <h3 id="write-review-title" className="font-['Newsreader'] text-2xl sm:text-3xl font-medium text-[#1A221E] mt-0.5">
                  {isSubmitted ? "Thank You for Your Feedback!" : "Share Your Stay Experience"}
                </h3>
                <p className="text-xs text-[#515B54] mt-1">
                  {isSubmitted 
                    ? "Your note has been received and will appear after quick approval."
                    : "Tell future travelers about your time in the Nuwara Eliya hills."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-[#ECE7DC] hover:bg-[#1A221E]/10 flex items-center justify-center text-[#515B54] hover:text-[#1A221E] transition-colors shrink-0 cursor-pointer"
                aria-label="Close review dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Success State inside the Modal */}
            {isSubmitted ? (
              <div 
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className="py-4 px-1 sm:px-4 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="relative inline-flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1E3A2B] text-[#D4AF37] flex items-center justify-center shadow-lg ring-8 ring-[#1E3A2B]/10">
                      <CheckCircle2 size={36} className="text-[#F5F2EB]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#D4AF37] text-[#1E3A2B] flex items-center justify-center shadow-xs">
                      <Sparkles size={14} />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-['Newsreader'] text-2xl sm:text-3xl font-medium text-[#1A221E]">
                      Thank You, {submittedReview?.author || "Guest"}!
                    </h4>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#515B54] max-w-md mx-auto leading-relaxed mt-1.5">
                      We are truly grateful for taking the time to share your memories at Nalaka Rest. Your feedback helps fellow travelers and means the world to our family.
                    </p>
                  </div>

                  {/* Submitted Review Summary Preview */}
                  {submittedReview && (
                    <div className="max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-[#ECE7DC] border border-[#1A221E]/15 text-left shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-[#8A5229]">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={16}
                              className={s <= submittedReview.rating ? "fill-[#8A5229] text-[#8A5229]" : "text-[#1A221E]/20"}
                            />
                          ))}
                          <span className="ml-1 text-xs font-bold text-[#1A221E]">
                            {submittedReview.rating}.0 / 5.0
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-[#1E3A2B]/10 text-[#1E3A2B] px-2.5 py-0.5 rounded-full">
                          Pending Approval
                        </span>
                      </div>

                      {submittedReview.title && (
                        <h5 className="font-['Newsreader'] text-base font-semibold text-[#1A221E]">
                          &ldquo;{submittedReview.title}&rdquo;
                        </h5>
                      )}

                      <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#515B54] italic leading-relaxed line-clamp-3">
                        &ldquo;{submittedReview.quote}&rdquo;
                      </p>

                      <div className="pt-2 border-t border-[#1A221E]/10 flex flex-wrap items-center justify-between text-[11px] text-[#515B54]">
                        <span className="font-semibold text-[#1A221E]">{submittedReview.author}</span>
                        <span>{submittedReview.stayDate} &bull; {submittedReview.location}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    {submittedReview?.whatsappUrl && (
                      <a
                        href={submittedReview.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <MessageCircle size={15} />
                        <span>Send Copy to Host on WhatsApp</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#1E3A2B] text-[#F5F2EB] text-xs font-bold tracking-wide hover:bg-[#15291E] shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Done &amp; Close</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Review Form */
              <form onSubmit={handleSubmit} noValidate className="flex flex-col flex-1 min-h-0 overflow-hidden">
                
                {/* Scrollable Form Body */}
                <div 
                  data-lenis-prevent="true"
                  className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                
                {/* 1. Star Rating: Starts empty (0), label shown only when selected/hovered */}
                <div 
                  ref={ratingCardRef}
                  tabIndex={-1}
                  className={`mb-5 p-4 rounded-xl transition-all ${
                    errors.rating 
                      ? "bg-red-50/70 border-2 border-red-500 ring-2 ring-red-200/50 shadow-xs" 
                      : "bg-[#ECE7DC]/80 border border-[#1A221E]/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider">
                      Overall Rating <span className="text-red-700">*</span>
                    </span>
                    {(hoverRating || rating) > 0 && (
                      <span className="text-xs text-[#8A5229] font-bold">
                        {getRatingLabel(hoverRating || rating)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex items-center gap-1.5"
                      onMouseLeave={() => setHoverRating(0)}
                      role="radiogroup"
                      aria-label="Star Rating"
                    >
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isActive = (hoverRating || rating) >= starVal;
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => {
                              setRating(starVal);
                              if (errors.rating) {
                                setErrors((prev) => {
                                  const copy = { ...prev };
                                  delete copy.rating;
                                  if (!copy.author && !copy.quote) delete copy.summary;
                                  return copy;
                                });
                              }
                            }}
                            onMouseEnter={() => setHoverRating(starVal)}
                            className="p-1.5 text-[#8A5229] hover:scale-115 active:scale-95 transition-transform focus:outline-none cursor-pointer"
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
                    {rating === 0 && hoverRating === 0 && (
                      <span className="text-xs text-[#515B54]/70 italic select-none">
                        (tap to select rating)
                      </span>
                    )}
                  </div>
                  {errors.rating && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2.5 font-medium animate-in fade-in duration-150">
                      <AlertCircle size={14} className="shrink-0 text-red-600" />
                      <span>{errors.rating}</span>
                    </div>
                  )}
                </div>

                {/* 2. Guest Details: Name, Home City & Country, Stay Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  
                  {/* Name (Required) */}
                  <div>
                    <label 
                      htmlFor={authorInputId}
                      className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5"
                    >
                      Your Name / Group <span className="text-red-700">*</span>
                    </label>
                    <input
                      ref={authorInputRef}
                      id={authorInputId}
                      type="text"
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                        if (errors.author && e.target.value.trim()) {
                          setErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.author;
                            if (!copy.rating && !copy.quote) delete copy.summary;
                            return copy;
                          });
                        }
                      }}
                      placeholder="e.g. Kasun & Anuki M."
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#ECE7DC] border transition-all text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none ${
                        errors.author 
                          ? "border-2 border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-400" 
                          : "border-[#1A221E]/15 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B]"
                      }`}
                    />
                    {errors.author && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5 font-medium animate-in fade-in duration-150">
                        <AlertCircle size={14} className="shrink-0 text-red-600" />
                        <span>{errors.author}</span>
                      </div>
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

                  {/* Month & Year of Stay (Defaults to current month, future months blocked via max attribute) */}
                  <div>
                    <label 
                      htmlFor={stayDateInputId}
                      className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5"
                    >
                      Month &amp; Year of Stay
                    </label>
                    <input
                      id={stayDateInputId}
                      type="month"
                      max={getCurrentYearMonth()}
                      value={stayDate}
                      onChange={(e) => setStayDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#ECE7DC] border border-[#1A221E]/15 focus:border-[#1E3A2B] text-[#1A221E] focus:outline-none focus:ring-1 focus:ring-[#1E3A2B] transition-colors"
                    />
                  </div>

                </div>

                {/* 3. Trip Type Selector (Starts with NOTHING selected) */}
                <div className="mb-5">
                  <span className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1.5">
                    Trip Type <span className="text-[#515B54] font-normal normal-case">(optional)</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TRIP_TYPES.map((type) => {
                      const isSelected = tripType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setTripType(isSelected ? "" : type)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
                              : "bg-[#ECE7DC] text-[#515B54] hover:text-[#1A221E] border border-[#1A221E]/10"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Review Title (Optional) */}
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

                {/* 5. Review Quote Textarea (Required, min 15 chars, counter stays) */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor={quoteInputId}
                      className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider"
                    >
                      Your Review &amp; Memories <span className="text-red-700">*</span>
                    </label>
                    <span className={`text-[11px] ${quote.trim().length < 15 ? "text-red-700 font-medium" : "text-[#1E3A2B] font-medium"}`}>
                      {quote.trim().length} characters (min 15)
                    </span>
                  </div>
                  <textarea
                    ref={quoteInputRef}
                    id={quoteInputId}
                    rows={4}
                    value={quote}
                    onChange={(e) => {
                      setQuote(e.target.value);
                      if (errors.quote && e.target.value.trim().length >= 15) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.quote;
                          if (!copy.rating && !copy.author) delete copy.summary;
                          return copy;
                        });
                      }
                    }}
                    placeholder="How was your stay? How did you like the morning mountain air, the beds, the kitchen, hot water, privacy, or the host's hospitality?"
                    className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#ECE7DC] border transition-all text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none ${
                      errors.quote 
                        ? "border-2 border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-400" 
                        : "border-[#1A221E]/15 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B]"
                    }`}
                  />
                  {errors.quote && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5 font-medium animate-in fade-in duration-150">
                      <AlertCircle size={14} className="shrink-0 text-red-600" />
                      <span>{errors.quote}</span>
                    </div>
                  )}
                </div>

                {/* 6. Optional Tag Chips */}
                <div className="mb-5">
                  <span className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-2">
                    Highlights &amp; Experiences <span className="text-[#515B54] font-normal normal-case">(optional, tap to select)</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TAGS.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1E3A2B] text-[#F5F2EB] shadow-xs"
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

                {/* 7. Optional Email or Phone Field */}
                <div className="mb-5">
                  <label 
                    htmlFor={contactInputId}
                    className="block text-xs font-bold text-[#1A221E] uppercase tracking-wider mb-1"
                  >
                    Email or Phone Number <span className="text-[#515B54] font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    id={contactInputId}
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. your.email@example.com or +94 7X XXX XXXX"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#ECE7DC] border border-[#1A221E]/15 focus:border-[#1E3A2B] text-[#1A221E] placeholder-[#515B54]/60 focus:outline-none focus:ring-1 focus:ring-[#1E3A2B] transition-colors"
                  />
                  <p className="text-[11px] text-[#515B54] mt-1">
                    Private, used only to verify your stay. Not shown publicly.
                  </p>
                </div>

                {/* 8. Avatar Color Selection */}
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
                        className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                          avatarColor === item.color ? "ring-2 ring-offset-2 ring-[#1E3A2B] scale-110" : "opacity-80 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 9. WhatsApp direct notification checkbox */}
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

                {/* Hidden Honeypot Field for Spam Bots */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="hp_website">Do not fill this field</label>
                  <input
                    id="hp_website"
                    type="text"
                    name="hp_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                </div>

                {/* 10. Fixed Docked Footer Buttons: Always visible without scrolling */}
                <div className="shrink-0 p-4 sm:p-6 pt-3 border-t border-[#1A221E]/10 bg-[#F5F2EB] shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.06)]">
                  {errors.summary && (
                    <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-bold text-red-900">Please complete the required fields to submit:</p>
                        <ul className="list-disc list-inside mt-1 space-y-0.5 text-red-700">
                          {errors.rating && <li>{errors.rating}</li>}
                          {errors.author && <li>{errors.author}</li>}
                          {errors.quote && <li>{errors.quote}</li>}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#515B54] hover:text-[#1A221E] hover:bg-[#1A221E]/5 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="submit-review-btn"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#1E3A2B] text-[#F5F2EB] text-xs font-bold tracking-wide hover:bg-[#15291E] hover:shadow-md active:scale-95 transition-all shadow-sm disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Note...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Note</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}