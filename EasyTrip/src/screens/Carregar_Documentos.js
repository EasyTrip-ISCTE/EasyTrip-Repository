import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Popup} from 'react-native-popup-confirm-toast';
import { AuthContext } from '../components/AuthProvider';


const Carregar_Documentos = ({navigation}) => {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => navigation.navigate("Cartão de Cidadão")}>
                <Image style={styles.image_cc} source={require("../assets/cc.png")}/>
                <Text style={styles.text_cc}>Cartão de Cidadão</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Tipo de Documento")}>
                <Image style={styles.image_document} source={require("../assets/foto_documento.png")}/>
                <Text style={styles.text_document}>Outros Documentos</Text>
            </TouchableOpacity>
            
        </View>
      );
}

export default Carregar_Documentos;

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: 'center',
    },
   
    image_cc:{
        resizeMode:'center',
        width:100,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-50,
     },
     text_cc:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-130,
    },
    text_document:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-20,
    },
    image_document:{
        resizeMode:'contain',
        width:100,
        alignSelf:'center',
        alignItems:'center',
        marginTop:50,
    },
})  