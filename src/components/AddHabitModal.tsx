// src/components/AddHabitModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { HabitCategory, NewHabitData } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

const EMOJIS = ['🧘', '💧', '📚', '💪', '🏃', '🎨', '🎵', '🧑‍💻', '🌱', '🧠'];
const CATEGORIES: HabitCategory[] = ['Health', 'Productivity', 'Mindfulness', 'Social'];
const COLOR_OPTIONS = [COLORS.primary, COLORS.blue, COLORS.green, COLORS.orange, COLORS.red, COLORS.pink, COLORS.teal];

type Props = {
  visible: boolean;
  onClose: () => void;
  onAddHabit: (newHabit: NewHabitData) => void;
};

const AddHabitModal = ({ visible, onClose, onAddHabit }: Props) => {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [category, setCategory] = useState<HabitCategory>(CATEGORIES[0]);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a habit name.');
      return;
    }
    onAddHabit({ name, emoji, category, color });

    // Reset form
    setName('');
    setEmoji(EMOJIS[0]);
    setCategory(CATEGORIES[0]);
    setColor(COLOR_OPTIONS[0]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} activeOpacity={1}>
          {/* Close modal when clicking outside */}
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.handleBar} />
          <Text style={styles.title}>Add New Habit</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Habit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Morning Run"
              placeholderTextColor={COLORS.textSecondary}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Choose Emoji</Text>
            <View style={styles.optionGrid}>
              {EMOJIS.map(e => (
                <TouchableOpacity key={e} onPress={() => setEmoji(e)} style={[styles.emojiButton, emoji === e && styles.emojiSelected]}>
                  <Text style={styles.emojiText}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Category</Text>
            <View style={styles.optionGrid}>
              {CATEGORIES.map(c => (
                <TouchableOpacity key={c} onPress={() => setCategory(c)} style={[styles.categoryButton, category === c && { backgroundColor: color }]}>
                  <Text style={[styles.categoryText, category === c && { color: COLORS.textLight }]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Color</Text>
            <View style={styles.optionGrid}>
              {COLOR_OPTIONS.map(c => (
                <TouchableOpacity key={c} onPress={() => setColor(c)} style={[styles.colorButton, { backgroundColor: c }, color === c && styles.colorSelected]} />
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={[styles.actionButton, styles.cancelButton]}>
              <Text style={[styles.actionButtonText, { color: COLORS.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAdd}>
              <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                style={[styles.actionButton, styles.addButton]}
              >
                <Text style={[styles.actionButtonText, { color: COLORS.textLight }]}>Add Habit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24, // Add padding for bottom safe area manually if needed
    maxHeight: '85%',
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.border,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 12
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.textPrimary,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  emojiButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: COLORS.primaryLight + '30',
  },
  emojiText: {
    fontSize: 24
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontWeight: '600'
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: COLORS.cardBackground, // Border putih di dalem
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    gap: 12
  },
  actionButton: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButton: {
    // Dihapus backgroundColor, diganti LinearGradient
  },
  actionButtonText: {
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default AddHabitModal;