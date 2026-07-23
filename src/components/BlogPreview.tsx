import { motion } from "framer-motion";
import { blogPosts } from "../constants/blog.data";

function BlogPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">
          From Our Journal
        </p>
        <h2 className="font-heading text-4xl text-primary">Latest Stories</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.a
            key={post.id}
            href={`/blog/${post.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <p className="font-body text-accent text-xs uppercase tracking-wide mb-2">
                {post.category} · {post.date}
              </p>
              <h3 className="font-heading text-lg text-primary mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="font-body text-sm text-primary/60 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export default BlogPreview;
