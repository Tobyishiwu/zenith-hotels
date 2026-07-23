import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { BlogPost } from "../../types/content.types";

interface BlogFormModalProps {
  item: BlogPost | null;
  onClose: () => void;
  onSave: (payload: Partial<BlogPost>) => Promise<void>;
}

function BlogFormModal({ item, onClose, onSave }: BlogFormModalProps) {
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", image: "", category: "" });
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setForm({ title: item.title, slug: item.slug, excerpt: item.excerpt, image: item.image, category: item.category });
      setParagraphs(item.content.length ? item.content : [""]);
    }
  }, [item]);

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: item ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }));
  };

  const updateParagraph = (index: number, value: string) => {
    setParagraphs((prev) => prev.map((p, i) => (i === index ? value : p)));
  };

  const addParagraph = () => setParagraphs((prev) => [...prev, ""]);
  const removeParagraph = (index: number) => setParagraphs((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const content = paragraphs.map((p) => p.trim()).filter(Boolean);
      await onSave({ ...form, content });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary/60 z-50 flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8">
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <h2 className="font-heading text-2xl text-primary">{item ? "Edit Post" : "Add Blog Post"}</h2>
          <button onClick={onClose} className="text-primary/50 hover:text-primary"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Title</label>
            <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Slug (URL)</label>
            <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Category</label>
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Dining, Wellness" className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Image URL</label>
              <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent" required />
            </div>
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent resize-none" required />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide">Article Paragraphs</label>
              <button type="button" onClick={addParagraph} className="flex items-center gap-1 text-accent font-body text-xs">
                <Plus size={14} /> Add Paragraph
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {paragraphs.map((para, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    value={para}
                    onChange={(e) => updateParagraph(index, e.target.value)}
                    rows={3}
                    className="flex-1 border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent resize-none"
                  />
                  {paragraphs.length > 1 && (
                    <button type="button" onClick={() => removeParagraph(index)} className="text-red-400 hover:text-red-600 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-primary/20 text-primary rounded-full py-3 font-body text-sm hover:bg-primary/5 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-accent text-white rounded-full py-3 font-body text-sm tracking-wide hover:bg-primary transition-colors disabled:opacity-60">
              {saving ? "Saving..." : item ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogFormModal;
