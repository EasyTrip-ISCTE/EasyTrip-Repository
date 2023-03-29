import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Accordian from '../components/Accordion';

function Ajuda() {

    const perguntas = [
        {   
            id: 1,
            title : "Como é que valido o meu bilhete?",
            data : "Para validar o bilhete deves garantir que tens o NFC do teu dispositivo ligado e de seguida basta passar o telemóvel pelo sensor que se encontra junto ao torniquete, tal como farias se estivesses a usar um bilhete físico."
        },
        {   
            id: 2,
            title : "Se comprar dois bilhetes posso viajar com outra pessoa?",
            data : "Nao"
        },
        {
            id: 3,
            title : "Pretendo fazer uma sugestão/reclamação! Como posso fazer?",
            data : "Para efetuar uma sugestão/reclamação deverá contactar a nossa linha de apoio ao cliente disponivel das 9h as 18h nos dias utéis, ou de forma permanente através do enderenço de e-mail, ambos os metodos de contacto estão disponiveis na página de Apoio ao Cliente"
        },
        {
            id: 4,
            title : "Preciso de um recibo/fatura dos bilhetes que adquiri. O que devo fazer?",
            data : "Para solicitar uma fatura/recibo deverá ter o seu NIF atualizado e associado à sua conta e entrar em contacto com a linha de Apoio ao Cliente"
        },
        {
            id: 5,
            title : "E se o meu bilhete ou passe eletrônicos não validarem no momento de passagem nas cancelas?",
            data : "Caso não esteja a conseguir validar o seu titulo, deverá entrar em contacto com a nossa linha de Apoio ao Cliente"
        },
        {
            id: 6,
            title : "Criei o passe pela aplicação mas gostava também de o ter fisicamente. Como posso faze-lo?",
            data : "Resposta 6"
        }
    ]

    return(
        <View style={styles.container}>
            <FlatList
                data={perguntas}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (<Accordian title={item.title} data={item.data}/>)} 
            />
        </View>
    );

    
}

export default Ajuda;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems:'stretch',
    
    }
})