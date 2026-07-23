import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError((err as Error).message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="font-heading text-3xl text-primary text-center mb-1">Zenith Hotels</h1>
        <p className="font-body text-sm text-primary/50 text-center mb-8">Admin Dashboard</p>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-lg p-3 mb-5 font-body text-xs">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Mail size={14} /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-primary/20 pb-2 font-body text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-white rounded-full py-3.5 font-body text-sm tracking-wide hover:bg-primary transition-colors disabled:opacity-60 mt-2"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
