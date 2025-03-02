import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, Alert, Pressable, ActivityIndicator } from 'react-native';

import { supabase } from '../../utils/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    else Alert.alert('Check your inbox for email verification!');

    setLoading(false);
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-5">
      {/* Title */}
      <Text className="mb-5 text-2xl font-bold text-gray-900">Welcome Back</Text>

      {/* Email Input */}
      <Input
        placeholder="Email"
        leftIcon={{ type: 'material', name: 'email', color: '#666' }}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        containerStyle={{ width: '100%' }}
      />

      {/* Password Input */}
      <Input
        placeholder="Password"
        leftIcon={{ type: 'material', name: 'lock', color: '#666' }}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
        containerStyle={{ width: '100%' }}
      />

      {/* Sign-in Button */}
      <Pressable
        onPress={signInWithEmail}
        className="w-[200px] items-center justify-center rounded-2xl bg-green-600 p-3"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text className="text-lg font-bold text-white">Sign In</Text>
        )}
      </Pressable>

      {/* Sign-up Button */}
      <Pressable
        onPress={signUpWithEmail}
        className="mt-2 w-[200px] items-center justify-center rounded-2xl border border-gray-500 p-3"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
        <Text className="text-lg font-bold text-gray-700">Sign Up</Text>
      </Pressable>

      {/* OR Divider */}
      <Text className="my-5 text-gray-500">OR</Text>

      {/* Terms and Conditions */}
      <Text className="mt-5 text-xs text-gray-500">
        By continuing, you agree to our <Text className="text-blue-500">Terms & Conditions</Text>{' '}
        and <Text className="text-blue-500">Privacy Policy</Text>.
      </Text>
    </View>
  );
}
