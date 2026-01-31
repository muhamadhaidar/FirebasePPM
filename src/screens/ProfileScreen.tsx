import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { useHabits } from '../contexts/HabitContext';
import StatCard from '../components/StatCard';
import { COLORS } from '../constants/colors';
import { MainTabScreenProps } from '../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';

import ScaleButton from '../components/ScaleButton';

type SettingsCardProps = {
  icon: string;
  label: string;
  description: string;
  onPress: () => void;
  iconBgColor?: string;
};

const SettingsCard = ({ icon, label, description, onPress, iconBgColor = COLORS.primaryLight }: SettingsCardProps) => (
  <ScaleButton onPress={onPress} style={styles.settingsCardContainer}>
    <View style={[styles.settingsIconBg, { backgroundColor: iconBgColor }]}>
      <Icon name={icon as any} size={20} color={COLORS.textLight} />
    </View>
    <View style={styles.settingsTextContent}>
      <Text style={styles.settingsLabel}>{label}</Text>
      <Text style={styles.settingsDescription}>{description}</Text>
    </View>
    <Icon name="angle-right" size={20} color={COLORS.textSecondary} />
  </ScaleButton>
);

const ProfileScreen = ({ navigation }: MainTabScreenProps<'Profile'>) => {
  const { stats } = useHabits();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => navigation.replace('Login'), style: "destructive" }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#E0C3FC', '#FDFBFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Profile</Text>

          <LinearGradient
            colors={[COLORS.profileGradient1, COLORS.profileGradient2, COLORS.profileGradient3]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.userCard}
          >
            <View style={styles.userInfoRow}>
              <View style={styles.avatar}>
                <Icon name="user" size={26} color={COLORS.textLight} />
              </View>
              <View style={styles.userTextContainer}>
                <Text style={styles.userName}>s</Text>
                <Text style={styles.userMember}>Habit Tracker Member</Text>
              </View>
            </View>

            <View style={styles.levelContainer}>
              <Icon name="fire" size={14} color={COLORS.textLight} style={{ opacity: 0.8 }} />
              <Text style={styles.levelText}>Level 1</Text>
              <Progress.Bar
                progress={0.3}
                width={null}
                color={COLORS.textLight}
                unfilledColor={'rgba(255,255,255,0.3)'}
                borderWidth={0}
                height={5}
                style={styles.progressBar}
              />
            </View>
          </LinearGradient>

          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.grid}>
            <StatCard
              label="Total Streak"
              value={stats.totalStreak}
              icon="fire"
              color={COLORS.red}
            />
            <StatCard
              label="Longest Streak"
              value={stats.longestStreak}
              icon="trophy"
              color={COLORS.orange}
            />
          </View>
          <View style={styles.grid}>
            <StatCard
              label="Active Days"
              value={stats.activeDays}
              icon="calendar"
              color={COLORS.blue}
            />
            <StatCard
              label="Completions"
              value={stats.completions}
              icon="trophy"
              color={COLORS.green}
            />
          </View>

          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsGrid}>
            <SettingsCard
              icon="bell"
              label="Notifications"
              description="Manage your reminders"
              onPress={() => { }}
              iconBgColor={COLORS.primaryLight}
            />
            <SettingsCard
              icon="lock"
              label="Privacy"
              description="Control your data"
              onPress={() => { }}
              iconBgColor={COLORS.primaryLight}
            />
            <SettingsCard
              icon="gear"
              label="Preferences"
              description="App settings"
              onPress={() => { }}
              iconBgColor={COLORS.primaryLight}
            />
          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <View style={styles.logoutIconContainer}>
              <Icon name="sign-out" size={20} color={COLORS.red} />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
            <Icon name="angle-right" size={20} color={COLORS.red} />
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>HabitFlow v1.0.0</Text>
            <Text style={styles.footerText}>Made with ❤️ for better habits</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

// ==========================================================
// BARU: Styles (Banyak perubahan dan penambahan)
// ==========================================================
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingTop: 20,
    paddingHorizontal: 24,
    marginBottom: 24
  },
  userCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userTextContainer: {
    marginLeft: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  userName: { color: COLORS.textLight, fontSize: 20, fontWeight: 'bold' },
  userMember: { color: COLORS.textLight, fontSize: 13, opacity: 0.8, marginTop: 4 },
  levelContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    width: '100%',
  },
  levelText: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
    marginRight: 10,
  },
  progressBar: {
    flex: 1,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 24
  },
  grid: { flexDirection: 'row', gap: 16, marginBottom: 16, paddingHorizontal: 24 },

  // ==========================================================
  // STYLES BARU UNTUK SETTINGS CARDS
  // ==========================================================
  settingsGrid: {
    marginHorizontal: 24,
    gap: 12, // Jarak antar kartu pengaturan
    marginBottom: 24, // Jarak dari grid pengaturan ke tombol logout
  },
  settingsCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  settingsIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12, // Border radius ikon
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsTextContent: {
    flex: 1,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  settingsDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // ==========================================================
  // STYLES BARU UNTUK TOMBOL LOGOUT
  // ==========================================================
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Agar rata tengah
    backgroundColor: COLORS.red + '15', // Latar belakang merah muda transparan
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 24,
    marginBottom: 30, // Jarak ke footer
  },
  logoutIconContainer: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.red,
    marginRight: 10, // Jarak ke ikon panah
  },

  // ==========================================================
  // STYLES BARU UNTUK FOOTER
  // ==========================================================
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default ProfileScreen;