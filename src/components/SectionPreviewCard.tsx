import { motion } from "framer-motion";

interface SectionPreviewCardProps {
  image: string;
  label: string;
  title: string;
  description: string;
  linkTo: string;
  reverse?: boolean;
}

function SectionPreviewCard({ image, label, title, description, linkTo, reverse }: SectionPreviewCardProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 ${reverse ? "md:[direction:rtl]" : ""}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="[direction:ltr]">
        <img src={image} alt={title} className="rounded-2xl w-full h-[400px] object-cover" loading="lazy" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="[direction:ltr]">
        <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">{label}</p>
        <h3 className="font-heading text-3xl text-primary mb-5">{title}</h3>
        <p className="font-body text-primary/60 mb-7 leading-relaxed">{description}</p>
        <a href={linkTo} className="inline-block bg-primary text-white px-7 py-3 rounded-full font-body text-sm tracking-wide hover:bg-accent transition-colors">
          Learn More
        </a>
      </motion.div>
    </div>
  );
}

export default SectionPreviewCard;
