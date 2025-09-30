import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Surface, Icon } from 'react-native-paper';

export default function Signup({ onSwitch }) {
  const [name, setName] = useState('');
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
          <Text variant="headlineLarge" style={styles.title}>Register</Text>
          <Text variant="bodyMedium" style={styles.subTitle}>Create your Recipify account</Text>
          <View style={styles.segmented}>
            <Button mode="text" textColor={GREEN_PRIMARY} onPress={() => onSwitch && onSwitch('login')}>
              Login
            </Button>
            <Button mode="contained" style={styles.segmentActive}>Register</Button>
          </View>
        </Surface>

        <Surface style={styles.card} elevation={2}>
          <View style={styles.formGroup}>
            <TextInput
              mode="outlined"
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              left={<TextInput.Icon icon="account-outline" />}
            />
          </View>

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
              placeholder="Create password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              left={<TextInput.Icon icon="lock-outline" />}
            />
          </View>

          <Button mode="contained" onPress={() => {}} style={styles.cta}>
            Sign Up
          </Button>

          <Button mode="outlined" onPress={() => {}} style={styles.secondary}>
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


