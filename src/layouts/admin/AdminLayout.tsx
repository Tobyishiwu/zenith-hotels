import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BedDouble, CalendarCheck, Image, Tag, MessageSquareQuote, FileText, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { label: "Rooms", path: "/admin/rooms", icon: BedDouble },
    { label: "Gallery", path: "/admin/gallery", icon: Image },
    { label: "Offers", path: "/admin/offers", icon: Tag },
    { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Blog", path: "/admin/blog", icon: FileText },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-heading text-xl">Zenith Hotels</h1>
          <p className="font-body text-xs text-white/50 mt-1">{admin?.name}</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-colors ${
                  isActive ? "bg-accent text-white" : "text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm text-white/70 hover:bg-white/10 transition-colors w-full">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
