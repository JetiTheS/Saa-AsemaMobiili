import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as Location from 'expo-location';


const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta



export default function App() {

  const [location, setLocation] = useState(null);
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

    setRegion({
      ...region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  const handleFetch = () => {
    fetch(`http://api.auroras.live/v1/?type=all&lat=${region.latitude}&long=${region.longitude}&forecast=false&threeday=false`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText + response.status);

        return response.json()
      })
      .then(data => data)
      .catch(error => console.error(error));
  }

  useEffect(() => { handleFetch(), getLocation() }, []);

  return (
    <View style={styles.container}>
      <PaperProvider>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </PaperProvider>
    </View>
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
