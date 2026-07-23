import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { galleryService } from "../../services/contentServices";
import type { GalleryItem } from "../../types/content.types";
import GalleryFormModal from "../../components/admin/GalleryFormModal";

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);

  const fetchItems = () => {
    setLoading(true);
    galleryService.getAll()
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load gallery:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, caption: string) => {
    if (!window.confirm(`Delete "${caption}"?`)) return;
    await galleryService.remove(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const handleSave = async (payload: Partial<GalleryItem>) => {
    if (editing) {
      const res = await galleryService.update(editing._id, payload);
      setItems((prev) => prev.map((i) => (i._id === editing._id ? res.data : i)));
    } else {
      const res = await galleryService.create(payload);
      setItems((prev) => [res.data, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Gallery</h1>
          <p className="font-body text-primary/60">Manage images shown on the public gallery page.</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full font-body text-sm hover:bg-primary transition-colors">
          <Plus size={18} /> Add Image
        </button>
      </div>

      {loading ? (
        <p className="font-body text-primary/50">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <img src={item.image} alt={item.caption} className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="font-body text-xs text-accent uppercase mb-1">{item.category}</p>
                <p className="font-body text-sm text-primary mb-3 line-clamp-1">{item.caption}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(item); setModalOpen(true); }} className="flex-1 flex items-center justify-center gap-1 border border-primary/20 rounded-lg py-1.5 text-xs hover:bg-primary/5">
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => handleDelete(item._id, item.caption)} className="flex-1 flex items-center justify-center gap-1 border border-red-200 text-red-500 rounded-lg py-1.5 text-xs hover:bg-red-50">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <GalleryFormModal item={editing} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}

export default AdminGallery;
