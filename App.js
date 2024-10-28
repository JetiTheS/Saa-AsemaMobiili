import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';


const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta



export default function App() {

  const handleFetch = () => {
    fetch('http://api.auroras.live/v1/?type=all&lat=40.7813913&long=-73.976902&forecast=false&threeday=false')
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText + response.status);

        return response.json()
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  useEffect(() => { handleFetch() }, []);

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
