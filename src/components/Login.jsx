import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin credentials
    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isAdminAuthenticated", "true");
      setError("");
      console.log("Admin login successful");
      onClose();
      navigate("/admin");
    } else {
      setError("Invalid admin credentials. Please try again.");
      setUsername("");
      setPassword("");
    }
  };

  // Show login form
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-slate-800/95 rounded-2xl shadow-2xl p-8 border border-slate-700 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-display text-center mb-2 gradient-text">
          Admin Login
        </h2>
        <p className="text-slate-300 text-center mb-8 text-sm">
          Sign in to access the admin panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm placeholder:text-slate-500"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm placeholder:text-slate-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-3 text-base font-semibold"
          >
            Admin Login
          </Button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Demo credentials: admin / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
