import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Popup, Root } from 'react-native-popup-confirm-toast';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

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
                DataUtilizacao: moment().locale("pt").format("D/MMM/YYYY"),
                HoraUtilizacao: moment().locale("pt").format("h:mm A")
            }).then(() =>{
                firestore().collection("bilhetesUser").doc(tituloIdaux).get().then(doc2 =>{
                    if(doc2.exists){
                        tituloUtilizar = doc2.data();
                        console.log("Aquiiii",doc2.data())
                    }
                    navigation.navigate("Título em utilização", {titulo : doc2.data(), tituloId: tituloIdaux, isBilhete: true, isPasse: false, isZapping: false})
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
    
    const usarZapping = () => {

        const saldo = route.params.zapping.Valor - 1.90;
        firestore().collection("zapping").doc(user.uid).update({
            Valor: saldo
        }).then(()=>{
            firestore().collection("zapping").doc(user.uid).get().then(doc => {
                if(doc.exists){
                    navigation.navigate("Título em utilização", {titulo: doc.data(), isBilhete: false, isPasse: false, isZapping: true})
                }
            })
          
        })

        
    }

    if(!titulos){
        return null;
    }
    else{
        return (
            <View style={styles.container}>
                <View style={styles.view}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.title}>Passe</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text}></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.view}>
                    <TouchableOpacity style={styles.button} onPress={() => usarZapping()}>
                        <Text style={styles.title}>Zapping</Text>
                        <Text style={styles.text}>Saldo Disponível: {route.params.zapping ? route.params.zapping.Valor : ""}€</Text>
                        <Text style={styles.text}>Custo da viagem: 1,90€</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.bilhetes}>Bilhetes</Text>
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
    bilhetes:{
        marginLeft: 24,
        marginRight: 14,
        marginTop: 24,
        fontSize: 20
    },

    list:{
        marginLeft: 14,
        marginRight: 14,
        marginTop: 4
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