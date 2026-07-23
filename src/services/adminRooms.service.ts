import apiFetch from "./api";
import type { Room } from "../types/room.types";

export interface RoomPayload {
  name: string;
  slug: string;
  image: string;
  price: number;
  size: string;
  occupancy: number;
  beds: string;
  bathrooms: number;
  description: string;
  amenities: string[];
}

interface RoomsResponse {
  success: boolean;
  data: Room[];
}

interface RoomResponse {
  success: boolean;
  data: Room;
}

export const getAllRooms = () => apiFetch<RoomsResponse>("/rooms");

export const createRoom = (payload: RoomPayload) =>
  apiFetch<RoomResponse>("/rooms", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateRoom = (id: string, payload: Partial<RoomPayload>) =>
  apiFetch<RoomResponse>(`/rooms/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteRoom = (id: string) =>
  apiFetch<{ success: boolean }>(`/rooms/${id}`, { method: "DELETE" });
