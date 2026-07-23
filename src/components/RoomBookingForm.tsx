import { useState } from "react";
import { Calendar, Users, User, Mail, Phone, Tag, AlertCircle } from "lucide-react";
import { checkAvailability, createBooking } from "../services/bookings.service";
import { initiatePayment } from "../services/payment.service";
import type { Room } from "../types/room.types";

interface RoomBookingFormProps {
  room: Room;
}

type FormStep = "dates" | "details";

function RoomBookingForm({ room }: RoomBookingFormProps) {
  const [step, setStep] = useState<FormStep>("dates");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const estimatedTotal = nights * room.price;

  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setChecking(true);
    try {
      const res = await checkAvailability(room._id, checkIn, checkOut);
      if (!res.available) {
        setError("This room is not available for the selected dates. Please try different dates.");
        return;
      }
      setStep("details");
    } catch (err) {
      setError("Failed to check availability. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!guestName || !guestEmail || !guestPhone) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const bookingRes = await createBooking({
        roomId: room._id,
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        guests,
        promoCode: promoCode || undefined,
      });

      const paymentRes = await initiatePayment(bookingRes.data._id);
      window.location.href = paymentRes.data.authorizationUrl;
    } catch (err) {
      setError((err as Error).message || "Failed to create booking. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div id="booking" className="bg-white rounded-2xl shadow-lg p-8">
      <p className="font-heading text-3xl text-primary mb-1">
        ${room.price}<span className="font-body text-base text-primary/50"> / night</span>
      </p>
      <p className="font-body text-xs text-primary/50 mb-6">Includes breakfast & free WiFi</p>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-600 rounded-lg p-3 mb-5 font-body text-xs">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {step === "dates" && (
        <form onSubmit={handleCheckAvailability} className="flex flex-col gap-4">
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Calendar size={14} /> Check-In
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Calendar size={14} /> Check-Out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Users size={14} /> Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent bg-transparent"
            >
              {Array.from({ length: room.occupancy }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          {nights > 0 && (
            <p className="font-body text-sm text-primary/60">
              {nights} night{nights > 1 ? "s" : ""} · estimated total <span className="text-primary font-medium">${estimatedTotal}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={checking}
            className="bg-accent text-white rounded-full py-3.5 font-body text-sm tracking-wide hover:bg-primary transition-colors disabled:opacity-60"
          >
            {checking ? "Checking Availability..." : "Check Availability"}
          </button>
        </form>
      )}

      {step === "details" && (
        <form onSubmit={handleSubmitBooking} className="flex flex-col gap-4">
          <p className="font-body text-xs text-accent bg-accent/10 rounded-lg p-3">
            Room available for {checkIn} to {checkOut} · {nights} night{nights > 1 ? "s" : ""} · ${estimatedTotal}
          </p>

          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <User size={14} /> Full Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Mail size={14} /> Email
            </label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Phone size={14} /> Phone
            </label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Tag size={14} /> Promo Code (Optional)
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setStep("dates")}
              className="flex-1 border border-primary/20 text-primary rounded-full py-3 font-body text-sm hover:bg-primary/5 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-accent text-white rounded-full py-3 font-body text-sm tracking-wide hover:bg-primary transition-colors disabled:opacity-60"
            >
              {submitting ? "Redirecting to payment..." : "Proceed to Payment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RoomBookingForm;
