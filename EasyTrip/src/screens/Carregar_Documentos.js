import React, { useState, useCallback, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import {firebase} from '../../firebase';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

const Carregar_Documentos = ({navigation}) => {
    const {image, setImage} = useState(null);
    const {uploading, setUploading} = useState(false);

    const pickImage = async () => {
        //let result = await launchImageLibrary();
        //console.log(result);

        try{
        const result = await DocumentPicker.pick({type: [DocumentPicker.types.pdf]});
        console.log(result)

        }catch(err){
            if(DocumentPicker.isCancel(err))
                console.log("User Cancel",err)
            else
                console.log(err)
        }
        const source = {uri: result.uri};
        console.log(source);
        setImage(source);
    };

   /* const uploadImage = async () => {

        setUploading(true);
        const  response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try{
            await ref;
        }catch (e){
            console.log(e);
        }
        setUploading(false);
        Alert.alert(
            "Foto carregada!"
        );
        setImage(null);
    };*/
 
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonCC} onPress={pickImage}>
                    <Image style={styles.image_cc} source={require("../assets/foto_documento.png")}/>
                    <Text style={styles.buttonText}>Cartão de Cidadão</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonUpload} onPress={''}>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonD} onPress={''}>
                    <Image style={styles.image_document} source={require("../assets/foto_documento.png")}/>
                    <Text style={styles.buttonText}>Outros Documentos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonUpload} onPress={''}>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Carregar_Documentos;

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
    

    },
    buttonCC:{

        alignSelf:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop:50,
    },
    buttonD:{
        alignSelf:'center',
        alignItems:'center',
        marginTop:70,
        marginBottom:10,
    },
    buttonText:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:5,
    },
    image_foto_documento:{
       width:100,
       
    },
    image_document:{
        
       
    },
    buttonUpload:{
        backgroundColor:'rgb(0, 255, 0)',
        borderRadius:10,
        width:100,
        height:40,
    }

})    