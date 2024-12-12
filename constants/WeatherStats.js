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
});
