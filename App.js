
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import Homepage from './screens/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta

const Stack = createNativeStackNavigator();


export default function App() {



  const [haku, setHaku] = useState()

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })






  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      ...region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }



  useEffect(() => { getLocation() }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homepage" options={{ headerShown: false }} component={Homepage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
