import { Text, View } from 'react-native';

export default function FoodTrackerScreen({ path }: { path: string }) {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg font-bold">Food Tracker AI</Text>
      </View>

      {/* Date Selection */}
      <View className="mt-4 rounded-lg bg-white p-3 shadow-md">
        <Text className="text-center">Date Selector</Text>
      </View>

      {/* Calorie Summary */}
      <View className="mt-4 flex items-center rounded-lg bg-white p-4 shadow-md">
        <Text className="text-2xl font-bold">1089</Text>
        <Text>Calories left</Text>
      </View>

      {/* Macros */}
      <View className="mt-4 flex flex-row justify-between">
        <View className="w-1/3 rounded-lg bg-white p-3 shadow-md">
          <Text className="text-center">96g Protein</Text>
        </View>
        <View className="w-1/3 rounded-lg bg-white p-3 shadow-md">
          <Text className="text-center">131g Carbs</Text>
        </View>
        <View className="w-1/3 rounded-lg bg-white p-3 shadow-md">
          <Text className="text-center">18g Fat</Text>
        </View>
      </View>

      {/* Premium Subscription */}
      <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
        <Text className="font-bold">Premium</Text>
        <Text>Subscription cancelled. Resubscribe to keep access.</Text>
      </View>

      {/* Recently Logged */}
      <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
        <Text className="font-bold">Recently Logged</Text>
      </View>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 flex flex-row justify-around bg-white py-4 shadow-md">
        <Text>Home</Text>
        <Text>Analytics</Text>
        <Text>Settings</Text>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-black">
          <Text className="text-white">+</Text>
        </View>
      </View>
    </View>
  );
}
