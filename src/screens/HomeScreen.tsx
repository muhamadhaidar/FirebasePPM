import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useHabits } from '../contexts/HabitContext';
import { COLORS } from '../constants/colors';
import HabitItem from '../components/HabitItem';
import AddHabitModal from '../components/AddHabitModal';
import Icon from '@expo/vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { MainTabScreenProps } from '../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import ScaleButton from '../components/ScaleButton'; // Import ScaleButton

const HomeScreen = ({ navigation }: MainTabScreenProps<'Home'>) => {
  const { habits, stats, loading, addHabit, toggleHabitToday, isHabitCompletedToday, removeHabit } = useHabits();
  const [modalVisible, setModalVisible] = useState(false);

  const completedTodayCount = habits.filter(isHabitCompletedToday).length;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={['#E0C3FC', '#FDFBFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerHello}>Hello,</Text>
            <Text style={styles.headerName}>S</Text>
          </View>

          <LinearGradient
            colors={[COLORS.profileGradient1, COLORS.profileGradient2, COLORS.profileGradient3]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.progressCard}
          >
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
              <Text style={styles.progressFraction}>{`${completedTodayCount} / ${habits.length}`}</Text>
            </View>

            <Progress.Bar
              progress={stats.todayProgress}
              width={null}
              color={'#FFFFFF'}
              unfilledColor={'rgba(255,255,255,0.3)'}
              borderWidth={0}
              height={8}
              style={styles.progressBar}
            />
          </LinearGradient>

          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Your Habits</Text>
            <ScaleButton onPress={() => setModalVisible(true)}>
              <LinearGradient
                colors={[COLORS.profileGradient1, COLORS.profileGradient2, COLORS.profileGradient3]}
                style={styles.addButton}
              >
                <Icon name="plus" size={16} color={COLORS.textLight} />
              </LinearGradient>
            </ScaleButton>
          </View>

          {habits.length > 0 ? (
            <FlatList
              data={habits}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <HabitItem
                  habit={item}
                  isCompleted={isHabitCompletedToday(item)}
                  onToggle={() => toggleHabitToday(item.id)}
                  onRemove={() => removeHabit(item.id)}
                />
              )}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada habit.</Text>
              <Text style={styles.emptySubText}>Klik tombol '+' untuk memulai!</Text>
            </View>
          )}
        </ScrollView>

        <AddHabitModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddHabit={(newHabit) => {
            addHabit(newHabit);
            setModalVisible(false);
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollContainer: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerHello: { fontSize: 22, color: COLORS.textSecondary, fontWeight: '500' },
  headerName: { fontSize: 34, fontWeight: 'bold', color: COLORS.textPrimary },
  progressCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: COLORS.profileGradient1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { color: COLORS.textLight, fontSize: 16, fontWeight: '600', opacity: 0.9 },
  progressFraction: { color: COLORS.textLight, fontSize: 16, fontWeight: 'bold' },

  progressBar: {
    borderRadius: 4,
    marginTop: 16,
  },

  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 32, marginBottom: 16 },
  listTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.profileGradient1,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 50 },
  emptyText: { fontSize: 18, fontWeight: '600', color: COLORS.textSecondary },
  emptySubText: { fontSize: 14, color: COLORS.mediumGray, marginTop: 8 },
});

export default HomeScreen;