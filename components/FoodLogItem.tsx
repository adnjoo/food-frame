import { View, Text, Image } from 'react-native';

export default function FoodLogItem({ log }: { log: any }) {
  return (
    <View className="mt-3 flex-row items-center rounded-xl bg-gray-50 p-4 shadow-md">
      {/* Image */}
      {log.image_url ? (
        <Image source={{ uri: log.image_url }} className="mr-4 h-20 w-20 rounded-lg" />
      ) : (
        <View className="mr-4 h-20 w-20 rounded-lg bg-gray-300" />
      )}

      {/* Food Log Info */}
      <View className="flex-1">
        <Text className="text-sm font-semibold">{log.food_name}</Text>
        <Text className="mt-1 text-lg font-bold">🔥 {log.calories} calories</Text>

        {/* Macros */}
        <View className="mt-1 flex-row">
          <Text className="mr-2 text-xs text-red-500">🍗 {log.protein ?? 0}g</Text>
          <Text className="mr-2 text-xs text-orange-500">🌾 {log.carbs ?? 0}g</Text>
          <Text className="text-xs text-blue-500">🧈 {log.fats ?? 0}g</Text>
        </View>
      </View>

      {/* Timestamp */}
      <View className="rounded-full bg-gray-200 px-2 py-1">
        <Text className="text-xs text-gray-600">
          {new Date(log.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
}
