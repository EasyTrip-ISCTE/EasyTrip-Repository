import React, { useState, useCallback, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
//import DocumentPicker from 'react-native-document-picker';


// const options={
//     title:'Select Image',
//     type:'library',
//     options:{mediaType:'photo', includeBase64:false, selectionLimit:1},
// }

function Carregar_Documentos({navigation}) {

//    const openGallery=async () =>{
//     const images = await lauchImageLibrary(options)
//     console.log(images)
//    } 

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Image style={styles.image_foto_documento} source={require("../assets/foto_documento.png")}/>
                <Text style={styles.buttonText}>Carregar Foto/Documento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Image style={styles.image_foto_documento} source={require("../assets/foto.png")}/>
                <Text style={styles.buttonText}>Tirar Foto</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Carregar_Documentos;

const styles = StyleSheet.create({

    container: {
        flex:1,
        alignItems: "center",

    },
    button:{
        alignSelf:'center',
        alignItems:'center',
        borderRadius: 10,
        width:300,
        height:100,
        margin:90,
    },
    buttonText:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:5,
    },

})    