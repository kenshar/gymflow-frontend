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
  handleCancelEdit,
  membershipPlans = []
}) => {
  return (
    <div className="bg-slate-700/80 rounded-xl p-8 border border-border">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <Plus size={24} className="text-primary" />
        {editingMemberId ? "Edit Member" : "Add New Member"}
      </h3>

      <form onSubmit={handleAddMember} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Username *</label>
            <input
              type="text"
              value={memberForm.username || ''}
              onChange={(e) => setMemberForm({...memberForm, username: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
              placeholder="johndoe"
              required
              disabled={editingMemberId}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
            <input
              type="email"
              value={memberForm.email || ''}
              onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
              placeholder="member@example.com"
              required
            />
          </div>

          {!editingMemberId && (
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Password *</label>
              <input
                type="password"
                value={memberForm.password || ''}
                onChange={(e) => setMemberForm({...memberForm, password: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
                placeholder="Password"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">First Name</label>
            <input
              type="text"
              value={memberForm.first_name || ''}
              onChange={(e) => setMemberForm({...memberForm, first_name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Last Name</label>
            <input
              type="text"
              value={memberForm.last_name || ''}
              onChange={(e) => setMemberForm({...memberForm, last_name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
              placeholder="Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Phone</label>
            <input
              type="tel"
              value={memberForm.phone || ''}
              onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
              placeholder="+254 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Membership Plan</label>
            <select
              value={memberForm.plan_id || ''}
              onChange={(e) => setMemberForm({...memberForm, plan_id: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            >
              <option value="">Select Membership Plan</option>
              {membershipPlans.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ${plan.price} ({plan.duration_days} days)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Start Date</label>
            <input
              type="date"
              value={memberForm.start_date || ''}
              onChange={(e) => setMemberForm({...memberForm, start_date: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 py-4 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {editingMemberId ? "Update Member" : "Add Member"}
          </Button>
          {editingMemberId && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              className="flex-1 py-4 text-base font-semibold border-red-500 text-red-500 hover:bg-red-500/10"
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
