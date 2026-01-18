import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Edit, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("gymMembers");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [expandedMember, setExpandedMember] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Essential Fitness",
    planType: "monthly",
    startDate: "",
    endDate: "",
    paymentAmount: "",
    paymentDueDate: "",
  });
  const [exercises] = useState([
    {
      id: 1,
      name: "Bench Press",
      repRanges: ["1-5", "1-10", "1-15"],
    },
    {
      id: 2,
      name: "Kegel",
      repRanges: ["1-5", "1-10", "1-15"],
    },
    {
      id: 3,
      name: "Squats",
      repRanges: ["1-5", "1-10", "1-15"],
    },
    {
      id: 4,
      name: "Burpees",
      repRanges: ["1-5", "1-10", "1-15"],
    },
  ]);
  const [exerciseForm, setExerciseForm] = useState({
    exercise: "",
    sets: "",
  });

  // Save members to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gymMembers", JSON.stringify(members));
  }, [members]);

  // Helper function to check if membership is expired
  const isMembershipExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  // Helper function to check if payment is overdue
  const isPaymentOverdue = (dueDate, paymentStatus) => {
    return paymentStatus !== "paid" && new Date(dueDate) < new Date();
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    
    if (!memberForm.name || !memberForm.email || !memberForm.phone || !memberForm.startDate || !memberForm.endDate) {
      alert("Please fill in all fields including membership dates");
      return;
    }

    if (!exerciseForm.exercise || !exerciseForm.sets) {
      alert("Please select an exercise and sets");
      return;
    }

    if (editingMemberId) {
      // Update existing member
      setMembers(members.map(member => 
        member.id === editingMemberId
          ? {
              ...member,
              ...memberForm,
              allocatedExercise: exerciseForm.exercise,
              allocatedSets: exerciseForm.sets,
            }
          : member
      ));
      setEditingMemberId(null);
    } else {
      // Create new member
      const newMember = {
        id: Date.now(),
        ...memberForm,
        paymentAmount: memberForm.paymentAmount || "0",
        paymentDueDate: memberForm.paymentDueDate || "",
        paymentStatus: "pending",
        allocatedExercise: exerciseForm.exercise,
        allocatedSets: exerciseForm.sets,
        attendanceRecords: [],
        recentWorkouts: [],
      };
      setMembers([...members, newMember]);
    }
    
    setMemberForm({
      name: "",
      email: "",
      phone: "",
      membership: "Essential Fitness",
      planType: "monthly",
      startDate: "",
      endDate: "",
      paymentAmount: "",
      paymentDueDate: "",
    });
    setExerciseForm({
      exercise: "",
      sets: "",
    });
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleEditMember = (member) => {
    setEditingMemberId(member.id);
    setMemberForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      membership: member.membership,
      planType: member.planType || "monthly",
      startDate: member.startDate,
      endDate: member.endDate,
      paymentAmount: member.paymentAmount || "",
      paymentDueDate: member.paymentDueDate || "",
    });
    setExerciseForm({
      exercise: member.allocatedExercise,
      sets: member.allocatedSets,
    });
    setExpandedMember(null);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setMemberForm({
      name: "",
      email: "",
      phone: "",
      membership: "Essential Fitness",
      planType: "monthly",
      startDate: "",
      endDate: "",
      paymentAmount: "",
      paymentDueDate: "",
    });
    setExerciseForm({
      exercise: "",
      sets: "",
    });
  };

  const handleUpdatePaymentStatus = (id, status) => {
    setMembers(members.map(member => 
      member.id === id ? {...member, paymentStatus: status} : member
    ));
  };

  // Add attendance record
  const handleAddAttendance = (memberId) => {
    const today = new Date().toISOString().split('T')[0];
    setMembers(members.map(member => 
      member.id === memberId 
        ? {
            ...member, 
            attendanceRecords: [
              ...(member.attendanceRecords || []),
              { date: today, id: Date.now() }
            ]
          } 
        : member
    ));
  };

  // Add workout record
  const handleAddWorkout = (memberId, exerciseName, duration) => {
    const today = new Date().toISOString().split('T')[0];
    setMembers(members.map(member => 
      member.id === memberId 
        ? {
            ...member, 
            recentWorkouts: [
              {
                id: Date.now(),
                exercise: exerciseName,
                date: today,
                duration: duration,
              },
              ...(member.recentWorkouts || []).slice(0, 4)
            ]
          } 
        : member
    ));
  };

  // Calculate attendance frequency (workouts in last 30 days)
  const getAttendanceFrequency = (records = []) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return records.filter(record => new Date(record.date) >= thirtyDaysAgo).length;
  };

  // Get active status (whether membership is active and not expired)
  const getActiveStatus = (member) => {
    const expired = isMembershipExpired(member.endDate);
    const today = new Date().toISOString().split('T')[0];
    const hasStarted = new Date(member.startDate) <= new Date(today);
    return hasStarted && !expired ? "Active" : "Inactive";
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider gradient-text">
            ADMIN DASHBOARD
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500/10 flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 space-y-6">
          {/* Add/Edit Member & Exercise Form */}
          <div className="bg-slate-700/80 rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Plus size={24} className="text-primary" />
              {editingMemberId ? "Edit Member & Exercise" : "Add New Member & Select Exercise"}
            </h3>

            <form onSubmit={handleAddMember} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
                    placeholder="Member name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
                    placeholder="member@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Phone</label>
                  <input
                    type="tel"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
                    placeholder="+254 () 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Membership Type</label>
                  <select
                    value={memberForm.membership}
                    onChange={(e) => setMemberForm({...memberForm, membership: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  >
                    <option value="Essential Fitness">Essential Fitness</option>
                    <option value="Diverse Group Class">Diverse Group Class</option>
                    <option value="Wellness % Recovery">Wellness % Recovery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Plan Type</label>
                  <select
                    value={memberForm.planType}
                    onChange={(e) => setMemberForm({...memberForm, planType: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Start Date</label>
                  <input
                    type="date"
                    value={memberForm.startDate}
                    onChange={(e) => setMemberForm({...memberForm, startDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">End Date</label>
                  <input
                    type="date"
                    value={memberForm.endDate}
                    onChange={(e) => setMemberForm({...memberForm, endDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Payment Amount</label>
                  <input
                    type="number"
                    value={memberForm.paymentAmount}
                    onChange={(e) => setMemberForm({...memberForm, paymentAmount: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Payment Due Date</label>
                  <input
                    type="date"
                    value={memberForm.paymentDueDate}
                    onChange={(e) => setMemberForm({...memberForm, paymentDueDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Exercise</label>
                  <select
                    value={exerciseForm.exercise}
                    onChange={(e) => setExerciseForm({...exerciseForm, exercise: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  >
                    <option value="">Select an exercise</option>
                    {exercises.map((exercise) => (
                      <option key={exercise.id} value={exercise.name}>
                        {exercise.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Sets</label>
                  <select
                    value={exerciseForm.sets}
                    onChange={(e) => setExerciseForm({...exerciseForm, sets: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  >
                    <option value="">Select sets</option>
                    <option value="1-5">1-5 reps</option>
                    <option value="1-10">1-10 reps</option>
                    <option value="1-15">1-15 reps</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 py-3 text-base font-semibold"
                >
                  {editingMemberId ? "Update Member & Exercise" : "Add Member & Exercise"}
                </Button>
                {editingMemberId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex-1 py-3 text-base font-semibold"
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Members List */}
          <div className="bg-slate-700/80 rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-6">
              Members ({members.length})
            </h3>

            {members.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No members added yet.</p>
            ) : (
              <div className="space-y-4">
                {members.map((member) => {
                  const expired = isMembershipExpired(member.endDate);
                  const overdue = isPaymentOverdue(member.paymentDueDate, member.paymentStatus);
                  const attendanceFrequency = getAttendanceFrequency(member.attendanceRecords);
                  const activeStatus = getActiveStatus(member);
                  const isExpanded = expandedMember === member.id;

                  return (
                    <div
                      key={member.id}
                      className={`rounded-lg border transition-all ${
                        expired || overdue
                          ? "bg-red-500/10 border-red-500/30"
                          : "bg-slate-600/50 border-border"
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <p className="font-medium text-lg">{member.name}</p>
                              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                                activeStatus === "Active" 
                                  ? "bg-green-500/20 text-green-400" 
                                  : "bg-gray-500/20 text-gray-400"
                              }`}>
                                {activeStatus}
                              </span>
                              {expired && (
                                <span className="inline-block px-3 py-1 text-xs bg-red-600 text-white rounded font-semibold">
                                  EXPIRED
                                </span>
                              )}
                              {overdue && (
                                <span className="inline-block px-3 py-1 text-xs bg-orange-600 text-white rounded font-semibold">
                                  OVERDUE
                                </span>
                              )}
                            </div>

                            {/* Summary Row */}
                            <div className="flex gap-6 text-sm text-muted-foreground mb-3 flex-wrap">
                              <span>📊 Attendance: {attendanceFrequency} visits (last 30 days)</span>
                              <span>💪 Latest Workout: {member.recentWorkouts?.[0]?.date || "N/A"}</span>
                            </div>

                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <p className="text-sm text-muted-foreground">{member.phone}</p>
                          </div>

                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => setExpandedMember(isExpanded ? null : member.id)}
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            <button
                              onClick={() => handleEditMember(member)}
                              className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                              title="Edit member"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id)}
                              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete member"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-border space-y-6">
                            {/* Basic Info */}
                            <div>
                              <p className="text-sm font-semibold mb-3">Membership Details</p>
                              <div className="text-sm text-muted-foreground space-y-2 grid grid-cols-2 gap-4">
                                <p>Type: {member.membership}</p>
                                <p>Plan: <span className="font-medium text-foreground capitalize">{member.planType || "monthly"}</span></p>
                                <p>Start: {member.startDate}</p>
                                <p>End: {member.endDate}</p>
                                <p>Exercise: {member.allocatedExercise} - {member.allocatedSets}</p>
                              </div>
                            </div>

                            {/* Payment Info */}
                            {member.paymentDueDate && (
                              <div>
                                <p className="text-sm font-semibold mb-3">Payment Info</p>
                                <div className="flex gap-4 items-center text-sm flex-wrap">
                                  <span>Amount: ${parseFloat(member.paymentAmount || 0).toFixed(2)}</span>
                                  <span>Due: {member.paymentDueDate}</span>
                                  <select
                                    value={member.paymentStatus}
                                    onChange={(e) => handleUpdatePaymentStatus(member.id, e.target.value)}
                                    className={`px-3 py-1 rounded text-sm font-medium cursor-pointer ${
                                      member.paymentStatus === "paid"
                                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                        : "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                                    }`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {/* Attendance Summary */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-semibold">Attendance Summary</p>
                                <button
                                  onClick={() => handleAddAttendance(member.id)}
                                  className="px-3 py-1 text-sm bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                                >
                                  + Log Visit
                                </button>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Total: {attendanceFrequency} visits (last 30 days)
                              </p>
                              {member.attendanceRecords && member.attendanceRecords.length > 0 && (
                                <div className="text-sm text-muted-foreground space-y-1 max-h-24 overflow-y-auto">
                                  <p>Recent visits:</p>
                                  {member.attendanceRecords.slice(-5).reverse().map((record) => (
                                    <div key={record.id} className="text-sm">✓ {record.date}</div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Recent Workouts */}
                            <div>
                              <p className="text-sm font-semibold mb-3">Recent Workouts</p>
                              {member.recentWorkouts && member.recentWorkouts.length > 0 ? (
                                <div className="space-y-2">
                                  {member.recentWorkouts.map((workout) => (
                                    <div key={workout.id} className="text-sm bg-slate-700/50 p-3 rounded">
                                      <p className="font-medium">{workout.exercise}</p>
                                      <p className="text-muted-foreground">
                                        {workout.date} {workout.duration ? `• ${workout.duration} min` : ""}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">No workouts logged yet</p>
                              )}
                              <button
                                onClick={() => {
                                  const duration = prompt("Duration (minutes):", "30");
                                  if (duration) handleAddWorkout(member.id, member.allocatedExercise, duration);
                                }}
                                className="mt-3 px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                              >
                                + Log Workout
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
