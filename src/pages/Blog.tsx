import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../constants/blog.data";

function Blog() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Blog | Zenith Hotels</title>
        <meta name="description" content="Stories, guides, and inspiration from Zenith Hotels." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">From Our Journal</p>
          <h1 className="font-heading text-5xl text-white">Blog</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-md">
              <Link to={`/blog/${post.id}`} className="block group">
                <div className="h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="font-body text-accent text-xs uppercase tracking-wide mb-2">{post.category} · {post.date}</p>
                  <h3 className="font-heading text-lg text-primary mb-2 leading-snug">{post.title}</h3>
                  <p className="font-body text-sm text-primary/60 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blog;
