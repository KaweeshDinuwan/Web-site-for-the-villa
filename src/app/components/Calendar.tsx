import { useState, useRef, useId, useEffect, useCallback } from "react";
import { MessageCircle, Mail, AlertCircle, CheckCircle2, Clock, X, Calendar as CalendarIcon, Info } from "lucide-react";

// Top Configuration Variables
const MIN_STAY_NIGHTS = 1;
const MAX_STAY_NIGHTS = 30;
const HOST_PHONE = "+94 77 509 9361";
const WHATSAPP_NUM = "94775099361";
const MAX_GUESTS = 6;

interface SubmittedDetails {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  checkInFormatted: string;
  checkOutFormatted: string;
}

// Helper: Format Date object to "12 Nov 2026"
const formatDisplayDate = (d: Date | string): string => {
  if (!d) return "";
  const dateObj = typeof d === "string" ? new Date(d) : d;
  if (isNaN(dateObj.getTime())) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};

// Helper: format YYYY-MM-DD
const formatYMD = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper: Subtract one day (for check-out day hand-off)
const subtractOneDay = (dateStr: string): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return formatYMD(d);
};

export function BookingCalendar() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");

  // Touch tracking for accessible blur-based error display
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [rangeError, setRangeError] = useState("");

  // Confirmation pop-up modal state
  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedDetails | null>(null);

  // Field element refs for auto-focus on error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const guestsSelectRef = useRef<HTMLSelectElement>(null);
  const fpInstanceRef = useRef<any>(null);

  const nameId = useId();
  const phoneId = useId();
  const datesId = useId();
  const guestsId = useId();
  const notesId = useId();

  // Calculate nights
  const nights = checkIn && checkOut && checkOut > checkIn
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;


  // Helper: check if a selected range crosses any booked nights
  const checkRangeCrossesBooked = useCallback((start: Date, end: Date): boolean => {
    const bookedRanges = (window as unknown as { BOOKED_RANGES?: [string, string][] }).BOOKED_RANGES || [];
    for (const [bStartStr, bEndStr] of bookedRanges) {
      const bStart = new Date(bStartStr);
      bStart.setHours(0, 0, 0, 0);
      const bEnd = new Date(bEndStr);
      bEnd.setHours(0, 0, 0, 0);

      // Booked nights exist between bStart and bEnd (checkout day is free for check-in)
      if (bStart < end && start < bEnd) {
        // Allow contiguous check-in on bEnd or check-out on bStart
        if (start.getTime() === bEnd.getTime() || end.getTime() === bStart.getTime()) {
          continue;
        }
        return true;
      }
    }
    return false;
  }, []);

  // Validation Logic B3: Phone / WhatsApp check
  const validatePhone = (raw: string): { valid: boolean; error: string } => {
    const trimmed = raw.trim();
    if (!trimmed) {
      return { valid: false, error: "Please enter your phone number." };
    }

    // Reject letters or invalid symbols
    if (/[a-zA-Z]/.test(raw)) {
      return { valid: false, error: "This number does not look right. Please check it and include the country code." };
    }

    const clean = raw.replace(/[\s\-\(\)\.]/g, "");
    const digitsOnly = clean.replace(/\+/g, "");

    // Reject all the same digit (e.g. 0000000000, 1111111111)
    if (/^(\d)\1+$/.test(digitsOnly)) {
      return { valid: false, error: "This number does not look right. Please check it and include the country code." };
    }

    // Reject simple runs (e.g. 123456789, 987654321, 012345678)
    const runs = ["123456789", "987654321", "012345678", "876543210"];
    if (runs.some((run) => digitsOnly.includes(run))) {
      return { valid: false, error: "This number does not look right. Please check it and include the country code." };
    }

    // Reject repeating pairs across the whole digits (e.g. 1212121212)
    if (/^(\d{2})\1{3,}$/.test(digitsOnly)) {
      return { valid: false, error: "This number does not look right. Please check it and include the country code." };
    }

    // 1. Sri Lankan mobile: +947X, 947X, or 07X (valid codes 70,71,72,74,75,76,77,78 + 7 digits = 9 digits after 0/94)
    const slMatch = clean.match(/^(?:\+94|94|0)(7[01245678]\d{7})$/);
    if (slMatch) {
      const slSubscriber = slMatch[1];
      // Check subscriber part for fraud patterns (all same or repeating pairs)
      if (/^(\d)\1+$/.test(slSubscriber) || /^(\d{2})\1{3,}$/.test(slSubscriber)) {
        return { valid: false, error: "This number does not look right. Please check it and include the country code." };
      }
      return { valid: true, error: "" };
    }

    // 2. Other countries: starts with +, then 8 to 15 digits
    const intlMatch = clean.match(/^\+([1-9]\d{7,14})$/);
    if (intlMatch) {
      const intlDigits = intlMatch[1];
      if (/^(\d)\1+$/.test(intlDigits)) {
        return { valid: false, error: "This number does not look right. Please check it and include the country code." };
      }
      return { valid: true, error: "" };
    }

    return { valid: false, error: "This number does not look right. Please check it and include the country code." };
  };

  // Validation Logic B4: Name (at least 2 letters, no digits, max 60 characters)
  const validateName = (val: string): { valid: boolean; error: string } => {
    const trimmed = val.trim();
    if (!trimmed) {
      return { valid: false, error: "Please enter your name." };
    }
    const letterMatches = trimmed.match(/[a-zA-Z]/g);
    if (!letterMatches || letterMatches.length < 2) {
      return { valid: false, error: "Name must contain at least 2 letters." };
    }
    if (trimmed.length > 60) {
      return { valid: false, error: "Name must be 60 characters or less." };
    }
    if (/\d/.test(trimmed)) {
      return { valid: false, error: "Name cannot contain numbers." };
    }
    return { valid: true, error: "" };
  };

  // Date validation check (re-verified on submission)
  const validateDates = useCallback((s: Date | null, e: Date | null): { valid: boolean; error: string } => {
    if (!s || !e) {
      return { valid: false, error: "Please choose your check-in and check-out dates." };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDay = new Date(s);
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(e);
    endDay.setHours(0, 0, 0, 0);

    if (startDay < today) {
      return { valid: false, error: "Check-in date cannot be in the past." };
    }
    if (endDay <= startDay) {
      return { valid: false, error: "Check-out must be after check-in." };
    }

    const n = Math.round((endDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24));
    if (n < MIN_STAY_NIGHTS) {
      return { valid: false, error: `Minimum stay is ${MIN_STAY_NIGHTS} night.` };
    }
    if (n > MAX_STAY_NIGHTS) {
      return { valid: false, error: `Maximum stay is ${MAX_STAY_NIGHTS} nights.` };
    }
    if (checkRangeCrossesBooked(startDay, endDay)) {
      return { valid: false, error: "Those dates include a booked night. Please choose other dates." };
    }
    return { valid: true, error: "" };
  }, [checkRangeCrossesBooked]);

  // Initialize Flatpickr in range mode with fallback polling if CDN script takes a moment
  useEffect(() => {
    let timer: number | null = null;
    let initialized = false;

    const initFlatpickr = () => {
      if (!dateInputRef.current) return false;
      const fpConstructor = (window as unknown as { flatpickr?: any }).flatpickr;
      if (!fpConstructor) return false;

      const bookedRanges = (window as unknown as { BOOKED_RANGES?: [string, string][] }).BOOKED_RANGES || [];
      
      // Disable booked nights (bStart to dayBefore(bEnd) because bEnd is free for new guest check-in)
      const disabledConfig = bookedRanges.map(([bStart, bEnd]) => ({
        from: bStart,
        to: subtractOneDay(bEnd),
      }));

      const fp = fpConstructor(dateInputRef.current, {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j M Y",
        showMonths: typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1,
        disable: disabledConfig,
        onChange: (selectedDates: Date[]) => {
          if (selectedDates.length === 1) {
            setRangeError("");
            setCheckIn(selectedDates[0]);
            setCheckOut(null);
          } else if (selectedDates.length === 2) {
            const [start, end] = selectedDates;

            // Check if range crosses any booked dates
            if (checkRangeCrossesBooked(start, end)) {
              fp.clear();
              setCheckIn(null);
              setCheckOut(null);
              setRangeError("Those dates include a booked night. Please choose other dates.");
              return;
            }

            const nightCount = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            if (nightCount < MIN_STAY_NIGHTS) {
              fp.clear();
              setCheckIn(null);
              setCheckOut(null);
              setRangeError(`Minimum stay is ${MIN_STAY_NIGHTS} night.`);
              return;
            }

            if (nightCount > MAX_STAY_NIGHTS) {
              fp.clear();
              setCheckIn(null);
              setCheckOut(null);
              setRangeError(`Maximum stay is ${MAX_STAY_NIGHTS} nights.`);
              return;
            }

            setRangeError("");
            setCheckIn(start);
            setCheckOut(end);
            setTouched((prev) => ({ ...prev, dates: true }));
          }
        },
      });

      fpInstanceRef.current = fp;
      initialized = true;
      return true;
    };

    if (!initFlatpickr()) {
      let attempts = 0;
      timer = window.setInterval(() => {
        attempts++;
        if (initFlatpickr() || attempts > 20) {
          if (timer) clearInterval(timer);
        }
      }, 50);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (fpInstanceRef.current && initialized) {
        fpInstanceRef.current.destroy();
      }
    };
  }, [checkRangeCrossesBooked]);

  // Overall form validation check
  const nameValidation = validateName(name);
  const phoneValidation = validatePhone(phone);
  const dateValidation = validateDates(checkIn, checkOut);
  const datesValid = dateValidation.valid && !rangeError;
  const guestsValid = guests >= 1 && guests <= MAX_GUESTS;
  const isFormValid = nameValidation.valid && phoneValidation.valid && datesValid && guestsValid;

  // Build inquiry message (B5: must say "inquiry", never "booking confirmed")
  const buildInquiryMessage = () => {
    return `Hello Nalaka Rest, I would like to make an inquiry about staying at the villa:

• Guest Name: ${name.trim()}
• Phone / WhatsApp: ${phone.trim()}
• Inquired Dates: ${formatDisplayDate(checkIn!)} to ${formatDisplayDate(checkOut!)} (${nights} night${nights !== 1 ? "s" : ""})
• Guests: ${guests} ${guests === 1 ? "guest" : "guests"} (Whole private house)
${notes.trim() ? `• Notes: ${notes.trim()}\n` : ""}
Please let me know if these dates are available and what the rate would be. Thank you!`;
  };

  // Submission handler for WhatsApp
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!isFormValid) {
      // Focus first wrong field
      if (!nameValidation.valid) {
        nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        nameInputRef.current?.focus();
      } else if (!phoneValidation.valid) {
        phoneInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        phoneInputRef.current?.focus();
      } else if (!datesValid) {
        dateInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        fpInstanceRef.current?.open();
      } else if (!guestsValid) {
        guestsSelectRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        guestsSelectRef.current?.focus();
      }
      return;
    }

    setSubmittedData({
      name: name.trim(),
      phone: phone.trim(),
      checkIn: formatYMD(checkIn!),
      checkOut: formatYMD(checkOut!),
      checkInFormatted: formatDisplayDate(checkIn!),
      checkOutFormatted: formatDisplayDate(checkOut!),
      nights,
      guests,
    });
    setShowPopup(true);

    const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(buildInquiryMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Submission handler for Email
  const handleEmailClick = () => {
    setAttemptedSubmit(true);

    if (!isFormValid) {
      if (!nameValidation.valid) {
        nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        nameInputRef.current?.focus();
      } else if (!phoneValidation.valid) {
        phoneInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        phoneInputRef.current?.focus();
      } else if (!datesValid) {
        dateInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        fpInstanceRef.current?.open();
      }
      return;
    }

    setSubmittedData({
      name: name.trim(),
      phone: phone.trim(),
      checkIn: formatYMD(checkIn!),
      checkOut: formatYMD(checkOut!),
      checkInFormatted: formatDisplayDate(checkIn!),
      checkOutFormatted: formatDisplayDate(checkOut!),
      nights,
      guests,
    });
    setShowPopup(true);

    const subject = encodeURIComponent(`Villa Inquiry from ${name.trim() || "Guest"}`);
    const body = encodeURIComponent(buildInquiryMessage());
    window.location.href = `mailto:reservations@villa.com?subject=${subject}&body=${body}`;
  };

  // Close popup with Escape key and body scroll lock
  useEffect(() => {
    if (!showPopup) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPopup(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPopup]);

  return (
    <section className="py-18 md:py-24 bg-white text-[#132E20] border-b border-[#1A432E]/10" id="inquire">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="reveal max-w-xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#1A432E] font-bold block mb-2">
            Reservations &amp; Dates
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Check availability with the host.
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#4B6354] mt-2 leading-relaxed">
            We don’t use instant online booking engines. Send your dates directly to us, and we will confirm availability and talk about check-in directly with you.
          </p>
        </div>

        {/* Clean Inquiry Form Card */}
        <div className="reveal bg-[#F4F8F5] p-6 sm:p-10 rounded-2xl border border-[#1A432E]/12 shadow-xs">
          <form onSubmit={handleWhatsAppSubmit} noValidate className="space-y-6">
            
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor={nameId} className="block text-xs uppercase tracking-wider text-[#4B6354] font-semibold mb-1.5">
                  Your Full Name <span className="text-[#1A432E]">*</span>
                </label>
                <input
                  id={nameId}
                  ref={nameInputRef}
                  type="text"
                  required
                  maxLength={60}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                  placeholder="e.g. Ashen Silva"
                  className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-[#132E20] placeholder:text-[#4B6354]/40 focus:outline-none transition-colors ${
                    (touched.name || attemptedSubmit) && !nameValidation.valid
                      ? "border-rose-600 focus:border-rose-600"
                      : "border-[#1A432E]/15 focus:border-[#1A432E]"
                  }`}
                />
                {(touched.name || attemptedSubmit) && !nameValidation.valid && (
                  <p aria-live="polite" className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle size={13} className="shrink-0" />
                    <span>{nameValidation.error}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={phoneId} className="block text-xs uppercase tracking-wider text-[#4B6354] font-semibold mb-1.5">
                  Phone / WhatsApp <span className="text-[#1A432E]">*</span>
                </label>
                <input
                  id={phoneId}
                  ref={phoneInputRef}
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                  placeholder="e.g. +94 77 123 4567"
                  className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-[#132E20] placeholder:text-[#4B6354]/40 focus:outline-none transition-colors ${
                    (touched.phone || attemptedSubmit) && !phoneValidation.valid
                      ? "border-rose-600 focus:border-rose-600"
                      : "border-[#1A432E]/15 focus:border-[#1A432E]"
                  }`}
                />
                {(touched.phone || attemptedSubmit) && !phoneValidation.valid && (
                  <p aria-live="polite" className="text-xs text-rose-600 mt-1.5 flex items-start gap-1.5 font-medium leading-tight">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{phoneValidation.error}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Date Picker (Flatpickr Range Mode) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor={datesId} className="block text-xs uppercase tracking-wider text-[#4B6354] font-semibold">
                  Dates of Stay <span className="text-[#1A432E]">*</span>
                </label>
                {nights > 0 && (
                  <span className="text-xs font-semibold text-[#1A432E]">
                    {nights} Night{nights !== 1 ? "s" : ""} ({formatDisplayDate(checkIn!)} &rarr; {formatDisplayDate(checkOut!)})
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  id={datesId}
                  ref={dateInputRef}
                  type="text"
                  placeholder="Click to pick check-in & check-out dates"
                  readOnly
                  className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-[#132E20] cursor-pointer focus:outline-none transition-colors ${
                    (attemptedSubmit && !datesValid) || rangeError
                      ? "border-rose-600"
                      : "border-[#1A432E]/15 focus:border-[#1A432E]"
                  }`}
                />
                <CalendarIcon size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4B6354] pointer-events-none" />
              </div>

              {/* Range error or missing dates warning */}
              {rangeError ? (
                <p aria-live="polite" className="text-xs text-rose-600 mt-1.5 flex items-center gap-1.5 font-medium">
                  <AlertCircle size={13} className="shrink-0" />
                  <span>{rangeError}</span>
                </p>
              ) : attemptedSubmit && !datesValid ? (
                <p aria-live="polite" className="text-xs text-rose-600 mt-1.5 flex items-center gap-1.5 font-medium">
                  <AlertCircle size={13} className="shrink-0" />
                  <span>{dateValidation.error || "Please choose your check-in and check-out dates."}</span>
                </p>
              ) : (
                <p className="text-[11px] text-[#4B6354] mt-1.5 flex items-center gap-1">
                  <Info size={12} className="shrink-0 text-[#1A432E]" />
                  <span>Confirmed booked nights are greyed out. Minimum stay is {MIN_STAY_NIGHTS} night.</span>
                </p>
              )}
            </div>

            {/* Row 3: Guests and Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor={guestsId} className="block text-xs uppercase tracking-wider text-[#4B6354] font-semibold mb-1.5">
                  Number of Guests <span className="text-[#1A432E]">*</span>
                </label>
                <select
                  id={guestsId}
                  ref={guestsSelectRef}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-white border border-[#1A432E]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#132E20] focus:outline-none focus:border-[#1A432E]"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"} {num === MAX_GUESTS ? "(Full house)" : ""}
                    </option>
                  ))}
                </select>
                <span className="block text-[11px] text-[#4B6354] mt-1">
                  Private whole-home rental for up to 6 people.
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor={notesId} className="block text-xs uppercase tracking-wider text-[#4B6354] font-semibold">
                    Notes or Questions <span className="text-[#4B6354]/60 font-normal">(Optional)</span>
                  </label>
                  <span className="text-[10px] text-[#4B6354]/60">{notes.length}/500</span>
                </div>
                <input
                  id={notesId}
                  type="text"
                  maxLength={500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Arrival time, extra blankets, cooking plans..."
                  className="w-full bg-white border border-[#1A432E]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#132E20] placeholder:text-[#4B6354]/40 focus:outline-none focus:border-[#1A432E]"
                />
              </div>
            </div>

            {/* Action Bar (WhatsApp and Email buttons) */}
            <div className="pt-3 border-t border-[#1A432E]/10 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className={`flex-1 inline-flex items-center justify-center gap-2.5 bg-[#1A432E] text-white py-3.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer shadow-xs ${
                    !isFormValid ? "opacity-65 hover:opacity-85" : "hover:bg-[#122F20]"
                  }`}
                >
                  <MessageCircle size={17} />
                  <span>Send Inquiry on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailClick}
                  className={`inline-flex items-center justify-center gap-2 border border-[#1A432E]/20 text-[#132E20] px-5 py-3.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    !isFormValid ? "opacity-65 hover:opacity-85 hover:bg-white" : "hover:bg-white"
                  }`}
                >
                  <Mail size={15} />
                  <span>Send via Email</span>
                </button>
              </div>

              <p className="text-xs text-[#4B6354] text-center sm:text-left leading-relaxed">
                Clicking opens WhatsApp with your inquiry pre-filled to <strong className="text-[#132E20]">{HOST_PHONE}</strong>. No automated payment is taken. We will confirm availability and talk about check-in directly with you.
              </p>
            </div>

          </form>
        </div>

      </div>

      {/* Confirmation Pop-up Modal */}
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-popup-title"
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 z-50 bg-[#0D1F16]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-[#132E20] w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#1A432E]/12 relative"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F4F8F5] hover:bg-[#EBF3ED] text-[#4B6354] hover:text-[#132E20] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close message"
            >
              <X size={18} />
            </button>

            {/* Success Icon */}
            <div className="w-14 h-14 rounded-full bg-[#1A432E]/10 text-[#1A432E] flex items-center justify-center mx-auto mb-3.5">
              <CheckCircle2 size={32} />
            </div>

            {/* Modal Heading */}
            <h3
              id="inquiry-popup-title"
              className="font-['Newsreader'] text-2xl sm:text-3xl font-medium text-center text-[#132E20]"
            >
              Inquiry Sent!
            </h3>
            
            <p className="text-center text-xs text-[#4B6354] mt-1 leading-relaxed">
              Thank you, <strong className="text-[#132E20]">{submittedData?.name}</strong>. Your reservation inquiry has been sent.
            </p>

            {/* 24-Hour Contact Notice Highlight Box */}
            <div className="my-5 p-4 rounded-xl bg-[#F4F8F5] border border-[#1A432E]/10 text-center">
              <div className="inline-flex items-center gap-1.5 text-[#1A432E] font-bold text-[11px] uppercase tracking-wider mb-1">
                <Clock size={13} />
                <span>Response Time</span>
              </div>
              <p className="font-['Newsreader'] text-xl font-semibold text-[#1A432E]">
                We will contact you within 24 hours
              </p>
              <p className="text-xs text-[#4B6354] mt-1.5 leading-relaxed">
                We will confirm availability and talk about check-in directly with you on WhatsApp or phone.
              </p>
            </div>

            {/* Summary Details */}
            {submittedData && (
              <div className="text-xs space-y-1.5 bg-[#F4F8F5] p-3.5 rounded-xl border border-[#1A432E]/10 mb-5 text-[#4B6354]">
                <div className="flex justify-between items-center">
                  <span>Dates:</span>
                  <span className="font-semibold text-[#132E20]">
                    {submittedData.checkInFormatted} &rarr; {submittedData.checkOutFormatted} ({submittedData.nights} night{submittedData.nights !== 1 ? "s" : ""})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Guests:</span>
                  <span className="font-semibold text-[#132E20]">
                    {submittedData.guests} guest{submittedData.guests !== 1 ? "s" : ""} (Entire Villa)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Your Phone:</span>
                  <span className="font-semibold text-[#132E20]">{submittedData.phone}</span>
                </div>
              </div>
            )}

            {/* OK Got It Action Button */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#1A432E] text-white hover:bg-[#122F20] py-3.5 rounded-xl font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              OK, Got It
            </button>

            <p className="text-[11px] text-center text-[#4B6354]/80 mt-3">
              Need immediate assistance? Call us directly on <strong className="text-[#132E20]">{HOST_PHONE}</strong>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}