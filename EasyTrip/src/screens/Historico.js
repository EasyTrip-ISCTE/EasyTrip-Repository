import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../components/AuthProvider';

function Historico({navigation}) {

    const {user} = useContext(AuthContext);
    const [bilhetes, setBilhetes] = useState([]);
   

    useEffect(() => {
        let lista = [];
        
        firestore().collection("bilhetesUser").where("idUser", "==", user.uid).get().then(query => {
            query.forEach((doc) =>{
                lista.push({...doc.data(), id:doc.id});
            })
            setBilhetes(lista);
        })
    })
    

    return (
        <View style={styles.container}>
            
            <FlatList 
                style={styles.list}
                data={bilhetes}
                keyExtractor= {(item) => (item.id)}
                showsVerticalScrollIndicator={false}
                renderItem = { ({item}) => 
                    <View style={styles.view}>
                        <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate("Detalhes", {titulo: item})}>
                            <Text style={styles.title}>Origem: {item.Origem}</Text>
                            <Text style={styles.title}>Destino: {item.Destino}</Text>
                            <View style={styles.content}>
                                <Text style={styles.text}>Comprado em: {item.DataCompra}</Text>
                                <Text style={styles.text}>{item.Estado}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                } 
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    button:{
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14,
        marginEnd:14,
    },
    content:{
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop:5,
        marginBottom:10
    },

    title:{
        fontSize:17,
        fontWeight: "bold",
    },

    text:{
        fontSize:16,
        
    
    },
    text2:{
        fontSize:10,
        alignSelf:"center",
    },

    list:{
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14
    },
    view:{
        borderColor: "gray",
        borderWidth: 3,
        borderRadius:10,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14,
        
    },
    info:{
        alignSelf:"flex-end"
    }

})

export default Historico;


