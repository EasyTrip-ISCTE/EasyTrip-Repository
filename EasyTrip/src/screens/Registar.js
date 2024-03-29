import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Image, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../components/AuthProvider';


function Registar( {navigation} ) {

    const[nome, setNome] = useState('')
    const[apelido, setApelido] = useState('')
    const[morada, setMorada] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[cc, setCc] = useState('')

    const { register } = useContext(AuthContext);


    const handleSingUp = () => {
        if(nome && apelido && morada && cc && email && password){
            register(email, password).then(()=>{
                try{
                    firestore()
                    .collection("users")
                    .doc(auth().currentUser.uid)
                    .set({
                        PrimeiroNome: nome,
                        Apelido: apelido,
                        Morada: morada,
                        CartaoCidadao: cc
                    })
                }
                catch{
                    //Alert.alert("Erro no registo")
                }
            })
                
        }else{
            Alert.alert("Erro no registo", "Por favor preencha todos os campos.")
            //console.error("Por favor preencha todos os campos.")
        }      
         
        
            
    }
    
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.imageView}>
                <Image resizeMode='center' source={require("../assets/LogoEasyTrip.png")}></Image>
            </View>
            <View style={styles.inputView}>
                <TextInput 
                    placeholder='Primeiro Nome' 
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
                    placeholder='Email' 
                    value={email} 
                    onChangeText={text => setEmail(text)} 
                    style={styles.input}
                />
                 <TextInput 
                    placeholder='Cartão de Cidadão' 
                    value={cc} 
                    onChangeText={text => setCc(text)} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Password' 
                    value={password} 
                    onChangeText={text => setPassword(text)} 
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={handleSingUp} style={styles.button}>
                    <Text style={styles.buttonText}>Registar</Text> 
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Registar;

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
