import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminHeader from "../components/admin/AdminHeader";
import TabNavigation from "../components/admin/TabNavigation";
import MemberForm from "../components/admin/MemberForm";
import MemberList from "../components/admin/MemberList";
import CheckInSection from "../components/admin/CheckInSection";
import CheckInsList from "../components/admin/CheckInsList";
import { membersAPI, attendanceAPI, membershipsAPI, workoutsAPI, isAuthenticated, removeAuthToken } from "../lib/api";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members"); // "members" or "checkin"
  const [members, setMembers] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMember, setExpandedMember] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [checkInFeedback, setCheckInFeedback] = useState(null);
  const [memberForm, setMemberForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [membershipForm, setMembershipForm] = useState({
    plan_id: "",
    start_date: "",
  });

  // Load data on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersResponse, checkInsResponse, plansResponse] = await Promise.all([
        membersAPI.getAll().catch(err => ({ members: [] })),
        attendanceAPI.getToday().catch(err => ({ attendance: [] })),
        membershipsAPI.getPlans().catch(err => ({ plans: [] })),
      ]);

      setMembers(membersResponse.members || []);
      setCheckIns(checkInsResponse.attendance || []);
      setMembershipPlans(plansResponse.plans || []);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Backend unavailable - using demo mode");
      setMembers([]);
      setCheckIns([]);
      setMembershipPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if membership is expired
  const isMembershipExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  // Helper function to check if payment is overdue
  const isPaymentOverdue = (dueDate, paymentStatus) => {
    return paymentStatus !== "paid" && new Date(dueDate) < new Date();
  };

  // Check-in logic
  const handleCheckIn = async (memberId) => {
    try {
      const member = members.find(m => m.id === memberId);
      if (!member) {
        setCheckInFeedback({ type: "error", message: "Member not found" });
        return;
      }

      const response = await attendanceAPI.checkIn(memberId);
      const newCheckIn = response.attendance;

      // Refresh today's check-ins
      const todayResponse = await attendanceAPI.getToday();
      setCheckIns(todayResponse.attendance || []);

      setCheckInFeedback({
        type: "success",
        message: `✓ Welcome ${member.first_name} ${member.last_name}! Check-in successful.`,
        member
      });
      setSelectedMemberId("");

      toast.success("Check-in successful!");
    } catch (error) {
      console.error("Check-in error:", error);
      const member = members.find(m => m.id === memberId);
      if (error.message.includes("already checked in")) {
        setCheckInFeedback({
          type: "warning",
          message: `${member?.first_name} ${member?.last_name} has already checked in today!`,
          member
        });
      } else {
        setCheckInFeedback({
          type: "error",
          message: "Backend unavailable - check-in failed"
        });
        toast.error("Backend unavailable - check-in failed");
      }
    }
  };

  // Get today's check-ins
  const getTodayCheckIns = () => {
    const today = new Date().toISOString().split('T')[0];
    return checkIns.filter(ci => ci.date === today).sort((a, b) => b.time.localeCompare(a.time));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!memberForm.username || !memberForm.email || !memberForm.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingMemberId) {
        // Update existing member
        await membersAPI.update(editingMemberId, {
          first_name: memberForm.first_name,
          last_name: memberForm.last_name,
          email: memberForm.email,
          phone: memberForm.phone,
        });
        toast.success("Member updated successfully!");
        setEditingMemberId(null);
      } else {
        // Create new member
        const newMember = await membersAPI.create({
          username: memberForm.username,
          email: memberForm.email,
          password: memberForm.password,
          first_name: memberForm.first_name,
          last_name: memberForm.last_name,
          phone: memberForm.phone,
        });

        // If membership form is filled, create membership too
        if (membershipForm.plan_id && membershipForm.start_date) {
          await membershipsAPI.create({
            member_id: newMember.member.id,
            plan_id: parseInt(membershipForm.plan_id),
            start_date: membershipForm.start_date,
          });
        }

        toast.success("Member created successfully!");
      }

      // Reset forms
      setMemberForm({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
      });
      setMembershipForm({
        plan_id: "",
        start_date: "",
      });

      // Reload data
      await loadData();
    } catch (error) {
      console.error("Error saving member:", error);
      toast.error(error.message?.includes('fetch') ? "Backend unavailable - cannot save member" : (error.message || "Failed to save member"));
    }
  };

  const handleDeleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      await membersAPI.delete(id);
      toast.success("Member deleted successfully!");
      await loadData();
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error(error.message?.includes('fetch') ? "Backend unavailable - cannot delete member" : "Failed to delete member");
    }
  };

  const handleEditMember = (member) => {
    setEditingMemberId(member.id);
    setMemberForm({
      username: member.username || "",
      email: member.email || "",
      password: "", // Don't populate password for security
      first_name: member.first_name || "",
      last_name: member.last_name || "",
      phone: member.phone || "",
    });
    setExpandedMember(null);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setMemberForm({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
    });
    setMembershipForm({
      plan_id: "",
      start_date: "",
    });
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
    removeAuthToken();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader handleLogout={handleLogout} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6 space-y-6">

          {/* MEMBER MANAGEMENT TAB */}
          {activeTab === "members" && (
            <>
              <MemberForm
                memberForm={{
                  ...memberForm,
                  plan_id: membershipForm.plan_id,
                  start_date: membershipForm.start_date,
                }}
                setMemberForm={(form) => {
                  setMemberForm({
                    username: form.username || '',
                    email: form.email || '',
                    password: form.password || '',
                    first_name: form.first_name || '',
                    last_name: form.last_name || '',
                    phone: form.phone || '',
                  });
                  setMembershipForm({
                    plan_id: form.plan_id || '',
                    start_date: form.start_date || '',
                  });
                }}
                editingMemberId={editingMemberId}
                handleAddMember={handleAddMember}
                handleCancelEdit={handleCancelEdit}
                membershipPlans={membershipPlans}
              />
              <MemberList
                members={members}
                expandedMember={expandedMember}
                setExpandedMember={setExpandedMember}
                handleEditMember={handleEditMember}
                handleDeleteMember={handleDeleteMember}
                handleUpdatePaymentStatus={() => {}}
                handleAddAttendance={() => {}}
                handleAddWorkout={() => {}}
                isMembershipExpired={isMembershipExpired}
                isPaymentOverdue={() => false}
                getAttendanceFrequency={() => 0}
                getActiveStatus={getActiveStatus}
              />
            </>
          )}

          {/* CHECK-IN TAB */}
          {activeTab === "checkin" && (
            <>
              <CheckInSection
                selectedMemberId={selectedMemberId}
                setSelectedMemberId={setSelectedMemberId}
                members={members}
                handleCheckIn={handleCheckIn}
                checkInFeedback={checkInFeedback}
                getActiveStatus={getActiveStatus}
              />
              <CheckInsList getTodayCheckIns={getTodayCheckIns} />
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPage;
