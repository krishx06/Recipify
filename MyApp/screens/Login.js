import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Surface, Icon } from 'react-native-paper';

export default function Login({ navigation, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Surface style={styles.header} elevation={0}>
          <View style={styles.logoWrap}>
            <Icon source="food" size={36} color={GREEN_PRIMARY} />
          </View>
          <Text variant="headlineLarge" style={styles.title}>Login</Text>
          <Text variant="bodyMedium" style={styles.subTitle}>Welcome back to Recipify</Text>
          <View style={styles.segmented}>
            <Button mode="contained" style={styles.segmentActive}>Login</Button>
            <Button mode="text" textColor={GREEN_PRIMARY} onPress={() => (onSwitch ? onSwitch('signup') : navigation?.navigate('Signup'))}>
              Register
            </Button>
          </View>
        </Surface>

        <Surface style={styles.card} elevation={2}>
          <View style={styles.formGroup}>
            <TextInput
              mode="outlined"
              label="Email"
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="email-outline" />}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              left={<TextInput.Icon icon="lock-outline" />}
            />
          </View>

          <Button mode="contained" onPress={() => navigation?.navigate('Home')} style={styles.cta}>
            Login
          </Button>

          <Button mode="outlined" onPress={() => navigation?.navigate('Home')} style={styles.secondary}>
            Continue as Guest
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const GREEN_BG = '#EAF6E9';
const GREEN_PRIMARY = '#2E7D32';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GREEN_BG,
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    marginTop: -40,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 8,
    paddingBottom: 8,
  },
  logoWrap: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    color: '#1b1b1b',
    fontWeight: '700',
  },
  greetingTop: {
    color: '#2b2b2b',
  },
  subTitle: {
    marginTop: 4,
    color: '#4d4d4d',
    textAlign: 'center',
  },
  segmented: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: 24,
  },
  segmentActive: {
    borderRadius: 18,
    backgroundColor: GREEN_PRIMARY,
  },
  card: {
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  formGroup: {
    marginBottom: 12,
  },
  cta: {
    marginTop: 8,
    backgroundColor: GREEN_PRIMARY,
    borderRadius: 12,
  },
  secondary: {
    marginTop: 8,
    borderRadius: 12,
    borderColor: GREEN_PRIMARY,
  },
});


