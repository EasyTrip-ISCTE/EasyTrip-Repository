import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

function AndroidPrompt(props, ref) {
    const [visible, setVisible] = useState(false);
    const [hintText, setHintTex] = useState("");

    useEffect(()=>{
        if(ref){
            ref.current = {
                setVisible,
                setHintTex
            };
        }
    }, [ref])

    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.content}>
                <View style={[styles.backdrop, StyleSheet.absoluteFill]}/>
                <View style={styles.prompt}>
                    <Text style={styles.hint}>{hintText || "Aproxime o dispositivo..."}</Text>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        NfcManager.cancelTechnologyRequest()
                        setVisible(false)
                        setHintTex("")
                    }}>
                        <Text>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    content: {
        flex:1
    },
    backdrop:{
        backgroundColor:"rgba(0,0,0,0.3)"
    },
    prompt:{
        position:"absolute",
        bottom:0,
        left: 20,
        width: Dimensions.get("window").width - 2*20,
        backgroundColor:"white",
        borderRadius:8,
        paddingVertical: 60,
        paddingHorizontal:20,
        alignItems:"center",
        justifyContent: "center"
    },
    hint:{
        fontSize: 24,
        marginBottom: 20
    },
    btn:{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 15
    }
})

export default React.forwardRef(AndroidPrompt);