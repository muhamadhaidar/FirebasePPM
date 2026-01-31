import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';

type Props = {
  label: string;
  value: string | number;
  icon: string;
  color: string;
};

const StatCard = ({ label, value, icon, color }: Props) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Icon name={icon} size={24} color={COLORS.textLight} style={styles.icon} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginBottom: 12,
  },
  value: {
    color: COLORS.textLight,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  label: {
    color: COLORS.textLight,
    fontSize: 13,
    opacity: 0.9,
  },
});

export default StatCard;