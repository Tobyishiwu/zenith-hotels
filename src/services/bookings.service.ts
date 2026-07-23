import apiFetch from "./api";

export interface BookingPayload {
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  promoCode?: string;
  notes?: string;
}

interface AvailabilityResponse {
  success: boolean;
  available: boolean;
}

interface BookingResponse {
  success: boolean;
  data: {
    _id: string;
    totalPrice: number;
    status: string;
  };
  message?: string;
}

export const checkAvailability = (roomId: string, checkIn: string, checkOut: string) =>
  apiFetch<AvailabilityResponse>("/bookings/availability", {
    params: { roomId, checkIn, checkOut },
  });

export const createBooking = (payload: BookingPayload) =>
  apiFetch<BookingResponse>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
