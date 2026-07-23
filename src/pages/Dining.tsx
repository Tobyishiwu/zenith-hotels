import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { UtensilsCrossed, Clock, Wine } from "lucide-react";

const menus = [
  { title: "Breakfast", time: "6:30 AM – 10:30 AM", description: "A curated spread of continental and local favorites, fresh pastries, and artisan coffee." },
  { title: "Lunch", time: "12:00 PM – 3:00 PM", description: "Light, seasonal dishes crafted with locally sourced ingredients in an elegant midday setting." },
  { title: "Dinner", time: "6:30 PM – 10:30 PM", description: "An exquisite tasting menu paired with fine wines, set against candlelit ambience." },
  { title: "Private Dining", time: "By Reservation", description: "An intimate dining experience tailored to your occasion, hosted by our executive chef." },
];

function Dining() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Dining | Zenith Hotels</title>
        <meta name="description" content="Experience culinary excellence at Zenith Hotels, from breakfast to fine dining and private events." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Culinary Excellence</p>
          <h1 className="font-heading text-5xl text-white">Dining</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menus.map((menu, index) => (
            <motion.div key={menu.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl shadow-md p-8">
              <UtensilsCrossed className="text-accent mb-4" size={28} />
              <h3 className="font-heading text-2xl text-primary mb-2">{menu.title}</h3>
              <p className="font-body text-xs text-primary/50 flex items-center gap-1.5 mb-4">
                <Clock size={14} /> {menu.time}
              </p>
              <p className="font-body text-primary/60 leading-relaxed">{menu.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-primary rounded-2xl p-10 text-center">
          <Wine className="text-accent mx-auto mb-4" size={32} />
          <h3 className="font-heading text-2xl text-white mb-3">Cocktail Lounge</h3>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            Unwind with handcrafted cocktails and premium spirits in our sophisticated lounge, open until midnight.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Dining;
