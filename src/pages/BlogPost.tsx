import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { blogService } from "../services/contentServices";
import type { BlogPost } from "../types/content.types";

function BlogPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!postId) return;
    blogService.getAll()
      .then((res) => {
        const found = res.data.find((p) => p.slug === postId);
        if (!found) {
          setNotFound(true);
        } else {
          setPost(found);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-primary/50">Loading article...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-3xl text-primary mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-accent font-body text-sm underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{post.title} | Zenith Hotels</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <section className="relative h-96">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/50" />
        <Link to="/blog" className="absolute top-6 left-6 bg-white/90 text-primary px-4 py-2 rounded-full font-body text-sm flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </section>

      <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 font-body text-xs text-primary/50 mb-4">
          <span className="flex items-center gap-1.5"><Tag size={14} /> {post.category}</span>
        </div>
        <h1 className="font-heading text-4xl text-primary mb-8 leading-tight">{post.title}</h1>
        {post.content.map((paragraph, index) => (
          <p key={index} className="font-body text-primary/70 leading-relaxed mb-6">{paragraph}</p>
        ))}
      </motion.article>
    </div>
  );
}

export default BlogPostPage;
