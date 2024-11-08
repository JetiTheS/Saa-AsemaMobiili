import { Pressable, StyleSheet, View, ImageBackground, Touchable, Image } from 'react-native';
import { TextInput, Button, Searchbar, Icon, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta


export default function Homepage() {

    const [weatherForecast, setWeatherForecast] = useState();
    const [haku, setHaku] = useState();
    const [location, setLocation] = useState()
    console.log(weatherForecast);


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






    const handleFetch = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${region.latitude}&lon=${region.longitude}&lang=fi&units=metric&appid=${personalCode}`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch:" + response.statusText + response.status);

                return response.json()
            })
            .then(data => setWeatherForecast(data))

            .catch(error => console.error(error));
    }


    useEffect(() => { getLocation() }, []);

    //<ImageBackground blurRadius={70} resizeMode='cover' source={require('../assets/images/random.png')} style={styles.backimage} />
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ImageBackground blurRadius={60} resizeMode='cover' source={require('../assets/images/random.png')} style={styles.backimage} >
                    <View style={styles.searchbar}>
                        <Searchbar placeholder='Anna kaupunki' onChangeText={text => setHaku(text)} value={haku}></Searchbar>
                        <Button mode="elevated" onPress={() => handleFetch()}>Hae</Button>
                    </View>
                    {/*Ennuste */}
                    <View style={styles.row}>
                        <Text variant='displaySmall' style={styles.forecastlocation}>{weatherForecast.name}, </Text>
                        <Text variant='displaySmall' style={styles.forecastlocation}>{weatherForecast.sys.country} </Text>

                    </View>
                    {/*Sää kuva*/}
                    <View>
                        <Image style={styles.weatherpicture} source={require("../assets/images/sun.png")} />
                    </View>
                    {/*Asteet */}
                    <View>
                        <Text variant='displayMedium' style={styles.decrees}>{weatherForecast.main.temp}&#176;</Text>
                    </View>
                    <View>
                        <Text variant='displayMedium' style={styles.decreestext}>{weatherForecast.weather.description}</Text>
                    </View>
                    <View style={styles.stats}>
                        <View style={styles.icons}>
                            <Icon source="weather-windy" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext}>{weatherForecast.wind.speed}km/h</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon source="water-outline" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext} >{weatherForecast.main.humidity}%</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon source="weather-sunset-up" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext}>06:30</Text>
                        </View>
                    </View>

                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backimage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    searchbar: {
        marginBottom: 30,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    forecastlocation:
    {
        color: "white",
        fontWeight: "bold",
    }
    ,
    forecastlocationC:
    {
        color: "lightgrey",

        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    weatherpicture: {
        width: 200,
        height: 200
    },
    decrees: {
        color: "white",
        fontWeight: "bold"
    },
    decreestext: {
        color: "white",

    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",

    },
    icontext: {
        color: "lightgrey"
    }

});
