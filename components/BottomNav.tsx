import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View className="absolute bottom-0 left-0 right-0 flex flex-row justify-around bg-white py-8 shadow-md">
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
        <Text>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text>Settings</Text>
      </TouchableOpacity>
      <View className="h-10 w-10 items-center justify-center rounded-full bg-black">
        <Text className="text-white">+</Text>
      </View>
    </View>
  );
}
