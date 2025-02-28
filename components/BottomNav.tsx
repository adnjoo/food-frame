import { Text, View } from 'react-native';

export default function BottomNav() {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex flex-row justify-around bg-white py-4 shadow-md">
      <Text>Home</Text>
      <Text>Analytics</Text>
      <Text>Settings</Text>
      <View className="h-10 w-10 items-center justify-center rounded-full bg-black">
        <Text className="text-white">+</Text>
      </View>
    </View>
  );
}
