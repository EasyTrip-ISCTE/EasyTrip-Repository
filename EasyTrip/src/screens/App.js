import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons'

import PaginaInicial from './PaginaInicial';
import Login from './Login';
import Registar from './Registar';
import Perfil from './Perfil';
import Definicoes from './Definicoes';
import Servicos from './Servicos';
import Bilhetes from './Bilhetes';
import Passes from './Passes';
import Dados_Pessoais from './Dados_Pessoais';
import Carregar_Documentos from './Carregar_Documentos';
import Verificar_Email from './Verificar_Email';
import Contactos from './Contactos';
import Pagamento from './Pagamento';
import MBWAY from './MBWAY';
import MB from './MB';
import VISA from './VISA';
import PAYPAL from './PAYPAL';
import Ajuda from './Ajuda';
import Notificacoes from './Notificacoes' 
import Informacoes from './Informacoes';
import Cartao from './Cartao';
import Historico from './Historico';
import Bilhetes_User from './Bilhetes_User';
import NFCReader from './NFCReader';

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
      <Tab.Screen name="Home" component={Perfil} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
      <Tab.Screen name="NFCReader" component={NFCReader} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
      <Tab.Screen name="Serviços" component={Servicos} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
      <Tab.Screen name="Definições" component={Definicoes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
    </Tab.Navigator>
  )
}

export default function App() {

  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="PaginaInicial" >
        <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Registar" component={Registar} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Bilhetes" component={Bilhetes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Passes" component={Passes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Dados Pessoais" component={Dados_Pessoais} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Validar Documentos" component={Carregar_Documentos} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Verificar Email" component={Verificar_Email} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Contactos" component={Contactos} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Pagamento" component={Pagamento} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="MBWAY" component={MBWAY} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="MB" component={MB} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="VISA" component={VISA} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="PAYPAL" component={PAYPAL} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Notificacoes" component={Notificacoes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Ajuda" component={Ajuda} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Informações" component={Informacoes} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Cartão" component={Cartao} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Histórico" component={Historico} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Meus Bilhetes" component={Bilhetes_User} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
        <Stack.Screen name="Perfil" component={Tabs} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}




