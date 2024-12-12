import { StyleSheet, View, ImageBackground, Image, FlatList } from 'react-native';
import { Searchbar, Icon, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { weatherImages } from '../constants/importImage';
import { LineChart } from "react-native-gifted-charts";



const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta




export default function Aurorapage() {

    const [auroraForecast, setAuroraForecast] = useState();
    const [values, setValues] = useState([]);
    //const [data, setData] = useState([{ value: 5 }, { value: 8 }, { value: 10 }, { value: 30 }]);
    console.log(auroraForecast?.data);



    useEffect(() => { handleAuroraFetch() }, []);

    const handleAuroraFetch = () => {

        fetch(`https://space.fmi.fi/MIRACLE/RWC/data/r_index_latest_fi.json`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in saa fetch:" + response.statusText + response.status);

                return response.json()
            })
            .then(data => setAuroraForecast(data))


            .catch(error => console.error(error));
    }
    /*
        function handleAurora() {
            for (let i in auroraForecast?.threeday?.values) {
                for (let j in auroraForecast?.threeday?.values[i]) {
    
    
    
    
                }
    
            }
        }
    <View>
                            <LineChart data={data} />
                        </View>*/

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'bottom', 'right']}>
                <ImageBackground blurRadius={50} resizeMode='cover' source={require('../assets/images/aurora.png')} style={styles.backimage} >
                    <View>
                        <Text variant="headlineLarge" style={styles.Kptext}>Revontulten todennäköisyys Suomessa</Text>
                        <Text variant='displayMedium' style={styles.Kpvalue}></Text>
                    </View>


                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({

    Kpvalue: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    Kptext: {
        color: "lightgray",
        textAlign: "center",
        marginTop: 15
    },

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
        marginVertical: 15,
        color: "lightgrey"

    },

    itemspace: {
        marginBottom: 15,
        color: "lightgrey"
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
