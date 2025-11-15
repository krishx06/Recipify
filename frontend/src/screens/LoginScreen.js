import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import googleConfig from '../config/googleConfig';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: googleConfig.iosClientId,
    androidClientId: googleConfig.androidClientId,
    webClientId: googleConfig.webClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  async function getUserInfo(token) {
    let res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const userInfo = await res.json();
    setUser(userInfo);
  }

  return (
    <View style={styles.container}>
      {!user ? (
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => promptAsync()}
        >
          <Text style={styles.primaryButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.profile}>
          <Image source={{ uri: user.picture }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  primaryButton: { backgroundColor: '#e11932', padding: 15, borderRadius: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16 },
  profile: { alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14, color: 'gray' }
});
