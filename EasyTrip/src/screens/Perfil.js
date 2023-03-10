import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, Timestamp, setDoc } from 'firebase/firestore';
import { Popup, Root} from 'react-native-popup-confirm-toast';

function Perfil( {navigation} ) {

    const [nome, setNome] = useState("");
    const userRef = doc(db, "users", auth.currentUser.uid);
    const [numeroCartao, setNumeroCartao] = useState(""); 
    const [validadeCartao, setValidadeCartao] = useState(""); 
    const cartaoUserRef = doc(db, "cartaoUser", auth.currentUser.uid);
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear() + 2;

    
    useEffect(() => {
        getDoc(userRef)
        .then((doc) => {
            setNome(doc.data()['PrimeiroNome']);
        });
        getDoc(cartaoUserRef).then((doc1) => {
            setNumeroCartao(doc1?.data()['Numero']);
            setValidadeCartao(doc1?.data()['Validade']);
            console.log("Estou aquiiiiii 2")
        });
        
    },[])    

    function criarCartão(){

        getDoc(cartaoUserRef).then(docSnap => {
            if(docSnap.exists()){
               // console.log("Já possui um cartão válido");
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
                setDoc(doc(db,"cartaoUser", auth.currentUser.uid), {
                    Numero: numero,
                    Validade: validade
                });
                setNumeroCartao(numero)
                setValidadeCartao(validade)
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
        })
        
        
    }

    return (
    <Root>
        <ImageBackground style={styles.background} source={require("../assets/perfil2.jpg")}>
                <View style={styles.inicioView}>
                    <Text style={styles.titleText}>Bem-vindo, {nome}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Cartão")}>
                    <View style={styles.cartaoView}>
                        <Image style={styles.image} source={require("../assets/PasseEasyTrip.png")}></Image>
                    </View>
                </TouchableOpacity>
                <View style={styles.informacaoView}>    
                    <Text style={styles.text}>Número do Cartão: {numeroCartao}</Text>
                    <Text style={styles.text}>Válido até: {validadeCartao}</Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={criarCartão}>
                        <Text style={styles.buttonText}>Criar Cartão</Text>
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
