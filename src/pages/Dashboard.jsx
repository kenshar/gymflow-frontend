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
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    const savedMembers = localStorage.getItem("gymMembers");
    const savedCheckIns = localStorage.getItem("gymCheckIns");
    if (savedMembers) setMembers(JSON.parse(savedMembers));
    if (savedCheckIns) setCheckIns(JSON.parse(savedCheckIns));
  }, []);

  // Helper functions
  const isMembershipExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const isPaymentOverdue = (dueDate, paymentStatus) => {
    return paymentStatus !== "paid" && dueDate && new Date(dueDate) < new Date();
  };

  const getActiveStatus = (member) => {
    const expired = isMembershipExpired(member.endDate);
    const today = new Date().toISOString().split('T')[0];
    const hasStarted = new Date(member.startDate) <= new Date(today);
    return hasStarted && !expired ? "Active" : "Inactive";
  };

  // Calculate stats
  const totalMembers = members.length;
  const activeMembers = members.filter(m => getActiveStatus(m) === "Active").length;
  const inactiveMembers = totalMembers - activeMembers;
  const expiredMembers = members.filter(m => isMembershipExpired(m.endDate)).length;
  const overduePayments = members.filter(m => isPaymentOverdue(m.paymentDueDate, m.paymentStatus)).length;

  // Today's check-ins
  const today = new Date().toISOString().split('T')[0];
  const todaysCheckIns = checkIns.filter(ci => ci.date === today).length;

  // Attendance data for last 7 days
  const getLast7DaysAttendance = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = checkIns.filter(ci => ci.date === dateStr).length;
      dates.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count
      });
    }
    return dates;
  };

  const attendanceData = getLast7DaysAttendance();
  const maxAttendance = Math.max(...attendanceData.map(d => d.count));

  // Revenue calculation (simplified)
  const monthlyRevenue = members.reduce((sum, member) => {
    if (member.planType === "monthly" && getActiveStatus(member) === "Active") {
      return sum + parseFloat(member.paymentAmount || 0);
    }
    return sum;
  }, 0);

  const annualRevenue = members.reduce((sum, member) => {
    if (member.planType === "annual" && getActiveStatus(member) === "Active") {
      return sum + parseFloat(member.paymentAmount || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider gradient-text">
            DASHBOARD
          </h1>
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            Admin Panel
          </Button>
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

            {/* Monthly Revenue */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-yellow-400">Ksh {monthlyRevenue.toFixed(2)}</p>
                </div>
                <DollarSign size={32} className="text-yellow-400/60" />
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alerts */}
            <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-400" />
                Alerts & Notifications
              </h3>

              <div className="space-y-4">
                {expiredMembers > 0 && (
                  <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={16} className="text-red-400" />
                      <span className="text-sm font-medium">Expired Memberships</span>
                    </div>
                    <span className="text-red-400 font-bold">{expiredMembers}</span>
                  </div>
                )}

                {overduePayments > 0 && (
                  <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={16} className="text-orange-400" />
                      <span className="text-sm font-medium">Overdue Payments</span>
                    </div>
                    <span className="text-orange-400 font-bold">{overduePayments}</span>
                  </div>
                )}

                {inactiveMembers > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-500/10 border border-gray-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm font-medium">Inactive Members</span>
                    </div>
                    <span className="text-gray-400 font-bold">{inactiveMembers}</span>
                  </div>
                )}

                {expiredMembers === 0 && overduePayments === 0 && inactiveMembers === 0 && (
                  <div className="text-center py-8">
                    <div className="text-green-400 mb-2">✓</div>
                    <p className="text-muted-foreground">All systems operational</p>
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

          {/* Attendance Chart */}
          <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" />
              7-Day Attendance Overview
            </h3>

            <div className="flex items-end justify-between h-32 gap-2">
              {attendanceData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full bg-primary/60 rounded-t transition-all hover:bg-primary/80"
                      style={{
                        height: maxAttendance > 0 ? `${(day.count / maxAttendance) * 100}%` : '4px',
                        minHeight: '4px'
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">{day.day}</span>
                  <span className="text-sm font-medium">{day.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Check-ins over the last 7 days
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              Recent Activity
            </h3>

            <div className="space-y-3">
              {checkIns.slice(-5).reverse().map((checkIn) => (
                <div key={checkIn.id} className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Activity size={16} className="text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{checkIn.memberName}</p>
                      <p className="text-xs text-muted-foreground">Checked in on {checkIn.date}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    {checkIn.time}
                  </span>
                </div>
              ))}

              {checkIns.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
