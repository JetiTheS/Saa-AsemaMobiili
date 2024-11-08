
import { useEffect, useState } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import Homepage from './screens/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();


export default function App() {



  const [haku, setHaku] = useState()



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
