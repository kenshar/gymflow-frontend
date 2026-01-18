import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Dumbbell } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const WorkoutLogging = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("gymMembers");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([
    { id: 1, name: "", sets: "", reps: "", weight: "" }
  ]);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState("");

  // Save workout
  const handleSaveWorkout = () => {
    if (!selectedMemberId || workoutExercises.some(ex => !ex.name || !ex.sets || !ex.reps)) {
      alert("Please fill in all required fields");
      return;
    }

    const member = members.find(m => m.id === selectedMemberId);
    if (!member) return;

    const workoutData = {
      id: Date.now(),
      memberId: selectedMemberId,
      memberName: member.name,
      date: workoutDate,
      duration: duration ? parseInt(duration) : null,
      exercises: workoutExercises.filter(ex => ex.name && ex.sets && ex.reps)
    };

    // Update member's recent workouts
    const updatedMembers = members.map(m => {
      if (m.id === selectedMemberId) {
        const updatedWorkouts = [
          workoutData,
          ...(m.recentWorkouts || []).slice(0, 9) // Keep last 10 workouts
        ];
        return { ...m, recentWorkouts: updatedWorkouts };
      }
      return m;
    });

    setMembers(updatedMembers);
    localStorage.setItem("gymMembers", JSON.stringify(updatedMembers));

    // Reset form
    setSelectedMemberId("");
    setWorkoutExercises([{ id: 1, name: "", sets: "", reps: "", weight: "" }]);
    setWorkoutDate(new Date().toISOString().split('T')[0]);
    setDuration("");

    alert("Workout logged successfully!");
  };

  // Add exercise
  const addExercise = () => {
    setWorkoutExercises([
      ...workoutExercises,
      { id: Date.now(), name: "", sets: "", reps: "", weight: "" }
    ]);
  };

  // Remove exercise
  const removeExercise = (id) => {
    if (workoutExercises.length > 1) {
      setWorkoutExercises(workoutExercises.filter(ex => ex.id !== id));
    }
  };

  // Update exercise
  const updateExercise = (id, field, value) => {
    setWorkoutExercises(workoutExercises.map(ex =>
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider gradient-text">
            WORKOUT LOGGING
          </h1>
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            Back to Admin
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-slate-700/80 rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Dumbbell size={24} className="text-primary" />
              Log Workout Session
            </h2>

            <div className="space-y-6">
              {/* Member Selection */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Select Member</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                >
                  <option value="">-- Choose a member --</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.allocatedExercise}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Workout Date</label>
                  <input
                    type="date"
                    value={workoutDate}
                    onChange={(e) => setWorkoutDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Duration (minutes)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="30"
                    min="1"
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Exercises */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-foreground">Exercises</label>
                  <Button
                    onClick={addExercise}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Exercise
                  </Button>
                </div>

                <div className="space-y-4">
                  {workoutExercises.map((exercise, index) => (
                    <div key={exercise.id} className="bg-slate-600/30 rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-muted-foreground">Exercise {index + 1}</span>
                        {workoutExercises.length > 1 && (
                          <button
                            onClick={() => removeExercise(exercise.id)}
                            className="text-red-500 hover:bg-red-500/10 rounded p-1 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Exercise Name</label>
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                            placeholder="Bench Press"
                            className="w-full px-3 py-2 rounded bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Sets</label>
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(exercise.id, 'sets', e.target.value)}
                            placeholder="3"
                            min="1"
                            className="w-full px-3 py-2 rounded bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Reps</label>
                          <input
                            type="number"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                            placeholder="10"
                            min="1"
                            className="w-full px-3 py-2 rounded bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1 text-muted-foreground">Weight (lbs)</label>
                          <input
                            type="number"
                            value={exercise.weight}
                            onChange={(e) => updateExercise(exercise.id, 'weight', e.target.value)}
                            placeholder="135"
                            min="0"
                            step="0.5"
                            className="w-full px-3 py-2 rounded bg-slate-700/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveWorkout}
                disabled={!selectedMemberId || workoutExercises.some(ex => !ex.name || !ex.sets || !ex.reps)}
                className="w-full py-3 text-lg font-semibold flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Workout
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutLogging;
