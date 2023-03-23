import React, {useContext, useRef} from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import  {Popup, Root}  from 'react-native-popup-confirm-toast';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

import { AuthContext } from '../components/AuthProvider';

function TituloEmUtilizacao({route, navigation}) {

    const {user} = useContext(AuthContext);
    const titulo = route.params.titulo;    
    const promptRef = useRef();

    console.log("TituloEmUtilização(id):",route.params.tituloId);

    async function readNdef() {
        console.log("TituloEmUtilização(id):",route.params.tituloId); //arranjar maneira de passar o id do titulo para dentro do doc, titulo.id é undefined
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            console.log('Tag found', tag.id);
            usarTituloSair(tag.id);
           

        } catch (ex) {
            console.log('Oops!Cancelei a leitura', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
            promptRef.current.setVisible(false);
        }
      }

    const usarTituloSair = async(tagLida) =>{
        let destino;
        let idZonaDestino;

        await firestore()
                .collection("localidades")
                .where("idTag", "==", "4347CB8G")//colocar tagLida quando tiver mais cartões a simular estações diferentes
                .get()
                .then( query => {
                    query.forEach((localidade) => {
                        if(localidade.exists){
                            console.log("Estou em", localidade.data()["Nome"], ", idZona:", localidade.data()["idZona"]);
                            destino = localidade.data()["Nome"];
                            idZonaDestino = localidade.data()["idZona"];
                        }
                    })

                }).then(()=>{
                    firestore().collection("bilhetesUser").doc(route.params.tituloId).update({
                        Estado : "Utilizado",
                    
                    }).then(()=>{
                        navigation.navigate("Home")
                    })
                }).then(()=>{
                    {Popup.show({
                        type: 'success',
                        title: 'Cancela aberta',
                        textBody: 'Volte sempre',
                        buttonText: 'Fechar',
                        okButtonStyle:{ backgroundColor: '#ffb319'},
                        callback: () => {Popup.hide()}
                    })}
                })
        }

    if(titulo){
        return (
            <View>
                <View style={styles.view}>
                    <TouchableOpacity style={styles.button1} >
                        <Text style={styles.title}>Origem: {titulo.Origem}</Text>
                        <Text style={styles.title}>Destino: {titulo.Destino}</Text>
                        <View style={styles.content}>
                            <Text style={styles.text}>{titulo.Valor}€</Text>
                            <Text style={styles.text}>{titulo.Estado}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {readNdef(), promptRef.current.setVisible(true)}}>
                    <Text>Ler NFC</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Home")}}>
                    <Text>Voltar ao Perfil</Text>
                </TouchableOpacity>
                <AndroidPrompt ref={promptRef}/>
            </View>
        )
    }
    else{
        return(
            <View>
            <Text>Não existe bilhete nenhum em utilização</Text>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Home")}}>
                    <Text>Voltar ao Perfil</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        
    },
    button:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        alignSelf: "center",
        margin: 10

    },
    button1:{
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14,
        marginEnd:14,
    },
    title:{
        fontSize:17,
        fontWeight: "bold",
        
    
    },

    text:{
        fontSize:16,
        
    
    },
    view:{
        borderColor: "#a7cedf",
        borderWidth: 3,
        borderRadius:10,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14, 
    },
    content:{
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop:5,
        marginBottom:10
    },

})

export default TituloEmUtilizacao;