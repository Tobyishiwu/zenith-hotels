import apiFetch from "./api";

export interface AdminBooking {
  _id: string;
  room: { _id: string; name: string; price: number };
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

interface BookingsResponse {
  success: boolean;
  data: AdminBooking[];
}

interface BookingResponse {
  success: boolean;
  data: AdminBooking;
}

export const getAllBookings = () => apiFetch<BookingsResponse>("/bookings");

export const updateBookingStatus = (id: string, status: string) =>
  apiFetch<BookingResponse>(`/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
