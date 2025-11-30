import { useState, useEffect } from "react";
import { Habit, HabitStats } from "@/types/habit";
import { format, parseISO, differenceInDays, isYesterday, isToday } from "date-fns";

const STORAGE_KEY = "habit-tracker-habits";

const generateId = () => Math.random().toString(36).substring(2, 9);

const getTodayString = () => format(new Date(), "yyyy-MM-dd");

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHabits(JSON.parse(stored));
      } catch {
        setHabits([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, emoji: string) => {
    const newHabit: Habit = {
      id: generateId(),
      name,
      emoji,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const removeHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const toggleHabitToday = (id: string) => {
    const today = getTodayString();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        const isCompleted = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((d) => d !== today)
            : [...habit.completedDates, today],
        };
      })
    );
  };

  const isCompletedToday = (habit: Habit) => {
    return habit.completedDates.includes(getTodayString());
  };

  const getStreak = (habit: Habit): number => {
    if (habit.completedDates.length === 0) return 0;

    const sortedDates = [...habit.completedDates]
      .map((d) => parseISO(d))
      .sort((a, b) => b.getTime() - a.getTime());

    const today = new Date();
    const mostRecent = sortedDates[0];

    // If not completed today or yesterday, streak is broken
    if (!isToday(mostRecent) && !isYesterday(mostRecent)) {
      return 0;
    }

    let streak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const diff = differenceInDays(sortedDates[i - 1], sortedDates[i]);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getStats = (habit: Habit): HabitStats => {
    const currentStreak = getStreak(habit);
    
    // Calculate longest streak
    if (habit.completedDates.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalCompletions: 0 };
    }

    const sortedDates = [...habit.completedDates]
      .map((d) => parseISO(d))
      .sort((a, b) => a.getTime() - b.getTime());

    let longestStreak = 1;
    let tempStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diff = differenceInDays(sortedDates[i], sortedDates[i - 1]);
      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    return {
      currentStreak,
      longestStreak,
      totalCompletions: habit.completedDates.length,
    };
  };

  const completedToday = habits.filter(isCompletedToday).length;
  const totalHabits = habits.length;

  return {
    habits,
    addHabit,
    removeHabit,
    toggleHabitToday,
    isCompletedToday,
    getStreak,
    getStats,
    completedToday,
    totalHabits,
  };
}
