import { Pressable, StyleSheet, View, ImageBackground, Touchable, Image } from 'react-native';
import { TextInput, Button, Searchbar, Icon, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


const personalCode = process.env.EXPO_PUBLIC_PERSONAL_CODE //API-Avain .env tiedostosta

export default function Mappage() {
    return (
        <View style={styles.container}>
            <Text>Map</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});