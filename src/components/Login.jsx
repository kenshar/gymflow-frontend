import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin credentials
    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      setError("");
      console.log("Admin login successful");
    } else {
      setError("Invalid admin credentials. Please try again.");
      setUsername("");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl md:text-3xl font-display text-center mb-2 gradient-text">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground text-center mb-6 text-sm md:text-base">
            Welcome Admin! You have successfully logged in.
          </p>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-green-600 text-center font-medium">
              ✓ Authentication Successful
            </p>
          </div>

          <Button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="w-full py-3 text-sm md:text-base font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl md:text-3xl font-display text-center mb-2 gradient-text">
          Admin Login
        </h2>
        <p className="text-muted-foreground text-center mb-6 text-sm md:text-base">
          Sign in to access the admin panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm md:text-base"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm md:text-base"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-3 text-sm md:text-base font-semibold"
          >
            Admin Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
