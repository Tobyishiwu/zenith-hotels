import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Users, BedDouble, Bath, Maximize, Check, ArrowLeft } from "lucide-react";
import { getRoomBySlug } from "../services/rooms.service";
import type { Room } from "../types/room.types";
import RoomBookingForm from "../components/RoomBookingForm";

function RoomDetails() {
  const { roomId } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    getRoomBySlug(roomId)
      .then((res) => setRoom(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [roomId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-primary/50">Loading room...</p>
      </div>
    );
  }

  if (notFound || !room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-3xl text-primary mb-4">Room Not Found</h1>
        <Link to="/rooms" className="text-accent font-body text-sm underline">
          Back to Rooms & Suites
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{room.name} | Zenith Hotels</title>
        <meta name="description" content={room.description} />
      </Helmet>

      <section className="relative h-96">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/40" />
        <Link to="/rooms" className="absolute top-6 left-6 bg-white/90 text-primary px-4 py-2 rounded-full font-body text-sm flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Rooms
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:col-span-2">
          <h1 className="font-heading text-4xl text-primary mb-4">{room.name}</h1>
          <p className="font-body text-primary/60 leading-relaxed mb-8">{room.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 border-y border-primary/10 py-6">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Maximize className="text-accent" size={22} />
              <span className="font-body text-xs text-primary/60">{room.size}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Users className="text-accent" size={22} />
              <span className="font-body text-xs text-primary/60">{room.occupancy} Guests</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <BedDouble className="text-accent" size={22} />
              <span className="font-body text-xs text-primary/60">{room.beds}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Bath className="text-accent" size={22} />
              <span className="font-body text-xs text-primary/60">{room.bathrooms} Bath</span>
            </div>
          </div>

          <h3 className="font-heading text-xl text-primary mb-4">Room Amenities</h3>
          <ul className="grid grid-cols-2 gap-3">
            {room.amenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-2 font-body text-sm text-primary/70">
                <Check className="text-accent" size={16} /> {amenity}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="h-fit sticky top-24">
          <RoomBookingForm room={room} />
        </motion.div>
      </section>
    </div>
  );
}

export default RoomDetails;
