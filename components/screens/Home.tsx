import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { supabase } from 'utils/supabase'; // Adjust based on your project structure

export default function FoodTrackerScreen() {
  const [foodLogs, setFoodLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFoodLogs = async () => {
      const { data, error } = await supabase
        .from('food_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching food logs:', error);
      } else {
        setFoodLogs(data);
      }
    };

    fetchFoodLogs();
  }, []);

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
        <Text className="text-lg font-bold">Recently Logged</Text>
        <FlatList
          data={foodLogs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mt-3 flex-row items-center rounded-xl bg-gray-50 p-4 shadow-md">
              {/* Image */}
              {item.image_url ? (
                <Image source={{ uri: item.image_url }} className="mr-4 h-20 w-20 rounded-lg" />
              ) : (
                <View className="mr-4 h-20 w-20 rounded-lg bg-gray-300" />
              )}

              {/* Food Log Info */}
              <View className="flex-1">
                <Text className="text-sm font-semibold">{item.food_name}</Text>
                <Text className="mt-1 text-lg font-bold">🔥 {item.calories} calories</Text>

                {/* Macros */}
                <View className="mt-1 flex-row">
                  <Text className="mr-2 text-xs text-red-500">🍗 {item.protein ?? 0}g</Text>
                  <Text className="mr-2 text-xs text-orange-500">🌾 {item.carbs ?? 0}g</Text>
                  <Text className="text-xs text-blue-500">🧈 {item.fats ?? 0}g</Text>
                </View>
              </View>

              {/* Timestamp */}
              <View className="rounded-full bg-gray-200 px-2 py-1">
                <Text className="text-xs text-gray-600">
                  {new Date(item.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
