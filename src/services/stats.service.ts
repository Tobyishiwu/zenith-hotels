import apiFetch from "./api";

export interface DashboardStats {
  totalRooms: number;
  totalBookings: number;
  bookingsThisWeek: number;
  totalRevenue: number;
  statusBreakdown: {
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
  recentBookings: {
    _id: string;
    guestName: string;
    room: { name: string };
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: string;
  }[];
}

interface StatsResponse {
  success: boolean;
  data: DashboardStats;
}

export const getDashboardStats = () => apiFetch<StatsResponse>("/stats/dashboard");
