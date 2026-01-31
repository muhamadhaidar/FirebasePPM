import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { Habit, HabitCategory } from '../types';
import { COLORS } from '../constants/colors';
import ScaleButton from './ScaleButton';

const categoryColors: Record<HabitCategory, string> = {
    Health: '#3B82F6',
    Productivity: '#22C55E',
    Mindfulness: '#8B5CF6',
    Social: '#F59E0B',
};

type Props = {
    habit: Habit;
    isCompleted: boolean;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};

const HabitItem: React.FC<Props> = React.memo(({ habit, isCompleted, onToggle, onRemove }) => {
    const categoryName = habit.category;
    const categoryColor = categoryColors[habit.category] || COLORS.mediumGray;

    return (
        <ScaleButton
            style={styles.container}
            scaleAmount={0.98}
            hoverScaleAmount={1.03}
            onPress={() => { }}
        >
            <View style={styles.iconTagWrapper}>
                <View style={[styles.icon, { backgroundColor: habit.color + '20' }]}>
                    <Text style={styles.emoji}>{habit.emoji}</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: categoryColor + '20' }]}>
                    <Text style={[styles.tagText, { color: categoryColor }]}>{categoryName}</Text>
                </View>
            </View>

            <View style={styles.textWrapper}>
                <Text style={styles.title}>{habit.name}</Text>
                <View style={styles.streakRow}>
                    <Icon name="fire" size={13} color={COLORS.orange} />
                    <Text style={styles.streakValue}> {habit.streak} day</Text>
                </View>
                <Text style={styles.streakLabel}>streak</Text>
            </View>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={() => onRemove(habit.id)} style={styles.deleteButton}>
                    <Icon name="trash-o" size={24} color={'#FFFFFF'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onToggle(habit.id)} style={styles.toggleButton}>
                    {isCompleted ? (
                        <Icon name="check-circle" size={28} color={COLORS.green} />
                    ) : (
                        <View style={styles.emptyCircle} />
                    )}
                </TouchableOpacity>
            </View>
        </ScaleButton>
    );
}); // Wrapped in React.memo

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        marginBottom: 12,
        marginHorizontal: 20,
    },
    iconTagWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 12,
    },
    icon: {
        width: 52,
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    emoji: { fontSize: 24 },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    tagText: {
        fontSize: 11,
        fontWeight: '600',
    },
    textWrapper: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 4,
    },
    title: {
        fontWeight: '600',
        color: COLORS.textPrimary,
        fontSize: 16,
        marginBottom: 6,
    },
    streakRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    streakValue: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 4,
    },
    streakLabel: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '500',
        paddingTop: 2,
        marginLeft: 17,
    },
    buttonWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 8,
        minHeight: 80,
    },
    deleteButton: {
        backgroundColor: COLORS.red,
        borderRadius: 15,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginBottom: 8,
    },
    toggleButton: {
        padding: 4,
    },
    emptyCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: COLORS.mediumGray,
        backgroundColor: COLORS.cardBackground,
    },
});

export default HabitItem;