import { useState } from "react";
import { Calendar, Users, Tag } from "lucide-react";

function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ checkIn, checkOut, guests, rooms, promoCode });
  };

  return (
    <section id="booking" className="relative z-20 -mt-20 px-6">
      <form
        onSubmit={handleSearch}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6"
      >
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5">
            <Calendar size={14} /> Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="font-body text-sm text-primary border-b border-primary/20 pb-2 focus:outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5">
            <Calendar size={14} /> Check-Out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="font-body text-sm text-primary border-b border-primary/20 pb-2 focus:outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5">
            <Users size={14} /> Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="font-body text-sm text-primary border-b border-primary/20 pb-2 focus:outline-none focus:border-accent bg-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5">
            <Tag size={14} /> Promo Code
          </label>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Optional"
            className="font-body text-sm text-primary border-b border-primary/20 pb-2 focus:outline-none focus:border-accent placeholder:text-primary/30"
          />
        </div>

        <button
          type="submit"
          className="bg-accent text-white rounded-full font-body text-sm tracking-wide hover:bg-primary transition-colors self-end py-3"
        >
          Search Availability
        </button>
      </form>
    </section>
  );
}

export default BookingWidget;
