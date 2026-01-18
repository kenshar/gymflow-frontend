import { Trash2, ChevronDown, ChevronUp, Edit, CheckCircle } from "lucide-react";

const MemberList = ({
  members,
  expandedMember,
  setExpandedMember,
  handleEditMember,
  handleDeleteMember,
  handleUpdatePaymentStatus,
  handleAddAttendance,
  handleAddWorkout,
  isMembershipExpired,
  isPaymentOverdue,
  getAttendanceFrequency,
  getActiveStatus
}) => {
  return (
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
                            <span>Amount: Kshs {parseFloat(member.paymentAmount || 0).toFixed(2)}</span>
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
  );
};

export default MemberList;
