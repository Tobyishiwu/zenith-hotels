import { motion } from "framer-motion";
import { Award as AwardIcon } from "lucide-react";
import { awards } from "../constants/awards.data";

function Awards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <AwardIcon className="text-accent mb-3" size={32} />
            <p className="font-heading text-primary text-lg">{award.title}</p>
            <p className="font-body text-primary/50 text-xs mt-1">{award.issuer} · {award.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Awards;
