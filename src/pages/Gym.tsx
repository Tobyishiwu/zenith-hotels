import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Dumbbell, Clock, Users } from "lucide-react";

function Gym() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Fitness Gym | Zenith Hotels</title>
        <meta name="description" content="Stay active during your stay with Zenith Hotels' fully equipped fitness center, open 24/7." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Stay Active</p>
          <h1 className="font-heading text-5xl text-white">Fitness Gym</h1>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <Dumbbell className="text-accent mx-auto mb-5" size={40} />
        <p className="font-body text-primary/60 leading-relaxed max-w-xl mx-auto mb-10">
          Our fully equipped fitness center features state-of-the-art cardio and strength equipment, with personal trainers available on request.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-2">
            <Clock className="text-accent" size={22} />
            <p className="font-body text-sm text-primary/70">Open 24 Hours</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-2">
            <Users className="text-accent" size={22} />
            <p className="font-body text-sm text-primary/70">Personal Trainers Available</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gym;
