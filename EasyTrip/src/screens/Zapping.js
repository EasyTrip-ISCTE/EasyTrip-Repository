import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../components/AuthProvider';

function Zapping({navigation, route}) {

    const [isPasse, setIsPasse] = useState(false);
    const [isZapping, setZapping] = useState(true);

    return (
        <View>
            <Text>O seu saldo: </Text>
            <Text>Deseja carregar zapping?</Text>
            <View>
                <TouchableOpacity onPress={()=> navigation.navigate("Pagamento", {IsPasse: isPasse, IsZapping: isZapping ,ValorZapping: 3})}>
                    <Text>3€</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("Pagamento", {IsPasse: isPasse, IsZapping: isZapping ,ValorZapping: 5})}>
                    <Text>5€</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("Pagamento", {IsPasse: isPasse, IsZapping: isZapping ,ValorZapping: 7})}>
                    <Text>7€</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
})

export default Zapping;