import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const BreadcrumbNavigation = () => {
  const location = useLocation();

  // Define breadcrumb mappings
  const breadcrumbMap = {
    "/admin": [{ label: "Admin Dashboard", path: "/admin" }],
    "/admin/dashboard": [
      { label: "Admin Dashboard", path: "/admin" },
      { label: "Dashboard Overview", path: "/admin/dashboard" }
    ],
    "/admin/workout-logging": [
      { label: "Admin Dashboard", path: "/admin" },
      { label: "Workout Logging", path: "/admin/workout-logging" }
    ]
  };

  // Handle dynamic member profile routes
  const memberProfileMatch = location.pathname.match(/^\/admin\/member\/(\d+)$/);
  if (memberProfileMatch) {
    const memberId = memberProfileMatch[1];
    breadcrumbMap[location.pathname] = [
      { label: "Admin Dashboard", path: "/admin" },
      { label: "Member Profile", path: `/admin/member/${memberId}` }
    ];
  }

  const breadcrumbs = breadcrumbMap[location.pathname] || [];

  // Don't show breadcrumbs on home page or if no mapping exists
  if (location.pathname === "/" || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="bg-slate-800/50 border-b border-border">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            to="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home size={16} />
            Home
          </Link>

          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-muted-foreground" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-foreground font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BreadcrumbNavigation;
