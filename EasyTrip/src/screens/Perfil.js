import React, { useEffect, useContext, Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, RefreshControl} from 'react-native';
import { useState } from 'react';
import { Popup, Root} from 'react-native-popup-confirm-toast';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../components/AuthProvider';

function Perfil ( {navigation} ) {

    const {user} = useContext(AuthContext);

    const [userData, setUserData] = useState(null);
    const [cartaoData, setCartaoData] = useState(null);

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear() + 2;

    useEffect(() => {
        getUser()
        getCartao()
    }, []) 


    const getUser= () => {
        const utilizador = firestore()
        .collection("users")
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
            if(documentSnapshot.exists) {
                console.log('User Data: ', documentSnapshot.data());
                setUserData(documentSnapshot.data())
            }
        })
    }

    const getCartao = () => {
        const cartao = firestore()
        .collection("cartaoUser")
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
            if(documentSnapshot.exists) {
                console.log('Cartao Data: ', documentSnapshot.data());
                setCartaoData(documentSnapshot.data());
            }
        })
        
    }
    

    const criarCartão = async() =>{

        const cartao = await firestore()
        .collection("cartaoUser")
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists) {
                console.log("Já possui um cartão válido");
                {Popup.show({
                    type: 'danger',
                    title: 'Erro na criação',
                    textBody: 'Já possui um cartão',
                    buttonText: 'Fechar',
                    okButtonStyle:{ backgroundColor: '#ffb319'},
                    callback: () => Popup.hide()
                })}
            }
            else{
                const numero = Math.floor(Math.random() * 1000000000000000) + 1
                const validade = currentMonth + "/" + currentYear // 1/2022
                firestore().collection("cartaoUser").doc(auth().currentUser.uid).set({
                    Numero: numero,
                    Validade: validade
                }).then(()=>{
                    firestore().collection("zapping").doc(user.uid).set({
                        Valor: parseInt(0)
                    })
                })
                {Popup.show({
                    type: 'success',
                    title: 'Cartão criado com sucesso!',
                    textBody: 'O seu cartão foi criado com sucesso',
                    buttonText: 'Fechar',
                    okButtonStyle:{ backgroundColor: '#ffb319'},
                    callback: () => Popup.hide()
                    })}
                console.log("Criei cartão")
            } 
        });
    }

    const getTituloEmUtilizacao = async() => {
        await firestore().collection("bilhetesUser").where("idUser", "==", user.uid).where("Estado", "==", "Em utilização").get().then( querySnapshot =>{
            if(querySnapshot.empty){
                return navigation.navigate("Título em utilização", {titulo: ""})
            }
            else{
                querySnapshot.forEach(element => {
                    return navigation.navigate("Título em utilização", {titulo: element.data(), tituloId: element.id})
                });
            }
            
        })
    }

    if(cartaoData){
        return (
            <Root>
            <ImageBackground style={styles.background} source={require("../assets/perfil2.jpg")}>
                    <View style={styles.inicioView}>
                        <Text style={styles.titleText}>Bem-vindo, {userData ? userData.PrimeiroNome : ""}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Cartão")}>
                        <View style={styles.cartaoView}>
                            <Image style={styles.image} source={require("../assets/PasseEasyTrip1.png")}></Image>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.informacaoView}>    
                        <Text style={styles.text}>Número do Cartão: {cartaoData ? cartaoData.Numero : ""}</Text>
                        <Text style={styles.text}>Válido até: {cartaoData ? cartaoData.Validade : ""}</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button} onPress={getTituloEmUtilizacao}>
                            <Text style={styles.buttonText}>Ver título em utilização</Text>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>
        </Root>  
        )
    }

    return (
    <Root>
        <ImageBackground style={styles.background} source={require("../assets/perfil2.jpg")}>
                <View style={styles.inicioView}>
                    <Text style={styles.titleText}>Bem-vindo, {userData ? userData.PrimeiroNome : ""}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Cartão")}>
                    <View style={styles.cartaoView}>
                        
                        <Image style={styles.image} source={require("../assets/PasseEasyTrip1.png")}></Image>
                    </View>
                </TouchableOpacity>
                <View style={styles.informacaoView}>    
                    <Text style={styles.text}>Número do Cartão: {cartaoData ? cartaoData.Numero : ""}</Text>
                    <Text style={styles.text}>Válido até: {cartaoData ? cartaoData.Validade : ""}</Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={criarCartão}>
                        <Text style={styles.buttonText}>Criar Cartão</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={getTituloEmUtilizacao}>
                        <Text style={styles.buttonText}>Ver título em utilização</Text>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
    </Root>    
    );
} 
export default Perfil;

const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        height:"64%",

    },
    image:{
        width: 320,
        resizeMode: "contain",
        alignSelf:"center",
        height: 200,
        marginTop: 140,
        borderRadius: 10
        //marginTop: 20

    },
    inicioView: {
        alignItems: "flex-start",
        marginTop: 50,

    },
    cartaoView:{
        width: "70%",
        alignItems: "center",
        
    },
    informacaoView:{
        width: "80%",
        paddingTop: 10,
        borderRadius: 10,
        alignItems: "center"

    },
    text:{
        fontSize: 15,
        textAlign: "justify",
        paddingTop: 5
    },
    titleText:{
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'baseline',
        alignSelf: "center",

    },
    buttonView: {
        paddingTop:30
    },
    button:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
    },
    buttonText:{
        color: "black",
        fontWeight: "700",
        fontSize: 16
    }

});
