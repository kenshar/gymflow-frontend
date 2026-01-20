import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { Button } from "../components/ui/button";
import { membersAPI, attendanceAPI, membershipsAPI } from "../lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersRes, checkInsRes, plansRes] = await Promise.all([
        membersAPI.getAll().catch(() => ({ members: [] })),
        attendanceAPI.getToday().catch(() => ({ attendance: [] })),
        membershipsAPI.getPlans().catch(() => ({ plans: [] })),
      ]);
      setMembers(membersRes.members || []);
      setCheckIns(checkInsRes.attendance || []);
      setMembershipPlans(plansRes.plans || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calculate stats from real data
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.is_active).length;
  const inactiveMembers = totalMembers - activeMembers;
  const todaysCheckIns = checkIns.length;

  // Revenue calculation based on membership plans
  const totalRevenue = membershipPlans.reduce((sum, plan) => {
    const membersWithPlan = members.filter(m => m.is_active).length;
    return sum + (plan.price * membersWithPlan / membershipPlans.length);
  }, 0);

  // Recent members (joined in last 7 days)
  const recentMembers = members.filter(m => {
    const createdDate = new Date(m.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate >= weekAgo;
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider gradient-text">
            DASHBOARD
          </h1>
          <div className="flex gap-3">
            <Button
              onClick={loadData}
              variant="outline"
              size="icon"
              className="border-border"
              title="Refresh data"
            >
              <RefreshCw size={18} />
            </Button>
            <Button
              onClick={() => navigate("/admin")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Admin Panel
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Members */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                  <p className="text-3xl font-bold text-primary">{totalMembers}</p>
                </div>
                <Users size={32} className="text-primary/60" />
              </div>
            </div>

            {/* Active Members */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                  <p className="text-3xl font-bold text-green-400">{activeMembers}</p>
                </div>
                <UserCheck size={32} className="text-green-400/60" />
              </div>
            </div>

            {/* Today's Check-ins */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Check-ins</p>
                  <p className="text-3xl font-bold text-blue-400">{todaysCheckIns}</p>
                </div>
                <Activity size={32} className="text-blue-400/60" />
              </div>
            </div>

            {/* New This Week */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New This Week</p>
                  <p className="text-3xl font-bold text-yellow-400">{recentMembers}</p>
                </div>
                <TrendingUp size={32} className="text-yellow-400/60" />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Member Stats */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                Member Statistics
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserCheck size={16} className="text-green-400" />
                    <span className="text-sm font-medium">Active Memberships</span>
                  </div>
                  <span className="text-green-400 font-bold">{activeMembers}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-500/10 border border-gray-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm font-medium">Inactive Members</span>
                  </div>
                  <span className="text-gray-400 font-bold">{inactiveMembers}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity size={16} className="text-blue-400" />
                    <span className="text-sm font-medium">Today's Check-ins</span>
                  </div>
                  <span className="text-blue-400 font-bold">{todaysCheckIns}</span>
                </div>

                {membershipPlans.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign size={16} className="text-purple-400" />
                      <span className="text-sm font-medium">Available Plans</span>
                    </div>
                    <span className="text-purple-400 font-bold">{membershipPlans.length}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/admin")}
                  className="w-full justify-between"
                  variant="outline"
                >
                  <span>Manage Members</span>
                  <ArrowRight size={16} />
                </Button>

                <Button
                  onClick={() => navigate("/admin/workout-logging")}
                  className="w-full justify-between"
                  variant="outline"
                >
                  <span>Log Workout</span>
                  <ArrowRight size={16} />
                </Button>

                <Button
                  onClick={() => navigate("/admin")}
                  className="w-full justify-between"
                  variant="outline"
                >
                  <span>Check-In Members</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Membership Plans */}
          <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Membership Plans
            </h3>

            {membershipPlans.length > 0 ? (
              <div className="space-y-4">
                {membershipPlans.map((plan) => (
                  <div key={plan.id} className="p-4 bg-slate-600/30 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{plan.name}</h4>
                      <span className="text-primary font-bold text-xl">KES {plan.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      <span>{plan.duration_days} days</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No membership plans configured</p>
            )}
          </div>

          {/* Recent Members */}
          <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Recent Members
            </h3>

            <div className="space-y-3">
              {members.slice(-5).reverse().map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      member.is_active ? 'bg-green-500/30' : 'bg-gray-500/30'
                    }`}>
                      {(member.first_name?.[0] || member.username?.[0] || '?').toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {member.first_name && member.last_name
                          ? `${member.first_name} ${member.last_name}`
                          : member.username}
                      </p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    member.is_active
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {member.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}

              {members.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No members yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
