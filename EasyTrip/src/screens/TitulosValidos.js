import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Popup, Root } from 'react-native-popup-confirm-toast';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../components/AuthProvider';

function TitulosValidos({route, navigation}) {

    const {user} = useContext(AuthContext);
    const [titulos,setTitulos] = useState([]);
    const [tituloUtilizacao, setTituloUtilizacao] = useState("");
    
    
    useEffect(() => {
        setTitulos(route.params.titulos)
    })

    
    const usarTitulo = (tituloIdaux) =>{
        console.log("Titulos Validos" ,titulos);
        let tituloUtilizar;

        //verificar se ja existe um bilhete em utilização e enviar para a pagina bilhetes em utilização
                        
            
            firestore().collection("bilhetesUser").doc(tituloIdaux).update({
                Estado : "Em utilização",
            }).then(() =>{
                firestore().collection("bilhetesUser").doc(tituloIdaux).get().then(doc2 =>{
                    if(doc2.exists){
                        tituloUtilizar = doc2.data();
                        console.log("Aquiiii",doc2.data())
                    }
                    navigation.navigate("Título em utilização", {titulo : doc2.data(), tituloId: tituloIdaux})
                })
            }).then(() =>{
                console.log("Fiz update do estado do bilhete")    
                {Popup.show({
                    type: 'success',
                    title: 'Cancela aberta',
                    textBody: 'Faça uma boa viagem',
                    buttonText: 'Fechar',
                    okButtonStyle:{ backgroundColor: '#ffb319'},
                    callback: () => {Popup.hide()}
                })}
            })
            
    }
    

    if(!titulos){
        return null;
    }
    else{
        return (
            <View style={styles.container}>
            
            <FlatList 
                style={styles.list}
                data={titulos}
                keyExtractor= {(item) => (item.id)}
                showsVerticalScrollIndicator={false}
                renderItem = { ({item}) => 
                    <View style={styles.view}>
                        <TouchableOpacity style={styles.button} onPress={() => usarTitulo(item.id)}>
                            <Text style={styles.title}>Origem: {item.Origem}</Text>
                            <Text style={styles.title}>Destino: {item.Destino}</Text>
                            <View style={styles.content}>
                                <Text style={styles.text}>{item.Valor}€</Text>
                                <Text style={styles.text}>{item.Estado}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                } 
            />
        </View>
        );
    }
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

export default TitulosValidos;