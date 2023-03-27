import React, { useEffect, useState, useContext } from 'react';
import { View,Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Popup, Root } from 'react-native-popup-confirm-toast';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../components/AuthProvider';
import moment from 'moment';
import 'moment/locale/pt';

function MBWAY({route,navigation}) {

    //const date = new Date();
    //console.log("Data", date.getDay());
    //console.log(route.params.titulo.titulo);
    const {user} = useContext(AuthContext);

    const [passe, setPasse] = useState("");
    const[numeroTelemovel, setNumeroTelemovel] = useState('');

    const data = moment().locale("pt").format("DD");
    console.log("Data", data);
    console.log(route.params);

    
    function comprarTitulo(){

        let listaPasse = [];
        let passeValidadeaux;

        firestore().collection("cartaoUser").doc(user.uid).get().then( async docSnap => {
        
            if(docSnap.exists){
            
                if(route.params.IsPasse){//passes
                    console.log("É Passe")
                    firestore().collection("passesUser").where("idUser", "==", user.uid).get().then(query  => {
                        query.forEach((doc) => {
                            listaPasse.push({...doc.data(), id:doc.id});
                            
                            passeValidadeaux = doc.data()["Validade"];
                            
                        })
                        setPasse(listaPasse[0]);
                        if(listaPasse[0] == undefined){//se nao tiver passe, cria passe
                            if(moment().day() <= 25){
                                firestore().collection("passesUser").add({
                                    Tipo: route.params.titulo.titulo.Tipo,
                                    Validade: moment().locale("pt").add(0, "month").format("MMMM"),
                                    idPasse: Number(route.params.titulo.titulo.id),
                                    idUser: user.uid,
                                    DataCompra: moment().locale("pt").format("D/MMM/YYYY"),
                                    HoraCompra: moment().locale("pt").format("h:mm A"),
                                })
                            }
                            else{
                                firestore().collection("passesUser").add({
                                    Tipo: route.params.titulo.titulo.Tipo,
                                    Validade: moment().locale("pt").add(1, "month").format("MMMM"),
                                    idPasse: Number(route.params.titulo.titulo.id),
                                    idUser: user.uid,
                                    DataCompra: moment().locale("pt").format("D/MMM/YYYY"),
                                    HoraCompra: moment().locale("pt").format("h:mm A"),
                                })
                            }
                            
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
                                console.log("O passe que quero comprar é diferente do que já tenho")
                                if(moment().day() <= 25){
                                    firestore().collection("passesUser").doc(listaPasse[0].id).set({
                                        Tipo: route.params.titulo.titulo.Tipo,
                                        Validade: moment().locale("pt").add(0, "month").format("MMMM"),
                                        idPasse: Number(route.params.titulo.titulo.id),
                                        idUser: user.uid,
                                    })
                                }
                                else{
                                    firestore().collection("passesUser").doc(listaPasse[0].id).set({
                                        Tipo: route.params.titulo.titulo.Tipo,
                                        Validade: moment().locale("pt").add(1, "month").format("MMMM"),
                                        idPasse: Number(route.params.titulo.titulo.id),
                                        idUser: user.uid,
                                    })
                                }
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
                                console.log("O passe é igual ao que já tenho")
                                if(passeValidadeaux == moment().locale("pt").format("MMMM")){//passe igual e validade é igual ao mês atual(está carregado)
                                    console.log("Está carregado para o mês onde me encontro")
                                    if(moment().locale("pt").format("DD") < 25){
                                        console.log("É antes de dia 25 e o passe está carregado para o mês onde me encontro")
                                        {Popup.show({
                                            type: 'danger',
                                            title: 'ERRO: Já possui o passe selecionado carregado para este mês',
                                            textBody: 'Espere até dia 25 para carregar para o próximo mês',
                                            buttonText: 'Fechar',
                                            okButtonStyle:{ backgroundColor: '#ffb319'},
                                            callback: () => Popup.hide()
                                        })}
                                    }
                                    else{
                                        console.log("Tenho o passe carregado para o mês onde me encontro mas já é depois de dia 25")
                                    firestore().collection("passesUser").doc(listaPasse[0].id).update({
                                        Validade: moment().locale("pt").add(1, "month").format("MMMM")
                                    })
                                        {Popup.show({
                                            type: 'success',
                                            title: 'Carregamento efetuado',
                                            textBody: 'Passe carregado com sucesso',
                                            buttonText: 'Fechar',
                                            okButtonStyle:{ backgroundColor: '#ffb319'},
                                            callback: () => Popup.hide()
                                        })}
                                    }
                                }
                                else{//o passe não está carregado para este mês
                                  
                                    if(listaPasse[0].Validade == moment().locale("pt").add(1, "month").format("MMMM")){
                                        console.log("O passe não está carregado para o mês onde me encontro mas sim para o proximo mes já")
                                        {Popup.show({
                                            type: 'danger',
                                            title: 'ERRO: Não foi possível carregar o passe',
                                            textBody: 'Já possui o passe selecionado carregado para o próximo mês',
                                            buttonText: 'Fechar',
                                            okButtonStyle:{ backgroundColor: '#ffb319'},
                                            callback: () => Popup.hide()
                                        })}
                                        return;
                                    }
                                    if(moment().moment().day() < 25 ){ //se o passe é igual mas não está carregado para este mês e é antes de dia 25
                                        firestore().collection("passesUser").doc(listaPasse[0].id).update({
                                            Validade: moment().locale("pt").add(0, "month").format("MMMM")
                                        })
                                        {Popup.show({
                                            type: 'success',
                                            title: 'Carregamento efetuado',
                                            textBody: 'Passe carregado com sucesso',
                                            buttonText: 'Fechar',
                                            okButtonStyle:{ backgroundColor: '#ffb319'},
                                            callback: () => Popup.hide()
                                        })} 
                                    }
                                    else{
                                        firestore().collection("passesUser").doc(listaPasse[0].id).update({
                                            Validade: moment().locale("pt").add(1, "month").format("MMMM")
                                        })
                                            {Popup.show({
                                                type: 'success',
                                                title: 'Carregamento efetuado',
                                                textBody: 'Passe carregado com sucesso',
                                                buttonText: 'Fechar',
                                                okButtonStyle:{ backgroundColor: '#ffb319'},
                                                callback: () => Popup.hide()
                                            })}
                                    }
                                }
                            }
                        }
                    })
                    return;
                }
            
                //zapping
                else if(route.params.IsZapping){
                    console.log("É Zapping");
                    
                    await firestore().collection("zapping").doc(user.uid).get().then( docSnapshot => {
                        console.log("Passei por aqui")
                        if(docSnapshot.exists){
                            console.log("Entrei porque existe um doc");
                            const aux = docSnapshot.data()["Valor"];
                            firestore().collection("zapping").doc(user.uid).update({
                                Valor: aux + route.params.ValorZapping
                            })
                        }
                        else{ 
                            console.log("Entrei e vou criar zapping") 
                            const valorAux = route.params.ValorZapping; 
                            firestore().collection("zapping").doc(user.uid).set({
                                Valor: valorAux
                            })
                        }
                        {Popup.show({
                            type: 'success',
                            title: 'Compra confirmada',
                            textBody: 'O seu zapping foi carregado com sucesso',
                            buttonText: 'Fechar',
                            okButtonStyle:{ backgroundColor: '#ffb319'},
                            callback: () => Popup.hide()
                        })}
                    })
                }
                //bilhetes
                else {
                    console.log("É bilhete")
                    console.log("Estou aqui e vou para", route.params.titulo.titulo.Destino);
                    firestore().collection("bilhetesUser").add({
                        idUser: user.uid,
                        Origem: route.params.titulo.titulo.Origem,
                        Destino:  route.params.titulo.titulo.Destino,
                        Valor: route.params.titulo.titulo.Valor,
                        Estado : "Valido",
                        DataCompra: moment().locale("pt").format("D/MMM/YYYY"),
                        HoraCompra: moment().locale("pt").format("h:mm A"),
                        DataUtilizacao: "",
                        HoraUtilizacao: "",
                        idOrigem: route.params.titulo.titulo.idOrigem ,
                        idDestino: route.params.titulo.titulo.idDestino
                    })
                    console.log("Comprei bilhete")

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
                <Text>Montante a depositar: {route.params.IsZapping ? route.params.ValorZapping : route.params.titulo.titulo.Valor}€</Text>
            </View>

            <View style={styles.inputCampos}>    
                <TextInput 
                    placeholder='Número de Telemóvel'
                    value={numeroTelemovel}
                    onChangeText={text => setNumeroTelemovel(text)} 
                    style={styles.inputNumber}
                />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={() => comprarTitulo()}>
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