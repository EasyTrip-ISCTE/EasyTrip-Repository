import React from 'react';
import { auth, db } from '../../firebase';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

    

function Definicoes({navigation}) {

    const onLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out")
                navigation.navigate('PaginaInicial')
            })
        .catch((err) => {
        console.log(err.message)
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Dados Pessoais")}>
                    <Text style={styles.text}>Alterar Dados Pessoais</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Validar Documentos")}>
                    <Text style={styles.text}>Validar Documentos</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Verificar Email")}>
                    <Text style={styles.text}>Verificar E-mail</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Notificacoes")}>
                    <Text style={styles.text}>Notificações</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Ajuda")}>
                    <Text style={styles.text}>Ajuda</Text>
                </TouchableOpacity>
           
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Contactos")}> 
                    <Text style={styles.text}>Contactos</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => onLogout()}> 
                    <Image style={styles.buttonLogOut} source={require("../assets/logout1.png")}/>
                    <Text style={styles.text}>LogOut</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Definicoes;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    text:{
      fontSize:18,
      alignSelf:'center',
    },

    button:{
        alignSelf:'center',
        borderColor: "black",
        borderWidth:1,
        backgroundColor: "#EBEBEB",
        width:'100%',
        height:'12%',
        justifyContent: 'center',
    },

    buttonLogOut:{
        marginStart:10,
        height:60,
        resizeMode:'contain',
        alignSelf:'center',
    }
});