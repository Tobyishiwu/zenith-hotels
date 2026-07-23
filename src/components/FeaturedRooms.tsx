import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllRooms } from "../services/rooms.service";
import type { Room } from "../types/room.types";
import RoomCard from "./RoomCard";

function FeaturedRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRooms()
      .then((res) => setRooms(res.data.slice(0, 3)))
      .catch((err) => console.error("Failed to load rooms:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Accommodations</p>
        <h2 className="font-heading text-4xl text-primary">Featured Rooms & Suites</h2>
        <p className="font-body text-primary/60 mt-4 max-w-xl mx-auto">
          Each room is thoughtfully designed to blend comfort, elegance, and modern indulgence.
        </p>
      </motion.div>

      {loading ? (
        <p className="text-center font-body text-primary/50">Loading rooms...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedRooms;
