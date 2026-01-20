import { Plus, User, Mail, Lock, Phone, Calendar, CreditCard, X, UserPlus } from "lucide-react";
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
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
          editingMemberId
            ? "bg-blue-500/20 text-blue-400"
            : "bg-gradient-to-br from-primary/30 to-primary/10"
        }`}>
          {editingMemberId ? <User size={28} /> : <UserPlus size={28} className="text-primary" />}
        </div>
        <div>
          <h3 className="text-2xl font-bold">
            {editingMemberId ? "Edit Member" : "Add New Member"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {editingMemberId ? "Update member information" : "Register a new gym member"}
          </p>
        </div>
      </div>

      <form onSubmit={handleAddMember} className="space-y-8">
        {/* Account Information Section */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Lock size={14} />
            Account Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-foreground">Username *</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={memberForm.username || ''}
                  onChange={(e) => setMemberForm({...memberForm, username: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                  placeholder="johndoe"
                  required
                  disabled={editingMemberId}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={memberForm.email || ''}
                  onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                  placeholder="member@example.com"
                  required
                />
              </div>
            </div>

            {!editingMemberId && (
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-foreground">Password *</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={memberForm.password || ''}
                    onChange={(e) => setMemberForm({...memberForm, password: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information Section */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <User size={14} />
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">First Name</label>
              <input
                type="text"
                value={memberForm.first_name || ''}
                onChange={(e) => setMemberForm({...memberForm, first_name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                placeholder="John"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Last Name</label>
              <input
                type="text"
                value={memberForm.last_name || ''}
                onChange={(e) => setMemberForm({...memberForm, last_name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                placeholder="Doe"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-foreground">Phone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  value={memberForm.phone || ''}
                  onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                  placeholder="+254 712 345 678"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Membership Section */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <CreditCard size={14} />
            Membership Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-foreground">Membership Plan</label>
              <div className="relative">
                <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <select
                  value={memberForm.plan_id || ''}
                  onChange={(e) => setMemberForm({...memberForm, plan_id: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Membership Plan</option>
                  {membershipPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - KES {plan.price} ({plan.duration_days} days)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-foreground">Start Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  value={memberForm.start_date || ''}
                  onChange={(e) => setMemberForm({...memberForm, start_date: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className={`flex-1 py-6 text-base font-semibold rounded-xl transition-all shadow-lg ${
              editingMemberId
                ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25"
                : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-primary/25"
            }`}
          >
            {editingMemberId ? (
              <>
                <User size={20} className="mr-2" />
                Update Member
              </>
            ) : (
              <>
                <UserPlus size={20} className="mr-2" />
                Add Member
              </>
            )}
          </Button>
          {editingMemberId && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              className="flex-1 py-6 text-base font-semibold rounded-xl border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all"
            >
              <X size={20} className="mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
