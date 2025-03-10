import { useNavigation, useFocusEffect } from '@react-navigation/native';
import FoodLogItem from 'components/FoodLogItem'; // Adjust import path
import Logo from 'components/icons/Logo';
import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from 'utils/supabase'; // Adjust based on your project structure

export default function Home() {
  const navigation = useNavigation();
  const [foodLogs, setFoodLogs] = useState<any[]>([]);

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

  useFocusEffect(
    useCallback(() => {
      fetchFoodLogs();
    }, [])
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="flex flex-row items-center rounded-lg bg-white p-4 shadow-md">
        <Logo width={30} height={30} fill="#0184ff" />
        <Text className="pl-2 text-lg font-bold">FoodFrame</Text>
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
      <View className="mt-4 flex-1 rounded-lg bg-white p-4 shadow-md">
        <Text className="text-lg font-bold">Recently Logged</Text>
        <FlatList
          data={foodLogs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Nutrition', { foodLogId: item.id })}>
              <FoodLogItem log={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
