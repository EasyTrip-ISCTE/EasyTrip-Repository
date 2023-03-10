import React from 'react';
import { View,Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

function PAYPAL() {
    return(
    <View style={styles.container}>
        <Image style={styles.image_paypal} source={require("../assets/paypal.png")}/>
        <View style={styles.inputCampos} >
            <TextInput 
                placeholder='Introduza E-mail'
                style={styles.inputEmail}
            />
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
    </View>
)}

export default PAYPAL;

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

    inputEmail:{
        backgroundColor: "white",
        paddingHorizontal: 70,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 80
    },

    image_paypal:{
        height:80,
        resizeMode:'contain',
        alignSelf:'center',
    },
    button:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        alignSelf:'center',
        borderRadius: 10,
        width:100,
        height:40,
        margin:150,
    },
    buttonText:{
        textAlign:'center',
        textAlignVertical:'center',
        color: "black",
        fontWeight: "700",
        fontSize: 20,
        marginTop:5,
    }

})    
