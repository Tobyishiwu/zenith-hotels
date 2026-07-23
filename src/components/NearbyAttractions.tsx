import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { attractions } from "../constants/attractions.data";

function NearbyAttractions() {
  return (
    <section className="bg-surface py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Explore The Area</p>
          <h2 className="font-heading text-4xl text-primary">Nearby Attractions</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {attractions.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden bg-white shadow-md"
            >
              <img src={place.image} alt={place.name} loading="lazy" className="w-full h-48 object-cover" />
              <div className="p-5">
                <h4 className="font-heading text-lg text-primary">{place.name}</h4>
                <p className="font-body text-xs text-primary/50 flex items-center gap-1.5 mt-2">
                  <MapPin size={14} /> {place.distance}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NearbyAttractions;
