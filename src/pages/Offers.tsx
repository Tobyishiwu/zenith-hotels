import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Tag, Calendar } from "lucide-react";
import { offerService } from "../services/contentServices";
import type { Offer } from "../types/content.types";

function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    offerService.getAll()
      .then((res) => setOffers(res.data))
      .catch((err) => console.error("Failed to load offers:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Offers | Zenith Hotels</title>
        <meta name="description" content="Explore exclusive seasonal offers and packages at Zenith Hotels." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Exclusive Packages</p>
          <h1 className="font-heading text-5xl text-white">Offers</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        {loading ? (
          <p className="text-center font-body text-primary/50">Loading offers...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <motion.div key={offer._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="relative h-52">
                  <img src={offer.image} alt={offer.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-1.5 rounded-full font-body text-xs flex items-center gap-1.5">
                    <Tag size={12} /> {offer.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary mb-2">{offer.title}</h3>
                  <p className="font-body text-sm text-primary/60 mb-4 leading-relaxed">{offer.description}</p>
                  <p className="font-body text-xs text-primary/50 flex items-center gap-1.5 mb-5">
                    <Calendar size={14} /> Valid until {offer.validUntil}
                  </p>
                  <a href="/contact" className="block text-center bg-primary text-white rounded-full py-3 font-body text-sm tracking-wide hover:bg-accent transition-colors">
                    Claim Offer
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Offers;
