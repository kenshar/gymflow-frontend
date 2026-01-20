import { Trash2, ChevronDown, ChevronUp, Edit, CheckCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
            const memberName = `${member.first_name || ''} ${member.last_name || ''}`.trim() || member.username || 'Unknown';
            const isActive = member.is_active;
            const isExpanded = expandedMember === member.id;

            return (
              <div
                key={member.id}
                className="rounded-lg border transition-all bg-slate-600/50 border-border hover:border-primary/50"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="font-medium text-lg">{memberName}</p>
                        <span className="text-sm text-muted-foreground">@{member.username}</span>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                          isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* Member Info */}
                      <div className="flex gap-6 text-sm text-muted-foreground mb-2 flex-wrap">
                        <span>📧 {member.email}</span>
                        {member.phone && <span>📱 {member.phone}</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Joined: {new Date(member.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => navigate(`/admin/member/${member.id}`)}
                        className="p-2 text-purple-500 hover:bg-purple-500/10 rounded-lg transition-colors"
                        title="View member profile"
                      >
                        <User size={18} />
                      </button>
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
                    <div className="mt-6 pt-6 border-t border-border space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Username</p>
                          <p className="font-medium">{member.username}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-medium">{member.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-medium">{member.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Role</p>
                          <p className="font-medium capitalize">{member.role}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Member ID</p>
                          <p className="font-medium">#{member.id}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className={`font-medium ${member.is_active ? 'text-green-400' : 'text-gray-400'}`}>
                            {member.is_active ? "Active Membership" : "No Active Membership"}
                          </p>
                        </div>
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
