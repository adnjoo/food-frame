import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function NutritionScreen() {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const calories = 250 * quantity;
  const protein = 3 * quantity;
  const carbs = 30 * quantity;
  const fats = 5 * quantity;
  const healthScore = 4;

  return (
    <View className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Text className="text-lg font-bold">← Back</Text>
      </TouchableOpacity>

      <Text className="mb-4 text-center text-2xl font-bold">Nutrition</Text>

      <Image
        source={{ uri: 'https://via.placeholder.com/315x200' }}
        className="mb-4 h-48 w-full rounded-lg"
      />

      <Text className="text-lg font-bold">Beer and Snack</Text>

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

      <View className="mt-4">
        <Text className="text-lg">Health Score: {healthScore}/10</Text>
        <View className="mt-1 h-2 w-full rounded-full bg-gray-300">
          <View
            style={{ width: `${(healthScore / 10) * 100}%` }}
            className="h-full rounded-full bg-yellow-500"
          />
        </View>
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
