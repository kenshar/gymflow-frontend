import { CheckCircle } from "lucide-react";

const CheckInsList = ({ getTodayCheckIns }) => {
  const todayCheckIns = getTodayCheckIns();

  return (
    <div className="bg-slate-700/80 rounded-xl p-8 border border-border">
      <h3 className="text-2xl font-semibold mb-6">Today's Check-Ins</h3>

      {todayCheckIns.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No check-ins yet today.</p>
      ) : (
        <div className="space-y-3">
          {todayCheckIns.map((checkIn) => (
            <div
              key={checkIn.id}
              className="flex items-center justify-between p-4 bg-slate-600/50 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <div>
                  <p className="font-medium">{checkIn.memberName}</p>
                  <p className="text-sm text-muted-foreground">{checkIn.time}</p>
                </div>
              </div>
              <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded">
                Checked In
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckInsList;
