import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { AuthContext } from '../components/AuthProvider';

function Verificar_Email({navigation}) {
    
    const {user} = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>O seu email já foi validado!</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    text: {
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10
    }

})    

export default Verificar_Email;