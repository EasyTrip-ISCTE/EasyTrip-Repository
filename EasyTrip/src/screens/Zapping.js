import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../components/AuthProvider';

function Zapping({navigation, route}) {

    const [zapping, setZapping] = useState("")
    const [isPasse, setIsPasse] = useState(false);
    const [isZapping, setIsZapping] = useState(true);
    const {user} = useContext(AuthContext);

    const itens = [3,5,10,15,20,25,30,35,40]

    useEffect(() => {
        getZapping();

    }, [])

    const getZapping = () =>{
        firestore().collection("zapping").doc(user.uid).get().then(doc => {
            if(doc.exists){
                setZapping(doc.data()["Valor"]);
            }
        })
    }
   

    return (
        <View style={styles.view}>
            <Text style={styles.text}>O seu saldo: {zapping ? zapping.toFixed(2) : null}€</Text>
            
            <View style={styles.view2}>
            <Text style={styles.text}>Deseja carregar zapping?</Text>
            <FlatList 
                contentContainerStyle={styles.grid}
                data={itens}
                renderItem={({ item }) => (
                    <View style={styles.view1}>
                        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Pagamento", {IsPasse: isPasse, IsZapping: isZapping ,ValorZapping: item})}>
                            <Text style={styles.text}>{item}€</Text>
                        </TouchableOpacity>
                    </View>
                )}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index}>

            </FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        flex:1,
    },
    view1:{
        alignItems: "center",
        borderColor: "#a7cedf",
        borderWidth: 3,
        borderRadius:10,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 30,
        height: 80,
        width: 96
        
    },
    button:{
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14,
        marginEnd:14,
    },
    view2:{
     
        alignSelf: "center",
        alignItems: "center",
        width: "95%",
        height: "70%",
        marginTop: 50
        
    },
    grid:{
        alignItems: "center",

    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10

    }
})

export default Zapping;