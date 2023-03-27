import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';
import {Popup} from 'react-native-popup-confirm-toast';


const CC = ({navigation}) => {

    return (
        <View>
            
            <TouchableOpacity style={styles.buttonD} onPress={() => navigation.navigate("Tipo de Upload", {aux:"cc_frente"})}>
                <Image style={styles.image_cc} source={require("../assets/cc.png")}/>
                <Text style={styles.text_cc}>Frente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonD} onPress={() => navigation.navigate("Tipo de Upload", {aux:"cc_verso"})}>
                    <Image style={styles.image_cc} source={require("../assets/cc.png")}/>
                    <Text style={styles.text_cc}>Verso</Text>
            </TouchableOpacity>
        
        </View>
    );
}

export default CC;

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: 'center',
    },
    image_cc:{
        resizeMode:'center',
        width:80,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-135,
     },
     text_cc:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-150,
    },
    buttonD:{
        alignSelf:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop:30,
        backgroundColor:'#a7cedf',
        borderRadius:20,
        width:300,
        height:100,
    },
})    