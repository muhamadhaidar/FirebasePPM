import React from 'react';
import { render } from '@testing-library/react-native';
import { calculateStats } from '../utils/helpers';
import { Habit } from '../types';
import HabitItem from '../components/HabitItem';

// --- Logic Tests ---
describe('Habit Stats Logic', () => {
    const mockHabits: Habit[] = [
        {
            id: '1',
            name: 'Gym',
            category: 'Health',
            completedDates: ['2023-10-01', '2023-10-02'],
            streak: 2,
            emoji: '🏋️',
            color: '#FF0000',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            name: 'Read',
            category: 'Productivity',
            completedDates: [],
            streak: 0,
            emoji: '📚',
            color: '#00FF00',
            createdAt: new Date().toISOString()
        }
    ];

    it('calculates total completions correctly', () => {
        const stats = calculateStats(mockHabits);
        expect(stats.completions).toBe(2);
    });

    it('calculates active habits correctly', () => {
        const stats = calculateStats(mockHabits);
        expect(stats.activeHabits).toBe(2);
    });

    it('calculates longest streak correctly', () => {
        const stats = calculateStats(mockHabits);
        expect(stats.longestStreak).toBe(2);
    });
});

// --- Component Tests ---
describe('HabitItem Component', () => {
    const mockHabit: Habit = {
        id: '1',
        name: 'Morning Jog',
        category: 'Health',
        completedDates: [],
        streak: 5,
        emoji: '🏃',
        color: '#FF0000',
        createdAt: new Date().toISOString()
    };

    it('renders habit name and streak correctly', () => {
        const { getByText } = render(
            <HabitItem
                habit={mockHabit}
                isCompleted={false}
                onToggle={(id) => { }}
                onRemove={(id) => { }}
            />
        );

        expect(getByText('Morning Jog')).toBeTruthy();
        expect(getByText('5 day')).toBeTruthy();
    });
});
