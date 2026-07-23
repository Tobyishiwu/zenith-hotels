import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getAllRooms, createRoom, updateRoom, deleteRoom } from "../../services/adminRooms.service";
import type { RoomPayload } from "../../services/adminRooms.service";
import type { Room } from "../../types/room.types";
import RoomFormModal from "../../components/admin/RoomFormModal";

function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const fetchRooms = () => {
    setLoading(true);
    getAllRooms()
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Failed to load rooms:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddNew = () => {
    setEditingRoom(null);
    setModalOpen(true);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteRoom(id);
      setRooms((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete room:", err);
    }
  };

  const handleSave = async (payload: RoomPayload) => {
    if (editingRoom) {
      const res = await updateRoom(editingRoom._id, payload);
      setRooms((prev) => prev.map((r) => (r._id === editingRoom._id ? res.data : r)));
    } else {
      const res = await createRoom(payload);
      setRooms((prev) => [res.data, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Rooms</h1>
          <p className="font-body text-primary/60">Manage room listings shown on the website.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full font-body text-sm hover:bg-primary transition-colors"
        >
          <Plus size={18} /> Add Room
        </button>
      </div>

      {loading ? (
        <p className="font-body text-primary/50">Loading rooms...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-40 object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-lg text-primary">{room.name}</h3>
                  <span className="font-body text-sm text-accent">${room.price}</span>
                </div>
                <p className="font-body text-xs text-primary/50 mb-4">{room.size} · {room.occupancy} Guests · {room.beds}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(room)}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-primary/20 text-primary rounded-lg py-2 font-body text-xs hover:bg-primary/5 transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room._id, room.name)}
                    className="flex items-center justify-center gap-1.5 border border-red-200 text-red-500 rounded-lg py-2 px-3 font-body text-xs hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <RoomFormModal
          room={editingRoom}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default AdminRooms;
