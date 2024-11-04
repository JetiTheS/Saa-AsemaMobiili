import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Homepage() {

    const [weatherForecast, setWeatherForecast] = useState();

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

    return (


        <View style={styles.container}>


            <StatusBar style="auto" />
            <SafeAreaView style={styles.safe}>
                <View style={styles.upper}>
                    <View style={styles.help}>
                        <TextInput style={styles.searchaInput} placeholder='Hae säätietoja' onChangeText={text => setHaku(text)}></TextInput>
                        <Button mode="elevated" onPress={() => handleFetch()}><Text>Tietojen haku alkuun</Text></Button>
                    </View>
                </View>
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    searchaInput: {


    },
    help: {

    },
    safe: {
        flex: 1
    },


});
