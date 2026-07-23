import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

function About() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us | Zenith Hotels</title>
        <meta name="description" content="Learn about Zenith Hotels' story, values, and commitment to exceptional hospitality." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Our Story</p>
          <h1 className="font-heading text-5xl text-white">About Zenith Hotels</h1>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-heading text-3xl text-primary mb-6">Where Luxury Meets the Horizon</h2>
          <p className="font-body text-primary/60 leading-relaxed mb-6">
            Founded on the belief that true hospitality lies in the details, Zenith Hotels has spent over 15 years crafting stays that go beyond expectation. Every room, every dish, every interaction is shaped by a single goal: to make our guests feel genuinely cared for.
          </p>
          <p className="font-body text-primary/60 leading-relaxed mb-6">
            Our team draws on decades of collective experience in luxury hospitality, blending timeless elegance with modern comfort. From our award-winning culinary program to our serene spa sanctuary, every facet of Zenith Hotels is designed with intention.
          </p>
          <p className="font-body text-primary/60 leading-relaxed">
            We invite you to experience a stay defined not just by luxury, but by warmth, authenticity, and unforgettable moments.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
