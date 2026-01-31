// src/types/index.ts

export type HabitCategory = 'Health' | 'Productivity' | 'Mindfulness' | 'Social';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  emoji: string;
  color: string;
  completedDates: string[]; // ['YYYY-MM-DD', ...]
  streak: number;
  createdAt?: string;
}

export interface NewHabitData {
  name: string;
  category: HabitCategory;
  emoji: string;
  color: string;
}

export interface HabitStats {
  todayProgress: number; // 0 - 1
  totalCompletedToday: number;
  totalStreak: number;
  longestStreak: number;
  activeDays: number;
  completions: number;
  activeHabits: number;
}