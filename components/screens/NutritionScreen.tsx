import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { supabase } from 'utils/supabase'; // Adjust based on project structure

export default function NutritionScreen({ route }) {
  console.log('route:', route);
  const navigation = useNavigation();
  const { foodLogId } = route.params || {};
  const [foodLog, setFoodLog] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchFoodLog = async () => {
      if (!foodLogId) return;
      const { data, error } = await supabase
        .from('food_logs')
        .select('id, food_name, calories, protein, carbs, fat, image_url')
        .eq('id', foodLogId)
        .single();
      if (error) {
        console.error('Error fetching food log:', error);
      } else {
        console.log('data:', data);
        setFoodLog(data);
      }
    };
    fetchFoodLog();
  }, [foodLogId]);

  if (!foodLog) {
    return <View className="flex-1 bg-white p-4" />;
  }

  const calories = foodLog.calories * quantity;
  const protein = foodLog.protein * quantity;
  const carbs = foodLog.carbs * quantity;
  const fats = foodLog.fat * quantity;

  return (
    <View className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Text className="text-lg font-bold">← Back</Text>
      </TouchableOpacity>

      <Text className="mb-4 text-center text-2xl font-bold">Nutrition</Text>

      <Image
        source={{ uri: foodLog.image_url || 'https://via.placeholder.com/315x200' }}
        className="mb-4 h-48 w-full rounded-lg"
      />

      <Text className="text-lg font-bold">{foodLog.food_name}</Text>

      <View className="mt-2 flex-row items-center">
        <TouchableOpacity
          className="rounded-lg bg-gray-200 px-4 py-2"
          onPress={() => setQuantity(Math.max(1, quantity - 1))}>
          <Text className="text-lg">-</Text>
        </TouchableOpacity>
        <Text className="mx-4 text-lg">{quantity}</Text>
        <TouchableOpacity
          className="rounded-lg bg-gray-200 px-4 py-2"
          onPress={() => setQuantity(quantity + 1)}>
          <Text className="text-lg">+</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 rounded-lg bg-gray-100 p-4">
        <Text className="text-lg">
          Calories: <Text className="font-bold">{calories}</Text>
        </Text>
        <Text className="text-lg">
          Protein: <Text className="font-bold">{protein}g</Text>
        </Text>
        <Text className="text-lg">
          Carbs: <Text className="font-bold">{carbs}g</Text>
        </Text>
        <Text className="text-lg">
          Fats: <Text className="font-bold">{fats}g</Text>
        </Text>
      </View>

      <View className="mt-6 flex-row justify-between">
        <TouchableOpacity className="rounded-lg bg-gray-300 px-6 py-3">
          <Text className="text-lg">Fix Results</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-lg bg-black px-6 py-3">
          <Text className="text-lg text-white">Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
