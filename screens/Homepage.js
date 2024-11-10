import { Pressable, StyleSheet, View, ImageBackground, Touchable, Image } from 'react-native';
import { TextInput, Button, Searchbar, Icon, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta

const apikey = "66ed31c1c9fd4490011665mzge94039"; //Väliaikainen ratkaisu kordinaattien hakuun

export default function Homepage() {

    const [weatherForecast, setWeatherForecast] = useState();
    const [haku, setHaku] = useState();
    const [location, setLocation] = useState();
    //console.log(weatherForecast);


    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
    })

    //console.log(region);

    useEffect(() => { getLocation() }, []); //Haetaan lokaatio kun avataan äppi
    useEffect(() => handleFetch(), [region]) //tehdään haku kun region muuttuu


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
                    throw new Error("Error in saa fetch:" + response.statusText + response.status);

                return response.json()
            })
            .then(data => setWeatherForecast(data))

            .catch(error => console.error(error));
    }


    const handleAddress = () => {
        fetch(`https://geocode.maps.co/search?q=${haku}&api_key=${apikey}`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in address fetch:" + response.statusText + response.status);

                return response.json()
            })

            .then(data => {
                if (!data?.[0]) return // jos ei dataa
                setRegion({

                    ...region,
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                })
            }

            )

            .catch(err => console.error(err));

    }
    //Saadun aika rimpsun rakentelu + muunto milli sekunteksi
    const timeConvert = (sunrise) => {
        const date = new Date(sunrise * 1000)

        let hours = date.getHours()
        let minutes = date.getMinutes()

        if (date.getHours() < 10) {
            hours = "0" + date.getHours()
        }
        if (date.getMinutes() < 10) {
            minutes = "0" + date.getMinutes()
        }
        return hours + ":" + minutes
    }




    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ImageBackground blurRadius={60} resizeMode='cover' source={require('../assets/images/random.png')} style={styles.backimage} >

                    <View style={styles.searchbar}>
                        <Searchbar placeholder='Anna kaupunki' onChangeText={text => setHaku(text)} onIconPress={handleAddress} value={haku}></Searchbar>
                    </View>

                    {/*Ennuste 
                    ?, jos ei oo vielä mitään näytettävää
                    */}
                    <View style={styles.row}>
                        <Text variant='displaySmall' style={styles.forecastlocation}>{weatherForecast?.name}, </Text>
                        <Text variant='displaySmall' style={styles.forecastlocation}>{weatherForecast?.sys?.country} </Text>

                    </View>
                    {/*Sää kuva
                    Kesken
                    */}
                    <View>
                        <Image style={styles.weatherpicture} source={require("../assets/images/sun.png")} />
                    </View>
                    {/*Asteet */}
                    <View>
                        <Text variant='displayMedium' style={styles.decrees}>{parseInt(weatherForecast?.main?.temp)}&#176;C</Text>
                    </View>
                    <View>
                        <Text variant='displayMedium' style={styles.decreestext}>{weatherForecast?.weather?.[0].description}</Text>
                    </View>
                    <View style={styles.stats}>
                        <View style={styles.icons}>
                            <Icon source="weather-windy" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext}>{weatherForecast?.wind?.speed}km/h</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon source="water-outline" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext} >{weatherForecast?.main?.humidity}%</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon source="weather-sunset-up" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext}>{timeConvert(weatherForecast?.sys?.sunrise)}</Text>
                        </View>
                    </View>

                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {


    },
    backimage: {
        height: "100%",
        alignItems: 'center',
        justifyContent: "space-evenly"
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
    },
    haku: {
        width: 200
    }

});
