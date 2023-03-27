import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import email from 'react-native-email'

class Apoio_Cliente extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Morada:</Text>
                <Text style={styles.text}> Avenida das Forças Armadas, 1649-026 Lisboa </Text>

                <Text style={styles.title}> Telemovel:</Text>
                <Text style={styles.text}> +351 926 386 658</Text>
             
                <Text style={styles.title}> Endereço de E-mail:</Text>
                <Text style={styles.text}> easytrip.iscte@gmail.com</Text>
                <TouchableOpacity style={styles.button} onPress={this.handleEmail} >
                    <Text style={styles.buttonText}>Enviar E-mail</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleEmail = () => {
        const to = ['easytrip.iscte@gmail.com'] // string or array of email addresses
        email(to, {checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
   
    button:{
        backgroundColor: "#ffb319",
        width: 120,
        height: 40,
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        borderColor: "#ffb319",
        borderWidth: 2,
        marginTop:-70,
        
    },
    buttonText:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:15,
        fontWeight: 'bold',
    }

})


export default Apoio_Cliente;
