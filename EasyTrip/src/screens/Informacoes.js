import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Informacoes({route, navigation}) {

    const titulo = route.params.item;
    
    console.log(route.params.IsPasse);

    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <View style={styles.info}>
                    <Text style={styles.text}>Tipo de passe:</Text>
                    <Text style={styles.text1}>{route.params.item.Tipo}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Periodicidade:</Text>
                    <Text style={styles.text1}>{route.params.item.Periodicidade}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Desconto:</Text>
                    <Text style={styles.text1}>{route.params.item.Desconto}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Valor:</Text>
                    <Text style={styles.text1}>{route.params.item.Valor}€</Text>
                </View>
                <Text style={styles.text}>Mais informações:</Text>
                <Text style={styles.textInfo}>{route.params.item.Informacao}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Pagamento", {titulo:titulo, IsPasse: route.params.IsPasse})}>
                <Text style={styles.buttonText}>Escolher método de pagamento</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between"
    },
    button:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        margin:30,
        borderRadius: 10,
        width:"70%",
        alignSelf:"center",
        height:"8%",
        justifyContent:"center"
    },
    buttonText:{
        color: "black",
        fontWeight: "700",
        fontSize: 16
    },
    info:{
        flexDirection:"row"
    },
    text:{
        fontSize: 17,
        marginTop: 10,
        marginLeft: 10,
        marginEnd:10,
        fontWeight: 'bold',
    },
    text1:{
        fontSize: 17,
        marginTop: 10,
        marginEnd: 10,
        marginRight: 10,
    },
    textInfo:{
        fontSize:17,
        margin:10
    }
})

export default Informacoes;