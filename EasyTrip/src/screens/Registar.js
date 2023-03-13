import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';



function Registar( {navigation} ) {

    const[nome, setNome] = useState('')
    const[apelido, setApelido] = useState('')
    const[morada, setMorada] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[cc, setCc] = useState('')


    const handleSingUp = () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
            firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .set({
                PrimeiroNome: nome,
                Apelido: apelido,
                Morada: morada,
                CartaoCidadao: cc
            })
            .then(() => {
                console.log('User added!');
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.error(error);
        });
    }
    
    /*    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            setDoc(doc(db,"users", userCredentials.user.uid), {
                PrimeiroNome: nome,
                Apelido: apelido,
                Morada: morada,
                CartaoCidadao: cc
            });
            const user = userCredentials.user;
            console.log("Utilizador criado com sucesso", user.email);
            navigation.navigate('Login');
            
        })
        .catch(error => alert(error.message))
    
*/
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
                <TouchableOpacity onPress={ handleSingUp } style={styles.button}>
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
