import { db } from '../config/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Habit, NewHabitData } from '../types';

const HABITS_COLLECTION = 'habits';

export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, HABITS_COLLECTION));
    const habits: Habit[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      habits.push({
        id: doc.id,
        name: data.name || 'Unnamed Habit',
        completedDates: Array.isArray(data.completedDates) ? data.completedDates : [],
        streak: Number(data.streak) || 0,
        ...data,
      } as Habit);
    });
    return habits;
  } catch (e) {
    console.error('Error fetching habits:', e);
    return [];
  }
};

export const createHabit = async (
  newHabitData: NewHabitData,
): Promise<Habit | null> => {
  try {
    const dataToSave = {
      ...newHabitData,
      completedDates: [],
      streak: 0,
    };
    const docRef = await addDoc(collection(db, HABITS_COLLECTION), dataToSave);
    return { id: docRef.id, ...dataToSave } as Habit;
  } catch (e) {
    console.error('Error creating habit:', e);
    return null;
  }
};

export const updateHabit = async (
  habitToUpdate: Habit,
): Promise<Habit | null> => {
  try {
    const habitRef = doc(db, HABITS_COLLECTION, habitToUpdate.id);
    // Exclude id from the data update to be safe (though Firestore ignores it if not in data)
    const { id, ...data } = habitToUpdate;
    await updateDoc(habitRef, data);
    return habitToUpdate;
  } catch (e) {
    console.error('Error updating habit:', e);
    return null;
  }
};

export const deleteHabit = async (habitId: string): Promise<boolean> => {
  try {
    const habitRef = doc(db, HABITS_COLLECTION, habitId);
    await deleteDoc(habitRef);
    return true;
  } catch (e) {
    console.error('Error deleting habit:', e);
    return false;
  }
};