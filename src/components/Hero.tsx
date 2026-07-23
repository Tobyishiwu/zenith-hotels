import { motion } from "framer-motion";
import { siteConfig } from "../config/site.config";

function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-primary">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/20" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-accent tracking-[0.3em] uppercase text-sm mb-4"
        >
          {siteConfig.branding.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl text-white leading-tight"
        >
          {siteConfig.branding.hotelName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-white/80 text-lg mt-6 max-w-xl mx-auto"
        >
          An unforgettable escape where world-class comfort meets breathtaking views.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex gap-4 justify-center"
        >
          <a href="#booking" className="bg-accent text-white px-8 py-3.5 rounded-full font-body text-sm tracking-wide hover:bg-white hover:text-primary transition-colors">
            Check Availability
          </a>
          <a href="/gallery" className="border border-white/40 text-white px-8 py-3.5 rounded-full font-body text-sm tracking-wide hover:bg-white/10 transition-colors">
            Explore Gallery
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
