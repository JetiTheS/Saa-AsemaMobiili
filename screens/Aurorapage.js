import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { formatDate } from '../constants/TimeConversions';

export default function Aurorapage() {

    const [auroraForecast, setAuroraForecast] = useState();
    const [selectedCode, setSelectedCode] = useState("NUR");
    //console.log(auroraForecast);



    useEffect(() => { handleAuroraFetch() }, []);

    const handleAuroraFetch = () => {

        fetch(`https://space.fmi.fi/MIRACLE/RWC/data/r_index_latest_fi.json`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in aurora fetch:" + response.statusText + response.status);

                return response.json()
            })
            .then(data => setAuroraForecast(data.data))


            .catch(error => console.error(error));
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['left', 'bottom', 'right']}>
                <ImageBackground blurRadius={50} resizeMode='cover' source={require('../assets/images/aurora.png')} style={styles.backimage} >
                    <View style={styles.container}>
                        <View>
                            <Text variant="headlineLarge" style={styles.Kptext}>Revontulten todennäköisyys Suomessa</Text>
                            <Text variant='displayMedium' style={styles.Kpvalue}></Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={selectedCode}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedCode(itemValue)
                                }>

                                {auroraForecast && Object.keys(auroraForecast).map(asemakoodi => <Picker.Item key={asemakoodi} label={auroraForecast[asemakoodi]["Asema"]} value={asemakoodi} />)}
                            </Picker>
                        </View>
                        {auroraForecast &&
                            <View style={styles.forecast}>
                                <Text variant='displaySmall' style={styles.klo}>
                                    Viimeisin Mittaus:
                                </Text>
                                <Text variant='displaySmall' style={styles.klo}>
                                    Klo: {formatDate(auroraForecast[selectedCode]["Aika"])}
                                </Text>
                                <Text variant='displaySmall' style={styles.textcolor}>
                                    Asema: {auroraForecast[selectedCode]["Asema"]}
                                </Text>
                                <Text variant='displaySmall' style={styles.textcolor}>
                                    R-lukema: {auroraForecast[selectedCode]["R-luku"]}
                                </Text>
                                <View style={styles.probability}>
                                    <Text variant='displaySmall' style={styles.textcolor}>
                                        Revontulten todennäköisyys:
                                    </Text>
                                    <Text variant='displaySmall' style={styles.textcolor}>
                                        {auroraForecast[selectedCode]["Revontulten todennäköisyys"]}
                                    </Text>
                                </View>
                            </View>
                        }
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        width: "100%"
    },
    klo: {
        textAlign: "center",
        color: "#EEE5E9"
    },
    textcolor: {
        color: "#EEE5E9"
    },
    forecast: {
        gap: 20,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 12,
        padding: 20,
        backgroundColor: "#2176AE",
        borderColor: "#08415C",
        width: "100%",

    },
    pickerContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#08415C",
        borderStyle: "solid",
        borderRadius: 12,
        backgroundColor: "#2176AE"
    },
    picker: {
        color: "#EEE5E9"
    },

    Kpvalue: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    Kptext: {
        color: "lightgray",
        textAlign: "center",
        marginTop: 30
    },

    backimage: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: "flex-start"
    },
});
