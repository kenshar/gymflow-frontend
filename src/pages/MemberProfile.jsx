import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Activity, Dumbbell, Clock, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const savedMembers = localStorage.getItem("gymMembers");
    if (savedMembers) {
      const members = JSON.parse(savedMembers);
      const foundMember = members.find(m => m.id === parseInt(id));
      setMember(foundMember);
    }
  }, [id]);

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Member not found</p>
          <Button onClick={() => navigate("/admin")}>Back to Admin</Button>
        </div>
      </div>
    );
  }

  // Helper functions
  const isMembershipExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const isPaymentOverdue = (dueDate, paymentStatus) => {
    return paymentStatus !== "paid" && new Date(dueDate) < new Date();
  };

  const getAttendanceFrequency = (records = []) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return records.filter(record => new Date(record.date) >= thirtyDaysAgo).length;
  };

  const getActiveStatus = (member) => {
    const expired = isMembershipExpired(member.endDate);
    const today = new Date().toISOString().split('T')[0];
    const hasStarted = new Date(member.startDate) <= new Date(today);
    return hasStarted && !expired ? "Active" : "Inactive";
  };

  const expired = isMembershipExpired(member.endDate);
  const overdue = isPaymentOverdue(member.paymentDueDate, member.paymentStatus);
  const attendanceFrequency = getAttendanceFrequency(member.attendanceRecords);
  const activeStatus = getActiveStatus(member);
  const totalWorkouts = member.recentWorkouts?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
          >
            <ArrowLeft size={18} />
            Back to Admin
          </Button>
          <h1 className="font-display text-2xl md:text-3xl tracking-wider gradient-text">
            MEMBER PROFILE
          </h1>
          <div></div> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Member Header */}
          <div className="bg-slate-700/80 rounded-xl p-8 border border-border mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <User size={32} className="text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-semibold mb-2">{member.name}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded ${
                    activeStatus === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {activeStatus}
                  </span>
                  {expired && (
                    <span className="inline-block px-3 py-1 text-sm bg-red-600 text-white rounded font-semibold">
                      EXPIRED
                    </span>
                  )}
                  {overdue && (
                    <span className="inline-block px-3 py-1 text-sm bg-orange-600 text-white rounded font-semibold">
                      PAYMENT OVERDUE
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>📧 {member.email}</div>
                  <div>📱 {member.phone}</div>
                  <div>💪 {member.membership}</div>
                  <div>📅 Plan: {member.planType || "monthly"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Membership & Payment Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Membership Details */}
              <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-primary" />
                  Membership Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">{member.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="font-medium">{member.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exercise:</span>
                    <span className="font-medium">{member.allocatedExercise} - {member.allocatedSets}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              {member.paymentDueDate && (
                <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold mb-4">Payment Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">Ksh {parseFloat(member.paymentAmount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="font-medium">{member.paymentDueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`font-medium ${
                        member.paymentStatus === "paid" ? "text-green-400" : "text-orange-400"
                      }`}>
                        {member.paymentStatus || "pending"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Overview */}
              <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" />
                  Quick Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last 30 Days:</span>
                    <span className="font-medium">{attendanceFrequency} visits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Workouts:</span>
                    <span className="font-medium">{totalWorkouts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membership:</span>
                    <span className="font-medium">{member.membership}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance & Workouts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Attendance */}
              <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-primary" />
                  Recent Attendance
                </h3>
                {member.attendanceRecords && member.attendanceRecords.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {member.attendanceRecords.slice(-10).reverse().map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Activity size={16} className="text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Check-in</p>
                            <p className="text-xs text-muted-foreground">{record.date}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          Present
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No attendance records yet</p>
                )}
              </div>

              {/* Recent Workouts */}
              <div className="bg-slate-700/80 rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Dumbbell size={20} className="text-primary" />
                  Recent Workouts
                </h3>
                {member.recentWorkouts && member.recentWorkouts.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {member.recentWorkouts.map((workout) => (
                      <div key={workout.id} className="bg-slate-600/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{workout.date}</h4>
                          {workout.duration && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock size={14} />
                              {workout.duration} min
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          {workout.exercises?.map((exercise, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{exercise.name}</span>
                              <span className="font-medium">
                                {exercise.sets} sets × {exercise.reps} reps
                                {exercise.weight && ` @ ${exercise.weight} lbs`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No workouts logged yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberProfile;
