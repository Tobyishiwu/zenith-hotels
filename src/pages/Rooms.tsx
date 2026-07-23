import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { getAllRooms } from "../services/rooms.service";
import type { Room } from "../types/room.types";
import RoomCard from "../components/RoomCard";

function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllRooms()
      .then((res) => setRooms(res.data))
      .catch(() => setError("Failed to load rooms. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Rooms & Suites | Zenith Hotels</title>
        <meta name="description" content="Explore our collection of luxury rooms and suites, each designed for comfort and elegance." />
      </Helmet>

      <section className="relative h-80 flex items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2000')" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
          <p className="font-body text-accent uppercase tracking-[0.3em] text-xs mb-3">Accommodations</p>
          <h1 className="font-heading text-5xl text-white">Rooms & Suites</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        {loading && <p className="text-center font-body text-primary/50">Loading rooms...</p>}
        {error && <p className="text-center font-body text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Rooms;
