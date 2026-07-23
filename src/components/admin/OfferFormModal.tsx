import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Offer } from "../../types/content.types";

interface OfferFormModalProps {
  item: Offer | null;
  onClose: () => void;
  onSave: (payload: Partial<Offer>) => Promise<void>;
}

function OfferFormModal({ item, onClose, onSave }: OfferFormModalProps) {
  const [form, setForm] = useState({ title: "", description: "", discount: "", image: "", validUntil: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) setForm({ title: item.title, description: item.description, discount: item.discount, image: item.image, validUntil: item.validUntil });
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
          <h2 className="font-heading text-2xl text-primary">{item ? "Edit Offer" : "Add Offer"}</h2>
          <button onClick={onClose} className="text-primary/50 hover:text-primary"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent resize-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Discount</label>
              <input type="text" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="e.g. 20% OFF" className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Valid Until</label>
              <input type="text" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} placeholder="e.g. December 31, 2026" className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
            </div>
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Image URL</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
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

export default OfferFormModal;
