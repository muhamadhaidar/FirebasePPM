import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, StatusBar, Image } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
import { COLORS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/FontAwesome';
import ScaleButton from '../components/ScaleButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const [name, setName] = useState('');

  const handleLogin = async () => {
    if (name.trim().length === 0) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    try {
      await AsyncStorage.setItem('userTag', name);
      navigation.replace('MainApp');
    } catch (e) {
      Alert.alert('Error', 'Failed to save login data');
    }
  };

  return (
    <LinearGradient
      colors={['#E0C3FC', '#FDFBFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View style={styles.content}>

          <Image
            source={require('../../assets/habitflow_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Sign in to continue your habit journey</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={COLORS.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <ScaleButton style={styles.buttonWrapper} onPress={handleLogin}>
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </LinearGradient>
          </ScaleButton>

          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>|</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  logo: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    marginBottom: 0,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.textPrimary, marginTop: 12, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: COLORS.textSecondary, marginBottom: 48, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: COLORS.inputBackground,
    width: '100%',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  buttonWrapper: { marginTop: 16, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 10 },
  button: { width: '100%', padding: 20, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: COLORS.textLight, fontSize: 16, fontWeight: 'bold' },
  footerLinks: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 32 },
  linkText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  linkSeparator: { color: COLORS.border, marginHorizontal: 12 },
});

export default LoginScreen;