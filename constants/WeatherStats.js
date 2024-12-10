import { StyleSheet, View, ImageBackground, Image, FlatList } from 'react-native';
import { Searchbar, Icon, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { weatherImages } from './importImage';
import { timeConvert } from './TimeConversions';


export default function WeatherStats({ weatherForecast }) {
    return (
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
                <Text variant='bodyMedium' style={styles.icontext}>{timeConvert(weatherForecast?.city?.sunrise, weatherForecast)}</Text>
            </View>
            <View style={styles.icons}>
                <Icon source="weather-sunset-down" size={40} color='lightgray'></Icon>
                <Text variant='bodyMedium' style={styles.icontext}>{timeConvert(weatherForecast?.city?.sunset, weatherForecast)}</Text>
            </View>
        </View>
    )
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
