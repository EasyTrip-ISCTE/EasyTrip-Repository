import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';
import {Popup} from 'react-native-popup-confirm-toast';


const Tipo_Documentos = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity style={styles.buttonD} onPress={() => navigation.navigate("Tipo de Upload", {aux: "sub23"})}>
                <Image style={styles.image_foto} source={require("../assets/documento.png")}/>
                <Text style={styles.text_foto}>Passe Sub-23</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonD} onPress={() => navigation.navigate("Tipo de Upload", {aux: "idoso"})}>
                <Image style={styles.image_foto} source={require("../assets/documento.png")}/>
                <Text style={styles.text_foto}>Idoso</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Tipo_Documentos;

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: 'center',
    },
    text_foto:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-100,
    },
    buttonD:{
        alignSelf:'center',
        alignItems:'center',
        marginTop:30,
        backgroundColor:'#a7cedf',
        borderRadius:20,
        width:300,
        height:100,
    },
    image_foto:{
        resizeMode:'contain',
        width:50,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-90,
    },

})    