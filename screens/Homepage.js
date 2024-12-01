import { StyleSheet, View, ImageBackground, Image, FlatList } from 'react-native';
import { Searchbar, Icon, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { weatherImages } from '../constants/importImage';

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



    //Saadun aika rimpsun rakentelu + muunto milli sekunteksi + aika-alue korjaus
    const timeConvert = (timestamp) => {
        timestamp += weatherForecast?.city?.timezone
        const date = new Date(timestamp * 1000)

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

    //Päivän saanti ja rakentaminen listaa varten
    const dayConvert = (timestamp) => {
        timestamp += weatherForecast?.city?.timezone
        const date = new Date(timestamp * 1000)
        let day = date.getUTCDay()
        const days = ["SU", "MA", "TI", "KE", "TO", "PE", "LA"]
        return days[day]
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>

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

                    <View style={styles.stats}>
                        <View style={styles.icons}>
                            <Icon source="weather-windy" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext}>{weatherForecast?.list?.[0].wind?.speed}m/s</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon source="water-outline" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext} >{weatherForecast?.list?.[0].main?.humidity}%</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon source="weather-sunset-up" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext}>{timeConvert(weatherForecast?.city?.sunrise)}</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon source="weather-sunset-down" size={40} color='lightgray'></Icon>
                            <Text variant='bodyMedium' style={styles.icontext}>{timeConvert(weatherForecast?.city?.sunset)}</Text>
                        </View>
                    </View>

                    {/*5 päivän sää listaus */}

                    <View>
                        <Text variant='bodyLarge' style={styles.fivedayhead}>5 Päivän sää</Text>
                    </View>
                    <View style={styles.headline} />
                    <View style={styles.flatlist}>
                        <View style={styles.fivedayitems}>
                            <Text variant='bodyMedium' style={styles.fivedaytext}>Päivä</Text>
                            <Text variant='bodyMedium' style={styles.fivedaytext}>Klo</Text>
                            <Text variant='bodyMedium' style={styles.fivedaytext}>Sää</Text>
                            <Text variant='bodyMedium' style={styles.fivedaytext}>&#176;C</Text>
                            <Text variant='bodyMedium' style={styles.fivedaytext}>Tuntuu </Text>
                            <Text variant='bodyMedium' style={styles.fivedaytext}>Tuuli</Text>
                        </View>
                        <View style={styles.line}></View>
                        <FlatList
                            data={weatherForecast?.list}
                            keyExtractor={(item) => item.dt}
                            ItemSeparatorComponent={<View style={styles.line}></View>}

                            horizontal
                            renderItem={({ item, index }) =>
                                <View style={styles.flatlistitems}>
                                    <Text variant='bodyMedium' style={styles.itemday}>
                                        {dayConvert(weatherForecast?.list?.[index].dt)}
                                    </Text>
                                    <Text variant='bodyMedium' style={styles.itemtimesep}>
                                        {timeConvert(item.dt)}
                                    </Text>

                                    <Image style={styles.weatherpicturesmall} source={weatherImages[weatherForecast?.list?.[index].weather?.[0].icon]} />

                                    <Text variant='bodyMedium' style={styles.itemspace}>
                                        {parseInt(item.main?.temp)}&#176;
                                    </Text>

                                    <Text variant='bodyMedium' style={styles.itemspace}>
                                        {parseInt(item.main.feels_like)}&#176;
                                    </Text>

                                    <Text variant='bodyMedium' style={styles.itemspace}>
                                        {item.wind.speed}
                                    </Text>
                                </View>}
                        />
                    </View>
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
        marginTop: 40,
        marginBottom: 25,
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
        width: 200,
        height: 200,
        marginBottom: 20,
    },

    weatherpicturesmall: {
        width: 25,
        height: 25,
        marginBottom: 15
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

    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },

    icons: {
        flexDirection: "row",
        alignItems: "center",

    },
    icontext: {
        color: "lightgrey"
    },

    itemtimesep: {
        marginHorizontal: 15,
        marginVertical: 15

    },

    itemspace: {
        marginBottom: 15
    },

    itemday: {
        marginTop: 15,
        color: "lightgray"
    },


    flatlist: {
        flexDirection: "row"
    },

    flatlistitems: {
        alignItems: "center",
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

    fivedayitems: {
        marginVertical: 15,
        marginLeft: 5,
        justifyContent: "space-between",
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
