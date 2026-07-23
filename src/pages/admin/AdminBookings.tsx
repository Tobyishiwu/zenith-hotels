import { useEffect, useState } from "react";
import { Check, X, Clock, CheckCheck } from "lucide-react";
import { getAllBookings, updateBookingStatus } from "../../services/adminBookings.service";
import type { AdminBooking } from "../../services/adminBookings.service";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

function AdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = () => {
    setLoading(true);
    getAllBookings()
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to load bookings:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: status as AdminBooking["status"] } : b)));
    } catch (err) {
      console.error("Failed to update booking:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <h1 className="font-heading text-3xl text-primary mb-2">Bookings</h1>
      <p className="font-body text-primary/60 mb-6">Manage guest reservations and update their status.</p>

      <div className="flex gap-2 mb-6">
        {["all", "pending", "confirmed", "cancelled", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-body text-xs px-4 py-2 rounded-full capitalize transition-colors ${
              filter === f ? "bg-accent text-white" : "bg-white text-primary/60 hover:bg-primary/5"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="font-body text-primary/50">Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="font-body text-primary/50">No bookings found.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-primary/10 text-left">
                <th className="font-body text-xs text-primary/50 uppercase px-6 py-4">Guest</th>
                <th className="font-body text-xs text-primary/50 uppercase px-6 py-4">Room</th>
                <th className="font-body text-xs text-primary/50 uppercase px-6 py-4">Check-In</th>
                <th className="font-body text-xs text-primary/50 uppercase px-6 py-4">Check-Out</th>
                <th className="font-body text-xs text-primary/50 uppercase px-6 py-4">Total</th>
                <th className="font-body text-xs text-primary/50 uppercase px-6 py-4">Status</th>
                <th className="font-body text-xs text-primary/50 uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="border-b border-primary/5 last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-primary">{booking.guestName}</p>
                    <p className="font-body text-xs text-primary/50">{booking.guestEmail}</p>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-primary/70">{booking.room?.name || "—"}</td>
                  <td className="px-6 py-4 font-body text-sm text-primary/70">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-primary/70">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-primary">${booking.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span className={`font-body text-xs px-3 py-1 rounded-full capitalize ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {booking.status === "pending" && (
                        <button
                          onClick={() => handleStatusChange(booking._id, "confirmed")}
                          disabled={updatingId === booking._id}
                          title="Confirm"
                          className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {(booking.status === "pending" || booking.status === "confirmed") && (
                        <button
                          onClick={() => handleStatusChange(booking._id, "cancelled")}
                          disabled={updatingId === booking._id}
                          title="Cancel"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          <X size={16} />
                        </button>
                      )}
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => handleStatusChange(booking._id, "completed")}
                          disabled={updatingId === booking._id}
                          title="Mark Completed"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
                        >
                          <CheckCheck size={16} />
                        </button>
                      )}
                      {booking.status === "cancelled" && (
                        <span className="p-2 text-primary/30">
                          <Clock size={16} />
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminBookings;

