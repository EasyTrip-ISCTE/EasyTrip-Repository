import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

function Pagamento({route, navigation}) {

    const titulo = route.params;
    console.log("Pagamento",route.params.IsPasse);
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Escolha a sua forma de pagamento</Text>
            <TouchableOpacity onPress={() => navigation.navigate("MBWAY", {titulo:titulo, IsPasse: route.params.IsPasse})}>
                <Image style={styles.image_mb} source={require("../assets/mbway.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MB", {titulo})}>
                <Image style={styles.image_mb} source={require("../assets/multibanco.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("VISA", {titulo})}>
                <Image style={styles.image_visa} source={require("../assets/visa.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("PAYPAL", {titulo})}>
                <Image style={styles.image_paypal} source={require("../assets/paypal.png")}/>
            </TouchableOpacity> 
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
        margin: 50,
        marginBottom:100,
       
    },

    text: {
        textAlign:'center',
        fontSize:16,
        alignSelf:'center',
        borderBottomWidth:2,
        borderTopWidth:2,
        //borderLeftWidth:4,
        //borderRightWidth:4,
        fontWeight: 'bold',
    }, 

    image_mb:{
        height:95,
        resizeMode:'contain',
        alignSelf:'center',
    },

    image_visa:{
        height:90,
        resizeMode:'contain',
        alignSelf:'center',
    },

    image_paypal:{
        height:65,
        resizeMode:'contain',
        alignSelf:'center',
    }

})    

export default Pagamento;