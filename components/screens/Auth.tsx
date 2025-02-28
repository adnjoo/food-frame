import { Button, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';

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
      <Button
        title="Sign In"
        onPress={signInWithEmail}
        loading={loading}
        buttonStyle={{ backgroundColor: '#4CAF50', borderRadius: 25, width: '100%', padding: 10 }}
      />

      {/* Sign-up Button */}
      <Button
        title="Sign Up"
        onPress={signUpWithEmail}
        type="outline"
        buttonStyle={{ borderRadius: 25, width: '100%', padding: 10, marginTop: 10 }}
      />

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
