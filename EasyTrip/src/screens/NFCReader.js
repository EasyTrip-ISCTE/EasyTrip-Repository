import React, { useEffect, useRef, useState, useContext } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image, ScrollView, ImageBackground, FlatList } from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../components/AuthProvider';

function NFCReader({navigation}) {

    const {user} = useContext(AuthContext);

    const [passe, setPasse] = useState("");

    const [hasNfc, setHasNfc] = useState(null);
    const promptRef = useRef();

    let listaBilhetes = [];
    
    const getTitulosValidos = async (tagLida) =>{
        
        let origem;
        let idZonaOrigem;
        listaBilhetes = [];
        let zapping;
        let passeAux;

        firestore().collection("bilhetesUser").where("idUser", "==", user.uid).where("Estado", "==", "Em utilização").get().then(async querySnapshot =>{
            console.log("Está vazia:",querySnapshot.empty)
            if(querySnapshot.empty){
                await firestore()
                .collection("localidades")
                .where("idTag", "==", tagLida)
                .get()
                .then(query => {
                    query.forEach((localidade) => {
                        if(localidade.exists){
                            console.log("Estou em", localidade.data()["Nome"], ", idZona:", localidade.data()["idZona"]);
                            origem = localidade.data()["Nome"];
                            idZonaOrigem = localidade.data()["idZona"];
                        }
                    })
                
                }).then(async ()=>{
                    
                    await firestore().collection("bilhetesUser").where("idUser", "==", user.uid).where("idOrigem", "==", idZonaOrigem).where("Estado", "==", "Valido").get().then(query => {
                        query.forEach((doc1) => {
                            listaBilhetes.push({...doc1.data(), id:doc1.id});
                        })
                    }).then(async () => {
                        await firestore().collection("zapping").doc(user.uid).get().then(doc => {
                            if(doc.exists){
                                zapping = doc.data();
                            }
                        }).then(async () => {
                            await firestore().collection("passesUser").where("idUser","==" ,user.uid).get().then(query => {
                                query.forEach(doc2 => {
                                    if(doc2.exists){
                                        passeAux = doc2.data();
                                    }
                                });
                                
                            }).then(()=>{
                                navigation.navigate("Escolha o título", {titulos:listaBilhetes, zapping: zapping, passe:passeAux})
                            })
                        })
                    })
                })
            }

            else{
                querySnapshot.forEach(doc1 => {
                    console.log("ID do titulo:", doc1.id)
                    console.log("Existe bilhete em utilização")
                    return navigation.navigate("Título em utilização", {tituloId: doc1.id, titulo: doc1.data()})
                })
            } 
        })
    } 
    
  
    async function readNdef() {
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            console.log('Tag found', tag.id);
            getTitulosValidos(tag.id);
           

        } catch (ex) {
            console.log('Oops!Cancelei a leitura', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
            promptRef.current.setVisible(false);
        }
      }

    useEffect(() => {

        async function checkNFC() {
            console.log("Estou aqui 0");
            const supported = await NfcManager.isSupported();
            console.log("Suportado: ",supported)
            if(supported){
                await NfcManager.start();
            }  
            setHasNfc(supported);
        }

        checkNFC();

    },[]);


    if (hasNfc == null){
        return null;
    }else if(!hasNfc){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>O seu dispositivo nao suporta NFC!</Text>  
            </View>
        );
    } 
    return(
        <View style={styles.container}>
            <View style={styles.view}>
            <Text style={styles.text}>Carregue no butão para usar o NFC</Text>
            <TouchableOpacity style={styles.button} onPress={() => {readNdef() ,promptRef.current.setVisible(true)}}>
                    <Text>Ler NFC</Text>
                </TouchableOpacity>
                <AndroidPrompt ref={promptRef}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 15,
        margin: 20,
    }, 
    button:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        alignSelf: "center",

    },
    view:{
        justifyContent:"space-between",
        alignItems: "center",
        alignSelf:"center",
        borderRadius: 10,
        marginRight:10,
        marginLeft:10,
        height:"50%",
        width:"90%",
        marginTop: 100
        
    },
    text:{

    }
  
});

export default NFCReader;
