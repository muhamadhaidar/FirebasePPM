// src/contexts/HabitContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Habit, HabitStats, NewHabitData } from '../types';
import { calculateStats, getTodayString } from '../utils/helpers';
import {
  fetchHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from '../api/habitApi';

interface HabitContextType {
  habits: Habit[];
  stats: HabitStats;
  loading: boolean;
  addHabit: (newHabitData: NewHabitData) => void;
  toggleHabitToday: (habitId: string) => void;
  removeHabit: (habitId: string) => void;
  getCompletionsForDate: (dateStr: string) => Habit[];
  isHabitCompletedToday: (habit: Habit) => boolean;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const loadedHabits = await fetchHabits();
      setHabits(loadedHabits);
      setLoading(false);
    };
    loadData();
  }, []);

  const addHabit = useCallback(async (newHabitData: NewHabitData) => {
    const newHabitFromServer = await createHabit(newHabitData);
    if (newHabitFromServer) {
      setHabits(prevHabits => [newHabitFromServer, ...prevHabits]);
    } else {
      console.error('Failed to save habit to server');
    }
  }, []);

  const toggleHabitToday = useCallback(async (habitId: string) => {
    const today = getTodayString();

    const habitToToggle = habits.find(h => h.id === habitId);
    if (!habitToToggle) return;

    const isCompleted = habitToToggle.completedDates.includes(today);
    let newCompletedDates;
    let newStreak = habitToToggle.streak;

    if (isCompleted) {
      newCompletedDates = habitToToggle.completedDates.filter(d => d !== today);
      newStreak = Math.max(0, newStreak - 1);
    } else {
      newCompletedDates = [...habitToToggle.completedDates, today];
      newStreak += 1;
    }

    const updatedHabit = {
      ...habitToToggle,
      completedDates: newCompletedDates,
      streak: newStreak
    };

    // Optimistic Update
    setHabits(prevHabits =>
      prevHabits.map(h => (h.id === habitId ? updatedHabit : h))
    );

    // Sync with server
    const result = await updateHabit(updatedHabit);

    // Rollback if failed
    if (!result) {
      console.error('Failed to update server, rolling back...');
      setHabits(prevHabits =>
        prevHabits.map(h => (h.id === habitId ? habitToToggle : h))
      );
    }

  }, [habits]);

  const removeHabit = useCallback(async (habitId: string) => {
    // Optimistic Update
    const oldHabits = habits;
    setHabits(prevHabits => prevHabits.filter(h => h.id !== habitId));

    // Sync with server
    const success = await deleteHabit(habitId);

    // Rollback if failed
    if (!success) {
      console.error('Failed to delete on server, rolling back...');
      setHabits(oldHabits);
    }
  }, [habits]);

  const getCompletionsForDate = useCallback((dateStr: string): Habit[] => {
    return habits.filter(h => h.completedDates.includes(dateStr));
  }, [habits]);

  const isHabitCompletedToday = useCallback((habit: Habit): boolean => {
    const today = getTodayString();
    return habit.completedDates.includes(today);
  }, []);

  const stats = calculateStats(habits);

  return (
    <HabitContext.Provider
      value={{
        habits,
        stats,
        loading,
        addHabit,
        toggleHabitToday,
        removeHabit,
        getCompletionsForDate,
        isHabitCompletedToday,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};