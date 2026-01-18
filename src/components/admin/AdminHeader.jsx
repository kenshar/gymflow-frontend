import { LogOut, BarChart3, Dumbbell } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider gradient-text">
            ADMIN DASHBOARD
          </h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/admin/dashboard")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
            >
              <BarChart3 size={18} />
              Dashboard
            </Button>
            <Button
              onClick={() => navigate("/admin/workout-logging")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
            >
              <Dumbbell size={18} />
              Workout Logging
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
