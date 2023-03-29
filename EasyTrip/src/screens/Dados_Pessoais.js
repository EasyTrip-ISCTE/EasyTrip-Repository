import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Image, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { Popup, Root } from 'react-native-popup-confirm-toast';

import { AuthContext } from '../components/AuthProvider';


function Dados_Pessoais( {navigation} ) {

    const {user} = useContext(AuthContext);

    const[nome, setNome] = useState('')
    const[apelido, setApelido] = useState('')
    const[morada, setMorada] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[nif, setNif] = useState('')
    const[cartaocidadao, setCartaoCidadao] = useState('')

    useEffect(() => {
        obterDados()    
    }, [])    

    const obterDados = () => {
        firestore().collection("users").doc(user.uid).get().then(doc => {
            if(doc.exists){
                setNome(doc.data()['PrimeiroNome']);
                setApelido(doc.data()['Apelido']);
                setMorada(doc.data()['Morada']);
                setEmail(user.email);
                setCartaoCidadao(doc.data()['CartaoCidadao'])
                setNif(doc.data()["Nif"])
            }
        }) 
    }
      
  
    const atualizarDados = async() => {
        try {
            await firestore().collection("users").doc(user.uid).update({
                PrimeiroNome: nome,
                Apelido: apelido,
                Morada: morada,
                CartaoCidadao: cartaocidadao,
                Nif: nif
        
            });
            Alert.alert('Sucesso!','Os seus dados pessoais foram atualizados com sucesso!',[{text: 'Voltar', onPress: () => navigation.navigate("Definições")}]);
        } catch (error) {
            Alert.alert('Erro!','Ocorreu um erro na atualização dos dados!',[{text: 'Voltar', onPress: () => navigation.navigate("Definições")}]);
        }
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.imageView}>
                <Image resizeMode='center' source={require("../assets/LogoEasyTrip.png")}></Image>
            </View>
            <View style={styles.inputView}>
                <TextInput 
                    placeholder={nome} 
                    value={nome} 
                    onChangeText={text => setNome(text)} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Apelido' 
                    value={apelido} 
                    onChangeText={text => setApelido(text)} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Morada' 
                    value={morada} 
                    onChangeText={text => setMorada(text)} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder='NIF' 
                    value={nif} 
                    onChangeText={text => setNif(text)} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Email' 
                    value={email} 
                    onChangeText={text => setEmail(text)} 
                    style={styles.input}
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={() => atualizarDados()}>
                    <Text style={styles.buttonText}>Alterar Dados</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Dados_Pessoais;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    imageView: {
        height: "28%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50
    },
    inputView:{
        width: "80%"
    },
    input:{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5

    },
    buttonView:{
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    button:{
        backgroundColor: "#a7cedf",
        width: "100%",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        borderColor: "#a7cedf",
        borderWidth: 2
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 16
    }

});
