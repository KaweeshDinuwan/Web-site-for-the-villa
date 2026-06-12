import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  const BASE_PRICE = 25.34;

  const checkIn = range?.from;
  const checkOut = range?.to;

  const nights =
    checkIn && checkOut
      ? Math.max(differenceInDays(checkOut, checkIn), 0)
      : 0;

  const totalPrice = BASE_PRICE * guests * nights;

  return (
    <section className="py-24 bg-[#121212] text-[#F9F6F0]" id="book">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 bg-[#0a0a0a] rounded-3xl p-8 lg:p-12 border border-white/5 shadow-2xl">

          {/* Calendar Side */}
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-['Playfair_Display'] mb-2">
              Select your stay
            </h3>

            <p className="font-['Montserrat'] text-white/50 mb-8">
              Choose your check-in and check-out dates
            </p>

            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 flex justify-center custom-calendar-wrapper">
              <style>{`
                .custom-calendar-wrapper .rdp {
                  --rdp-cell-size: 45px;
                  --rdp-accent-color: #D4AF37;
                  --rdp-background-color: #333;
                  --rdp-accent-color-dark: #D4AF37;
                  --rdp-background-color-dark: #121212;
                  --rdp-outline: 2px solid #D4AF37;
                  --rdp-outline-selected: 2px solid #D4AF37;
                  margin: 0;
                }

                .custom-calendar-wrapper .rdp-day_selected,
                .custom-calendar-wrapper .rdp-day_selected:hover,
                .custom-calendar-wrapper .rdp-day_selected:focus-visible {
                  color: #0a0a0a;
                  font-weight: bold;
                }
              `}</style>

              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={{ before: new Date() }}
                className="font-['Montserrat'] text-[#F9F6F0]"
              />
            </div>
          </div>

          {/* Booking Form Side */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">

              <h3 className="text-2xl font-['Playfair_Display'] mb-6">
                Reservation Details
              </h3>

              <div className="space-y-6">

                {/* Check In */}
                <div>
                  <label className="block font-['Montserrat'] text-sm text-white/60 mb-2">
                    Check In
                  </label>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-white/10">
                    {checkIn
                      ? format(checkIn, "PPP")
                      : "Select check-in date"}
                  </div>
                </div>

                {/* Check Out */}
                <div>
                  <label className="block font-['Montserrat'] text-sm text-white/60 mb-2">
                    Check Out
                  </label>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-white/10">
                    {checkOut
                      ? format(checkOut, "PPP")
                      : "Select check-out date"}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block font-['Montserrat'] text-sm text-white/60 mb-2">
                    Guests
                  </label>

                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-3 bg-[#1a1a1a] rounded-lg border border-white/10 text-[#F9F6F0] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={7}>7 Guests</option>
                    <option value={8}>8 Guests</option>
                  </select>
                </div>

                {/* Nights */}
                <div>
                  <label className="block font-['Montserrat'] text-sm text-white/60 mb-2">
                    Number of Nights
                  </label>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-white/10">
                    {nights} Night{nights !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* TOTAL (ONLY ONCE) */}
                <div className="border-t border-white/10 pt-6">

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-['Montserrat'] text-white/70">
                      Estimated Total
                    </span>

                    <span className="font-['Playfair_Display'] text-2xl text-[#D4AF37]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button className="w-full bg-[#D4AF37] text-[#0a0a0a] py-4 rounded-xl font-['Montserrat'] font-bold tracking-wide hover:bg-[#F9F6F0] transition-all">
                    Request to Book
                  </button>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}