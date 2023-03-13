import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import auth from "@react-native-firebase/auth";
import { AuthContext } from '../components/AuthProvider';


function Login( {navigation} ) {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    

    const { login } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.imageView}>
                <Image resizeMode='center' source={require("../assets/LogoEasyTrip.png")}></Image>
            </View>
            <View style={styles.inputView}>
                
                <TextInput 
                    placeholder='Email' 
                    value={email} 
                    onChangeText={text => setEmail(text)} 
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
                <TouchableOpacity onPress={() => login(email,password) } style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Login;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",

    },
    imageView: {
        height: "42%",
        alignItems: "center",
        justifyContent: "center"
    },
    inputView:{
        width: "80%",
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
        marginTop: 40,
        marginBottom: 40
    },
    button:{
        backgroundColor: "#a7cedf",
        width: "100%",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        borderColor: "#a7cedf",
        borderWidth: 2,
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 16
    }

});
