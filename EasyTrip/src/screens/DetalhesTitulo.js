import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function DetalhesTitulo({navigation, route}) {

    const titulo = route.params.titulo;

    return (
        <View>
            <Text style={styles.text}>Origem: {titulo.Origem}</Text>
            <Text style={styles.text}>Destino: {titulo.Destino}</Text>
            <Text style={styles.text}>Valor: {titulo.Valor}</Text>
            <Text style={styles.text}>Estado: {titulo.Estado}</Text>
            <Text style={styles.text}>Data de Compra: {titulo.DataCompra} às {titulo.HoraCompra}</Text>
            <Text style={styles.text}>Utilizado em: {titulo.DataUtilizacao} às {titulo.HoraUtilizacao} </Text>

            <TouchableOpacity style={styles.button} onPress={() => {navigation.goBack(null)}}>
                    <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        alignSelf: "center",
        margin: 10
    },
    text:{
        fontSize:16,
        margin:10
    }
})

export default DetalhesTitulo;
