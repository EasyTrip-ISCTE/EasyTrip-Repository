import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image , StyleSheet} from 'react-native';

import Perfil from '../screens/Perfil';
import Definicoes from '../screens/Definicoes';
import Servicos from '../screens/Servicos';
import Bilhetes from '../screens/Bilhetes';
import Passes from '../screens/Passes';
import Dados_Pessoais from '../screens/Dados_Pessoais';
import Carregar_Documentos from '../screens/Carregar_Documentos';
import Verificar_Email from '../screens/Verificar_Email';
import Apoio_Cliente from '../screens/Apoio_Cliente';
import Pagamento from '../screens/Pagamento';
import MBWAY from '../screens/MBWAY';
import MB from '../screens/MB';
import VISA from '../screens/VISA';
import PAYPAL from '../screens/PAYPAL';
import Ajuda from '../screens/Ajuda';
import Notificacoes from '../screens/Notificacoes' 
import Informacoes from '../screens/Informacoes';
import Cartao from '../screens/Cartao';
import Historico from '../screens/Historico';
import Bilhetes_User from '../screens/Bilhetes_User';
import NFCReader from '../screens/NFCReader';
import Tipo_Documentos from '../screens/Tipo_Documentos';
import Upload from '../screens/Upload';
import CC from '../screens/CC';
import TitulosValidos from '../screens/TitulosValidos';
import TituloEmUtilizacao from '../screens/TituloEmUtilizacao';
import DetalhesTitulo from '../screens/DetalhesTitulo';
import Zapping from '../screens/Zapping';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs(){
    return(
      <Tab.Navigator 
        screenOptions={({route}) => ({
          TabBarIcon: ({focused, size, colour}) => {
            let iconName; 
            if(route.name === "Home"){ 
              //iconName = focused ? 'ios-home': 'ios-home-outline' ;
            } else if(route.name === "NFCReader"){ 
              //iconName = focused ? 'add-circle-sharp': 'add-circle-outline' ;
            } else if(route.name === "Serviços"){ 
              //iconName = focused ? 'add-circle-sharp': 'add-circle-outline' ;
            } else if(route.name === "Definições"){ 
              //iconName = focused ? 'ios-settings' : 'ios-settings-outline' ;
            }
            return <Ionic name = {iconName} size={size} colour={colour} />;
          },
        //tabBarActiveBackgroundColor: "#a7cedf",
        //tabBarInactiveBackgroundColor: "#a7cedf",
        tabBarStyle:{backgroundColor:"#a7cedf"}
    
      })}>
        
        <Tab.Screen name="Home" component={Perfil} options={ {headerStyle:{backgroundColor:'#ffb319'}, tabBarIcon:() => {
              return (<Image style={styles.image} source={require("../assets/inicio.png")}/>);},}}/>
        <Tab.Screen name="Ler NFC" component={NFCReader} options={ {headerStyle:{backgroundColor:'#ffb319'}, tabBarIcon:() => {
              return (<Image style={styles.image} source={require("../assets/nfc.png")}/>);},}}/>
        <Tab.Screen name="Serviços" component={Servicos} options={ {headerStyle:{backgroundColor:'#ffb319'}, tabBarIcon:() => {
              return (<Image style={styles.image} source={require("../assets/serviços.png")}/>);},}}/>
        <Tab.Screen name="Definições" component={Definicoes} options={ {headerStyle:{backgroundColor:'#ffb319'}, tabBarIcon:() => {
              return (<Image style={styles.image} source={require("../assets/definicoes.png")}/>);},}}/>
      </Tab.Navigator>
    )
  }

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName='Perfil'>
            <Stack.Screen name="Bilhetes" component={Bilhetes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Passes" component={Passes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Dados Pessoais" component={Dados_Pessoais} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Validar Documentos" component={Carregar_Documentos} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Verificar Email" component={Verificar_Email} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Apoio ao Cliente" component={Apoio_Cliente} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Pagamento" component={Pagamento} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="MBWAY" component={MBWAY} options={{headerStyle:{backgroundColor:'#ffb319'}, headerBackVisible:false}}/>
            <Stack.Screen name="MB" component={MB} options={{headerStyle:{backgroundColor:'#ffb319'}, headerBackVisible:false}}/>
            <Stack.Screen name="VISA" component={VISA} options={{headerStyle:{backgroundColor:'#ffb319'}, headerBackVisible:false}}/>
            <Stack.Screen name="PAYPAL" component={PAYPAL} options={{headerStyle:{backgroundColor:'#ffb319'}, headerBackVisible:false}}/>
            <Stack.Screen name="Notificacoes" component={Notificacoes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Perguntas Frequentes" component={Ajuda} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Informações" component={Informacoes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Cartão" component={Cartao} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Histórico" component={Historico} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Meus Bilhetes" component={Bilhetes_User} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Tipo de Documento" component={Tipo_Documentos} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Tipo de Upload" component={Upload} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Cartão de Cidadão" component={CC} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Escolha o título" component={TitulosValidos} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Título em utilização" component={TituloEmUtilizacao} options={{headerStyle:{backgroundColor:'#ffb319'}, headerBackVisible:false}}/>
            <Stack.Screen name="Detalhes" component={DetalhesTitulo} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Zapping" component={Zapping} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Perfil" component={Tabs} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default AppStack;

const styles = StyleSheet.create({

  image:{
    resizeMode:'contain',
    width:30,
  },

})