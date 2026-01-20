import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Dumbbell, Search, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const WorkoutLogging = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([
    { id: 1, name: "", sets: "", reps: "", weight: "" }
  ]);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://gymflow-backtend-1.onrender.com/api/members", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setMembers(data.members || []);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('.relative')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    `${member.first_name} ${member.last_name} ${member.email} ${member.username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const selectedMember = members.find(m => m.id === selectedMemberId);

  // Save workout
  const handleSaveWorkout = async () => {
    if (!selectedMemberId || workoutExercises.some(ex => !ex.name || !ex.sets || !ex.reps)) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const workoutData = {
        member_id: selectedMemberId,
        workout_date: new Date(workoutDate).toISOString(),
        duration: duration ? parseInt(duration) : null,
        exercises: workoutExercises
          .filter(ex => ex.name && ex.sets && ex.reps)
          .map(ex => ({
            exercise_name: ex.name,
            sets: parseInt(ex.sets),
            reps: parseInt(ex.reps),
            weight: ex.weight ? parseFloat(ex.weight) : null
          }))
      };

      const response = await fetch("https://gymflow-backtend-1.onrender.com/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(workoutData)
      });

      if (response.ok) {
        // Reset form
        setSelectedMemberId("");
        setSearchTerm("");
        setWorkoutExercises([{ id: 1, name: "", sets: "", reps: "", weight: "" }]);
        setWorkoutDate(new Date().toISOString().split('T')[0]);
        setDuration("");

        alert("Workout logged successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to log workout: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error logging workout:", error);
      alert("Failed to log workout. Please try again.");
    } finally {
      setLoading(false);
    }
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
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-foreground">Select Member</label>
                <div className="relative">
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm cursor-pointer flex items-center justify-between"
                  >
                    <span className={selectedMember ? "text-foreground" : "text-muted-foreground"}>
                      {selectedMember
                        ? `${selectedMember.first_name} ${selectedMember.last_name} (${selectedMember.email})`
                        : "-- Choose a member --"}
                    </span>
                    <Search size={16} className="text-muted-foreground" />
                  </div>

                  {dropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-slate-700 border border-border rounded-lg shadow-lg max-h-80 overflow-hidden">
                      <div className="sticky top-0 p-2 bg-slate-700 border-b border-border">
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search members..."
                            className="w-full pl-10 pr-8 py-2 rounded bg-slate-600/50 text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                          {searchTerm && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchTerm("");
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="overflow-y-auto max-h-64">
                        {filteredMembers.length > 0 ? (
                          filteredMembers.map((member) => (
                            <div
                              key={member.id}
                              onClick={() => {
                                setSelectedMemberId(member.id);
                                setDropdownOpen(false);
                                setSearchTerm("");
                              }}
                              className={`px-4 py-3 cursor-pointer transition-colors ${
                                selectedMemberId === member.id
                                  ? "bg-primary/20 text-primary"
                                  : "hover:bg-slate-600/50 text-foreground"
                              }`}
                            >
                              <div className="font-medium">
                                {member.first_name} {member.last_name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {member.email} • {member.username}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-center text-muted-foreground">
                            No members found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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
                disabled={!selectedMemberId || workoutExercises.some(ex => !ex.name || !ex.sets || !ex.reps) || loading}
                className="w-full py-3 text-lg font-semibold flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {loading ? "Saving..." : "Save Workout"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutLogging;
