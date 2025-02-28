import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg font-bold">Settings</Text>
      </View>

      {/* Account Section */}
      <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
        <Text className="text-xl font-bold">Account</Text>
        <Text className="mt-2">Email: user@example.com</Text>
        <TouchableOpacity className="mt-2 rounded-lg bg-blue-500 p-2">
          <Text className="text-center text-white">Change Password</Text>
        </TouchableOpacity>
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
    </View>
  );
}
