import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "../constants/galleryItems.data";

const categories = ["All", "Rooms", "Dining", "Spa", "Pool", "Events", "Lounge"];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Gallery | Zenith Hotels</title>
        <meta name="description" content="Take a visual tour of Zenith Hotels' rooms, dining, spa, and event spaces." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Visual Tour</p>
          <h1 className="font-heading text-5xl text-white">Gallery</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm px-5 py-2 rounded-full transition-colors ${activeCategory === cat ? "bg-accent text-white" : "bg-white text-primary/60 hover:bg-primary/5"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="block w-full break-inside-avoid rounded-xl overflow-hidden relative group"
            >
              <img src={item.image} alt={item.caption} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="font-body text-white text-sm">{item.caption}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 z-[100] flex items-center justify-center px-6"
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white" aria-label="Close">
              <X size={32} />
            </button>
            <button onClick={showPrev} className="absolute left-4 md:left-10 text-white" aria-label="Previous image">
              <ChevronLeft size={36} />
            </button>
            <motion.img
              key={filteredItems[lightboxIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].caption}
              className="max-h-[80vh] max-w-full rounded-lg"
            />
            <button onClick={showNext} className="absolute right-4 md:right-10 text-white" aria-label="Next image">
              <ChevronRight size={36} />
            </button>
            <p className="absolute bottom-8 font-body text-white/80 text-sm">{filteredItems[lightboxIndex].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
