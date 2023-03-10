import { FirebaseError } from 'firebase/app';
import { getDoc, doc, setDoc, collection, query, getDocs, where, Timestamp, addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View,Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Popup, Root } from 'react-native-popup-confirm-toast';
import { auth, db } from '../../firebase';

function MBWAY({route,navigation}) {

    //const date = new Date();
    //console.log("Data", date.getDay());
    //console.log(route.params.titulo.titulo);

    const [passe, setPasse] = useState("");
    const[numeroTelemovel, setNumeroTelemovel] = useState('')
    
    function comprarPasse(){

        console.log("AQUIIIII");
        const cartaoUserRef = doc(db, "cartaoUser", auth.currentUser.uid);
        

        console.log("MBWAY",route.params.IsPasse);
        //verificar se já existe um passe e se não existir posso escolher um tipo de passe para comprar
        let listaPasse = [];

        getDoc(cartaoUserRef).then(docSnap => {
            if(docSnap.exists()){
                if(route.params.IsPasse){//passes
                    const queryPasse = query(collection(db, "passesUser"), where("idUser", "==", auth.currentUser.uid));
                    getDocs(queryPasse).then(query => {
                        query.forEach((doc) => {
                            listaPasse.push({...doc.data(), id:doc.id});
                        })
                        setPasse(listaPasse[0]);
                        if(listaPasse[0] == undefined){//se nao tiver passe, cria passe
                            addDoc(collection(db,"passesUser"), {
                                Tipo: route.params.titulo.titulo.Tipo,
                                Validade: "Dezembro",
                                idPasse: Number(route.params.titulo.titulo.id),
                                idUser: auth.currentUser.uid,
                            });
                            {Popup.show({
                                type: 'success',
                                title: 'Passe criado com sucesso',
                                textBody: 'O seu passe foi criado corretamente',
                                buttonText: 'Fechar',
                                okButtonStyle:{ backgroundColor: '#ffb319'},
                                callback: () => Popup.hide()
                            })}
                            console.log("Criei o passe");
                            return;
                        } else {//se ja tiver faz update e altera tipo de passe
                            if(listaPasse[0].Tipo != route.params.titulo.titulo.Tipo) {//se o passe que tem for diferente do que pretende
                                setDoc(doc(db,"passesUser", listaPasse[0].id), {
                                    Tipo: route.params.titulo.titulo.Tipo,
                                    Validade: "Dezembro",
                                    idPasse: Number(route.params.titulo.titulo.id),
                                    idUser: auth.currentUser.uid,
                                });
                                {Popup.show({
                                    type: 'success',
                                    title: 'Alteração confirmada',
                                    textBody: 'O seu passe foi alterado corretamente',
                                    buttonText: 'Fechar',
                                    okButtonStyle:{ backgroundColor: '#ffb319'},
                                    callback: () => Popup.hide()
                                })}
                                
                                console.log("Alterei o meu passe");
                            } else {//se o passe que tem for igual do que pretende
                                {Popup.show({
                                    type: 'danger',
                                    title: 'ERRO: Já possui o passe selecionado',
                                    textBody: 'Selecione outro tipo de passe',
                                    buttonText: 'Fechar',
                                    okButtonStyle:{ backgroundColor: '#ffb319'},
                                    callback: () => Popup.hide()
                                })}
                                console.log("Não foi possível alterar o passe porque já o tem");
                            }
                        }
                    })
                }
                //bilhetes
                else{
                    console.log(route.params.titulo.titulo.Destino);
                    addDoc(collection(db,"bilhetesUser"),{
                        idUser: auth.currentUser.uid,
                        Origem: route.params.titulo.titulo.Origem,
                        Destino:  route.params.titulo.titulo.Destino,
                        Valor: route.params.titulo.titulo.Valor,
                        Valido : true
                    })
                    {Popup.show({
                        type: 'success',
                        title: 'Compra confirmada',
                        textBody: 'O seu bilhete foi comprado com sucesso',
                        buttonText: 'Fechar',
                        okButtonStyle:{ backgroundColor: '#ffb319'},
                        callback: () => Popup.hide()
                    })}
                }
            }
            else{ 
                //alerta a pedir para criar um cartão na Home
                {Popup.show({
                    type: 'danger',
                    title: 'ERRO: Não possui nenhum cartão',
                    textBody: 'É necessario criar um cartão para poder comprar bilhetes',
                    buttonText: 'Fechar',
                    okButtonStyle:{ backgroundColor: '#ffb319'},
                    callback: () => Popup.hide()
                })}
                console.log("Crie um cartão por favor")
            }
        })      
    }

    return(
    <Root>
        <View style={styles.container}>
            <Image style={styles.image_mb} source={require("../assets/mbway.png")}/>
            
            <View style={styles.inputCampos} >
                <Text>Montante a depositar: {route.params.titulo.titulo.Valor}€</Text>
            </View>

            <View style={styles.inputCampos}>    
                <TextInput 
                    placeholder='Número de Telemóvel'
                    value={numeroTelemovel}
                    onChangeText={text => setNumeroTelemovel(text)} 
                    style={styles.inputNumber}
                />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={() => comprarPasse()}>
                <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image style={styles.image_inicio} source={require("../assets/inicio.png")}/>
            </TouchableOpacity>

        </View>
    </Root>
)}

export default MBWAY;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop:50,
    },
    
    inputCampos:{
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        width: 400,
        marginTop:50,
    },
    inputNumber:{
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 80
    },

    inputMontante:{
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5,
    },
    button:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        alignSelf:'center',
        borderRadius: 10,
        width:100,
        height:40,
        margin:50,
    },
    buttonText:{
        textAlign:'center',
        textAlignVertical:'center',
        color: "black",
        fontWeight: "700",
        fontSize: 20,
        marginTop:5,
    },
    image_mb:{
        height:120,
        resizeMode:'contain',
        alignSelf:'center',
    },

    image_inicio:{
        marginTop:50,
        height:50,
        resizeMode:'contain',
        alignSelf:'center',
    }
})