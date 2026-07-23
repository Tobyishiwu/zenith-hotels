import { motion } from "framer-motion";
import { siteConfig } from "../config/site.config";

function ContactCTA() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2000')",
        }}
      />
      <div className="absolute inset-0 bg-primary/80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <h2 className="font-heading text-4xl text-white mb-5">
          Ready For An Unforgettable Stay?
        </h2>
        <p className="font-body text-white/70 mb-8">
          Reach out to our reservations team and let us craft the perfect experience for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="bg-accent text-white px-8 py-3.5 rounded-full font-body text-sm tracking-wide hover:bg-white hover:text-primary transition-colors">
            Contact Us
          </a>
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noreferrer" className="border border-white/40 text-white px-8 py-3.5 rounded-full font-body text-sm tracking-wide hover:bg-white/10 transition-colors">
            Chat On WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactCTA;
