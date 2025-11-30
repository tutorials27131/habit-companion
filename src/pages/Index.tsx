import { format } from "date-fns";
import { useHabits } from "@/hooks/useHabits";
import { HabitCard } from "@/components/HabitCard";
import { AddHabitForm } from "@/components/AddHabitForm";
import { ProgressRing } from "@/components/ProgressRing";
import { Sparkles } from "lucide-react";

const Index = () => {
  const {
    habits,
    addHabit,
    removeHabit,
    toggleHabitToday,
    isCompletedToday,
    getStreak,
    getStats,
    completedToday,
    totalHabits,
  } = useHabits();

  const today = format(new Date(), "EEEE, MMMM d");
  const allCompleted = totalHabits > 0 && completedToday === totalHabits;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-8 pb-20">
        {/* Header */}
        <header className="text-center mb-8">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            {today}
          </p>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Daily Habits
          </h1>
          {allCompleted && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success fade-in">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium text-sm">All habits completed!</span>
            </div>
          )}
        </header>

        {/* Progress */}
        {totalHabits > 0 && (
          <div className="flex justify-center mb-8">
            <ProgressRing completed={completedToday} total={totalHabits} />
          </div>
        )}

        {/* Habits list */}
        <div className="space-y-3 mb-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={isCompletedToday(habit)}
              streak={getStreak(habit)}
              stats={getStats(habit)}
              onToggle={() => toggleHabitToday(habit.id)}
              onRemove={() => removeHabit(habit.id)}
            />
          ))}
        </div>

        {/* Add habit form */}
        <AddHabitForm onAdd={addHabit} />

        {/* Empty state */}
        {habits.length === 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            <p className="text-lg font-display">Start building better habits</p>
            <p className="text-sm mt-1">Add your first habit above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
