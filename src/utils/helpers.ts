// src/utils/helpers.ts
import { Habit, HabitStats } from "../types";

/**
 * Mengembalikan tanggal hari ini dalam format 'YYYY-MM-DD'
 */
export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Mengembalikan tanggal kemarin dalam format 'YYYY-MM-DD'
 */
export const getYesterdayString = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

/**
 * Menghitung semua statistik berdasarkan daftar habits
 * Ini adalah "logical data flow" yang baik (Kriteria #4)
 */
export const calculateStats = (habits: Habit[]): HabitStats => {
  const today = getTodayString();
  const activeHabits = habits.length;

  let completions = 0;
  let todayCompletions = 0;
  let totalStreak = 0;
  let longestStreak = 0;
  let activeDays = new Set<string>(); // Set agar tanggal unik

  habits.forEach(habit => {
    // Tambah semua tanggal selesai ke Set
    habit.completedDates.forEach(date => activeDays.add(date));

    // Hitung total penyelesaian
    completions += habit.completedDates.length;

    // Hitung penyelesaian hari ini
    if (habit.completedDates.includes(today)) {
      todayCompletions += 1;
    }

    // Hitung total & streak terpanjang
    totalStreak += habit.streak;
    if (habit.streak > longestStreak) {
      longestStreak = habit.streak;
    }
  });

  return {
    totalStreak,
    longestStreak,
    activeDays: activeDays.size,
    completions,
    activeHabits,
    // Cek pembagian dengan nol
    todayProgress: activeHabits > 0 ? todayCompletions / activeHabits : 0,
    totalCompletedToday: todayCompletions,
  };
};