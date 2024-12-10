import { StyleSheet, View, ImageBackground, Image, FlatList } from 'react-native';
import { Searchbar, Icon, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { weatherImages } from './importImage';
import { dayConvert } from '../constants/TimeConversions';
import { timeConvert } from '../constants/TimeConversions';


export default function FiveDayList({ weatherForecast }) {

    return (



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
                            {dayConvert(weatherForecast?.list?.[index].dt, weatherForecast)}
                        </Text>
                        <Text variant='bodyMedium' style={styles.itemtimesep}>
                            {timeConvert(item.dt, weatherForecast)}
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
        flexDirection: "row",
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
