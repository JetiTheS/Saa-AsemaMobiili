
import { useEffect, useState } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';

import Homepage from './screens/Homepage';
import Mappage from './screens/Mappage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';



const Tab = createBottomTabNavigator();

//options={{ headerShown: false }}
export default function App() {



  const [haku, setHaku] = useState()



  return (


    <PaperProvider>

      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            let iconName;


            if (route.name === 'Sää nyt') {
              iconName = 'cloudy-outline';
              color = "black"
            } else if (route.name === 'Sääkartta') {
              iconName = 'map';
              color = "green";
            }

            return <Ionicons name={iconName} size={size} color={color} />;   //it returns an icon component
          },
        })}>
          <Tab.Screen name="Sää nyt" options={{ headerShown: false }} component={Homepage} />
          <Tab.Screen name="Sääkartta" options={{ headerShown: false }} component={Mappage} />
        </Tab.Navigator>

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
