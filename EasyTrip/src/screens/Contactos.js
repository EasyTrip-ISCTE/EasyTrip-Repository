import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

function Contactos({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Endereço de E-mail:</Text>
            <Text style={styles.text}> easytrip.iscte@gmail.com</Text>
            <Text style={styles.title}> Telemovel:</Text>
            <Text style={styles.text}> +351 926 386 658</Text>
            <Text style={styles.title}> Morada:</Text>
            <Text style={styles.text}> Avenida das Forças Armadas, 1649-026 Lisboa </Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 100,
    },

    text:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        marginBottom:80,
    },

    title:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        fontWeight: 'bold',
        borderBottomWidth:2,
        borderTopWidth:2,
        marginBottom:10,
    }
})    

export default Contactos;
