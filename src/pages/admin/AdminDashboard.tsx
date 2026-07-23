import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BedDouble, CalendarCheck, DollarSign, TrendingUp } from "lucide-react";
import { getDashboardStats } from "../../services/stats.service";
import type { DashboardStats } from "../../services/stats.service";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load stats:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="font-body text-primary/50">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="font-body text-red-500">Failed to load dashboard data.</p>;
  }

  const cards = [
    { label: "Total Rooms", value: stats.totalRooms, icon: BedDouble, color: "text-accent" },
    { label: "Total Bookings", value: stats.totalBookings, icon: CalendarCheck, color: "text-primary" },
    { label: "This Week", value: stats.bookingsThisWeek, icon: TrendingUp, color: "text-green-600" },
    { label: "Total Revenue", value: `$${stats.totalRevenue}`, icon: DollarSign, color: "text-blue-600" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-primary mb-2">Dashboard</h1>
      <p className="font-body text-primary/60 mb-8">Welcome back. Here's what's happening at Zenith Hotels.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl shadow-sm p-6">
              <Icon className={card.color} size={24} />
              <p className="font-heading text-3xl text-primary mt-3">{card.value}</p>
              <p className="font-body text-xs text-primary/50 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-xl text-primary">Recent Bookings</h2>
            <Link to="/admin/bookings" className="font-body text-xs text-accent hover:underline">
              View All
            </Link>
          </div>

          {stats.recentBookings.length === 0 ? (
            <p className="font-body text-sm text-primary/50">No bookings yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {stats.recentBookings.map((booking) => (
                <div key={booking._id} className="flex items-center justify-between border-b border-primary/5 last:border-0 pb-4 last:pb-0">
                  <div>
                    <p className="font-body text-sm text-primary">{booking.guestName}</p>
                    <p className="font-body text-xs text-primary/50">
                      {booking.room?.name || "—"} · {new Date(booking.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-body text-sm text-primary">${booking.totalPrice}</span>
                    <span className={`font-body text-xs px-3 py-1 rounded-full capitalize ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-heading text-xl text-primary mb-5">Status Breakdown</h2>
          <div className="flex flex-col gap-4">
            {Object.entries(stats.statusBreakdown).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className={`font-body text-xs px-3 py-1 rounded-full capitalize ${statusStyles[status]}`}>
                  {status}
                </span>
                <span className="font-heading text-lg text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
