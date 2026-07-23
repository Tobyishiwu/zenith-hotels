import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Room } from "../../types/room.types";
import type { RoomPayload } from "../../services/adminRooms.service";

interface RoomFormModalProps {
  room: Room | null;
  onClose: () => void;
  onSave: (payload: RoomPayload) => Promise<void>;
}

function RoomFormModal({ room, onClose, onSave }: RoomFormModalProps) {
  const [form, setForm] = useState<RoomPayload>({
    name: "",
    slug: "",
    image: "",
    price: 0,
    size: "",
    occupancy: 1,
    beds: "",
    bathrooms: 1,
    description: "",
    amenities: [],
  });
  const [amenitiesInput, setAmenitiesInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (room) {
      setForm({
        name: room.name,
        slug: room.slug,
        image: room.image,
        price: room.price,
        size: room.size,
        occupancy: room.occupancy,
        beds: room.beds,
        bathrooms: room.bathrooms,
        description: room.description,
        amenities: room.amenities,
      });
      setAmenitiesInput(room.amenities.join(", "));
    }
  }, [room]);

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: room ? prev.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const amenities = amenitiesInput.split(",").map((a) => a.trim()).filter(Boolean);
      await onSave({ ...form, amenities });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary/60 z-50 flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8">
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <h2 className="font-heading text-2xl text-primary">{room ? "Edit Room" : "Add New Room"}</h2>
          <button onClick={onClose} className="text-primary/50 hover:text-primary">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Room Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Slug (URL)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Price / Night ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
                required
                min={0}
              />
            </div>
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Size</label>
              <input
                type="text"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                placeholder="e.g. 45 sqm"
                className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Occupancy</label>
              <input
                type="number"
                value={form.occupancy}
                onChange={(e) => setForm({ ...form, occupancy: Number(e.target.value) })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
                required
                min={1}
              />
            </div>
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Beds</label>
              <input
                type="text"
                value={form.beds}
                onChange={(e) => setForm({ ...form, beds: e.target.value })}
                placeholder="e.g. 1 King Bed"
                className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
                required
              />
            </div>
            <div>
              <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Bathrooms</label>
              <input
                type="number"
                value={form.bathrooms}
                onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
                required
                min={1}
              />
            </div>
          </div>

          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent resize-none"
              required
            />
          </div>

          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide mb-1.5 block">
              Amenities (comma-separated)
            </label>
            <input
              type="text"
              value={amenitiesInput}
              onChange={(e) => setAmenitiesInput(e.target.value)}
              placeholder="Free WiFi, City View, Mini Bar"
              className="w-full border border-primary/20 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-primary/20 text-primary rounded-full py-3 font-body text-sm hover:bg-primary/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-accent text-white rounded-full py-3 font-body text-sm tracking-wide hover:bg-primary transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : room ? "Update Room" : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomFormModal;
