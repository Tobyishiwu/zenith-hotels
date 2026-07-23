import apiFetch from "./api";
import type { Room } from "../types/room.types";

interface RoomsResponse {
  success: boolean;
  data: Room[];
}

interface RoomResponse {
  success: boolean;
  data: Room;
}

export const getAllRooms = () => apiFetch<RoomsResponse>("/rooms");

export const getRoomBySlug = (slug: string) => apiFetch<RoomResponse>(`/rooms/${slug}`);
