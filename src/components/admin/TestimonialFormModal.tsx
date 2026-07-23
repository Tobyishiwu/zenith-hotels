import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import type { Testimonial } from "../../types/content.types";

interface TestimonialFormModalProps {
  item: Testimonial | null;
  onClose: () => void;
  onSave: (payload: Partial<Testimonial>) => Promise<void>;
}

function TestimonialFormModal({ item, onClose, onSave }: TestimonialFormModalProps) {
  const [form, setForm] = useState({ name: "", role: "", quote: "", rating: 5 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) setForm({ name: item.name, role: item.role, quote: item.quote, rating: item.rating });
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
          <h2 className="font-heading text-2xl text-primary">{item ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <button onClick={onClose} className="text-primary/50 hover:text-primary"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Guest Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Role</label>
              <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Business Traveler" className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
            </div>
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Quote</label>
            <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent resize-none" required />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                  <Star size={24} className={n <= form.rating ? "fill-accent text-accent" : "text-primary/20"} />
                </button>
              ))}
            </div>
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

export default TestimonialFormModal;
