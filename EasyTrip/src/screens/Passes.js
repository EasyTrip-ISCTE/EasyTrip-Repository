import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../firebase';

function Passes({navigation}) {

    const [passes, setPasses] = useState([]);
    const [isPasse, setIsPasse] = useState(true);
    
    useEffect(() => {
        let listaPasses = [];
        getDocs(collection(db, "passes"))
        .then (query => {
            query.forEach((doc) => {
                listaPasses.push({...doc.data(), id:doc.id});
            })
            console.log("Estou aquiiiiii 1");
            setPasses(listaPasses);
        });
    }, [])

    
   
    
    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={passes}
                keyExtractor= {(item) => (item.id)}
                showsVerticalScrollIndicator={false}
                renderItem = { ({item}) => 
                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => navigation.navigate("Informações", {item:item, IsPasse :isPasse})} style={styles.button}>
                            <Text style={styles.title}>{item.Tipo}</Text>
                            <View style={styles.content}>
                                <Text style={styles.text}>{item.Periodicidade}</Text>
                                <Text style={styles.text}>{item.Valor}€</Text>
                                
                            </View>
                            <Text style={styles.info}>+ informações</Text>
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
        fontSize:20,
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

export default Passes;