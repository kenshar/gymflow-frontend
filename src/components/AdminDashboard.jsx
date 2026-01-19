import { useState, useEffect } from "react";
import { X, Plus, Trash2, ChevronDown, ChevronUp, Edit, Users, Activity, Calendar, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

const AdminDashboard = ({ isOpen, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("gymMembers");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [expandedMember, setExpandedMember] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Essential Fitness",
    planType: "monthly",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    paymentAmount: "",
    paymentDueDate: "",
  });

  const [exercises] = useState([
    { id: 1, name: "Bench Press", repRanges: ["1-5", "1-10", "1-15"] },
    { id: 2, name: "Kegel", repRanges: ["1-5", "1-10", "1-15"] },
    { id: 3, name: "Squats", repRanges: ["1-5", "1-10", "1-15"] },
    { id: 4, name: "Burpees", repRanges: ["1-5", "1-10", "1-15"] },
  ]);

  const [exerciseForm, setExerciseForm] = useState({
    exercise: "",
    sets: "",
  });

  const membershipPlans = [
    { id: 1, name: "Essential Fitness", price: 2500 },
    { id: 2, name: "Diverse Group Class", price: 3500 },
    { id: 3, name: "Wellness & Recovery", price: 4500 },
  ];

  // Save members to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gymMembers", JSON.stringify(members));
  }, [members]);

  // Auto-calculate end date based on plan type
  useEffect(() => {
    if (memberForm.startDate && memberForm.planType) {
      const startDate = new Date(memberForm.startDate);
      const endDate = new Date(startDate);

      if (memberForm.planType === "monthly") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (memberForm.planType === "annual") {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      setMemberForm(prev => ({
        ...prev,
        endDate: endDate.toISOString().split('T')[0]
      }));
    }
  }, [memberForm.startDate, memberForm.planType]);

  // Auto-set payment amount based on membership plan
  useEffect(() => {
    const plan = membershipPlans.find(p => p.name === memberForm.membership);
    if (plan) {
      const amount = memberForm.planType === "annual" ? plan.price * 12 : plan.price;
      setMemberForm(prev => ({
        ...prev,
        paymentAmount: amount.toString()
      }));
    }
  }, [memberForm.membership, memberForm.planType]);

  if (!isOpen) return null;

  const isMembershipExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const isPaymentOverdue = (dueDate, paymentStatus) => {
    return paymentStatus !== "paid" && new Date(dueDate) < new Date();
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!memberForm.name || !memberForm.email || !memberForm.phone || !memberForm.startDate || !memberForm.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    if (!exerciseForm.exercise || !exerciseForm.sets) {
      alert("Please select an exercise and sets");
      return;
    }

    setLoading(true);

    try {
      if (editingMemberId) {
        // Update existing member (keep localStorage for now)
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
        // Create new member - save to backend
        const response = await fetch(`${API_URL}/api/admin/members/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: memberForm.name,
            email: memberForm.email,
            phone: memberForm.phone,
            membership: memberForm.membership,
            startDate: memberForm.startDate,
            endDate: memberForm.endDate,
            paymentAmount: memberForm.paymentAmount,
            paymentDueDate: memberForm.paymentDueDate,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create member');
        }

        const data = await response.json();

        // Show success message with credentials
        alert(`✅ Member created successfully!\n\n👤 Username: ${data.member.username}\n🔑 Password: ${data.default_password}\n\n⚠️ Please save these credentials!`);

        // Add to local state with allocated exercise info
        const newMember = {
          id: data.member.id,
          name: memberForm.name,
          email: data.member.email,
          phone: data.member.phone,
          membership: memberForm.membership,
          planType: memberForm.planType,
          startDate: memberForm.startDate,
          endDate: memberForm.endDate,
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

      // Reset form
      setMemberForm({
        name: "",
        email: "",
        phone: "",
        membership: "Essential Fitness",
        planType: "monthly",
        startDate: new Date().toISOString().split('T')[0],
        endDate: "",
        paymentAmount: "",
        paymentDueDate: "",
      });
      setExerciseForm({
        exercise: "",
        sets: "",
      });
    } catch (error) {
      console.error('Error creating member:', error);
      alert(`❌ Error: ${error.message}\n\nMake sure the backend server is running!`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = (id) => {
    if (confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter(member => member.id !== id));
    }
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
      startDate: new Date().toISOString().split('T')[0],
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

  // Calculate stats
  const activeMembers = members.filter(m => getActiveStatus(m) === "Active").length;
  const todayCheckIns = members.filter(m => {
    const today = new Date().toISOString().split('T')[0];
    return m.attendanceRecords?.some(r => r.date === today);
  }).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-7xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-primary/20 animate-in fade-in zoom-in duration-300 max-h-[95vh] overflow-hidden flex flex-col">

        {/* Header with Stats */}
        <div className="bg-gradient-to-r from-primary/20 to-blue-500/20 border-b border-primary/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-display gradient-text">Admin Dashboard</h2>
              <p className="text-muted-foreground text-sm mt-1">Manage gym members and operations</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-slate-800/50 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">Total Members</span>
              </div>
              <p className="text-2xl font-bold text-primary">{members.length}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-green-400" />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{activeMembers}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={16} className="text-blue-400" />
                <span className="text-xs text-muted-foreground">Today's Check-ins</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">{todayCheckIns}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={16} className="text-yellow-400" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{members.length}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Add/Edit Member Form */}
          <div className="bg-slate-800/60 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus size={20} className="text-primary" />
              {editingMemberId ? "Edit Member & Exercise" : "Add New Member & Select Exercise"}
            </h3>

            <form onSubmit={handleAddMember} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="member@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+254 712 345678"
                  />
                </div>

                {/* Membership Plan */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Membership Plan *</label>
                  <select
                    required
                    value={memberForm.membership}
                    onChange={(e) => setMemberForm({...memberForm, membership: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    {membershipPlans.map(plan => (
                      <option key={plan.id} value={plan.name}>
                        {plan.name} (KES {plan.price}/month)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Plan Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Plan Duration *</label>
                  <select
                    required
                    value={memberForm.planType}
                    onChange={(e) => setMemberForm({...memberForm, planType: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual (Save 10%)</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={memberForm.startDate}
                    onChange={(e) => setMemberForm({...memberForm, startDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                {/* End Date (Auto-calculated) */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">End Date (Auto)</label>
                  <input
                    type="date"
                    value={memberForm.endDate}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/30 text-muted-foreground border border-border outline-none"
                  />
                </div>

                {/* Payment Amount (Auto-calculated) */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Payment Amount (KES)</label>
                  <input
                    type="number"
                    value={memberForm.paymentAmount}
                    onChange={(e) => setMemberForm({...memberForm, paymentAmount: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Payment Due Date */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Payment Due Date</label>
                  <input
                    type="date"
                    value={memberForm.paymentDueDate}
                    onChange={(e) => setMemberForm({...memberForm, paymentDueDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                {/* Exercise Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Assigned Exercise *</label>
                  <select
                    required
                    value={exerciseForm.exercise}
                    onChange={(e) => setExerciseForm({...exerciseForm, exercise: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Select an exercise</option>
                    {exercises.map((exercise) => (
                      <option key={exercise.id} value={exercise.name}>
                        {exercise.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sets/Reps */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Sets/Reps *</label>
                  <select
                    required
                    value={exerciseForm.sets}
                    onChange={(e) => setExerciseForm({...exerciseForm, sets: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
                  disabled={loading}
                  className="flex-1 py-3 text-base font-semibold bg-primary hover:bg-primary/90"
                >
                  {loading ? "Saving..." : editingMemberId ? "Update Member" : "Add Member"}
                </Button>
                {editingMemberId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex-1 py-3 text-base font-semibold"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Members List */}
          <div className="bg-slate-800/60 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-semibold mb-4">
              Members ({members.length})
            </h3>

            {members.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No members added yet</p>
                <p className="text-sm text-muted-foreground mt-1">Add your first member using the form above</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
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
                          : "bg-slate-700/40 border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-medium">{member.name}</p>
                              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                                activeStatus === "Active"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}>
                                {activeStatus}
                              </span>
                              {expired && (
                                <span className="inline-block px-2 py-0.5 text-xs bg-red-600 text-white rounded font-semibold">
                                  EXPIRED
                                </span>
                              )}
                              {overdue && (
                                <span className="inline-block px-2 py-0.5 text-xs bg-orange-600 text-white rounded font-semibold">
                                  OVERDUE
                                </span>
                              )}
                            </div>
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              <span>📧 {member.email}</span>
                              <span>📱 {member.phone}</span>
                              <span>💪 {attendanceFrequency} visits/month</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => setExpandedMember(isExpanded ? null : member.id)}
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-white/5 rounded-lg"
                            >
                              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            <button
                              onClick={() => handleEditMember(member)}
                              className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-border space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Membership</p>
                                <p className="font-medium">{member.membership}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Duration</p>
                                <p className="font-medium capitalize">{member.planType}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Start - End</p>
                                <p className="font-medium">{member.startDate} → {member.endDate}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Exercise</p>
                                <p className="font-medium">{member.allocatedExercise} ({member.allocatedSets})</p>
                              </div>
                            </div>
                            {member.paymentDueDate && (
                              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                <div>
                                  <p className="text-sm font-medium">Payment</p>
                                  <p className="text-xs text-muted-foreground">
                                    KES {parseFloat(member.paymentAmount || 0).toFixed(2)} • Due: {member.paymentDueDate}
                                  </p>
                                </div>
                                <select
                                  value={member.paymentStatus}
                                  onChange={(e) => handleUpdatePaymentStatus(member.id, e.target.value)}
                                  className={`px-3 py-1 rounded text-xs font-medium ${
                                    member.paymentStatus === "paid"
                                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                      : "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="paid">Paid</option>
                                </select>
                              </div>
                            )}
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

        {/* Footer */}
        <div className="border-t border-border p-4 bg-slate-900/50">
          <Button
            onClick={onClose}
            className="w-full py-2"
            variant="outline"
          >
            Close Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
