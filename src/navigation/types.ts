// src/navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

// Tipe untuk Stack Navigator Utama (Login -> Main)
export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined; // Merujuk ke seluruh Tab Navigator
};

// Tipe untuk Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
};

// --- Tipe Props untuk Layar ---

// Tipe untuk layar di Root Stack (misal: LoginScreen)
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Tipe untuk layar di Tab Navigator (misal: HomeScreen)
// Ini butuh 'Composite' karena di-nest di dalam RootStack
export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;