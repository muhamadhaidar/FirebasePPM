import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, SectionList, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHabits } from '../contexts/HabitContext';
import { Habit } from '../types';
import { getTodayString, getYesterdayString } from '../utils/helpers';
import { COLORS } from '../constants/colors';
import Icon from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HistoryStatCard = ({ label, value, iconName, gradientColors }) => {
    const shadowColor = gradientColors[0] || '#000';

    return (
        <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
                styles.statCard,
                Platform.select({
                    ios: {
                        shadowColor: shadowColor,
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.5,
                        shadowRadius: 15,
                    },
                    android: {
                        elevation: 5,
                    },
                })
            ]}
        >
            <View style={styles.statHeaderRow}>
                {iconName === "Total" ? (
                    <MaterialCommunityIcons name="chart-line" size={16} color={'#FFFFFF'} style={styles.cardHeaderIcon} />
                ) : (
                    <Icon name="calendar-check-o" size={16} color={'#FFFFFF'} style={styles.cardHeaderIcon} />
                )}
                <Text style={[styles.cardHeader, { color: '#FFFFFF' }]}>{label}</Text>
            </View>

            <View style={styles.statContent}>
                <Text style={[styles.statValue, { color: '#FFFFFF' }]}>{value}</Text>
                <Text style={[styles.statLabel, { color: '#FFFFFF' }]}>
                    {label === "Total" ? "completions" : "habits"}
                </Text>
            </View>
        </LinearGradient>
    );
};

const HistoryScreen = () => {
    const { stats, getCompletionsForDate } = useHabits();
    const todayCompletions = getCompletionsForDate(getTodayString());
    const yesterdayCompletions = getCompletionsForDate(getYesterdayString());

    const sections = [
        { title: 'Today', subtitle: `${todayCompletions.length} habits completed`, data: todayCompletions },
        { title: 'Yesterday', subtitle: `${yesterdayCompletions.length} habits completed`, data: yesterdayCompletions },
    ].filter(s => s.data.length > 0);

    const renderItem = ({ item }: { item: Habit }) => (
        <View style={styles.itemContainer}>
            <LinearGradient
                colors={[COLORS.statbar1start, COLORS.statbar1end]}
                style={styles.itemIcon}
            >
                <Text style={styles.emoji}>{item.emoji}</Text>
            </LinearGradient>
            <View style={styles.itemText}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemTime}>4:43 PM</Text>
            </View>
            <Icon name="check-circle" size={28} color={COLORS.green} />
        </View>
    );

    const renderSectionHeader = ({ section: { title, subtitle } }: any) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
    );

    return (
        <LinearGradient
            colors={['#E0C3FC', '#FDFBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>History</Text>

                <View style={styles.grid}>
                    <HistoryStatCard
                        label="Total"
                        value={stats.completions}
                        gradientColors={[COLORS.statbar1start, COLORS.statbar1end]}
                        iconName="Total"
                    />
                    <HistoryStatCard
                        label="Active"
                        value={stats.activeHabits}
                        gradientColors={[COLORS.statbar2start, COLORS.statbar2end]}
                        iconName="Active"
                    />
                </View>

                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                    stickySectionHeadersEnabled={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No history yet.</Text>
                            <Text style={styles.emptySubText}>Complete some habits to see them here!</Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        paddingTop: 20,
        paddingHorizontal: 24,
        marginBottom: 24
    },

    grid: { flexDirection: 'row', gap: 16, paddingHorizontal: 20, marginBottom: 32 },

    statCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        height: 105,
        justifyContent: 'space-between',
        // Hapus 'backgroundColor' dari sini jika ada, karena gradien yang mengaturnya
    },
    statHeaderRow: { flexDirection: 'row', alignItems: 'center' },
    cardHeaderIcon: { marginRight: 6 },
    cardHeader: { fontSize: 14, fontWeight: '600' },
    statContent: {},
    statValue: { fontSize: 26, fontWeight: 'bold' },
    statLabel: { fontSize: 13 },

    sectionHeader: {
        marginBottom: 12,
        marginTop: 8,
        paddingHorizontal: 1,
    },
    sectionTitle: {
        color: COLORS.textPrimary,
        fontSize: 15,
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        color: COLORS.textPrimary,
        fontSize: 15,
        fontWeight: '300',
        marginTop: 1,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12
    },
    itemIcon: {
        width: 44,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    emoji: { fontSize: 22 },
    itemText: { flex: 1 },
    itemName: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '600' },
    itemTime: { color: COLORS.textSecondary, fontSize: 13, marginTop: 4 },

    emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 50 },
    emptyText: { fontSize: 18, fontWeight: '600', color: COLORS.textSecondary },
    emptySubText: { fontSize: 14, color: COLORS.mediumGray, marginTop: 8 },
});

export default HistoryScreen;