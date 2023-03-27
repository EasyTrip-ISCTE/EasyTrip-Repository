import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {Popup} from 'react-native-popup-confirm-toast';
import { AuthContext } from '../components/AuthProvider';
import {launchCamera} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';


const Upload = ({navigation, route}) => {
    
    const {user} = useContext(AuthContext);
    
    const [name_OD, setName_OD] = useState('');

    const [loading_OD, setLoading_OD] = useState(false);
    const [filePath_OD, setFilePath_OD] = useState({});
    const [process_OD, setProcess_OD] = useState('');
    

    const [loading_Foto, setLoading_Foto] = useState(false);
    const [filePath_Foto, setFilePath_Foto] = useState({});
    const [process_Foto, setProcess_Foto] = useState('');
    const [name_Foto, setName_Foto] = useState('');


    const pickFiles_Foto = async () => {

        try{
            const options = {
                storageOptions: {
                    path: 'images',
                    mediaType: 'photo',
                    copyTo: 'cachesDirectory',
                    saveToPhotos: true,
              },
            };
        
            const  fileDetails_Foto  =  await  launchCamera (options);
            console.log(fileDetails_Foto);
            setFilePath_Foto(fileDetails_Foto);
            setName_Foto(fileDetails_Foto.assets[0].fileName);
            setFilePath_Foto(fileDetails_Foto);

        } catch (error){
            setFilePath_Foto({});
        }
    };
 
    
    const uploadImages_Foto = async (caminho) =>{
        try{
            console.log(filePath_Foto.assets[0].uri.replace('file://', ''));
            console.log(filePath_Foto.assets[0].fileName);
            
            const reference_Foto = storage().ref(`/${user.uid}/${caminho}_${user.uid}`);
            const task_Foto = reference_Foto.putFile(filePath_Foto.assets[0].uri.replace('file://', ''));
        
            task_Foto.then(() =>{
                Alert.alert('Foto carregada!','A sua foto foi carregada com sucesso!',[{text: 'Voltar', onPress: () => navigation.navigate("Validar Documentos")}]);
                setProcess_Foto('');
            });
            setFilePath_Foto({});
        }catch(error){
            Alert.alert('ERRO!','ATENÇÃO! Ocorreu um erro no carregamento',[{text: 'Voltar', onPress: () => navigation.navigate("Validar Documentos")}]);
        }
        setLoading_Foto(false);
    };


    const pickFiles_OD = async () =>{
        try{
            const fileDetails_OD = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],         
                copyTo: 'cachesDirectory', 
            });
            console.log(fileDetails_OD);
            setFilePath_OD(fileDetails_OD);
            setName_OD(fileDetails_OD.name);
            setFilePath_OD(fileDetails_OD);

        } catch (error){
            setFilePath_OD({});
        }
    };

    
    const uploadImages_OD = async (caminho) =>{
        try{
            console.log(filePath_OD.fileCopyUri.replace('file://', ''));
            console.log(filePath_OD.name);
            
            const reference_OD = storage().ref(`/${user.uid}/${caminho}_${user.uid}`);
            const task_OD = reference_OD.putFile(filePath_OD.fileCopyUri.replace('file://', ''));
        
            task_OD.then(() =>{
                Alert.alert('Documento carregado!','O seu documento foi carregado com sucesso!',[{text: 'Voltar', onPress: () => navigation.navigate("Validar Documentos")}]);
                setProcess_OD('');
            });
            setFilePath_OD({});
        }catch(error){
            Alert.alert('ERRO!','ATENÇÃO! Ocorreu um erro no carregamento',[{text: 'Voltar', onPress: () => navigation.navigate("Validar Documentos")}]);
        }
        setLoading_OD(false);
    };



    return (
        <View style={styles.container}>

                <TouchableOpacity style={styles.button_foto} onPress={pickFiles_Foto}>
                    <Image style={styles.image_foto} source={require("../assets/foto.png")}/>
                    <Text style={styles.text_foto}>Tirar Foto</Text>
                    <Text style={styles.textnamefoto}>{name_Foto}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonUpload_foto} onPress={() => uploadImages_Foto(route.params.aux)}>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
                
            

            
                <TouchableOpacity style={styles.button_galeria} onPress={pickFiles_OD}>
                        <Image style={styles.image_galeria} source={require("../assets/galeria.png")}/>
                        <Text style={styles.text_galeria}>Galeria</Text>
                        <Text style={styles.textnamefoto}>{name_OD}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonUpload_galeria} onPress={() => uploadImages_OD(route.params.aux)}>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
        

        </View>
    );
}

export default Upload;

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: 'center',
    },
    
    button_foto:{
        resizeMode:'contain',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:"#a7cedf",
        width:300,
        height:200,
        borderRadius:15,
        marginTop:100,
    },
    image_foto:{
        resizeMode:'contain',
        width:50,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-30,
    },
    text_foto:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-55,
    },
    buttonUpload_galeria:{
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:"#ffb319",
        borderRadius:10,
        width:100,
        height:40,
        marginHorizontal:10,
        marginTop:-50,
    },
    buttonUpload_foto:{
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:"#ffb319",
        borderRadius:10,
        width:100,
        height:40,
        marginHorizontal:10,
        marginTop:-50,
    },
    buttonText:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 15,
    },
    textnamefoto:{
        alignItems: "center",
        textAlign:'center',
        color: "black",
        fontStyle:'italic',
        fontSize: 12,
        marginTop:10,
    },
    button_galeria:{
        resizeMode:'contain',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:"#a7cedf",
        width:300,
        height:200,
        borderRadius:15,
        marginTop:60,
        },
    image_galeria:{
        resizeMode:'contain',
        width:50,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-210,
    },
    text_galeria:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-230,
    },

})    