import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function DetalhesTitulo({navigation, route}) {

    const titulo = route.params.titulo;

    return (
        <View>
            <Text>Origem: {titulo.Origem}</Text>
            <Text>Destino: {titulo.Destino}</Text>
            <Text>Valor: {titulo.Valor}</Text>
            <Text>Data de Compra: {titulo.DataCompra} às {titulo.HoraCompra}</Text>
            <Text>Utilizado em: {titulo.DataUtilizacao} às {titulo.HoraUtilizacao} </Text>

            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Histórico")}}>
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
    }
})

export default DetalhesTitulo;
