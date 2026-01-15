import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [members, setMembers] = useState([]);
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Essential Fitness",
  });

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
  };  const handleAddMember = (e) => {
    e.preventDefault();
    
    if (!memberForm.name || !memberForm.email || !memberForm.phone) {
      alert("Please fill in all fields");
      return;
    }

    const newMember = {
      id: Date.now(),
      ...memberForm,
    };

    setMembers([...members, newMember]);
    setMemberForm({
      name: "",
      email: "",
      phone: "",
      membership: "Essential Fitness",
    });
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  if (isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl md:text-3xl font-display mb-2 gradient-text">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Welcome Admin! Manage gym members here.
          </p>

          <div className="space-y-6">
            {/* Add Member Form */}
            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus size={20} className="text-primary" />
                Add New Member
              </h3>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                      placeholder="Member name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                      placeholder="member@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={memberForm.phone}
                      onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Membership Type</label>
                    <select
                      value={memberForm.membership}
                      onChange={(e) => setMemberForm({...memberForm, membership: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    >
                      <option value="Essential Fitness">Essential Fitness</option>
                      <option value="Diverse Group Class">Diverse Group Class</option>
                      <option value="Wellness % Recovery">Wellness % Recovery</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-2 text-sm md:text-base font-semibold"
                >
                  Add Member
                </Button>
              </form>
            </div>

            {/* Members List */}
            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">
                Members ({members.length})
              </h3>

              {members.length === 0 ? (
                <p className="text-muted-foreground text-sm">No members added yet.</p>
              ) : (
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">{member.phone}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded capitalize">
                          {member.membership}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="ml-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => {
                setIsAuthenticated(false);
                onClose();
              }}
              className="w-full py-2 text-sm md:text-base font-semibold"
              variant="outline"
            >
              Logout
            </Button>
          </div>
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
