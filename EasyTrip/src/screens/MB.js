import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

function MB({navigation}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image_mb} source={require("../assets/multibanco.png")}/>
            <View style={styles.inputCampos}>
                <Text style={styles.referenciaTitle}>Referencia:</Text>
                <Text style={styles.nome}>EasyTrip Portugal</Text>
                <Text style={styles.referencia}>PT50 0035 0000 1234 1234 1234 1</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop:50,
    },

    nome:{
        fontSize:20
    },

    referenciaTitle:{
        marginBottom:30,
        marginTop:50,
        fontSize:20,
        fontWeight:'bold',
    },

    referencia:{
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5,
        fontSize:20,
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
    },

    inputCampos:{
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        width: '90%',
    },

    image_mb:{
        height:120,
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
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:5,
    }

})    

export default MB;