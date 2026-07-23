import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { testimonialService } from "../../services/contentServices";
import type { Testimonial } from "../../types/content.types";
import TestimonialFormModal from "../../components/admin/TestimonialFormModal";

function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const fetchItems = () => {
    setLoading(true);
    testimonialService.getAll()
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load testimonials:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;
    await testimonialService.remove(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const handleSave = async (payload: Partial<Testimonial>) => {
    if (editing) {
      const res = await testimonialService.update(editing._id, payload);
      setItems((prev) => prev.map((i) => (i._id === editing._id ? res.data : i)));
    } else {
      const res = await testimonialService.create(payload);
      setItems((prev) => [res.data, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Testimonials</h1>
          <p className="font-body text-primary/60">Manage guest reviews shown on the homepage.</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full font-body text-sm hover:bg-primary transition-colors">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <p className="font-body text-primary/50">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-sm text-primary/70 mb-4 line-clamp-3">"{item.quote}"</p>
              <p className="font-heading text-primary text-sm">{item.name}</p>
              <p className="font-body text-xs text-primary/50 mb-4">{item.role}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(item); setModalOpen(true); }} className="flex-1 flex items-center justify-center gap-1.5 border border-primary/20 rounded-lg py-2 text-xs hover:bg-primary/5">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(item._id, item.name)} className="flex items-center justify-center gap-1.5 border border-red-200 text-red-500 rounded-lg py-2 px-3 text-xs hover:bg-red-50">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <TestimonialFormModal item={editing} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}

export default AdminTestimonials;
