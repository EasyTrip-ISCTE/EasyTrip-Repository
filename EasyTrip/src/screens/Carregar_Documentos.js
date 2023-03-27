import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Popup} from 'react-native-popup-confirm-toast';
import { AuthContext } from '../components/AuthProvider';


const Carregar_Documentos = ({navigation}) => {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cartão de Cidadão")}>
                <Image style={styles.image_cc} source={require("../assets/cc.png")}/>
                <Text style={styles.text_cc}>Cartão de Cidadão</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tipo de Documento")}>
                <Image style={styles.image_pasta} source={require("../assets/pasta.png")}/>
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
    button:{
        alignSelf:'center',
        alignItems:'center',
        marginTop:30,
        backgroundColor:'#a7cedf',
        borderRadius:20,
        width:300,
        height:100,
    },
    image_pasta:{
        resizeMode:'contain',
        alignSelf:'center',
        alignItems:'center',
        width:80,
        marginTop:-220,

    },
   
    image_cc:{
        resizeMode:'center',
        width:80,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-140,
     },
     text_cc:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-150,
    },
    text_document:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-225,
    },
})  