import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image } from 'react-native';

function Servicos({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate("Bilhetes")}>
                    <Image style={styles.image_ticket} source={require("../assets/ticket1.png")}/>
                    <Text style={styles.text}>Bilhete</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate("Passes")}>
                    <Image style={styles.image_card} source={require("../assets/PasseEasyTrip.png")}/>
                    <Text style={styles.text}>Passe</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate("Zapping")}>
                    <Image style={styles.image_card} source={require("../assets/PasseEasyTrip.png")}/>
                    <Text style={styles.text}>Zapping</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 5,
        margin: 50,
    },

    image_ticket:{
        height:95,
        resizeMode:'contain',
        alignSelf:'center',
    },

    image_card:{
        height:110,
        resizeMode:'contain',
        alignSelf:'center',
        
    },

    text:{
        fontSize:30,
        alignSelf:'center',
        borderBottomWidth:4,
    },
    view:{
        borderRadius: 10,
        width:"50%",
        height:"30%",
        justifyContent:"space-between",
        alignSelf:"center"

    }
})    

export default Servicos;