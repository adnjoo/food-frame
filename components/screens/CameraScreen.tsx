import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import OpenAI from 'openai';
import { ChatCompletionContentPartImage } from 'openai/resources/chat/completions';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { supabase } from 'utils/supabase';

import CrosshairOverlay from '../CrosshairOverlay';

// Load API Key (Ensure this is set in your Expo environment)
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

// Initialize OpenAI Client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for React Native
});

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [calories, setCalories] = useState<string | null>(null);
  const cameraRef = useRef(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });

    // Calculate Base64 image size
    const base64Length = photo.base64.length * (3 / 4) - 2; // Convert Base64 to byte size
    const imageSizeKB = base64Length / 1024; // Convert bytes to KB

    console.log(`📸 Image Size: ${imageSizeKB.toFixed(2)} KB`); // Log size in KB

    setImageUri(photo.uri);
    setCalories('Analyzing...');
    analyzeImage(photo.base64);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setCalories('Analyzing...'); // Reset before analysis
      analyzeImage(result.assets[0].base64!);
    }
  };

  const analyzeImage = async (base64: string) => {
    try {
      console.log('📸 Processing Image');

      // Ensure the Base64 string is correctly formatted
      const imageData: ChatCompletionContentPartImage = {
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${base64}`, // ✅ Correct Base64 format
          detail: 'auto', // ✅ Improve processing accuracy
        },
      };

      // OpenAI GPT-4o API Call
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // gpt-4o-mini || gpt-4o
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Identify the food item and provide the estimated calorie count in JSON format with keys: food_name, calories.',
              },
              imageData, // ✅ Now correctly formatted
            ],
          },
        ],
        max_tokens: 300,
      });

      let responseText = response.choices[0].message.content as string;
      console.log('📝 OpenAI Raw Response:', responseText);

      // ✅ Remove Markdown formatting (```json ... ```)
      responseText = responseText.replace(/```json\n?|\n?```/g, '').trim();

      // Parse cleaned JSON
      const data = JSON.parse(responseText);

      setCalories(`${data.food_name}: ${data.calories} kcal`);
      logCalories(data.food_name, data.calories, base64); // Save to database
    } catch (error) {
      console.error('❌ Error analyzing image:', error);
      setCalories('Failed to analyze image.');
    }
  };

  const logCalories = async (food_name: string, calories: number) => {
    try {
      console.log('📤 Logging food calories to Supabase...');

      // Get current user ID from Supabase Auth
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user?.user?.id) {
        throw new Error('User not authenticated');
      }

      // Insert food log into the database
      const { error } = await supabase.from('food_logs').insert([
        {
          user_id: user.user.id, // Required for RLS policies
          food_name,
          calories,
        },
      ]);

      if (error) throw error;
      console.log('✅ Food log saved:', food_name, calories);
    } catch (error) {
      console.error('❌ Error saving food log:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          {/* Add Crosshair Overlay */}
          <CrosshairOverlay />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Ionicons name="camera" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Ionicons name="images" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <Text className="my-2 text-lg font-bold">{calories || 'Analyzing...'}</Text>
          <Button title="Retake" onPress={() => setImageUri(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    marginBottom: 100,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
});
