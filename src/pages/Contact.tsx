import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "../config/site.config";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact | Zenith Hotels</title>
        <meta name="description" content="Get in touch with Zenith Hotels for reservations and enquiries." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <h1 className="font-heading text-5xl text-white">Contact Us</h1>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-heading text-3xl text-primary mb-6">Get In Touch</h2>
          <ul className="space-y-5 mb-10">
            <li className="flex items-center gap-3 font-body text-primary/70"><Phone className="text-accent" size={20} /> {siteConfig.contact.phone}</li>
            <li className="flex items-center gap-3 font-body text-primary/70"><Mail className="text-accent" size={20} /> {siteConfig.contact.email}</li>
            <li className="flex items-center gap-3 font-body text-primary/70"><MapPin className="text-accent" size={20} /> {siteConfig.contact.address}</li>
            <li className="flex items-center gap-3 font-body text-primary/70"><Clock className="text-accent" size={20} /> Check-in {siteConfig.checkInTime} · Check-out {siteConfig.checkOutTime}</li>
          </ul>
          <div className="rounded-2xl overflow-hidden h-64 bg-primary/5 flex items-center justify-center">
            <p className="font-body text-primary/40 text-sm">Map embed placeholder</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white rounded-2xl shadow-md p-8">
          {submitted ? (
            <p className="font-body text-accent text-center py-10">Thank you for reaching out — our team will respond within 24 hours.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="text" required placeholder="Full Name" className="border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent" />
              <input type="email" required placeholder="Email Address" className="border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent" />
              <input type="tel" placeholder="Phone Number" className="border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent" />
              <textarea required placeholder="Your Message" rows={4} className="border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent resize-none" />
              <button type="submit" className="bg-accent text-white rounded-full py-3 font-body text-sm tracking-wide hover:bg-primary transition-colors mt-2">
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;
