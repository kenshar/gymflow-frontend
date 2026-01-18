import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "./ui/button";

const MemberFormModal = ({ isOpen, onClose, onSubmit, initialData, exercises, isEditing }) => {
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

  const [exerciseForm, setExerciseForm] = useState({
    exercise: "",
    sets: "",
  });

  useEffect(() => {
    if (initialData) {
      setMemberForm({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        membership: initialData.membership,
        planType: initialData.planType || "monthly",
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        paymentAmount: initialData.paymentAmount || "",
        paymentDueDate: initialData.paymentDueDate || "",
      });
      setExerciseForm({
        exercise: initialData.allocatedExercise,
        sets: initialData.allocatedSets,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!memberForm.name || !memberForm.email || !memberForm.phone || !memberForm.startDate || !memberForm.endDate) {
      alert("Please fill in all fields including membership dates");
      return;
    }

    if (!exerciseForm.exercise || !exerciseForm.sets) {
      alert("Please select an exercise and sets");
      return;
    }

    onSubmit({
      ...memberForm,
      allocatedExercise: exerciseForm.exercise,
      allocatedSets: exerciseForm.sets,
    });

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl md:text-3xl font-display mb-6 gradient-text flex items-center gap-2">
          <Plus size={28} />
          {isEditing ? "Edit Member" : "Add New Member"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 py-3 text-base font-semibold"
            >
              {isEditing ? "Update Member" : "Add Member"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 py-3 text-base font-semibold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberFormModal;
