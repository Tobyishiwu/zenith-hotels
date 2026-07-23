import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { verifyPayment } from "../services/payment.service";

type Status = "verifying" | "success" | "failed" | "error";

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("verifying");
  const [details, setDetails] = useState<{ guestName: string; totalPrice: number; roomName: string } | null>(null);

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setStatus("error");
      return;
    }

    verifyPayment(reference)
      .then((res) => {
        if (res.data.paymentStatus === "paid") {
          setStatus("success");
          setDetails({
            guestName: res.data.booking.guestName,
            totalPrice: res.data.booking.totalPrice,
            roomName: res.data.booking.room.name,
          });
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center"
      >
        {status === "verifying" && (
          <>
            <Loader2 className="text-accent mx-auto mb-4 animate-spin" size={48} />
            <h1 className="font-heading text-2xl text-primary mb-2">Verifying Payment</h1>
            <p className="font-body text-primary/60">Please wait while we confirm your payment...</p>
          </>
        )}

        {status === "success" && details && (
          <>
            <CheckCircle2 className="text-accent mx-auto mb-4" size={48} />
            <h1 className="font-heading text-2xl text-primary mb-2">Payment Successful</h1>
            <p className="font-body text-primary/60 mb-4">
              Thank you, {details.guestName}. Your reservation for {details.roomName} is confirmed.
            </p>
            <p className="font-heading text-2xl text-accent mb-6">${details.totalPrice}</p>
            <Link to="/" className="inline-block bg-accent text-white px-8 py-3 rounded-full font-body text-sm tracking-wide hover:bg-primary transition-colors">
              Back to Home
            </Link>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h1 className="font-heading text-2xl text-primary mb-2">Payment Not Completed</h1>
            <p className="font-body text-primary/60 mb-6">
              Your payment could not be confirmed. If you were charged, please contact us with your reference.
            </p>
            <Link to="/rooms" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-body text-sm tracking-wide hover:bg-accent transition-colors">
              Back to Rooms
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h1 className="font-heading text-2xl text-primary mb-2">Something Went Wrong</h1>
            <p className="font-body text-primary/60 mb-6">
              We could not verify your payment. Please contact us if you believe a payment was made.
            </p>
            <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-body text-sm tracking-wide hover:bg-accent transition-colors">
              Back to Home
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default PaymentCallback;
