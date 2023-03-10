import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';

function VISA({navigation}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image_visa} source={require("../assets/visa.png")}/>
            <View style={styles.inputCampos} >
                    <TextInput 
                        placeholder='Montante a depositar'
                        style={styles.inputMontante}
                    />
            </View>
            <View style={styles.inputCampos}>    
                    <TextInput 
                        placeholder='Numero do Cartão'
                        style={styles.inputNumber}
                    />
                    <TextInput 
                        placeholder='Nome do Titular'
                        style={styles.inputName}
                    />
                    <TextInput 
                        placeholder='Data de Validades'
                        style={styles.inputValidade}
                    />
                    <TextInput 
                        placeholder='CVV'
                        style={styles.inputCVV}
                    />
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
    
    inputCampos:{
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        width: 400,
        marginTop:50,
    },

    inputMontante:{
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5,
    },
    inputNumber:{
        backgroundColor: "white",
        paddingHorizontal: 80,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5
    },
    inputName:{
        backgroundColor: "white",
        paddingHorizontal: 87,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5
    },
    inputValidade:{
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5
    },
    inputCVV:{
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5
    },image_visa:{
        height:100,
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
        margin:50,
    },
    buttonText:{
        textAlign:'center',
        textAlignVertical:'center',
        color: "black",
        fontWeight: "700",
        fontSize: 20,
        marginTop:5,
    },
})    

export default VISA;