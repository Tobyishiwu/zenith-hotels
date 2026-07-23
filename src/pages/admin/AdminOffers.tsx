import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { offerService } from "../../services/contentServices";
import type { Offer } from "../../types/content.types";
import OfferFormModal from "../../components/admin/OfferFormModal";

function AdminOffers() {
  const [items, setItems] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);

  const fetchItems = () => {
    setLoading(true);
    offerService.getAll()
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load offers:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await offerService.remove(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const handleSave = async (payload: Partial<Offer>) => {
    if (editing) {
      const res = await offerService.update(editing._id, payload);
      setItems((prev) => prev.map((i) => (i._id === editing._id ? res.data : i)));
    } else {
      const res = await offerService.create(payload);
      setItems((prev) => [res.data, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Offers</h1>
          <p className="font-body text-primary/60">Manage promotional packages shown on the public offers page.</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full font-body text-sm hover:bg-primary transition-colors">
          <Plus size={18} /> Add Offer
        </button>
      </div>

      {loading ? (
        <p className="font-body text-primary/50">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <img src={item.image} alt={item.title} className="w-full h-36 object-cover" />
              <div className="p-5">
                <p className="font-body text-xs text-accent mb-1">{item.discount} · {item.validUntil}</p>
                <h3 className="font-heading text-lg text-primary mb-3">{item.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(item); setModalOpen(true); }} className="flex-1 flex items-center justify-center gap-1.5 border border-primary/20 rounded-lg py-2 text-xs hover:bg-primary/5">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item._id, item.title)} className="flex items-center justify-center gap-1.5 border border-red-200 text-red-500 rounded-lg py-2 px-3 text-xs hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <OfferFormModal item={editing} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}

export default AdminOffers;
