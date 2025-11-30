export interface Habit {
  id: string;
  name: string;
  emoji: string;
  createdAt: string;
  completedDates: string[];
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
}
