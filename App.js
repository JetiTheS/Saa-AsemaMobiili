import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';


const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta



export default function App() {


  const [weatherForecast, setWeatherForecast] = useState();
  const [haku, setHaku] = useState()

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })

  //console.log(weatherForecast);




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

  const handleFetch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${region.latitude}&lon=${region.longitude}&appid=${personalCode}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText + response.status);

        return response.json()
      })
      .then(data => setWeatherForecast(data))

      .catch(error => console.error(error));
  }

  useEffect(() => { getLocation() }, []);

  return (
    <View style={styles.container}>
      <PaperProvider>

        <Text>Open up App.js to start working on your app!</Text>
        <TextInput placeholder='Hae säätietoja' onChangeText={text => setHaku(text)}></TextInput>
        <Button mode="elevated" onPress={() => handleFetch()}><Text>Tietojen haku alkuun</Text></Button>
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
