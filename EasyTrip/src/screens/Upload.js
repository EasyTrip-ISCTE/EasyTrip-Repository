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
        <View>
            <TouchableOpacity style={styles.buttonD} onPress={pickFiles_Foto}>
                <Image style={styles.image_foto} source={require("../assets/foto.png")}/>
                <Text style={styles.textFoto}>Tirar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonUpload} onPress={() => uploadImages_Foto(route.params.aux)}>
                <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
            <Text style={styles.textnamefoto}>{name_Foto}</Text>

            <TouchableOpacity style={styles.buttonD} onPress={pickFiles_OD}>
                    <Image style={styles.image_document} source={require("../assets/foto_documento.png")}/>
                    <Text style={styles.textOD}>Galeria</Text>
            </TouchableOpacity>
            <Text style={styles.textnamefoto}>{name_OD}</Text>
            <TouchableOpacity style={styles.buttonUpload} onPress={() => uploadImages_OD(route.params.aux)}>
                <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Upload;

const styles = StyleSheet.create({

    modal:{
        //justifyContent: 'flex-end',
        margin:0,
        backgroundColor:"#ffb319",

    },
    buttons:{
        backgroundColor:'white',
        flexDirection: 'row',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
    },
    button:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    container: {
        alignItems: "center",
        justifyContent: 'center',
    },
    textnamefoto:{
        alignItems: "center",
        textAlign:'center',
    },
    inicialText:{
        color: "black",
        fontWeight: 'bold',
        fontSize: 10,
    },
    buttonCC:{

    },
    image_cc:{
        resizeMode:'center',
        width:100,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-50,
        
     },
     textCC:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-130,
        
    },
    buttomscc:{
        flexDirection:"row",
        alignSelf:'center',
        alignItems:'center',
        //marginBottom:50,
    },
    buttonccfrente:{
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:"#a7cedf",
        borderRadius:10,
        width:100,
        height:40,
        marginHorizontal:10,
        marginTop:10,
    },
    buttonccverso:{
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:"#a7cedf",
        borderRadius:10,
        width:100,
        height:40,
        marginHorizontal:10,
        marginTop:10,
    },
    textOD:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-20,
    },
    textFoto:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-20,
    },
    buttonD:{
        alignSelf:'center',
        alignItems:'center',
        marginTop:50,
        marginBottom:10,
        
    },
    buttonText:{
        textAlign:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:5,
    },
    
    
    image_document:{
        resizeMode:'contain',
        width:100,
        alignSelf:'center',
        alignItems:'center',
        marginTop:50,
    },
    image_foto:{
        resizeMode:'contain',
        width:100,
        alignSelf:'center',
        alignItems:'center',
        marginTop:-50,
    },
    buttonUpload:{
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:"#a7cedf",
        borderRadius:10,
        width:100,
        height:40,
        marginHorizontal:10,
        marginTop:10,
    }

})    