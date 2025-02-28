import { Text, View } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg font-bold">Analytics</Text>
      </View>

      {/* Summary */}
      <View className="mt-4 rounded-lg bg-white p-4 shadow-md">
        <Text className="text-xl font-bold">Your Progress</Text>
        <Text className="mt-2">Calories consumed: 2000 kcal</Text>
        <Text>Calories burned: 500 kcal</Text>
      </View>

      {/* Graph Placeholder */}
      <View className="mt-4 flex h-40 items-center justify-center rounded-lg bg-white p-4 shadow-md">
        <Text className="text-gray-500">Graph goes here</Text>
      </View>

      {/* Macros Breakdown */}
      <View className="mt-4 flex flex-row justify-between">
        <View className="w-1/3 rounded-lg bg-white p-3 shadow-md">
          <Text className="text-center">120g Protein</Text>
        </View>
        <View className="w-1/3 rounded-lg bg-white p-3 shadow-md">
          <Text className="text-center">150g Carbs</Text>
        </View>
        <View className="w-1/3 rounded-lg bg-white p-3 shadow-md">
          <Text className="text-center">50g Fat</Text>
        </View>
      </View>
    </View>
  );
}
