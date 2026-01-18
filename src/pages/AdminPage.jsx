import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import TabNavigation from "../components/admin/TabNavigation";
import MemberForm from "../components/admin/MemberForm";
import MemberList from "../components/admin/MemberList";
import CheckInSection from "../components/admin/CheckInSection";
import CheckInsList from "../components/admin/CheckInsList";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members"); // "members" or "checkin"
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("gymMembers");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [checkIns, setCheckIns] = useState(() => {
    const savedCheckIns = localStorage.getItem("gymCheckIns");
    return savedCheckIns ? JSON.parse(savedCheckIns) : [];
  });
  const [expandedMember, setExpandedMember] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [checkInFeedback, setCheckInFeedback] = useState(null);
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

  // Save check-ins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gymCheckIns", JSON.stringify(checkIns));
  }, [checkIns]);

  // Helper function to check if membership is expired
  const isMembershipExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  // Helper function to check if payment is overdue
  const isPaymentOverdue = (dueDate, paymentStatus) => {
    return paymentStatus !== "paid" && new Date(dueDate) < new Date();
  };

  // Check-in logic
  const handleCheckIn = (memberId) => {
    const member = members.find(m => m.id === memberId);
    if (!member) {
      setCheckInFeedback({ type: "error", message: "Member not found" });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const hasCheckedInToday = checkIns.some(
      ci => ci.memberId === memberId && ci.date === today
    );

    if (hasCheckedInToday) {
      setCheckInFeedback({ 
        type: "warning", 
        message: `${member.name} has already checked in today!`,
        member
      });
      return;
    }

    if (isMembershipExpired(member.endDate)) {
      setCheckInFeedback({ 
        type: "error", 
        message: `${member.name}'s membership has expired!`,
        member
      });
      return;
    }

    // Successful check-in
    const newCheckIn = {
      id: Date.now(),
      memberId,
      memberName: member.name,
      date: today,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setCheckIns([...checkIns, newCheckIn]);
    
    // Also update member's attendance records
    setMembers(members.map(m => 
      m.id === memberId 
        ? {
            ...m,
            attendanceRecords: [
              ...(m.attendanceRecords || []),
              { date: today, id: Date.now(), time: newCheckIn.time }
            ]
          }
        : m
    ));

    setCheckInFeedback({ 
      type: "success", 
      message: `✓ Welcome ${member.name}! Check-in successful.`,
      member
    });
    setSelectedMemberId("");
  };

  // Get today's check-ins
  const getTodayCheckIns = () => {
    const today = new Date().toISOString().split('T')[0];
    return checkIns.filter(ci => ci.date === today).sort((a, b) => b.time.localeCompare(a.time));
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
      <AdminHeader handleLogout={handleLogout} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6 space-y-6">
          
          {/* MEMBER MANAGEMENT TAB */}
          {activeTab === "members" && (
            <>
              <MemberForm
                memberForm={memberForm}
                setMemberForm={setMemberForm}
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
                exercises={exercises}
                editingMemberId={editingMemberId}
                handleAddMember={handleAddMember}
                handleCancelEdit={handleCancelEdit}
              />
              <MemberList
                members={members}
                expandedMember={expandedMember}
                setExpandedMember={setExpandedMember}
                handleEditMember={handleEditMember}
                handleDeleteMember={handleDeleteMember}
                handleUpdatePaymentStatus={handleUpdatePaymentStatus}
                handleAddAttendance={handleAddAttendance}
                handleAddWorkout={handleAddWorkout}
                isMembershipExpired={isMembershipExpired}
                isPaymentOverdue={isPaymentOverdue}
                getAttendanceFrequency={getAttendanceFrequency}
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
