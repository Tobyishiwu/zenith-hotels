import { Link } from "react-router-dom";
import { Users, BedDouble, Bath, Maximize } from "lucide-react";
import type { Room } from "../types/room.types";

interface RoomCardProps {
  room: Room;
}

function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img src={room.image} alt={room.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-white/90 px-4 py-1.5 rounded-full font-body text-sm text-primary">
          ${room.price}<span className="text-primary/50">/night</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl text-primary mb-2">{room.name}</h3>
        <p className="font-body text-sm text-primary/60 mb-4 line-clamp-2">{room.description}</p>

        <div className="flex flex-wrap gap-4 mb-5 font-body text-xs text-primary/60">
          <span className="flex items-center gap-1.5"><Maximize size={14} /> {room.size}</span>
          <span className="flex items-center gap-1.5"><Users size={14} /> {room.occupancy} Guests</span>
          <span className="flex items-center gap-1.5"><BedDouble size={14} /> {room.beds}</span>
          <span className="flex items-center gap-1.5"><Bath size={14} /> {room.bathrooms} Bath</span>
        </div>

        <Link to={`/rooms/${room.id}`} className="block text-center bg-primary text-white rounded-full py-3 font-body text-sm tracking-wide hover:bg-accent transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
