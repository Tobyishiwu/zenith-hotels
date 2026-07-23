import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { blogService } from "../../services/contentServices";
import type { BlogPost } from "../../types/content.types";
import BlogFormModal from "../../components/admin/BlogFormModal";

function AdminBlog() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  const fetchItems = () => {
    setLoading(true);
    blogService.getAll()
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load blog posts:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await blogService.remove(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const handleSave = async (payload: Partial<BlogPost>) => {
    if (editing) {
      const res = await blogService.update(editing._id, payload);
      setItems((prev) => prev.map((i) => (i._id === editing._id ? res.data : i)));
    } else {
      const res = await blogService.create(payload);
      setItems((prev) => [res.data, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Blog</h1>
          <p className="font-body text-primary/60">Manage articles shown on the public blog page.</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full font-body text-sm hover:bg-primary transition-colors">
          <Plus size={18} /> New Post
        </button>
      </div>

      {loading ? (
        <p className="font-body text-primary/50">Loading...</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-5 border-b border-primary/5 last:border-0">
              <img src={item.image} alt={item.title} className="w-20 h-16 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-accent uppercase mb-1">{item.category}</p>
                <h3 className="font-heading text-primary truncate">{item.title}</h3>
                <p className="font-body text-xs text-primary/50 truncate">{item.excerpt}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditing(item); setModalOpen(true); }} className="p-2 border border-primary/20 rounded-lg hover:bg-primary/5">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(item._id, item.title)} className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <BlogFormModal item={editing} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}

export default AdminBlog;
