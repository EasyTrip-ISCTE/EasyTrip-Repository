import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Accordian from '../components/Accordion';

function Ajuda() {

    const perguntas = [
        {   
            id: 1,
            title : "Como é que valido o meu bilhete?",
            data : "Para validar o bilhete basta passares o telemóvel pelos sensores junto às cancelas, tal como farias se estivesses a usar um bilhete físico."
        },
        {   
            id: 2,
            title : "Se comprar dois bilhetes posso viajar com outra pessoa?",
            data : "Resposta 2"
        },
        {
            id: 3,
            title : "Pretendo fazer uma sugestão/reclamação! Como posso fazer?",
            data : "Resposta 3"
        },
        {
            id: 4,
            title : "Preciso de um recibo/fatura dos bilhetes que adquiri. O que devo fazer?",
            data : "Resposta 4"
        },
        {
            id: 5,
            title : "E se o meu bilhete ou passe eletrônicos não validarem no momento de passagem nas cancelas?",
            data : "Resposta 5"
        },
        {
            id: 6,
            title : "Criei o passe pela aplicação mas gostava também de o ter fisicamente. Como posso faze-lo?",
            data : "Resposta 6"
        }
    ]

    return(
        <View style={StyleSheet.container}>
            <FlatList
                data={perguntas}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                    <Accordian title={item.title} data={item.data}/>
                )} 
            />
        </View>
    );

    
}

export default Ajuda;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: "2%",
        marginBottom:"2%",
        borderRadius: 12,
        overflow: "hidden"
    
    }
})