import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white pb-12 pt-6 shadow-md">
      {/* Navigation Tabs Container */}
      <View className="flex flex-row justify-around pr-32">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
          <Text>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Plus Button (Independent from Tabs) */}
      <TouchableOpacity className="absolute -top-6 right-4 h-16 w-16 items-center justify-center rounded-full bg-black shadow-lg">
        <Text className="text-2xl text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
}
