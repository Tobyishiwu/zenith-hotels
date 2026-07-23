import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonialService } from "../services/contentServices";
import type { Testimonial } from "../types/content.types";

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    testimonialService.getAll()
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Failed to load testimonials:", err));
  }, []);

  return (
    <section className="bg-surface py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Guest Stories</p>
          <h2 className="font-heading text-4xl text-primary">What Our Guests Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-md relative"
            >
              <Quote className="text-accent/20 absolute top-6 right-6" size={40} />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="fill-accent text-accent" size={16} />
                ))}
              </div>
              <p className="font-body text-primary/70 mb-6 leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="font-heading text-primary">{t.name}</p>
                <p className="font-body text-xs text-primary/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
