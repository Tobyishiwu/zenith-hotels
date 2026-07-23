import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronDown } from "lucide-react";
import FAQSchema from "../seo/FAQSchema";

const faqs = [
  { question: "What time is check-in and check-out?", answer: "Check-in begins at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out may be arranged based on availability." },
  { question: "Is airport transfer available?", answer: "Yes, we offer complimentary airport pickup for guests staying in our suite categories, and paid transfers for all other room types." },
  { question: "Do you allow pets?", answer: "We welcome small pets in select rooms with prior notice. Please contact our reservations team to confirm availability." },
  { question: "Is breakfast included in the room rate?", answer: "Breakfast is included in Deluxe Suite and above bookings. Standard rooms can add breakfast during checkout." },
  { question: "What is your cancellation policy?", answer: "Reservations can be cancelled free of charge up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge." },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <FAQSchema faqs={faqs} />
      <Helmet>
        <title>FAQ | Zenith Hotels</title>
        <meta name="description" content="Frequently asked questions about staying at Zenith Hotels." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <h1 className="font-heading text-5xl text-white">Frequently Asked Questions</h1>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24">
        {faqs.map((faq, index) => (
          <div key={faq.question} className="border-b border-primary/10 py-6">
            <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between text-left">
              <span className="font-heading text-lg text-primary">{faq.question}</span>
              <ChevronDown size={20} className={`text-accent transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="font-body text-primary/60 leading-relaxed mt-4">
                {faq.answer}
              </motion.p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default FAQ;
