import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../components/AuthProvider';

function Bilhetes_User() {

    const {user} = useContext(AuthContext);
    const [bilhetes, setBilhetes] = useState([]);

    //const queryBilhetes = query(collection(db, "bilhetesUser"), where("idUser", "==", auth.currentUser.uid));
    
    useEffect(() => {
        let listaBilhetes = [];

        firestore().collection("bilhetesUser").where("idUser", "==", user.uid).where("Estado", "==", "Valido").get().then(query => {
            query.forEach((doc1) => {
                listaBilhetes.push({...doc1.data(), id:doc1.id});
            })
            setBilhetes(listaBilhetes);
        })
        //console.log(bilhetes);
    }, [])

    
   
    
    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={bilhetes}
                keyExtractor= {(item) => (item.id)}
                showsVerticalScrollIndicator={false}
                renderItem = { ({item}) => 
                    <View style={styles.view}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.title}>Origem: {item.Origem}</Text>
                            <Text style={styles.title}>Destino: {item.Destino}</Text>
                            <View style={styles.content}>
                                <Text style={styles.text}>{item.Valor}€</Text>
                                <Text style={styles.text}>Estado: {item.Estado}</Text>
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
        borderColor: "#a7cedf",
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


export default Bilhetes_User;

