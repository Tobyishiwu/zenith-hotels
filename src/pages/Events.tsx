import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Building2, PartyPopper, Users, Mail } from "lucide-react";


function Events() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Meetings & Events | Zenith Hotels</title>
        <meta name="description" content="Host unforgettable corporate events, conferences, and celebrations at Zenith Hotels." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Host With Us</p>
          <h1 className="font-heading text-5xl text-white">Meetings & Events</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-md p-8">
            <Building2 className="text-accent mb-4" size={28} />
            <h3 className="font-heading text-xl text-primary mb-3">Corporate Events</h3>
            <p className="font-body text-primary/60 leading-relaxed">State-of-the-art conference facilities equipped with the latest AV technology for meetings, seminars, and product launches.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-2xl shadow-md p-8">
            <PartyPopper className="text-accent mb-4" size={28} />
            <h3 className="font-heading text-xl text-primary mb-3">Conferences</h3>
            <p className="font-body text-primary/60 leading-relaxed">Host large-scale conferences with flexible seating arrangements and dedicated event coordination support.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-2xl shadow-md p-8">
            <Users className="text-accent mb-4" size={28} />
            <h3 className="font-heading text-xl text-primary mb-3">Banquet Hall</h3>
            <p className="font-body text-primary/60 leading-relaxed">An elegant banquet hall accommodating up to 300 guests for galas, celebrations, and formal gatherings.</p>
          </motion.div>
        </div>

        <div className="bg-primary rounded-2xl p-10 text-center">
          <Mail className="text-accent mx-auto mb-4" size={32} />
          <h3 className="font-heading text-2xl text-white mb-3">Plan Your Event</h3>
          <p className="font-body text-white/60 max-w-xl mx-auto mb-6">
            Speak with our events team to design a bespoke package tailored to your occasion.
          </p>
          <a href="/contact" className="inline-block bg-accent text-white px-8 py-3 rounded-full font-body text-sm tracking-wide hover:bg-white hover:text-primary transition-colors">
            Enquire Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default Events;

