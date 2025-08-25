import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'outlined';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  variant = 'default',
  style,
  ...props
}) => {
  const inputStyle = [
    styles.input,
    styles[variant],
    error && styles.inputError,
    style,
  ].filter(Boolean) as any;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={inputStyle}
        placeholderTextColor={COLORS.text.muted}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  input: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    minHeight: 48,
  },
  default: {
    backgroundColor: COLORS.gray[50],
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  outlined: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});

export default Input;