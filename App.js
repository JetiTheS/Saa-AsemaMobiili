import { PaperProvider } from 'react-native-paper';
import { Homepage } from './screens/Homepage';
import Aurorapage from './screens/Aurorapage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//options={{ headerShown: false }}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Sää') {

              iconName = "weather-cloudy"

            } else if (route.name === 'Avaruus-sää') {
              iconName = "star-four-points-outline";

            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}>
          <Tab.Screen name="Sää" options={{ headerShown: false }} component={Homepage} />
          <Tab.Screen name="Avaruus-sää" options={{ headerShown: false }} component={Aurorapage} />
        </Tab.Navigator>
      </NavigationContainer>

    </PaperProvider >
  );
}