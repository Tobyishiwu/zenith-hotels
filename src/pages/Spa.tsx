import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Sparkles, Clock } from "lucide-react";

const treatments = [
  { name: "Signature Massage", duration: "60 min", price: 90 },
  { name: "Aromatherapy Ritual", duration: "75 min", price: 110 },
  { name: "Hot Stone Therapy", duration: "90 min", price: 130 },
  { name: "Facial Radiance Treatment", duration: "45 min", price: 80 },
  { name: "Couples Retreat", duration: "120 min", price: 220 },
  { name: "Detox Body Wrap", duration: "60 min", price: 95 },
];

function Spa() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Spa & Wellness | Zenith Hotels</title>
        <meta name="description" content="Rejuvenate at Zenith Hotels' spa with signature treatments, massages, and wellness rituals." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Wellness</p>
          <h1 className="font-heading text-5xl text-white">Spa & Relaxation</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <motion.div key={treatment.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
              <Sparkles className="text-accent mb-3" size={24} />
              <h3 className="font-heading text-lg text-primary mb-2">{treatment.name}</h3>
              <p className="font-body text-xs text-primary/50 flex items-center gap-1.5 mb-3">
                <Clock size={14} /> {treatment.duration}
              </p>
              <p className="font-heading text-xl text-accent mt-auto">${treatment.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Spa;
