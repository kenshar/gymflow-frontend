import { Trash2, ChevronDown, ChevronUp, Edit, User, Mail, Phone, Calendar, Shield, Hash, Users } from "lucide-react";
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
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center">
            <Users size={28} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Members</h3>
            <p className="text-sm text-muted-foreground">{members.length} total members</p>
          </div>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">No members added yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Add your first member using the form above</p>
        </div>
      ) : (
        <div className="space-y-4">
          {members.map((member) => {
            const memberName = `${member.first_name || ''} ${member.last_name || ''}`.trim() || member.username || 'Unknown';
            const isActive = member.is_active;
            const isExpanded = expandedMember === member.id;

            return (
              <div
                key={member.id}
                className={`rounded-xl border-2 transition-all duration-200 ${
                  isExpanded
                    ? "bg-slate-700/80 border-primary/50 shadow-lg shadow-primary/5"
                    : "bg-slate-700/40 border-slate-600/50 hover:border-slate-500 hover:bg-slate-700/60"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                        isActive
                          ? "bg-gradient-to-br from-green-500/30 to-emerald-600/30 text-green-400"
                          : "bg-gradient-to-br from-gray-500/30 to-gray-600/30 text-gray-400"
                      }`}>
                        {(member.first_name?.[0] || member.username?.[0] || '?').toUpperCase()}
                      </div>

                      {/* Member Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="font-semibold text-lg">{memberName}</p>
                          <span className="text-sm text-muted-foreground bg-slate-600/50 px-2 py-0.5 rounded">@{member.username}</span>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
                            isActive
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-400" : "bg-gray-400"}`}></span>
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        </div>

                        <div className="flex gap-4 text-sm text-muted-foreground mt-2 flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <Mail size={14} className="text-blue-400" />
                            {member.email}
                          </span>
                          {member.phone && (
                            <span className="flex items-center gap-1.5">
                              <Phone size={14} className="text-purple-400" />
                              {member.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-orange-400" />
                            {new Date(member.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1 items-center ml-4">
                      <button
                        onClick={() => navigate(`/admin/member/${member.id}`)}
                        className="p-2.5 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-all hover:scale-105"
                        title="View profile"
                      >
                        <User size={18} />
                      </button>
                      <button
                        onClick={() => setExpandedMember(isExpanded ? null : member.id)}
                        className={`p-2.5 rounded-lg transition-all hover:scale-105 ${
                          isExpanded
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-slate-600/50"
                        }`}
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      <button
                        onClick={() => handleEditMember(member)}
                        className="p-2.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all hover:scale-105"
                        title="Edit member"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-2.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-all hover:scale-105"
                        title="Delete member"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-600/50">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-slate-600/30 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <User size={16} className="text-blue-400" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Username</span>
                          </div>
                          <p className="font-medium">{member.username}</p>
                        </div>
                        <div className="bg-slate-600/30 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail size={16} className="text-purple-400" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Email</span>
                          </div>
                          <p className="font-medium truncate">{member.email}</p>
                        </div>
                        <div className="bg-slate-600/30 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Phone size={16} className="text-green-400" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Phone</span>
                          </div>
                          <p className="font-medium">{member.phone || "Not provided"}</p>
                        </div>
                        <div className="bg-slate-600/30 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield size={16} className="text-orange-400" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Role</span>
                          </div>
                          <p className="font-medium capitalize">{member.role}</p>
                        </div>
                        <div className="bg-slate-600/30 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Hash size={16} className="text-cyan-400" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Member ID</span>
                          </div>
                          <p className="font-medium font-mono">#{member.id}</p>
                        </div>
                        <div className="bg-slate-600/30 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-3 h-3 rounded-full ${member.is_active ? "bg-green-400" : "bg-gray-400"}`}></span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
                          </div>
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
