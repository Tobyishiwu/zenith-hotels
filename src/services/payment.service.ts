import apiFetch from "./api";

interface InitiatePaymentResponse {
  success: boolean;
  data: {
    authorizationUrl: string;
    reference: string;
  };
}

interface VerifyPaymentResponse {
  success: boolean;
  data: {
    paymentStatus: "paid" | "failed";
    booking: {
      guestName: string;
      guestEmail: string;
      totalPrice: number;
      room: { name: string };
    };
  };
}

export const initiatePayment = (bookingId: string) =>
  apiFetch<InitiatePaymentResponse>(`/payments/initiate/${bookingId}`, {
    method: "POST",
  });

export const verifyPayment = (reference: string) =>
  apiFetch<VerifyPaymentResponse>(`/payments/verify/${reference}`);
