import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Image, Modal, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { useHabits } from '../contexts/HabitContext';
import StatCard from '../components/StatCard';
import { COLORS } from '../constants/colors';
import { MainTabScreenProps } from '../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import ScaleButton from '../components/ScaleButton';

const { width, height } = Dimensions.get('window');

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
  const [username, setUsername] = useState('User');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userTag');
      if (storedName) setUsername(storedName);

      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedImage) setProfileImage(storedImage);
    } catch (e) {
      console.error("Failed to load profile data", e);
    }
  };

  const pickImage = async () => {
    setActionSheetVisible(false); // Close action sheet
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      setProfileImage(newImageUri);
      await AsyncStorage.setItem('profileImage', newImageUri);
    }
  };

  const handleProfilePhotoPress = () => {
    setActionSheetVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false); // Close modal
    try {
      // Optional: Clear user session data
      // await AsyncStorage.removeItem('userTag');
      // await AsyncStorage.removeItem('profileImage'); 
      // For now we just navigate back as per original flow, but you can uncomment above if a full reset is needed.

      navigation.replace('Login');
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
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
              <TouchableOpacity onPress={handleProfilePhotoPress} style={styles.avatarContainer}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Icon name="user" size={26} color={COLORS.textLight} />
                  </View>
                )}
                <View style={styles.editIconBadge}>
                  <Icon name="camera" size={12} color={COLORS.primary} />
                </View>
              </TouchableOpacity>

              <View style={styles.userTextContainer}>
                <Text style={styles.userName}>{username}</Text>
                <Text style={styles.userMember}>Habit Tracker Member</Text>
              </View>
            </View>
            {/* Level bar removed as requested */}
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

      {/* Action Sheet Modal */}
      <Modal
        visible={actionSheetVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActionSheetVisible(false)}
      >
        <TouchableOpacity
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setActionSheetVisible(false)}
        >
          <View style={styles.actionSheetContainer}>
            <View style={styles.actionSheetHandle} />
            <Text style={styles.actionSheetTitle}>Profile Photo</Text>

            <TouchableOpacity
              style={styles.actionSheetButton}
              onPress={() => {
                setActionSheetVisible(false);
                setModalVisible(true);
              }}
            >
              <Icon name="eye" size={20} color={COLORS.primary} style={styles.actionSheetIcon} />
              <Text style={styles.actionSheetButtonText}>View Photo</Text>
            </TouchableOpacity>

            <View style={styles.actionSheetDivider} />

            <TouchableOpacity
              style={styles.actionSheetButton}
              onPress={pickImage}
            >
              <Icon name="image" size={20} color={COLORS.primary} style={styles.actionSheetIcon} />
              <Text style={styles.actionSheetButtonText}>Change Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionSheetButton, styles.cancelButton]}
              onPress={() => setActionSheetVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Full Screen Image/Modal for View Photo */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="times" size={24} color="#FFF" />
          </TouchableOpacity>

          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.fullScreenImage} resizeMode="contain" />
          ) : (
            <View style={styles.noImageContainer}>
              <Icon name="user-circle" size={100} color="#FFF" />
              <Text style={{ color: '#FFF', marginTop: 20 }}>No Profile Photo Set</Text>
            </View>
          )}
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.logoutModalOverlay}
          activeOpacity={1}
          onPress={() => setLogoutModalVisible(false)}
        >
          <View style={styles.logoutModalContainer}>
            <View style={styles.logoutIconCircle}>
              <Icon name="sign-out" size={32} color={COLORS.red} />
            </View>
            <Text style={styles.logoutTitle}>Logout?</Text>
            <Text style={styles.logoutMessage}>Are you sure you want to log out of your account?</Text>

            <View style={styles.logoutActionButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalLogoutButton}
                onPress={confirmLogout}
              >
                <Text style={styles.modalLogoutText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    </LinearGradient>
  );
};

// ==========================================================
// STYLES
// ==========================================================
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    // Updated font size to match HistoryScreen (was 34)
    fontSize: 15,
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
    // Removed marginBottom since level bar is gone
  },
  userTextContainer: {
    marginLeft: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: { color: COLORS.textLight, fontSize: 20, fontWeight: 'bold' },
  userMember: { color: COLORS.textLight, fontSize: 13, opacity: 0.8, marginTop: 4 },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 24
  },
  grid: { flexDirection: 'row', gap: 16, marginBottom: 16, paddingHorizontal: 24 },

  // Settings Cards
  settingsGrid: {
    marginHorizontal: 24,
    gap: 12,
    marginBottom: 24,
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
    borderRadius: 12,
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

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red + '15',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 24,
    marginBottom: 30,
  },
  logoutIconContainer: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.red,
    marginRight: 10,
  },

  // Footer
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  fullScreenImage: {
    width: width,
    height: height * 0.7,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Action Sheet Styles
  actionSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  actionSheetContainer: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  actionSheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.border,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  actionSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  actionSheetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionSheetIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  actionSheetButtonText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  actionSheetDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  cancelButton: {
    marginTop: 12,
    justifyContent: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: COLORS.red,
    fontWeight: 'bold',
  },

  // Logout Modal Styles
  logoutModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoutModalContainer: {
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  logoutIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.red + '20', // transparent red
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  logoutMessage: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  logoutActionButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  modalLogoutButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modalLogoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ProfileScreen;