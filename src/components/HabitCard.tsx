import { useState } from "react";
import { Habit, HabitStats } from "@/types/habit";
import { Check, Flame, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  streak: number;
  stats: HabitStats;
  onToggle: () => void;
  onRemove: () => void;
}

export function HabitCard({
  habit,
  isCompleted,
  streak,
  stats,
  onToggle,
  onRemove,
}: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleToggle = () => {
    if (!isCompleted) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }
    onToggle();
  };

  return (
    <div
      className="group relative bg-card rounded-lg p-4 shadow-soft transition-all duration-300 hover:shadow-lifted slide-up"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex items-center gap-4">
        {/* Check button */}
        <button
          onClick={handleToggle}
          className={cn(
            "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
            isCompleted
              ? "border-habit-checked bg-habit-checked"
              : "border-border bg-habit-unchecked hover:border-primary/50",
            isAnimating && "habit-check-animation"
          )}
        >
          {isCompleted ? (
            <Check className="h-6 w-6 text-primary-foreground" strokeWidth={3} />
          ) : (
            <span className="text-2xl">{habit.emoji}</span>
          )}
        </button>

        {/* Habit info */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium text-foreground truncate transition-all",
              isCompleted && "line-through opacity-60"
            )}
          >
            {habit.name}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
            <span>{stats.totalCompletions} total</span>
            {stats.longestStreak > 0 && (
              <span>Best: {stats.longestStreak}d</span>
            )}
          </div>
        </div>

        {/* Streak badge */}
        {streak > 0 && (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/20 text-accent-foreground">
            <Flame
              className={cn(
                "h-4 w-4 text-streak",
                streak >= 7 && "streak-glow"
              )}
            />
            <span className="font-semibold text-sm">{streak}</span>
          </div>
        )}

        {/* Delete button */}
        <button
          onClick={onRemove}
          className={cn(
            "absolute right-2 top-2 p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all",
            showDelete ? "opacity-100" : "opacity-0"
          )}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
