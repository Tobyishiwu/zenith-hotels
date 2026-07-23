import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { GalleryItem } from "../../types/content.types";

interface GalleryFormModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onSave: (payload: Partial<GalleryItem>) => Promise<void>;
}

function GalleryFormModal({ item, onClose, onSave }: GalleryFormModalProps) {
  const [form, setForm] = useState({ image: "", category: "", caption: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) setForm({ image: item.image, category: item.category, caption: item.caption });
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary/60 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <h2 className="font-heading text-2xl text-primary">{item ? "Edit Image" : "Add Image"}</h2>
          <button onClick={onClose} className="text-primary/50 hover:text-primary"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Image URL</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Category</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Rooms, Dining, Spa" className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Caption</label>
            <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-primary/20 text-primary rounded-full py-3 font-body text-sm hover:bg-primary/5 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-accent text-white rounded-full py-3 font-body text-sm tracking-wide hover:bg-primary transition-colors disabled:opacity-60">
              {saving ? "Saving..." : item ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GalleryFormModal;
