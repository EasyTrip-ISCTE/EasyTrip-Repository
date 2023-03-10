import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { auth} from '../../firebase';

function Verificar_Email({navigation}) {
    
    const email = auth.currentUser.email;
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email: {email}</Text>
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