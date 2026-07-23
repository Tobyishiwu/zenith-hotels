import { motion } from "framer-motion";
import { galleryImages } from "../constants/gallery.data";

function GalleryPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Visual Tour</p>
        <h2 className="font-heading text-4xl text-primary">Gallery</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((img, index) => (
          <motion.div
            key={img}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="overflow-hidden rounded-xl"
          >
            <img src={img} alt="Zenith Hotels gallery" loading="lazy" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a href="/gallery" className="inline-block border-b-2 border-accent text-primary font-body text-sm tracking-wide pb-1 hover:text-accent transition-colors">
          View Full Gallery
        </a>
      </div>
    </section>
  );
}

export default GalleryPreview;
