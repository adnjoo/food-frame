import { useState } from 'react';
import { Text, View, Switch, TouchableOpacity, Alert } from 'react-native';

import { supabase } from '../../utils/supabase';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Logged Out', 'You have been logged out successfully.');
    }
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg font-bold">Settings</Text>
      </View>

      {/* Notifications */}
      <View className="mt-4 flex-row items-center justify-between rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg">Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      {/* Theme Selection */}
      <View className="mt-4 flex-row items-center justify-between rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg">Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity className="mt-6 rounded-lg bg-red-500 p-3" onPress={handleLogout}>
        <Text className="text-center font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
