import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

const CheckInSection = ({
  selectedMemberId,
  setSelectedMemberId,
  members,
  handleCheckIn,
  checkInFeedback,
  getActiveStatus
}) => {
  return (
    <div className="bg-slate-700/80 rounded-xl p-8 border border-border">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <Clock size={24} className="text-primary" />
        Member Check-In
      </h3>

      {/* Member Selection */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3 text-foreground">Select Member to Check In</label>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all text-base"
          >
            <option value="">-- Choose a member --</option>
            {members.map((member) => {
              const activeStatus = getActiveStatus(member);
              return (
                <option key={member.id} value={member.id}>
                  {member.name} ({activeStatus})
                </option>
              );
            })}
          </select>
        </div>

        <Button
          onClick={() => handleCheckIn(selectedMemberId)}
          disabled={!selectedMemberId}
          className="w-full py-3 text-lg font-semibold"
        >
          <CheckCircle size={20} className="mr-2" />
          Check In Member
        </Button>
      </div>

      {/* Check-In Feedback */}
      {checkInFeedback && (
        <div className={`mt-6 p-4 rounded-lg border ${
          checkInFeedback.type === "success"
            ? "bg-green-500/10 border-green-500/30"
            : checkInFeedback.type === "warning"
            ? "bg-orange-500/10 border-orange-500/30"
            : "bg-red-500/10 border-red-500/30"
        }`}>
          <div className="flex items-start gap-3">
            {checkInFeedback.type === "success" ? (
              <CheckCircle className="text-green-400 mt-0.5" size={20} />
            ) : (
              <AlertCircle className={`${checkInFeedback.type === "warning" ? "text-orange-400" : "text-red-400"} mt-0.5`} size={20} />
            )}
            <div>
              <p className={`font-semibold ${
                checkInFeedback.type === "success"
                  ? "text-green-400"
                  : checkInFeedback.type === "warning"
                  ? "text-orange-400"
                  : "text-red-400"
              }`}>
                {checkInFeedback.message}
              </p>
              {checkInFeedback.member && (
                <p className="text-xs text-muted-foreground mt-2">
                  Plan: {checkInFeedback.member.planType} | Expires: {checkInFeedback.member.endDate}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInSection;
