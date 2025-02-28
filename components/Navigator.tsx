import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';

import BottomNav from './BottomNav';
import { supabase } from '../utils/supabase';
import AnalyticsScreen from './screens/Analytics';
import AuthScreen from './screens/Auth';
import CameraScreen from './screens/CameraScreen';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            {session && session.user ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Analytics" component={AnalyticsScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
              </>
            ) : (
              <Stack.Screen name="Auth" component={AuthScreen} />
            )}
          </Stack.Navigator>
        </View>
        {session && session.user && <BottomNav />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
