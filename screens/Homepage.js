import { StyleSheet, View, ImageBackground, Image, FlatList } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { weatherImages } from '../constants/importImage';
import FiveDayList from "../constants/FiveDayList"

import WeatherStats from '../constants/WeatherStats';


const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta


export function Homepage() {

    const [weatherForecast, setWeatherForecast] = useState();
    const [haku, setHaku] = useState();
    const [location, setLocation] = useState();
    //console.log(weatherForecast);


    const [region, setRegion] = useState({
        latitude: "",
        longitude: "",
    })

    //console.log(region);

    useEffect(() => { getLocation() }, []); //Haetaan lokaatio kun avataan äppi
    useEffect(() => { region.latitude && region.longitude && handleFetch() }, [region]) //tehdään haku kun region muuttuu


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


    const handleAddress = async () => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${haku}&limit=${1}&appid=${personalCode}`)
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


    const handleFetch = () => {

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${region.latitude}&lon=${region.longitude}&lang=fi&units=metric&appid=${personalCode}`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in saa fetch:" + response.statusText + response.status);

                return response.json()
            })
            .then(data => setWeatherForecast(data))

            .catch(error => console.error(error));
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'bottom', 'right']}>

                {/*Taustakuva*/}

                <ImageBackground blurRadius={60} resizeMode='cover' source={require('../assets/images/random.png')} style={styles.backimage} >

                    {/* Hakukenttä */}

                    <View style={styles.searchbar}>
                        <Searchbar placeholder='Anna kaupunki' onChangeText={text => setHaku(text)} onIconPress={handleAddress} value={haku}></Searchbar>
                    </View>

                    {/* Ennuste ?, jos ei oo vielä mitään näytettävää */}

                    <View style={styles.row}>
                        <Text variant='headlineLarge' style={styles.forecastlocation}>{weatherForecast?.city?.name}, </Text>
                        <Text variant='headlineLarge' style={styles.forecastlocation}>{weatherForecast?.city?.country} </Text>

                    </View>

                    {/*Sää kuva*/}

                    <View>
                        <Image style={styles.weatherpicture} source={weatherImages[weatherForecast?.list?.[0].weather?.[0].icon]} />
                    </View>

                    {/*Asteet */}

                    <View>
                        <Text variant='displayMedium' style={styles.decrees}>{parseInt(weatherForecast?.list?.[0].main?.temp)}&#176;C</Text>
                    </View>

                    {/*Sää selite */}

                    <View style={styles.description}>
                        <Text variant='displaySmall' style={styles.decreestext}>{weatherForecast?.list?.[0].weather?.[0].description}</Text>
                    </View>

                    {/*Sää lisätiedot */}

                    <View>
                        <WeatherStats weatherForecast={weatherForecast} />
                    </View>

                    {/*5 päivän sää listaus */}
                    <View>
                        <Text variant='bodyLarge' style={styles.fivedayhead}>5 Päivän sää</Text>
                    </View>

                    <View style={styles.headline} />

                    <FiveDayList weatherForecast={weatherForecast} />

                    <View style={styles.headline} />

                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({

    backimage: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: "flex-start"
    },

    searchbar: {
        marginTop: 30,
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "center",
        marginHorizontal: 5
    },

    forecastlocation: {
        color: "white",
        fontWeight: "bold",
        marginBottom: 20,
    },

    forecastlocationC: {
        color: "lightgrey",

        fontWeight: "bold"
    },

    row: {
        flexDirection: "row",
        alignItems: "baseline"
    },

    weatherpicture: {
        width: 190,
        height: 190,
        marginBottom: 18,
    },

    weatherpicturesmall: {
        width: 25,
        height: 25,
        marginBottom: 14
    },

    decrees: {
        color: "white",
        fontWeight: "bold",
        marginBottom: 20,
    },

    decreestext: {
        color: "white",

    },

    description: {
        marginBottom: 20
    },

    line: {
        width: 1,
        backgroundColor: "gray",
    },

    headline: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
    },

    fivedayhead: {
        marginBottom: 15,
        color: "lightgray",
        fontWeight: "bold",
    },

    fivedaytext: {
        color: "lightgray"
    }


});
