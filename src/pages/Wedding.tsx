import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, Camera, Users, Mail } from "lucide-react";

const packages = [
  { name: "Intimate Ceremony", guests: "Up to 50 guests", price: "From $3,500" },
  { name: "Classic Celebration", guests: "Up to 150 guests", price: "From $8,500" },
  { name: "Grand Affair", guests: "Up to 300 guests", price: "From $18,000" },
];

function Wedding() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Wedding Venue | Zenith Hotels</title>
        <meta name="description" content="Say I do at Zenith Hotels — an elegant wedding venue with bespoke packages for every celebration." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <Heart className="text-accent mx-auto mb-3" size={28} />
          <h1 className="font-heading text-5xl text-white">Wedding Venue</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-primary/60 leading-relaxed">
            From intimate ceremonies to grand celebrations, our dedicated wedding planners bring every detail of your special day to life against a backdrop of timeless elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl shadow-md p-8 text-center">
              <Users className="text-accent mx-auto mb-4" size={28} />
              <h3 className="font-heading text-xl text-primary mb-2">{pkg.name}</h3>
              <p className="font-body text-sm text-primary/50 mb-4">{pkg.guests}</p>
              <p className="font-heading text-2xl text-accent">{pkg.price}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary rounded-2xl p-10 text-center">
          <Camera className="text-accent mx-auto mb-4" size={32} />
          <h3 className="font-heading text-2xl text-white mb-3">Begin Your Forever With Us</h3>
          <p className="font-body text-white/60 max-w-xl mx-auto mb-6">
            Schedule a consultation with our wedding specialists to start planning your dream day.
          </p>
          <a href="/contact" className="inline-block bg-accent text-white px-8 py-3 rounded-full font-body text-sm tracking-wide hover:bg-white hover:text-primary transition-colors">
            Book A Consultation
          </a>
        </div>
      </section>
    </div>
  );
}

export default Wedding;
