import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image } from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

function NFCReader({navigation}) {

    const [hasNfc, setHasNfc] = useState(null);
    const promptRef = useRef();
    

    useEffect(() => {

        async function checkNFC(){
            console.log("Estou aqui 0");
            const supported = await NfcManager.isSupported();
            console.log("Suportado: ",supported)
            if(supported){
                await NfcManager.start();
                console.log("Comecei a ler");
            }  
            setHasNfc(supported);
        }

        checkNFC();


        console.log("Estou aqui 1", hasNfc);
    },[]);


    if (hasNfc == null){
        return null;
    }else if(!hasNfc){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Your device doesn't support NFC</Text>
                <TouchableOpacity onPress={() => {
                    promptRef.current.setVisible(true);
                }}>
                    <Text>test</Text>
                </TouchableOpacity>
                <AndroidPrompt ref={promptRef}/>
            </View>
        );
    } 
    return(
        <View>
            <Text>Hello NFC</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 5,
        margin: 70,
    }
});

export default NFCReader;
