import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import OpenAI from 'openai';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

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
    const photo = await cameraRef.current.takePictureAsync({ base64: true });
    setImageUri(photo.uri);
    setCalories('Analyzing...'); // Reset before analysis
    analyzeImage(photo.uri);
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

      // OpenAI GPT-4o API Call
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Identify the food item and estimate its calories.' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` } },
            ],
          },
        ],
        max_tokens: 300,
      });

      // Extract and set calorie data
      setCalories(response.choices[0].message.content);
      console.log('✅ OpenAI Response:', response.choices[0].message.content);
    } catch (error) {
      console.error('❌ Error analyzing image:', error);
      setCalories('Failed to analyze image.');
    }
  };

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
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
    marginBottom: 160,
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
