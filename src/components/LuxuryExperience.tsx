import { motion } from "framer-motion";
import { Check } from "lucide-react";

const highlights = [
  "Personalized concierge service around the clock",
  "Award-winning culinary experiences",
  "Serene spa rituals inspired by nature",
  "Breathtaking views from every room",
];

function LuxuryExperience() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200" alt="Hotel lounge interior" className="rounded-2xl w-full h-[480px] object-cover" loading="lazy" />
        <div className="absolute -bottom-8 -right-8 bg-accent text-white rounded-2xl p-6 hidden md:block shadow-xl">
          <p className="font-heading text-3xl">15+</p>
          <p className="font-body text-sm">Years of Excellence</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">The Zenith Experience</p>
        <h2 className="font-heading text-4xl text-primary mb-6">Indulge In Timeless Luxury</h2>
        <p className="font-body text-primary/60 mb-8 leading-relaxed">
          Every detail at Zenith Hotels is crafted to elevate your stay into something unforgettable — from bespoke service to serene surroundings designed for total relaxation.
        </p>

        <ul className="space-y-4">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-primary/80">
              <Check className="text-accent shrink-0 mt-0.5" size={20} />
              {item}
            </li>
          ))}
        </ul>

        <a href="/about" className="inline-block mt-8 border-b-2 border-accent text-primary font-body text-sm tracking-wide pb-1 hover:text-accent transition-colors">
          Discover Our Story
        </a>
      </motion.div>
    </section>
  );
}

export default LuxuryExperience;
