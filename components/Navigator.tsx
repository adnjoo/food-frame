import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View } from 'react-native';

import BottomNav from './BottomNav';
import AnalyticsScreen from './screens/Analytics';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Main Container */}
        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </View>

        {/* Bottom Navigation is outside flex: 1 */}
        <BottomNav />
      </SafeAreaView>
    </NavigationContainer>
  );
}
