import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const MemberForm = ({
  memberForm,
  setMemberForm,
  exerciseForm,
  setExerciseForm,
  exercises,
  editingMemberId,
  handleAddMember,
  handleCancelEdit
}) => {
  return (
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
  );
};

export default MemberForm;
