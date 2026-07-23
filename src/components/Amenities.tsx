import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { amenities } from "../constants/amenities.data";

function Amenities() {
  return (
    <section className="bg-primary py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">World-Class Facilities</p>
          <h2 className="font-heading text-4xl text-white">Hotel Amenities</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => {
            const IconComponent = Icons[amenity.icon as keyof typeof Icons] as React.ElementType;
            return (
              <motion.div
                key={amenity.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center text-center bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                {IconComponent && <IconComponent className="text-accent mb-3" size={28} />}
                <span className="font-body text-white/80 text-sm">{amenity.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Amenities;
